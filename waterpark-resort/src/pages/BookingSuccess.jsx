import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { paymentAPI } from '../services/api';
import { FaWhatsapp, FaHome, FaCheckCircle } from 'react-icons/fa';

export default function BookingSuccess() {
  const [params] = useSearchParams();
  const bookingRef = params.get('ref');
  const bookingId = params.get('bookingId');
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    if (bookingId) {
      paymentAPI.getBookingStatus(bookingId)
        .then(res => setBooking(res.data))
        .catch(() => {});
    }
  }, [bookingId]);

  return (
    <main style={{ minHeight: '100vh', background: '#0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 20px 60px' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{ background: '#fff', borderRadius: '28px', padding: '56px 48px', textAlign: 'center', maxWidth: '560px', width: '100%', boxShadow: '0 30px 80px rgba(0,0,0,0.4)' }}
      >
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}>
          <FaCheckCircle style={{ fontSize: '5rem', color: '#22C55E', marginBottom: '20px' }} />
        </motion.div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#111', marginBottom: '12px' }}>Booking Confirmed! 🎉</h1>

        {bookingRef && (
          <div style={{ background: '#f8f4e8', border: '2px solid #D4AF37', borderRadius: '12px', padding: '16px 24px', marginBottom: '24px' }}>
            <p style={{ color: '#888', fontSize: '13px', margin: '0 0 4px' }}>Your Booking Reference</p>
            <p style={{ fontSize: '1.4rem', fontWeight: 900, color: '#B8860B', margin: 0, letterSpacing: '2px' }}>{bookingRef}</p>
          </div>
        )}

        {booking && (
          <div style={{ background: '#fafafa', borderRadius: '12px', padding: '20px', marginBottom: '24px', textAlign: 'left' }}>
            {[
              ['🏖️ Resort', booking.resortName],
              ['📅 Visit Date', new Date(booking.checkIn).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })],
              ['👥 Guests', `${booking.guestCount} person${booking.guestCount > 1 ? 's' : ''}`],
              ['💳 Advance Paid', `₹${booking.advanceAmount?.toLocaleString('en-IN')}`],
              ['🏨 Pay at Resort', `₹${booking.remainingAmount?.toLocaleString('en-IN')}`],
            ].map(([label, value]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #eee', fontSize: '0.9rem' }}>
                <span style={{ color: '#888' }}>{label}</span>
                <span style={{ fontWeight: 700, color: '#111' }}>{value}</span>
              </div>
            ))}
          </div>
        )}

        <p style={{ color: '#666', fontSize: '0.88rem', marginBottom: '28px' }}>
          A confirmation email has been sent to your registered email. Show the booking reference at the resort entry gate.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <motion.div whileHover={{ scale: 1.04 }}>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', background: 'linear-gradient(135deg, #D4AF37, #FFD700)', color: '#fff', borderRadius: '14px', fontWeight: 700, textDecoration: 'none' }}>
              <FaHome /> Back to Home
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.04 }}>
            <a href="https://wa.me/7721819073" target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', background: '#25D366', color: '#fff', borderRadius: '14px', fontWeight: 700, textDecoration: 'none' }}>
              <FaWhatsapp /> WhatsApp Us
            </a>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}
