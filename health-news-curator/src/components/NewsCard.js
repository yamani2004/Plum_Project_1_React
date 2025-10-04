// NewsCard.js
import React from "react";
import styles from "./NewsCard.module.css";

export default function NewsCard({ article }) {
  return (
    <div className={styles.card}>
      {/* Image */}
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className={styles.cardImage}
        />
      )}

      {/* Content */}
      <div className={styles.cardContent}>
        <h2 className={styles.title}>{article.title}</h2>
        <p className={styles.summary}>
          {article.summary || "⏳ Loading summary..."}
        </p>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.readMore}
        >
          Read full article →
        </a>
      </div>
    </div>
  );
}
