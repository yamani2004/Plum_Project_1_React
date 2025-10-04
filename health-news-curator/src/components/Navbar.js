// src/components/Navbar.js
import React from "react";
import { useDarkMode } from "../context/DarkModeContext";
import styles from "../styles/Navbar.module.css";

export default function Navbar({ onRefresh }) {
  const { darkMode, toggleMode } = useDarkMode();

  return (
    <nav className={`${styles.navbar} ${darkMode ? styles.darkModeNavbar : ""}`}>
      <h1 className={styles.title}>🩺 Health News Curator</h1>
      <div className={styles.actions}>
        <button className={styles.refreshBtn} onClick={onRefresh}>
          🔄 Refresh
        </button>
        <button className={styles.modeBtn} onClick={toggleMode}>
          {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>
    </nav>
  );
}
