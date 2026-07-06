import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMic, FiSquare, FiPlay } from 'react-icons/fi';

const VoiceRecorder = ({ onTranscription }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState(null);

  const toggleRecording = () => {
    if (isRecording) {
      recognition?.stop();
      setIsRecording(false);
    } else {
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const rec = new SpeechRecognition();
        rec.continuous = false;
        rec.interimResults = false;
        
        rec.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          console.log("Transcription successful:", transcript);
          onTranscription(transcript);
          setIsRecording(false);
        };

        rec.onerror = (event) => {
          console.error("Speech recognition error:", event.error);
          setIsRecording(false);
        };

        rec.onend = () => {
          console.log("Recording ended");
          setIsRecording(false);
        };

        try {
          rec.start();
          setRecognition(rec);
          setIsRecording(true);
        } catch (e) {
          console.error("Failed to start recording:", e);
          setIsRecording(false);
        }
      } else {
        alert("Speech Recognition is not supported in this browser.");
      }
    }
  };

  return (
    <div className="relative flex items-center justify-center">
      <button 
        onClick={toggleRecording}
        className={`w-11 h-11 rounded-[14px] flex items-center justify-center transition-all ${
          isRecording 
            ? 'bg-red-500 text-white animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.5)]' 
            : 'bg-white/5 text-text-secondary hover:text-text-main hover:bg-white/10 backdrop-blur-md border border-white/10 shadow-sm'
        }`}
        title={isRecording ? "Stop Recording" : "Start Voice Input"}
      >
        {isRecording ? <FiSquare size={18} /> : <FiMic size={18} />}
      </button>

      {/* Animated Waveform mock when recording */}
      <AnimatePresence>
        {isRecording && (
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 glass-card px-4 py-2 flex items-center gap-1 rounded-full overflow-hidden"
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 bg-red-500 rounded-full"
                animate={{ height: ['8px', '24px', '8px'] }}
                transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VoiceRecorder;
