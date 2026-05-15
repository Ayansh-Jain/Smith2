import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaMapMarkerAlt, FaCheck, FaWifi, FaParking, FaUmbrellaBeach } from 'react-icons/fa';
import { useBooking } from '../context/BookingContext';

export default function ResortCard({ resort, index }) {
  const { selectedResort, setSelectedResort } = useBooking();
  const [imgIdx, setImgIdx] = useState(0);
  const isActive = selectedResort?.id === resort.id;

  const handleSelect = () => {
    setSelectedResort(isActive ? null : resort);
  };

  const styles = {
    card: {
      background: '#fff',
      borderRadius: '24px',
      overflow: 'hidden',
      boxShadow: isActive
        ? '0 0 0 3px #D4AF37, 0 20px 60px rgba(212,175,55,0.35)'
        : '0 4px 24px rgba(0,100,160,0.08)',
      border: isActive ? '2px solid #D4AF37' : '2px solid rgba(212,175,55,0.1)',
      transition: 'all 0.35s ease',
      cursor: 'pointer',
      position: 'relative',
    },
    activeBadge: {
      position: 'absolute', top: '12px', right: '12px', zIndex: 10,
      background: 'linear-gradient(135deg, #D4AF37, #FFD700)', color: '#fff',
      padding: '4px 14px', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 800,
      letterSpacing: '1px', textTransform: 'uppercase',
      boxShadow: '0 4px 16px rgba(212,175,55,0.5)',
    },
    imgWrapper: { position: 'relative', overflow: 'hidden', height: '210px' },
    img: { width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' },
    priceTag: {
      position: 'absolute', top: '12px', left: '12px', zIndex: 5,
      background: 'linear-gradient(135deg, #D4AF37, #FFD700)', color: '#fff',
      padding: '4px 14px', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 700,
    },
    imgDots: {
      position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)',
      display: 'flex', gap: '5px', zIndex: 5,
    },
    imgDot: (active) => ({
      width: active ? '16px' : '6px', height: '6px', borderRadius: '3px',
      background: active ? '#FFD700' : 'rgba(255,255,255,0.5)',
      transition: 'all 0.25s', cursor: 'pointer',
    }),
    body: { padding: '20px' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' },
    name: { fontWeight: 800, fontSize: '1.1rem', color: isActive ? '#FFD700' : '#D4AF37' },
    emoji: { fontSize: '1.4rem' },
    location: {
      display: 'flex', alignItems: 'center', gap: '4px',
      color: '#90A4B8', fontSize: '0.82rem', marginBottom: '8px',
    },
    desc: { color: '#5E7D9E', fontSize: '0.87rem', lineHeight: 1.6, marginBottom: '14px' },
    featureRow: {
      display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px',
    },
    featurePill: {
      background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.2)',
      color: '#D4AF37', fontSize: '0.73rem', fontWeight: 600,
      padding: '3px 10px', borderRadius: '50px',
    },
    iconRow: {
      display: 'flex', gap: '12px', marginBottom: '14px',
      color: '#90A4B8', fontSize: '0.78rem', alignItems: 'center',
    },
    footer: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' },
    priceBlock: {},
    price: { fontWeight: 900, fontSize: '1.5rem', color: '#D4AF37' },
    perPerson: { fontSize: '0.78rem', color: '#90A4B8', marginLeft: '4px' },
    btnRow: { display: 'flex', gap: '8px' },
    btnSelect: {
      padding: '9px 18px', borderRadius: '10px',
      background: isActive
        ? 'linear-gradient(135deg, #D4AF37, #FFD700)'
        : 'rgba(212,175,55,0.1)',
      border: `2px solid ${isActive ? '#D4AF37' : 'rgba(212,175,55,0.3)'}`,
      color: isActive ? '#fff' : '#FFD700',
      fontWeight: 700, fontSize: '0.83rem',
      display: 'flex', alignItems: 'center', gap: '6px',
      transition: 'all 0.2s ease',
    },
    btnBook: {
      padding: '9px 18px', borderRadius: '10px',
      background: 'linear-gradient(135deg, #D4AF37, #FFD700)', color: '#fff',
      fontWeight: 700, fontSize: '0.83rem',
      boxShadow: '0 4px 16px rgba(212,175,55,0.3)', display: 'inline-block',
    },
  };

  return (
    <motion.div
      style={styles.card}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: isActive ? 0 : -6, boxShadow: isActive ? styles.card.boxShadow : '0 16px 50px rgba(212,175,55,0.2)' }}
      onClick={handleSelect}
    >
      {/* Active Badge */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            style={styles.activeBadge}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
          >
            ✓ Selected
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image */}
      <div style={styles.imgWrapper}>
        <AnimatePresence mode="wait">
          <motion.img
            key={imgIdx}
            src={resort.images[imgIdx]}
            alt={resort.name}
            style={styles.img}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onError={e => { e.target.src = `https://picsum.photos/seed/${resort.id}/400/210`; }}
          />
        </AnimatePresence>
        <span style={styles.priceTag}>₹{resort.price}/person</span>
        {resort.images.length > 1 && (
          <div style={styles.imgDots} onClick={e => e.stopPropagation()}>
            {resort.images.slice(0, 4).map((_, i) => (
              <div
                key={i}
                style={styles.imgDot(i === imgIdx)}
                onClick={() => setImgIdx(i)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Body */}
      <div style={styles.body}>
        <div style={styles.header}>
          <h3 style={styles.name}>{resort.name}</h3>
          <span style={styles.emoji}>{resort.emoji}</span>
        </div>
        <div style={styles.location}><FaMapMarkerAlt />{resort.location}</div>
        <p style={styles.desc}>{resort.description.substring(0, 100)}...</p>

        {/* Feature pills */}
        <div style={styles.featureRow}>
          {resort.features.slice(0, 3).map((f, i) => (
            <span key={i} style={styles.featurePill}>{f}</span>
          ))}
          {resort.features.length > 3 && (
            <span style={{ ...styles.featurePill, background: 'rgba(212,175,55,0.08)' }}>
              +{resort.features.length - 3} more
            </span>
          )}
        </div>

        {/* Icons */}
        <div style={styles.iconRow}>
          {resort.wifi && <span title="WiFi Available"><FaWifi /></span>}
          {resort.parking && <span title="Parking Available"><FaParking /></span>}
          {resort.beachAccess && <span title="Beach Access"><FaUmbrellaBeach /></span>}
          {resort.roomAvailability && (
            <span style={{ fontSize: '0.73rem', background: 'rgba(34,197,94,0.1)', color: '#16a34a', padding: '2px 8px', borderRadius: '50px', fontWeight: 600 }}>
              Rooms Available
            </span>
          )}
        </div>

        {/* Footer */}
        <div style={styles.footer} className="resort-card-footer">
          <div style={styles.priceBlock}>
            <span style={styles.price}>₹{resort.price}</span>
            <span style={styles.perPerson}>/person</span>
          </div>
          <div style={styles.btnRow} className="resort-card-btnrow" onClick={e => e.stopPropagation()}>
            <motion.button
              style={styles.btnSelect}
              whileTap={{ scale: 0.95 }}
              onClick={handleSelect}
            >
              {isActive ? <><FaCheck /> Selected</> : 'Select'}
            </motion.button>
            <Link
              to="/booking"
              style={styles.btnBook}
              onClick={() => setSelectedResort(resort)}
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
