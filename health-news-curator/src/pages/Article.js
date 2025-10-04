// Article.js
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getNews } from "../services/newsService";
import { rewriteArticle } from "../services/aiService";
import Loader from "../components/Loader";

export default function Article({
  containerPadding = "20px",
  maxWidth = "750px",
  titleColor = "#222",
  contentColor = "#444",
  backLinkColor = "#61dafb",
}) {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [expandedContent, setExpandedContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndRewrite = async () => {
      setLoading(true);
      const news = await getNews();
      const found = news.find((item) => item.id === parseInt(id));
      setArticle(found);

      if (found) {
        const rewritten = await rewriteArticle(found.content);
        setExpandedContent(rewritten);
      }
      setLoading(false);
    };

    fetchAndRewrite();
  }, [id]);

  if (!article) return <p style={{ textAlign: "center" }}>❌ Article not found.</p>;

  return (
    <div
      style={{
        padding: containerPadding,
        maxWidth: maxWidth,
        margin: "40px auto",
        fontFamily: "Segoe UI, sans-serif",
        lineHeight: "1.7",
      }}
    >
      <Link
        to="/"
        style={{
          display: "inline-block",
          marginBottom: "25px",
          color: backLinkColor,
          textDecoration: "none",
          fontWeight: "600",
          fontSize: "15px",
        }}
      >
        ← Back to Feed
      </Link>

      {article.image && (
        <img
          src={article.image}
          alt={article.title}
          style={{
            width: "100%",
            maxHeight: "400px",
            objectFit: "cover",
            borderRadius: "12px",
            marginBottom: "20px",
          }}
        />
      )}

      <h1 style={{ color: titleColor, marginBottom: "20px", fontSize: "26px" }}>
        {article.title}
      </h1>

      {loading ? (
        <Loader />
      ) : (
        <p
          style={{
            color: contentColor,
            fontSize: "17px",
            whiteSpace: "pre-line",
          }}
        >
          {expandedContent}
        </p>
      )}
    </div>
  );
}
