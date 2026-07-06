import React from 'react';
import { motion } from 'framer-motion';
import { FiTrendingUp } from 'react-icons/fi';

const MarketCard = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="glass-card p-6 flex flex-col items-center text-center group hover:-translate-y-1 transition-transform duration-300 h-full"
    >
      <div className="w-14 h-14 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400 mb-5 group-hover:scale-110 transition-transform">
        <FiTrendingUp size={26} />
      </div>
      <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Wheat Market</h3>
      <p className="text-3xl font-bold text-text-main">$6.80 <span className="text-sm font-normal text-green-400 ml-1">+1.2%</span></p>
      <p className="text-sm text-text-secondary mt-3">Per Bushel • Strong demand projected</p>
    </motion.div>
  );
};

export default MarketCard;
