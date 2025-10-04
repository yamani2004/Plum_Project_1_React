import axios from "axios";

const NEWS_API_URL = "https://newsapi.org/v2/top-headlines";
const API_KEY = process.env.REACT_APP_NEWS_API_KEY;

/**
 * Fetch top health news from NewsAPI
 */
export async function getNews() {
  try {
    const res = await axios.get(NEWS_API_URL, {
      params: {
        category: "health",
        country: "us",
        apiKey: API_KEY,
      },
    });
    return res.data.articles || [];
  } catch (error) {
    console.error("Error fetching news:", error.response?.data || error.message);
    return [];
  }
}

/**
 * Fetch from local mock JSON (for development/offline testing)
 */
export async function getMockNews() {
  try {
    const res = await axios.get("/mockNews.json"); // Place in public/
    return res.data || [];
  } catch (error) {
    console.error("Error fetching mock news:", error);
    return [];
  }
}
