import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCheck } from 'react-icons/fi';

const SettingsDrawer = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-sm glass-panel z-50 p-6 flex flex-col"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-text-main">Settings</h2>
              <button 
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-white/10 text-text-secondary transition-colors"
              >
                <FiX size={24} />
              </button>
            </div>

            <div className="space-y-6 flex-1 overflow-y-auto pr-2">
              <div className="space-y-3">
                <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider">AI Voice</h3>
                <div className="flex items-center justify-between p-4 glass-card border-none bg-white/5 hover:bg-white/10 transition-colors">
                  <span className="text-text-main font-medium">Text-to-Speech</span>
                  <div className="w-12 h-6 bg-primary-green rounded-full relative cursor-pointer shadow-inner">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Model Selection</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-4 glass-card border border-primary-green/50 bg-primary-green/10 cursor-pointer">
                    <span className="text-primary-green font-medium">CropGrower Pro</span>
                    <FiCheck className="text-primary-green" />
                  </div>
                  <div className="flex items-center justify-between p-4 glass-card border-none bg-white/5 cursor-pointer hover:bg-white/10 transition-colors">
                    <span className="text-text-secondary font-medium">CropGrower Fast</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-auto pt-6 border-t border-white/10">
               <button className="w-full py-3.5 rounded-xl bg-white/5 text-text-main font-semibold hover:bg-white/10 transition-colors">
                  Clear Chat History
               </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SettingsDrawer;
