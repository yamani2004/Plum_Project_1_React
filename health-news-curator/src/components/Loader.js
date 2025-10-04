// Loader.js
import React from "react";
import styles from "./Loader.module.css";

export default function Loader({ size = 60, color = "#61dafb", borderWidth = 6 }) {
  const loaderStyle = {
    width: `${size}px`,
    height: `${size}px`,
    borderTopColor: color,
    borderWidth: `${borderWidth}px`,
  };

  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader} style={loaderStyle}></div>
    </div>
  );
}
