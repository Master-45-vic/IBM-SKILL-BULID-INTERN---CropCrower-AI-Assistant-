import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiMessageSquare, FiPlus, FiSettings, FiMap, FiHome, FiTrendingUp, FiCloudRain, FiTrash2 } from 'react-icons/fi';
import clsx from 'clsx';

const Sidebar = ({ isOpen, toggleSidebar, chats, activeChatId, onSelectChat, onNewChat, onDeleteChat, onClearAll }) => {
  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-20 md:hidden"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Content */}
      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : '-100%' }}
        className="fixed z-30 w-72 h-full glass-panel flex flex-col transition-transform duration-300"
      >
        <div className="p-5 flex items-center justify-between border-b border-white/10">
          <h1 className="text-xl font-bold text-gradient flex items-center gap-2">
            🌱 CropGrower AI
          </h1>
          <button onClick={toggleSidebar} className="p-2 rounded-lg hover:bg-white/10 text-text-secondary hover:text-text-main transition-colors">
            <FiX size={20} />
          </button>
        </div>

        <div className="p-5">
          <button 
            onClick={onNewChat}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-primary-green hover:bg-secondary-green text-white rounded-xl shadow-[0_4px_14px_0_rgba(34,197,94,0.39)] transition-all duration-200 font-semibold hover:-translate-y-0.5 active:translate-y-0"
          >
            <FiPlus size={20} />
            New Chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-2 flex flex-col">
          <h2 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-4">Recent History</h2>
          
          <div className="space-y-2 flex-1">
            {chats && chats.length > 0 ? (
              chats.map((chat) => (
                <div 
                  key={chat.id} 
                  className={clsx(
                    "w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer",
                    activeChatId === chat.id ? "bg-white/10" : ""
                  )}
                  onClick={() => onSelectChat(chat.id)}
                >
                  <div className="flex items-center gap-3 overflow-hidden flex-1">
                    <FiMessageSquare size={16} className={clsx(
                      "flex-shrink-0",
                      activeChatId === chat.id ? "text-primary-green" : "text-text-secondary"
                    )} />
                    <span className={clsx(
                      "truncate text-sm",
                      activeChatId === chat.id ? "text-text-main font-medium" : "text-text-secondary"
                    )}>{chat.title}</span>
                  </div>
                  
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteChat(chat.id);
                    }}
                    className="p-1.5 text-text-secondary/50 hover:text-red-400 hover:bg-red-400/10 rounded-md opacity-0 group-hover:opacity-100 transition-all flex-shrink-0"
                    title="Delete Chat"
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-sm text-text-secondary italic text-center mt-4">No recent chats</p>
            )}
          </div>
          
          {chats && chats.length > 0 && (
            <button 
              onClick={onClearAll}
              className="mt-6 w-full py-2 text-xs font-medium text-text-secondary hover:text-red-400 border border-transparent hover:border-red-400/30 rounded-lg transition-colors"
            >
              Clear All Chats
            </button>
          )}
        </div>


      </motion.aside>
    </>
  );
};

export default Sidebar;
