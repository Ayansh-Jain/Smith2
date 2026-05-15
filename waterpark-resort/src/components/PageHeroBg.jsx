import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { resorts } from '../data/siteData';

export default function PageHeroBg() {
  const [imgIdx, setImgIdx] = useState(0);
  
  // Use the first image of each resort for the background slider
  const allImages = resorts.map(r => r.images[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setImgIdx(prev => (prev + 1) % allImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [allImages.length]);

  return (
    <>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
        <AnimatePresence>
          <motion.img
            key={imgIdx}
            src={allImages[imgIdx]}
            alt="Resort background"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </AnimatePresence>
      </div>
      <div style={{ 
        position: 'absolute', inset: 0, zIndex: 1, 
        background: 'linear-gradient(135deg, rgba(5,5,5,0.85) 0%, rgba(0, 0, 0, 0.5) 60%, rgba(0, 0, 0, 0.85) 100%)' 
      }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 3 }}>
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: 'block' }}>
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#0A0A0A" />
        </svg>
      </div>
    </>
  );
}
