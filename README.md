# 🌱 CropGrower AI

> **An AI-powered Smart Farming Assistant built with IBM watsonx Orchestrate**

**🌟 Live Demo:** [https://cropgrower.vercel.app/](https://cropgrower.vercel.app/)  
**🧰 Backend Tools API:** [https://cropgrower-tools.onrender.com](https://cropgrower-tools.onrender.com)  
**💻 Tools Repository:** [cropgrower-tools on GitHub](https://github.com/Master-45-vic/cropgrower-tools.git)

CropGrower AI is an intelligent farming assistant that helps farmers make informed agricultural decisions using trusted agricultural knowledge, real-time weather information, soil analysis, and live market prices. It combines Retrieval-Augmented Generation (RAG) with external APIs to provide practical and easy-to-understand farming recommendations. Built for the IBM Skill Build Internship!

---

## ✨ Features

- 🌾 **AI-powered farming assistant**: Context-aware AI tailored for agriculture.
- 🌦️ **Real-time weather information**: Live weather data fetched on-the-fly.
- 🧪 **Soil analysis and recommendations**: Intelligent crop suitability guidance.
- 💰 **Live mandi market prices**: Direct market integrations.
- 📚 **RAG-based agricultural knowledge**: Trained on expert data.
- 📄 **Chat with uploaded PDF documents**: Upload soil reports or manuals.
- 🎤 **Voice-to-Text support**: Built-in browser speech recognition.
- 🔊 **Text-to-Speech responses**: AI can speak its responses to you.
- 💬 **Persistent chat history**: Powered by Supabase.
- 🌙 **Modern Glassmorphism UI**: Beautiful, responsive, and animated design.

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS & Framer Motion
- Web Speech API & Speech Synthesis API
- `react-markdown` & React Icons

### AI
- IBM watsonx Orchestrate
- Retrieval-Augmented Generation (RAG)

### Backend (External Repository)
- Python, Flask, Render
- Weather API, Soil API, Market Price API

### Database
- Supabase (PostgreSQL)

---

## 🖥️ Application Workflow

```text
User
   │
   ▼
React Frontend (Vite)
   │
   ▼
IBM watsonx Orchestrate
   │
   ├── Weather Tool (Python API)
   ├── Soil Tool (Python API)
   ├── Market Tool (Python API)
   └── RAG Knowledge Base
   │
   ▼
AI Response
   │
   ▼
Frontend + Supabase Chat History
```

---

## ⚙️ Local Development Setup

### 1. Clone the repository
```bash
git clone https://github.com/Master-45-vic/IBM-SKILL-BULID-INTERN---CropCrower-AI-Assistant-.git
cd IBM-SKILL-BULID-INTERN---CropCrower-AI-Assistant-
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up Environment Variables
Create a `.env` file in the root directory:

```env
# IBM Watsonx Credentials
VITE_WATSON_API_KEY=your_watson_api_key
VITE_WATSON_URL=your_watson_instance_url
VITE_WATSON_AGENT_ID=your_watson_agent_id

# Supabase Credentials
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Database Setup
1. Go to your Supabase project dashboard.
2. Open the SQL Editor.
3. Run the SQL script found in `supabase/schema.sql` to create the `chats` and `messages` tables.

### 5. Start the development server
```bash
npm run dev
```

---

## 🌐 Vercel Deployment

This project is optimized for deployment on Vercel. 
Simply push to GitHub, import the repository to Vercel, and add your 5 Environment Variables in the project settings!

---

## 🎯 Future Improvements

- Multi-language support for regional farmers
- Secure Farmer login & accounts
- Crop disease detection using images
- Farm analytics dashboard
- Mobile progressive web app (PWA)
- Offline support

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repository and submit a pull request.

---

## 📜 License

This project is licensed under the MIT License.

---

## 👨‍💻 Developed By

**Prashanth M**  
*AI | Machine Learning | Full Stack Development | IoT*  

⭐ If you like this project, don't forget to **Star** the repository!
