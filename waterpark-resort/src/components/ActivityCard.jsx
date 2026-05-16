import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';

export default function ActivityCard({ activity, index }) {
  const { toggleActivity, isSelected } = useBooking();
  const selected = isSelected(activity.id);

  const styles = {
    card: {
      background: selected
        ? 'rgba(212,175,55,0.1)'
        : '#1a1a1a',
      borderRadius: '24px',
      padding: '36px 30px',
      boxShadow: selected
        ? '0 8px 40px rgba(0,0,0,0.5), inset 0 0 0 2px rgba(212,175,55,0.4)'
        : '0 4px 24px rgba(0,0,0,0.4)',
      border: selected ? '2px solid rgba(212,175,55,0.5)' : '1px solid rgba(212,175,55,0.15)',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
    },
    shimmer: {
      position: 'absolute',
      top: '-50%',
      left: '-60%',
      width: '50%',
      height: '200%',
      background: 'linear-gradient(105deg, transparent, rgba(212,175,55,0.2), transparent)',
      transform: 'skewX(-20deg)',
    },
    emoji: {
      fontSize: '3rem',
      marginBottom: '16px',
      display: 'block',
    },
    name: {
      fontSize: '1.35rem',
      fontWeight: 800,
      color: '#D4AF37',
      marginBottom: '10px',
      letterSpacing: '-0.3px',
    },
    desc: {
      fontSize: '0.93rem',
      color: 'rgba(255,255,255,0.7)',
      lineHeight: 1.7,
      marginBottom: '20px',
    },
    row: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '24px',
    },
    price: {
      fontSize: '1.7rem',
      fontWeight: 900,
      color: '#D4AF37',
    },
    duration: {
      fontSize: '0.8rem',
      color: '#D4AF37',
      background: 'rgba(212,175,55,0.1)',
      border: '1px solid rgba(212,175,55,0.2)',
      padding: '5px 14px',
      borderRadius: '50px',
      fontWeight: 700,
    },
    btn: {
      width: '100%',
      padding: '14px',
      borderRadius: '14px',
      background: selected
        ? 'linear-gradient(135deg, #D4AF37, #FFD700)'
        : 'rgba(255,255,255,0.05)',
      color: selected ? '#000' : '#D4AF37',
      fontWeight: 800,
      fontSize: '0.95rem',
      border: selected ? 'none' : '1.5px solid rgba(212,175,55,0.4)',
      transition: 'all 0.25s ease',
      letterSpacing: '0.5px',
      cursor: 'pointer',
    },
    selectedBadge: {
      position: 'absolute',
      top: '16px',
      right: '16px',
      background: 'linear-gradient(135deg, #D4AF37, #FFD700)',
      color: '#000',
      fontSize: '0.72rem',
      fontWeight: 800,
      padding: '4px 12px',
      borderRadius: '50px',
      letterSpacing: '1px',
    },
  };

  return (
    <motion.div
      style={styles.card}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{
        y: -8,
        boxShadow: '0 20px 60px rgba(212,175,55,0.2)',
      }}
    >
      {selected && <div style={styles.selectedBadge}>✓ ADDED</div>}

      <span style={styles.emoji}>{activity.emoji}</span>
      <h3 style={styles.name}>{activity.name}</h3>
      <p style={styles.desc}>{activity.description}</p>

      <div style={styles.row}>
        <span style={styles.price}>₹{activity.price.toLocaleString()}</span>
        <span style={styles.duration}>⏱ {activity.duration}</span>
      </div>

      <motion.button
        style={styles.btn}
        onClick={() => toggleActivity(activity)}
        whileTap={{ scale: 0.96 }}
        whileHover={{ opacity: 0.9 }}
      >
        {selected ? '✓ Added to Booking' : '+ Add to Booking'}
      </motion.button>
    </motion.div>
  );
}
