import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaTimesCircle, FaHome, FaWhatsapp, FaRedo } from 'react-icons/fa';

export default function BookingFailed() {
  const [params] = useSearchParams();
  const bookingId = params.get('bookingId');

  return (
    <main style={{ minHeight: '100vh', background: '#0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 20px 60px' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{ background: '#1a1a1a', borderRadius: '28px', padding: '56px 48px', textAlign: 'center', maxWidth: '520px', width: '100%', boxShadow: '0 30px 80px rgba(0,0,0,0.5)', border: '1px solid rgba(212,175,55,0.15)' }}
      >
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}>
          <FaTimesCircle style={{ fontSize: '5rem', color: '#EF4444', marginBottom: '20px' }} />
        </motion.div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#D4AF37', marginBottom: '12px' }}>Payment Failed</h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', marginBottom: '8px', lineHeight: 1.7 }}>
          Unfortunately your payment could not be processed. No money has been deducted from your account.
        </p>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', marginBottom: '32px' }}>
          If money was debited, it will be automatically refunded within 5–7 business days. Contact us for faster resolution.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <motion.div whileHover={{ scale: 1.04 }}>
            <Link to="/booking" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', background: 'linear-gradient(135deg, #D4AF37, #FFD700)', color: '#000', borderRadius: '14px', fontWeight: 700, textDecoration: 'none' }}>
              <FaRedo /> Try Again
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.04 }}>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', background: '#111', color: '#fff', borderRadius: '14px', fontWeight: 700, textDecoration: 'none' }}>
              <FaHome /> Home
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.04 }}>
            <a href="https://wa.me/9272395227" target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', background: '#25D366', color: '#fff', borderRadius: '14px', fontWeight: 700, textDecoration: 'none' }}>
              <FaWhatsapp /> Contact Support
            </a>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}
