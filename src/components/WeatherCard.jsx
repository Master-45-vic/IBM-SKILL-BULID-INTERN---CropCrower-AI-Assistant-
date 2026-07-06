import React from 'react';
import { motion } from 'framer-motion';
import { FiCloudRain } from 'react-icons/fi';

const WeatherCard = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="glass-card p-6 flex flex-col items-center text-center group hover:-translate-y-1 transition-transform duration-300 h-full"
    >
      <div className="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 mb-5 group-hover:scale-110 transition-transform">
        <FiCloudRain size={26} />
      </div>
      <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Local Weather</h3>
      <p className="text-3xl font-bold text-text-main">24°C</p>
      <p className="text-sm text-text-secondary mt-3">60% Humidity • Light Rain expected in 2h</p>
    </motion.div>
  );
};

export default WeatherCard;
