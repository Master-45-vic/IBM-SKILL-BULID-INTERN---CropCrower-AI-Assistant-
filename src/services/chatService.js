import { supabase } from './supabase';

/**
 * Validates if supabase is connected.
 */
const checkSupabase = () => {
  if (!supabase) {
    throw new Error('Supabase is not configured. Please check your environment variables.');
  }
};

/**
 * Fetches all chats for a specific session ID, ordered by recently updated.
 */
export const fetchChats = async (sessionId) => {
  checkSupabase();
  const { data, error } = await supabase
    .from('chats')
    .select('*')
    .eq('session_id', sessionId)
    .order('updated_at', { ascending: false });

  if (error) {
    console.error('Error fetching chats:', error);
    return [];
  }
  return data;
};

/**
 * Fetches all messages for a specific chat ID, ordered by creation time.
 */
export const fetchMessages = async (chatId) => {
  checkSupabase();
  if (!chatId) return [];
  
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('chat_id', chatId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
  
  // Transform data format to match the frontend expects: { text, isAI }
  return data.map(msg => ({
    id: msg.id,
    text: msg.content,
    isAI: msg.role === 'assistant',
    role: msg.role
  }));
};

/**
 * Creates a new chat session.
 */
export const createChat = async (sessionId, title = 'New Chat') => {
  checkSupabase();
  const { data, error } = await supabase
    .from('chats')
    .insert([{ session_id: sessionId, title }])
    .select()
    .single();

  if (error) {
    console.error('Error creating chat:', error);
    throw error;
  }
  return data;
};

/**
 * Saves a message to a chat.
 */
export const saveMessage = async (chatId, role, content) => {
  checkSupabase();
  const { data, error } = await supabase
    .from('messages')
    .insert([{ chat_id: chatId, role, content }])
    .select()
    .single();

  if (error) {
    console.error('Error saving message:', error);
    throw error;
  }

  // Update the chat's updated_at timestamp so it jumps to top
  await updateChatTimestamp(chatId);

  return data;
};

/**
 * Updates the updated_at timestamp and optionally the title for a chat.
 */
export const updateChat = async (chatId, updates) => {
  checkSupabase();
  updates.updated_at = new Date().toISOString();
  
  const { error } = await supabase
    .from('chats')
    .update(updates)
    .eq('id', chatId);

  if (error) {
    console.error('Error updating chat:', error);
  }
};

/**
 * Updates just the updated_at timestamp.
 */
export const updateChatTimestamp = async (chatId) => {
  return updateChat(chatId, {});
};

/**
 * Deletes a chat and its messages (due to cascade).
 */
export const deleteChat = async (chatId) => {
  checkSupabase();
  const { error } = await supabase
    .from('chats')
    .delete()
    .eq('id', chatId);

  if (error) {
    console.error('Error deleting chat:', error);
    throw error;
  }
};

/**
 * Deletes all chats for a specific session.
 */
export const clearAllChats = async (sessionId) => {
  checkSupabase();
  const { error } = await supabase
    .from('chats')
    .delete()
    .eq('session_id', sessionId);

  if (error) {
    console.error('Error clearing all chats:', error);
    throw error;
  }
};
