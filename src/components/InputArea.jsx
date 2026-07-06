import React, { useState } from 'react';
import { FiSend } from 'react-icons/fi';
import VoiceRecorder from './VoiceRecorder';
import PDFUploadComponent from './PDFUploadComponent';
import { sendMessage } from '../services/api';

const InputArea = ({ onSend, isChatEmpty, setMessages, setIsTyping }) => {
  const [input, setInput] = useState('');
  const [pdfContext, setPdfContext] = useState(null);

  const handleSend = async (text = input) => {
    if (!text.trim()) return;

    setInput('');
    // Call the parent's onSend which handles all the DB logic
    if (onSend) {
      await onSend(text, pdfContext);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleUploadSuccess = (filename) => {
    setPdfContext(filename);
    setMessages(prev => [...prev, { text: `Uploaded document: **${filename}**. I will use this as context for our conversation.`, isAI: true }]);
  };

  const handleTranscription = (text) => {
    setInput(text);
    // Auto-send after voice recognition as requested
    handleSend(text);
  };

  const handlePromptSelect = (prompt) => {
    handleSend(prompt);
  };

  return (
    <div className="flex flex-col relative w-full items-center">
      <div className="relative flex items-center gap-3 bg-dark-card/80 backdrop-blur-2xl border border-white/10 rounded-[20px] p-2 shadow-2xl w-full max-w-3xl transition-all focus-within:shadow-[0_8px_30px_rgb(34,197,94,0.2)] focus-within:border-primary-green/50">
        
        <div className="flex items-center gap-1 pl-2">
          <PDFUploadComponent onUploadSuccess={handleUploadSuccess} />
          <VoiceRecorder onTranscription={handleTranscription} />
        </div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask CropGrower AI..."
          className="flex-1 max-h-32 min-h-[44px] bg-transparent resize-none outline-none text-text-main placeholder-text-secondary py-3 px-2 text-[15px] leading-relaxed self-center"
          rows={1}
        />

        <button 
          onClick={() => handleSend()}
          disabled={!input.trim()}
          className="w-11 h-11 rounded-[14px] flex items-center justify-center bg-gradient-to-r from-primary-green to-secondary-green text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-primary-green/30 transition-all hover:-translate-y-0.5 active:translate-y-0 flex-shrink-0 mr-1"
        >
          <FiSend size={18} />
        </button>
      </div>
    </div>
  );
};

export default InputArea;
