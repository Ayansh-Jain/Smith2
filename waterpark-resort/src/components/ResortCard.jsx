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
      background: '#1a1a1a',
      borderRadius: '24px',
      overflow: 'hidden',
      boxShadow: isActive
        ? '0 0 0 3px #D4AF37, 0 20px 60px rgba(212,175,55,0.35)'
        : '0 4px 24px rgba(0,0,0,0.4)',
      border: isActive ? '2px solid #D4AF37' : '1px solid rgba(212,175,55,0.2)',
      transition: 'all 0.35s ease',
      cursor: 'pointer',
      position: 'relative',
    },
    activeBadge: {
      position: 'absolute', top: '12px', right: '12px', zIndex: 10,
      background: 'linear-gradient(135deg, #D4AF37, #FFD700)', color: '#000',
      padding: '4px 14px', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 800,
      letterSpacing: '1px', textTransform: 'uppercase',
      boxShadow: '0 4px 16px rgba(212,175,55,0.5)',
    },
    imgWrapper: { position: 'relative', overflow: 'hidden', height: '210px' },
    img: { width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' },
    priceTag: {
      position: 'absolute', top: '12px', left: '12px', zIndex: 5,
      background: 'linear-gradient(135deg, #D4AF37, #FFD700)', color: '#000',
      padding: '4px 14px', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 800,
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
    name: { fontWeight: 800, fontSize: '1.2rem', color: '#D4AF37', letterSpacing: '-0.5px' },
    emoji: { fontSize: '1.4rem' },
    location: {
      display: 'flex', alignItems: 'center', gap: '4px',
      color: 'rgba(212,175,55,0.7)', fontSize: '0.82rem', marginBottom: '10px',
    },
    desc: { color: 'rgba(255,255,255,0.8)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '16px' },
    featureRow: {
      display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '18px',
    },
    featurePill: {
      background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)',
      color: '#FFD700', fontSize: '0.73rem', fontWeight: 600,
      padding: '4px 12px', borderRadius: '50px',
    },
    iconRow: {
      display: 'flex', gap: '14px', marginBottom: '18px',
      color: '#D4AF37', fontSize: '0.85rem', alignItems: 'center',
    },
    footer: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', borderTop: '1px solid rgba(212,175,55,0.1)', paddingTop: '15px' },
    priceBlock: {},
    price: { fontWeight: 900, fontSize: '1.6rem', color: '#D4AF37' },
    perPerson: { fontSize: '0.8rem', color: 'rgba(212,175,55,0.6)', marginLeft: '4px' },
    btnRow: { display: 'flex', gap: '10px' },
    btnSelect: {
      padding: '10px 20px', borderRadius: '12px',
      background: isActive
        ? 'linear-gradient(135deg, #D4AF37, #FFD700)'
        : 'rgba(255,255,255,0.05)',
      border: `1.5px solid ${isActive ? '#D4AF37' : 'rgba(212,175,55,0.3)'}`,
      color: isActive ? '#000' : '#D4AF37',
      fontWeight: 800, fontSize: '0.85rem',
      display: 'flex', alignItems: 'center', gap: '6px',
      transition: 'all 0.2s ease',
      cursor: 'pointer',
    },
    btnBook: {
      padding: '10px 20px', borderRadius: '12px',
      background: 'linear-gradient(135deg, #D4AF37, #FFD700)', color: '#000',
      fontWeight: 800, fontSize: '0.85rem',
      boxShadow: '0 4px 16px rgba(212,175,55,0.4)', display: 'inline-block',
      textDecoration: 'none',
      textAlign: 'center',
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
