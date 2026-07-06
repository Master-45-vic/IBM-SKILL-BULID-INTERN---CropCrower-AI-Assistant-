/**
 * Manages the anonymous session ID for a user.
 * We generate a UUID on their first visit and store it in localStorage.
 * This session ID links them to their chat history.
 */

const SESSION_KEY = 'cropgrower_session_id';

export const getSessionId = () => {
  let sessionId = localStorage.getItem(SESSION_KEY);
  
  if (!sessionId) {
    // Generate a new random UUID if one doesn't exist
    sessionId = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, sessionId);
  }
  
  return sessionId;
};
