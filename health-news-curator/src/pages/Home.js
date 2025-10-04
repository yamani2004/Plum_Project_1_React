import React, { useEffect, useState } from "react";
import axios from "axios";
import { summarizeArticle } from "../services/aiService"; // Keep this import
import { getNews } from "../services/newsService";
import { useDarkMode } from "../context/DarkModeContext";
import Loader from "../components/Loader";
import NewsCard from "../components/NewsCard";
import styles from "./Home.module.css";

// Debug the import
console.log('🔍 summarizeArticle after import:', summarizeArticle);
console.log('🔍 typeof summarizeArticle:', typeof summarizeArticle);

console.log('🔍 DEBUG - summarizeArticle function:', summarizeArticle);
console.log('🔍 DEBUG - typeof summarizeArticle:', typeof summarizeArticle);
console.log('🔍 DEBUG - aiService import:', require('../services/aiService'));

const Home = ({ articlesPerPage = 5 }) => {
  const { darkMode, toggleMode } = useDarkMode();
  const [articles, setArticles] = useState([]);
  const [summaries, setSummaries] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [summarizationError, setSummarizationError] = useState(false);

  // Fetch news: prefer live NewsAPI, fallback to mock
  const fetchNews = async () => {
    setLoading(true);
    try {
      let news = [];
      if (process.env.REACT_APP_NEWS_API_KEY) {
        const response = await axios.get("https://newsapi.org/v2/top-headlines", {
          params: {
            category: "health",
            country: "us",
            apiKey: process.env.REACT_APP_NEWS_API_KEY,
          },
        });
        news = response.data.articles.map((item, idx) => ({
          id: idx + 1,
          title: item.title,
          description: item.description,
          content: item.content,
          url: item.url,
          urlToImage: item.urlToImage,
        }));
        console.log("Live NewsAPI fetched:", news.length, "articles");
      } else {
        console.warn("No NewsAPI key found, loading mock news.");
        news = await getNews(); // fallback mockNews.json
      }

      setArticles(news);
      setCurrentPage(1);
      setSummarizationError(false);
    } catch (error) {
      console.error("Error fetching news:", error);
      const news = await getNews();
      setArticles(news);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // Generate AI summaries
  // Generate AI summaries
useEffect(() => {
  if (articles.length === 0) return;

  const summarizeAll = async () => {
    console.log("🔄 Starting summarization process...");
    
    // First, check if backend is connected
    try {
      const { checkBackendConnection } = await import('../services/aiService');
      const isConnected = await checkBackendConnection();
      
      if (!isConnected) {
        console.error("❌ Backend not connected");
        // Set error summaries
        const errorSummaries = articles.reduce((acc, article) => {
          acc[article.id] = "❌ Backend server not connected. Please ensure backend is running on port 5000.";
          return acc;
        }, {});
        setSummaries(errorSummaries);
        return;
      }
    } catch (error) {
      console.error("❌ Failed to check backend connection:", error);
    }

    // Initialize loading summaries
    const initialSummaries = articles.reduce((acc, article) => {
      acc[article.id] = "⏳ Generating summary...";
      return acc;
    }, {});
    setSummaries(initialSummaries);

    try {
      // Run summaries sequentially to avoid overwhelming the backend
      const finalSummaries = {};
      
      for (let i = 0; i < articles.length; i++) {
        const article = articles[i];
        const textToSummarize = article.content || article.description || "";
        
        if (!textToSummarize.trim()) {
          finalSummaries[article.id] = "⚠️ No content available for summary";
          continue;
        }
        
        try {
          console.log(`📝 Summarizing article ${i + 1}/${articles.length}`);
          const summary = await summarizeArticle(textToSummarize);
          finalSummaries[article.id] = summary;
          
          // Update UI after each summary
          setSummaries(prev => ({ ...prev, [article.id]: summary }));
          
          // Small delay between requests
          await new Promise(resolve => setTimeout(resolve, 500));
          
        } catch (err) {
          console.error(`❌ Error summarizing article ${article.id}:`, err);
          finalSummaries[article.id] = "⚠️ Failed to generate summary";
          setSummaries(prev => ({ ...prev, [article.id]: "⚠️ Failed to generate summary" }));
        }
      }
      
      console.log("✅ All summaries completed");
      
    } catch (err) {
      console.error("❌ Unexpected error during summarization:", err);
    }
  };

  summarizeAll();
}, [articles]);

  // Pagination
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className={`${styles.container} ${darkMode ? styles.darkModeContainer : ""}`}>
      {/* Navbar */}
      <div className={`${styles.navbar} ${darkMode ? styles.darkModeNavbar : ""}`}>
        <h1 className={`${styles.navbarTitle} ${darkMode ? styles.darkModeTitle : ""}`}>
          📰 Health News Curator
        </h1>
        <div className={styles.navbarButtons}>
          <button className={`${styles.button} ${styles.buttonRefresh}`} onClick={fetchNews}>
            🔄 Refresh
          </button>
          <button className={`${styles.button} ${styles.buttonDarkMode}`} onClick={toggleMode}>
            {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
      </div>

      {/* Error Banner */}
      {summarizationError && (
        <div className={styles.errorBanner}>
          ⚠️ Some summaries failed to generate. Please ensure the backend server is running on port 5000.
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <Loader size={60} color={darkMode ? "#61dafb" : "#007bff"} />
      ) : (
        <div className={styles.articleContainer}>
          {currentArticles.map((article) => (
            <NewsCard
              key={article.id}
              article={{ 
                ...article, 
                summary: summaries[article.id] || "⏳ Generating summary..." 
              }}
            />
          ))}

          {/* Pagination */}
          <div className={styles.pagination}>
            <button 
              className={styles.buttonSmall} 
              onClick={handlePrevPage} 
              disabled={currentPage === 1}
            >
              ◀ Prev
            </button>
            <span>
              Page {currentPage} / {totalPages}
            </span>
            <button 
              className={styles.buttonSmall} 
              onClick={handleNextPage} 
              disabled={currentPage === totalPages}
            >
              Next ▶
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className={`${styles.footer} ${darkMode ? styles.darkModeFooter : ""}`}>
        © 2025 Health News Curator | Powered by OpenAI + NewsAPI
        {summarizationError && " | Backend connection issues detected"}
      </footer>
    </div>
  );
};

export default Home;