import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import BookingForm from '../components/BookingForm';
import { useBooking } from '../context/BookingContext';

export default function Booking() {
  const { selectedResort } = useBooking();
  const [currentImg, setCurrentImg] = useState(0);

  const images = selectedResort?.images || [];

  useEffect(() => {
    if (!images.length) return;
    const id = setInterval(() => {
      setCurrentImg(p => (p + 1) % images.length);
    }, 4000);
    return () => clearInterval(id);
  }, [images]);

  useEffect(() => { setCurrentImg(0); }, [selectedResort]);

  const styles = {
    hero: { position: 'relative', minHeight: '340px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
    bg: { position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #050505 0%, #D4AF37 60%, #FFD700 100%)' },
    bgImg: { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' },
    overlay: { position: 'absolute', inset: 0, background: 'rgba(5,5,5,0.7)' },
    content: { position: 'relative', zIndex: 2, textAlign: 'center', padding: '160px 60px 80px' },
    badge: { display: 'inline-block', background: 'rgba(255,255,255,0.12)', color: '#F1C40F', padding: '6px 18px', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px' },
    heading: { fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 900, color: '#fff', letterSpacing: '-1.5px', marginBottom: '16px' },
    sub: { color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 },
    main: { background: '#0A0A0A', minHeight: '100px' },
    content2: { maxWidth: '1300px', margin: '0 auto', padding: '80px 60px 100px' },
  };

  return (
    <main>
      <div style={styles.hero}>
        {/* Background */}
        <div style={styles.bg} />
        {images.length > 0 && (
          <AnimatePresence mode="crossfade">
            <motion.img
              key={`${selectedResort?.id}-${currentImg}`}
              src={images[currentImg]}
              alt=""
              style={styles.bgImg}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              onError={e => { e.target.style.display = 'none'; }}
            />
          </AnimatePresence>
        )}
        <div style={styles.overlay} />
        <div style={styles.content}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span style={styles.badge}>📋 Book Your Visit</span>
            <h1 style={styles.heading}>
              {selectedResort ? `Book ${selectedResort.name}` : 'Reserve Your Resort Experience'}
            </h1>
            <p style={styles.sub}>
              {selectedResort
                ? `${selectedResort.shortDesc} — Only ₹50/person advance to confirm!`
                : 'Select a resort, fill in your details, and pay only ₹50 per person to confirm. Balance at resort.'}
            </p>
          </motion.div>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 3 }}>
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: 'block' }}>
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#0A0A0A" />
          </svg>
        </div>
      </div>



      <div style={styles.content2}>
        <BookingForm />
      </div>
    </main>
  );
}
