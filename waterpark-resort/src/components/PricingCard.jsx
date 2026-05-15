import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';

export default function PricingCard({ pkg, index }) {
  const isPopular = pkg.badge === 'Most Popular';

  const styles = {
    wrapper: {
      position: 'relative',
    },
    popularBadge: {
      position: 'absolute',
      top: '-16px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'linear-gradient(135deg, #D4AF37, #FFD700)',
      color: '#fff',
      padding: '6px 20px',
      borderRadius: '50px',
      fontSize: '0.8rem',
      fontWeight: 700,
      letterSpacing: '1.5px',
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
      zIndex: 1,
    },
    card: {
      background: isPopular
        ? 'linear-gradient(160deg, #FFD700, #D4AF37)'
        : '#fff',
      borderRadius: '28px',
      padding: isPopular ? '50px 36px 44px' : '44px 36px',
      boxShadow: isPopular
        ? '0 20px 70px rgba(255,215,0,0.4)'
        : '0 6px 30px rgba(0,100,160,0.08)',
      border: isPopular ? '2px solid rgba(255,215,0,0.4)' : '2px solid rgba(212,175,55,0.1)',
      color: isPopular ? '#fff' : '#D4AF37',
      height: '100%',
    },
    name: {
      fontSize: '0.85rem',
      fontWeight: 700,
      letterSpacing: '2px',
      textTransform: 'uppercase',
      color: isPopular ? '#F1C40F' : '#D4AF37',
      marginBottom: '16px',
    },
    price: {
      fontSize: '3.2rem',
      fontWeight: 900,
      lineHeight: 1,
      marginBottom: '6px',
      letterSpacing: '-1px',
    },
    perPerson: {
      fontSize: '0.88rem',
      color: isPopular ? 'rgba(255,255,255,0.55)' : '#90A4B8',
      marginBottom: '32px',
    },
    divider: {
      borderColor: isPopular ? 'rgba(255,255,255,0.15)' : 'rgba(212,175,55,0.15)',
      marginBottom: '28px',
    },
    includeTitle: {
      fontSize: '0.82rem',
      fontWeight: 700,
      letterSpacing: '1px',
      textTransform: 'uppercase',
      color: isPopular ? 'rgba(255,255,255,0.5)' : '#90A4B8',
      marginBottom: '18px',
    },
    list: {
      listStyle: 'none',
      display: 'flex',
      flexDirection: 'column',
      gap: '14px',
      marginBottom: '36px',
    },
    listItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      fontSize: '0.95rem',
      fontWeight: 500,
    },
    checkIcon: {
      width: '22px',
      height: '22px',
      borderRadius: '50%',
      background: isPopular ? 'rgba(255,215,0,0.25)' : 'rgba(212,175,55,0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: isPopular ? '#FFD700' : '#D4AF37',
      flexShrink: 0,
      fontSize: '0.65rem',
    },
    btn: {
      display: 'block',
      width: '100%',
      padding: '15px',
      borderRadius: '14px',
      textAlign: 'center',
      fontWeight: 700,
      fontSize: '1rem',
      background: isPopular
        ? 'linear-gradient(135deg, #FFD700, #D4AF37)'
        : 'linear-gradient(135deg, #D4AF37, #FFD700)',
      color: '#fff',
      boxShadow: isPopular
        ? '0 8px 32px rgba(255,215,0,0.4)'
        : '0 6px 24px rgba(212,175,55,0.3)',
      transition: 'all 0.25s ease',
    },
  };

  return (
    <motion.div
      style={styles.wrapper}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      whileHover={{ y: -8 }}
    >
      {isPopular && <div style={styles.popularBadge}>⭐ Most Popular</div>}
      <div style={styles.card}>
        <p style={styles.name}>{pkg.name}</p>
        <div style={styles.price}>₹{pkg.price.toLocaleString()}</div>
        <p style={styles.perPerson}>per person · all inclusive</p>

        <hr style={styles.divider} />

        <p style={styles.includeTitle}>What's Included</p>
        <ul style={styles.list}>
          {pkg.includes.map((item, i) => (
            <li key={i} style={styles.listItem}>
              <div style={styles.checkIcon}><FaCheck /></div>
              {item}
            </li>
          ))}
        </ul>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
          <Link to="/booking" style={styles.btn}>
            Choose {pkg.name} →
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
