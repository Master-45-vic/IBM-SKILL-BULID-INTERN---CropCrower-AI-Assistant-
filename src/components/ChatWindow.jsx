import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import TypingAnimation from './TypingAnimation';

const ChatWindow = ({ messages, isTyping = false }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col gap-6 p-2 h-full overflow-y-auto">
      {messages.map((msg, index) => (
        <MessageBubble key={index} message={msg} isAI={msg.isAI} />
      ))}
      
      {isTyping && <TypingAnimation />}
      
      <div ref={bottomRef} className="h-4" />
    </div>
  );
};

export default ChatWindow;
