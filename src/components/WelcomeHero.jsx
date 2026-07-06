import React from 'react';
import { motion } from 'framer-motion';

const WelcomeHero = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center py-6"
    >
      <h1 className="text-4xl md:text-6xl font-extrabold text-text-main tracking-tight mb-5 drop-shadow-sm">
        Welcome back to <span className="text-gradient">CropGrower AI</span>
      </h1>
      <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto font-light leading-relaxed">
        Your intelligent farming assistant. Analyze soil data, track weather patterns, monitor market prices, and optimize your harvest in one dashboard.
      </p>
    </motion.div>
  );
};

export default WelcomeHero;
