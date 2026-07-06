import React from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FiCopy, FiRefreshCw, FiVolume2 } from 'react-icons/fi';
import clsx from 'clsx';

const MessageBubble = ({ message, isAI }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    // Could add toast notification here
  };

  const handleTTS = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(message.text);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={clsx(
        "flex max-w-[85%] w-fit flex-col group",
        isAI ? "self-start" : "self-end"
      )}
    >
      <div 
        className={clsx(
          "px-5 py-3.5 shadow-md",
          isAI 
            ? "glass-card rounded-2xl rounded-tl-sm text-text-main" 
            : "bg-gradient-to-br from-primary-green to-secondary-green text-white rounded-2xl rounded-tr-sm"
        )}
      >
        <div className="prose prose-invert prose-sm max-w-none prose-table:w-full prose-th:px-3 prose-th:py-2 prose-td:px-3 prose-td:py-2">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              table: ({node, ...props}) => <div className="overflow-x-auto"><table className="min-w-full divide-y divide-white/10" {...props} /></div>,
              th: ({node, ...props}) => <th className="px-3 py-2 text-left text-xs font-medium text-text-secondary uppercase tracking-wider bg-white/5" {...props} />,
              td: ({node, ...props}) => <td className="px-3 py-2 whitespace-nowrap text-sm text-text-secondary border-b border-white/5" {...props} />,
            }}
          >
            {message.text}
          </ReactMarkdown>
        </div>
      </div>
      
      {isAI && (
        <div className="flex items-center gap-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity px-2">
          <button onClick={handleCopy} className="p-1.5 text-text-secondary hover:text-text-main rounded-md transition-colors" title="Copy Message">
            <FiCopy size={14} />
          </button>
          <button onClick={handleTTS} className="p-1.5 text-text-secondary hover:text-text-main rounded-md transition-colors" title="Read Aloud">
            <FiVolume2 size={14} />
          </button>
          <button className="p-1.5 text-text-secondary hover:text-text-main rounded-md transition-colors" title="Regenerate">
            <FiRefreshCw size={14} />
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default MessageBubble;
