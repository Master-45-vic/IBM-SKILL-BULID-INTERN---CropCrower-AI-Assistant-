import React from 'react';
import { FiMenu } from 'react-icons/fi';

const TopNavigation = ({ toggleSidebar }) => {
  return (
    <header className="absolute top-0 left-0 h-20 w-full flex items-center px-6 z-10 pointer-events-none">
      <button 
        onClick={toggleSidebar}
        className="p-2.5 rounded-xl bg-dark-card/50 hover:bg-white/10 text-text-main transition-colors backdrop-blur-md border border-white/10 shadow-sm pointer-events-auto"
      >
        <FiMenu size={24} />
      </button>
    </header>
  );
};

export default TopNavigation;
