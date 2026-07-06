import { useState, useEffect, useCallback } from 'react';
import { getSessionId } from '../utils/session';
import { 
  fetchChats, 
  fetchMessages, 
  createChat, 
  saveMessage, 
  deleteChat, 
  clearAllChats 
} from '../services/chatService';
import { supabase } from '../services/supabase';

export const useChats = () => {
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const sessionId = getSessionId();

  // Load all chats for the session on mount
  useEffect(() => {
    const loadChats = async () => {
      setIsLoading(true);
      if (supabase) {
        const loadedChats = await fetchChats(sessionId);
        setChats(loadedChats);
        
        // Auto-select the most recently updated chat if it exists
        if (loadedChats.length > 0) {
          handleSelectChat(loadedChats[0].id);
        }
      }
      setIsLoading(false);
    };
    
    loadChats();
  }, [sessionId]);

  const handleSelectChat = async (chatId) => {
    setActiveChatId(chatId);
    if (supabase) {
      const loadedMessages = await fetchMessages(chatId);
      setMessages(loadedMessages);
    }
  };

  const handleNewChat = () => {
    setActiveChatId(null);
    setMessages([]);
  };

  const handleDeleteChat = async (chatId) => {
    if (!window.confirm("Are you sure you want to delete this chat?")) return;
    
    if (supabase) {
      await deleteChat(chatId);
      // Remove from state
      setChats(prev => prev.filter(c => c.id !== chatId));
      
      if (activeChatId === chatId) {
        handleNewChat();
      }
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm("Are you sure you want to clear all your chat history? This cannot be undone.")) return;
    
    if (supabase) {
      await clearAllChats(sessionId);
      setChats([]);
      handleNewChat();
    }
  };

  const addMessageToUI = useCallback((message) => {
    setMessages(prev => [...prev, message]);
  }, []);

  const handleSendMessage = async (text, aiApiCall) => {
    let currentChatId = activeChatId;

    if (!supabase) {
      // Fallback for when Supabase is not configured yet
      const userMessage = { text, isAI: false, role: 'user' };
      addMessageToUI(userMessage);
      const aiResponseText = await aiApiCall(text);
      addMessageToUI({ text: aiResponseText, isAI: true, role: 'assistant' });
      return;
    }

    try {
      // 1. If it's a new chat, create it in Supabase first
      if (!currentChatId) {
        // Use first 30 chars of first message as title
        let title = text.slice(0, 30);
        if (text.length > 30) title += '...';
        
        const newChat = await createChat(sessionId, title);
        currentChatId = newChat.id;
        setActiveChatId(currentChatId);
        
        // Add to sidebar
        setChats(prev => [newChat, ...prev]);
      } else {
        // Move chat to top of sidebar
        setChats(prev => {
          const chat = prev.find(c => c.id === currentChatId);
          if (!chat) return prev;
          const others = prev.filter(c => c.id !== currentChatId);
          return [{...chat, updated_at: new Date().toISOString()}, ...others];
        });
      }

      // 2. Save user message to Supabase
      const savedUserMsg = await saveMessage(currentChatId, 'user', text);
      addMessageToUI({ id: savedUserMsg.id, text, isAI: false, role: 'user' });

      // 3. Call AI API
      const aiResponseText = await aiApiCall(text);

      // 4. Save AI response to Supabase
      const savedAiMsg = await saveMessage(currentChatId, 'assistant', aiResponseText);
      addMessageToUI({ id: savedAiMsg.id, text: aiResponseText, isAI: true, role: 'assistant' });

    } catch (error) {
      console.error("Error in chat flow:", error);
      // Even if DB fails, show response in UI if AI succeeded
      // Or show error message
    }
  };

  return {
    chats,
    activeChatId,
    messages,
    isLoading,
    handleSelectChat,
    handleNewChat,
    handleDeleteChat,
    handleClearAll,
    handleSendMessage,
    setMessages
  };
};
