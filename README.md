# 🌱 CropGrower AI Assistant

CropGrower AI is a smart, interactive agricultural assistant designed to help farmers with crop management, weather forecasting, soil health, and market prices. Built for the IBM Skill Build Internship, this application combines the power of IBM Watsonx Orchestrate with a modern React frontend and persistent Supabase database.

## 🚀 Features

- **IBM Watsonx Integration**: Intelligent, context-aware AI responses tailored for agriculture.
- **Persistent Chat History**: Powered by Supabase, your conversations are automatically saved and restored across sessions using an anonymous session tracking system.
- **Voice-to-Text Input**: Speak your questions directly to the AI using built-in browser speech recognition.
- **PDF Document Upload**: Upload documents (like soil reports or manuals) and the AI will use them as context for your conversation.
- **Modern UI**: A responsive, glassmorphism design built with Tailwind CSS and Framer Motion for smooth animations.
- **Rich Markdown Responses**: Beautifully rendered tables and text for easy reading.

## 🛠️ Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, Framer Motion
- **AI Backend**: IBM Watsonx Orchestrate API
- **Database**: Supabase (PostgreSQL)
- **Icons**: React Icons (Feather)
- **Markdown**: `react-markdown`, `remark-gfm`

## ⚙️ Local Development Setup

To run this project locally, follow these steps:

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
Create a `.env` file in the root directory and add the following keys:

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

### 5. Run the development server
```bash
npm run dev
```

## 🌐 Vercel Deployment

This project is optimized for deployment on Vercel.

1. Push your code to GitHub.
2. Go to Vercel and import your repository.
3. Under **Environment Variables**, add all 5 variables from your `.env` file (`VITE_WATSON_API_KEY`, `VITE_WATSON_URL`, `VITE_WATSON_AGENT_ID`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).
4. Click **Deploy**. Vercel will automatically build the Vite app and assign you a live URL!

---
*Built for the IBM Skill Build Internship*
