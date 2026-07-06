import React from 'react';
import { motion } from 'framer-motion';

const TypingAnimation = () => {
  return (
    <div className="flex items-center space-x-1 p-4 glass-card self-start rounded-tl-sm w-16 justify-center">
      <motion.div
        className="w-2 h-2 bg-primary-green rounded-full"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
      />
      <motion.div
        className="w-2 h-2 bg-primary-green rounded-full"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
      />
      <motion.div
        className="w-2 h-2 bg-primary-green rounded-full"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
      />
    </div>
  );
};

export default TypingAnimation;
