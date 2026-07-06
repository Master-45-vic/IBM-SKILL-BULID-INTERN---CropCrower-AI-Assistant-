import axios from 'axios';

// Read API URL from environment variables, fallback for local dev
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Watson Orchestrate credentials from environment variables
const WATSON_API_KEY = import.meta.env.VITE_WATSON_API_KEY;
const WATSON_URL = import.meta.env.VITE_WATSON_URL;
const WATSON_AGENT_ID = import.meta.env.VITE_WATSON_AGENT_ID;

let iamToken = null;
let tokenExpiresAt = 0;

/**
 * Fetches an IBM Cloud IAM token using the API key
 */
const getIamToken = async () => {
  // If we have a valid token that expires in more than 5 minutes, reuse it
  if (iamToken && Date.now() < tokenExpiresAt - 5 * 60 * 1000) {
    return iamToken;
  }

  try {
    // Call the local Vite proxy instead of the remote IBM URL to avoid CORS
    const response = await fetch("/api/ibm-iam/identity/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=${WATSON_API_KEY}`
    });
    
    if (!response.ok) throw new Error("Failed to authenticate with IBM Cloud IAM");
    
    const data = await response.json();
    iamToken = data.access_token;
    tokenExpiresAt = Date.now() + (data.expires_in * 1000);
    return iamToken;
  } catch (error) {
    console.error("IAM Token Error:", error);
    throw new Error("Authentication failed. Please check your Watson API Key.");
  }
};

/**
 * Sends a chat message to the CropGrower AI backend (Watson Orchestrate).
 */
export const sendMessage = async (message, context = {}) => {
  if (!WATSON_API_KEY || !WATSON_URL) {
    return "Error: Watson credentials not found in environment variables.";
  }

  if (!WATSON_AGENT_ID || WATSON_AGENT_ID === "YOUR_AGENT_ID_HERE") {
    return "Error: You have not configured your Agent ID yet. Please add your VITE_WATSON_AGENT_ID to the .env file.";
  }

  try {
    const token = await getIamToken();
    
    // Construct the endpoint for Watson Orchestrate chat completions using local proxy
    const endpoint = `/api/watson/v1/orchestrate/${WATSON_AGENT_ID}/chat/completions`;

    console.log(`Sending message to Watson Orchestrate... (${endpoint})`);

    // Add a 60-second timeout so it doesn't hang forever
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000);

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { 
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: [{ role: "user", content: message }],
        stream: false
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);
    console.log("Received response from Watson Orchestrate. Status:", response.status);

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Watson API Error Details:", errorData);
      throw new Error(`Watson API returned status ${response.status}`);
    }

    const data = await response.json();
    console.log("Watson Data:", data);
    
    // Extract the reply depending on Watson Orchestrate's response schema (OpenAI compatible)
    if (data.choices && data.choices.length > 0) {
      return data.choices[0].message.content;
    }
    
    return "Received an empty or unrecognizable response from the agent.";

  } catch (error) {
    console.error("Error sending message to Watson Orchestrate:", error);
    if (error.name === 'AbortError') {
      return "The Watson agent took too long to respond (timeout). It might be executing a long-running skill.";
    }
    return `An error occurred while contacting the AI agent: ${error.message}`;
  }
};

/**
 * Uploads a PDF document to be used for context in chat.
 * TODO: Integrate actual backend endpoint for file upload.
 */
export const uploadPDF = async (file) => {
  try {
    // Mock upload
    return new Promise((resolve) => {
      setTimeout(() => resolve({ success: true, filename: file.name }), 2000);
    });

    // Actual implementation:
    // const formData = new FormData();
    // formData.append('file', file);
    // const response = await api.post('/upload', formData, {
    //   headers: { 'Content-Type': 'multipart/form-data' }
    // });
    // return response.data;
  } catch (error) {
    console.error("Error uploading PDF:", error);
    throw error;
  }
};

/**
 * Fetches real-time weather data.
 * TODO: Integrate weather API endpoint.
 */
export const fetchWeather = async (location) => {
  // Mock weather
  return { temp: '24°C', condition: 'Sunny', humidity: '60%' };
};

export default {
  sendMessage,
  uploadPDF,
  fetchWeather
};
