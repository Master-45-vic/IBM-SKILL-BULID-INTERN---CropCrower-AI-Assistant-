import React from 'react';
import { motion } from 'framer-motion';
import { FiMap } from 'react-icons/fi';

const SoilCard = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="glass-card p-6 flex flex-col items-center text-center group hover:-translate-y-1 transition-transform duration-300 h-full"
    >
      <div className="w-14 h-14 rounded-full bg-primary-green/10 flex items-center justify-center text-primary-green mb-5 group-hover:scale-110 transition-transform">
        <FiMap size={26} />
      </div>
      <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Soil Analysis</h3>
      <p className="text-3xl font-bold text-text-main">pH 6.5</p>
      <p className="text-sm text-text-secondary mt-3">Moisture: 42% • Nitrogen levels optimal</p>
    </motion.div>
  );
};

export default SoilCard;
