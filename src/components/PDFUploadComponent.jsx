import React, { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUploadCloud, FiFileText, FiX, FiCheckCircle } from 'react-icons/fi';
import { uploadPDF } from '../services/api';

const PDFUploadComponent = ({ onUploadSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === 'application/pdf') {
        handleFileUpload(droppedFile);
      } else {
        alert("Please upload a PDF file.");
      }
    }
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleFileUpload = async (selectedFile) => {
    setFile(selectedFile);
    setIsUploading(true);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return prev;
        }
        return prev + 10;
      });
    }, 200);

    try {
      const res = await uploadPDF(selectedFile);
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => {
        setIsUploading(false);
        setIsOpen(false);
        onUploadSuccess(res.filename);
        setFile(null);
        setProgress(0);
      }, 800);
    } catch (err) {
      console.error(err);
      setIsUploading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="w-11 h-11 flex items-center justify-center rounded-[14px] bg-white/5 text-text-secondary hover:text-text-main hover:bg-white/10 backdrop-blur-md border border-white/10 transition-all shadow-sm"
        title="Upload PDF Document"
      >
        <FiUploadCloud size={18} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-16 left-0 glass-card p-4 w-72 z-50 flex flex-col shadow-2xl"
          >
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-sm font-semibold text-text-main">Upload PDF Context</h4>
              <button onClick={() => !isUploading && setIsOpen(false)} className="text-text-secondary hover:text-text-main transition-colors">
                <FiX size={16} />
              </button>
            </div>

            {!file ? (
              <div 
                className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center transition-colors cursor-pointer ${
                  isDragging ? 'border-primary-green bg-primary-green/10' : 'border-white/20 hover:border-primary-green/50 hover:bg-white/5'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => document.getElementById('pdf-upload').click()}
              >
                <FiFileText size={32} className="text-text-secondary mb-2" />
                <p className="text-xs text-text-secondary">Drag & drop your PDF or click to browse</p>
                <input type="file" id="pdf-upload" accept=".pdf" className="hidden" onChange={handleFileChange} />
              </div>
            ) : (
              <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <FiFileText className="text-primary-green" size={20} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-text-main truncate font-medium">{file.name}</p>
                    <p className="text-xs text-text-secondary">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  {progress === 100 && <FiCheckCircle className="text-primary-green" />}
                </div>
                
                {isUploading && (
                  <div className="w-full bg-white/10 rounded-full h-1.5 mt-2 overflow-hidden">
                    <motion.div 
                      className="bg-primary-green h-1.5 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                    />
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PDFUploadComponent;
