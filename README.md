# 🩺 Health News Curator

![Banner](./assets/banner.png)

**Health News Curator** is a modern web application that fetches top health news articles, summarizes and rewrites them using advanced AI models, and presents them in a clean, interactive interface. This project combines **React** (frontend), **Node.js/Express** (backend), and **AI-powered summarization** services to deliver concise, high-quality health news summaries.

---

## 🚀 Features

- **AI-Powered Summarization**: Summarizes long health news articles into 2-3 sentences.  
- **Content Rewriting**: Optional rewriting for clarity and readability.  
- **Multiple AI Backends**: 
  - Hugging Face BART & DistilBART models  
  - Together AI Mixtral model  
  - Hugging Face public models (Pegasus)  
  - Emergency fallback algorithm for offline summarization  
- **Dark Mode Toggle**: Seamless switching between light and dark themes.  
- **Responsive UI**: Works well on desktop and mobile devices.  
- **Live News Fetching**: Integrates NewsAPI for top health headlines.  
- **Offline Fallback**: Uses local mock data for development or offline scenarios.  
- **Pagination**: Easy navigation through multiple articles.  
- **Error Handling & Fallbacks**: Ensures summaries are always available.

---

## 🏗 Architecture Overview

```text
Frontend (React.js)
-------------------
| Navbar         |
| Home.js        |  <--- Displays AI summaries for news feed
| Article.js     |  <--- Detailed article view with rewritten content
| NewsCard.js    |  <--- Card component for each article
| Loader.js      |  <--- Animated loading indicator
| DarkModeContext|  <--- Provides dark/light mode toggle
-------------------
       |
       V
Backend (Node.js + Express)
---------------------------
| GET /api/health      |  Health check
| POST /api/summarize  |  AI summarization
| POST /api/rewrite    |  Content rewriting
---------------------------
       |
       V
AI Services
-----------
Hugging Face (BART, DistilBART, Pegasus)
Together AI (Mixtral)
Fallback algorithm (template-based summary)

🔄 AI Summarization Flow
User requests summary
        |
        V
+----------------------+
| Backend /api/summarize|
+----------------------+
        |
        V
+-----------------------------+
| Hugging Face BART / DistilBART |
+-----------------------------+
        |
        V
If fails -> Together AI Mixtral
        |
        V
If fails -> Hugging Face Public Model
        |
        V
If fails -> Emergency fallback template-based summary
        |
        V
Return summary to frontend

🧠 Prompts & AI Usage
"Summarize this health news article in 2-3 sentences: {text}"

Together AI Mixtral
{
  "model": "mistralai/Mixtral-8x7B-Instruct-v0.1",
  "messages": [
    {"role": "system", "content": "You are a helpful assistant that summarizes health news articles in 2-3 concise sentences."},
    {"role": "user", "content": "Summarize this health news: {text}"}
  ]
}

💻 Technologies & Libraries
Layer	Technology/Library
Frontend	React.js, React Router, CSS Modules
Backend	Node.js, Express.js, Axios
AI	Hugging Face, Together AI, Public Pegasus models
Utilities	dotenv, CORS, environment variables
Data	NewsAPI, mock JSON fallback
Together AI Mixtral

📷 Screenshots
Home Page (Light Mode)

Home Page (Dark Mode)

Article View with Summary

⚡ Quick Start
Backend
cd backend
npm install
cp .env.example .env
# Add your API keys in .env
node server.js

Frontend
cd frontend
npm install
npm start

Open http://localhost:3000 to view the app.

🔑 Environment Variables
Backend .env
PORT=5000
HUGGING_FACE_API_KEY=your_hugging_face_api_key
TOGETHER_API_KEY=your_together_ai_key

Frontend .env
REACT_APP_NEWS_API_KEY=your_newsapi_key

🛠 API Usage Examples
Summarization Endpoint
POST http://localhost:5000/api/summarize
Content-Type: application/json
Body:
{
  "text": "Long health news article content..."
}


Response

{
  "summary": "📰 Concise 2-3 sentence summary",
  "source": "Hugging Face BART AI",
  "model": "facebook/bart-large-cnn"
}

Health Check
GET http://localhost:5000/api/health


Response

{
  "status": "OK",
  "message": "Server with REAL AI is running!",
  "aiProvider": "Hugging Face",
  "timestamp": "2025-10-04T12:34:56.789Z"
}

🎯 Key Highlights

Multi-layer AI backend ensures reliability and high-quality summaries.

Supports real-time summarization of top health news.

Modular React components for scalable frontend architecture.

Dark/Light mode toggle improves user experience.

Offline and mock data support for development and testing.

🔗 Useful Links

Hugging Face Models

Together AI

NewsAPI

React

Node.js

👨‍💻 Author

Yaman
Health News Curator – powered by OpenAI + Hugging Face + Together AI + NewsAPI

📄 License

MIT License


---

### ✅ Notes:

- I included **ASCII diagrams** for architecture and AI flow.  
- All features, prompts, APIs, and AI models are listed.  
- Screenshots are placeholders (`./assets/...`), replace them with your actual images.  
- It’s **ready for GitHub**, visually organized, and appealing.  

---
