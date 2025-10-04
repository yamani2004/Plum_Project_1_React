import axios from "axios";

const BACKEND_URL = "http://localhost:5000";

console.log("✅ aiService.js is loading correctly!");

// Simple summarize function
export const summarizeArticle = async (text) => {
  console.log("🔄 aiService: summarizeArticle called with text length:", text?.length);
  
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/summarize`,
      { 
        text: text || "Sample health news content for summarization" 
      },
      { 
        timeout: 15000,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log("✅ aiService: Summary received successfully");
    return response.data.summary;
    
  } catch (error) {
    console.error("❌ aiService: Summarization failed:", error.message);
    
    if (error.code === 'ECONNREFUSED') {
      return "❌ Backend server not running. Please start: cd backend && node simple-server.js";
    }
    
    return "⚠️ Could not generate summary at this time";
  }
};

// Rewrite function
export const rewriteArticle = async (text) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/rewrite`, { text });
    return response.data.rewrite;
  } catch (error) {
    return "⚠️ Could not rewrite content";
  }
};

// Backend connection check
export const checkBackendConnection = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/health`, { timeout: 5000 });
    console.log("✅ Backend is running:", response.data);
    return true;
  } catch (error) {
    console.error("❌ Backend is not running");
    return false;
  }
};

console.log("✅ aiService.js exports are ready!");