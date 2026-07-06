import React from 'react';
import { motion } from 'framer-motion';

const QuickPromptChips = ({ onSelectPrompt }) => {
  const prompts = [
    "What are today's mandi prices for tomatoes, onions, or other crops?",
    "What is today's weather forecast, and how will it affect my crops?",
    "What fertilizers and irrigation schedule do you recommend for my crop?",
    "Which crop is best to grow in my region this season?",
    "How can I identify and control pests affecting my crop?"
  ];

  return (
    <div className="flex flex-wrap gap-3 mb-2 justify-center">
      {prompts.map((prompt, index) => (
        <motion.button
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => onSelectPrompt(prompt)}
          className="text-xs md:text-sm py-2 px-5 bg-white/5 hover:bg-white/10 border border-primary-green/30 rounded-full text-text-secondary hover:text-text-main transition-colors shadow-sm backdrop-blur-md"
        >
          {prompt}
        </motion.button>
      ))}
    </div>
  );
};

export default QuickPromptChips;
