import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { resorts, BOOKING_PRICING } from '../data/siteData';
import { FaCheck, FaTimes } from 'react-icons/fa';
import PageHeroBg from '../components/PageHeroBg';

const faqs = [
  { q: 'Are prices per person?', a: 'Yes. All resort prices listed are per person per day. Kids under 8 are priced at ₹350.' },
  { q: 'How much do I pay to book?', a: 'Only ₹50 per person is required as advance payment to confirm your booking. The remaining balance is paid directly at the resort.' },
  { q: 'What is the travel assistance charge?', a: 'Travel assistance is now FREE for groups of 4 or more members. It includes pickup and drop from your location.' },

  { q: 'Are rooms available at the resort?', a: 'Rooms are available at select resorts (DreamWorld, Aqua Palace, Vaity Aqua, Visava, Kshitij) and are subject to availability. Contact us in advance to check.' },
  { q: 'What happens if I cancel?', a: 'Please WhatsApp us at +91 9272395227 for cancellation or rescheduling. Advance amounts are refunded or adjusted as per resort policy.' },
];

export default function Pricing() {
  const S = {
    hero: { position: 'relative', overflow: 'hidden', padding: '160px 60px 80px', textAlign: 'center' },
    badge: { display: 'inline-block', background: 'rgba(255,255,255,0.12)', color: '#F1C40F', padding: '6px 18px', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px' },
    heading: { fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, color: '#fff', letterSpacing: '-1.5px', marginBottom: '16px' },
    sub: { color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 },
    content: { maxWidth: '1100px', margin: '0 auto', padding: '80px 60px 100px' },
    secTitle: { fontSize: '1.8rem', fontWeight: 900, color: '#D4AF37', letterSpacing: '-0.5px', marginBottom: '10px' },
    secSub: { color: 'rgba(255,255,255,0.7)', marginBottom: '40px', fontSize: '0.97rem' },
    table: { width: '100%', borderCollapse: 'separate', borderSpacing: 0, background: '#1a1a1a', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 6px 30px rgba(0,0,0,0.4)', marginBottom: '60px', border: '1px solid rgba(212,175,55,0.15)' },
    th: { background: 'linear-gradient(135deg, #D4AF37, #FFD700)', color: '#fff', padding: '18px 24px', textAlign: 'left', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' },
    td: (even) => ({ padding: '15px 24px', borderBottom: '1px solid rgba(212,175,55,0.1)', background: even ? 'rgba(255,255,255,0.02)' : '#1a1a1a', color: 'rgba(255,255,255,0.7)', fontSize: '0.92rem' }),
    tdBold: (even) => ({ padding: '15px 24px', borderBottom: '1px solid rgba(212,175,55,0.1)', background: even ? 'rgba(255,255,255,0.02)' : '#1a1a1a', color: '#D4AF37', fontWeight: 700, fontSize: '0.95rem' }),
    priceCell: (even) => ({ padding: '15px 24px', borderBottom: '1px solid rgba(212,175,55,0.1)', background: even ? 'rgba(255,255,255,0.02)' : '#1a1a1a', color: '#FFD700', fontWeight: 900, fontSize: '1.1rem' }),
    addonsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px', marginBottom: '60px' },
    addonCard: { background: '#1a1a1a', borderRadius: '20px', padding: '28px', boxShadow: '0 4px 20px rgba(0,0,0,0.4)', border: '1px solid rgba(212,175,55,0.15)', textAlign: 'center' },
    advanceBox: { background: 'linear-gradient(135deg, #D4AF37, #FFD700)', borderRadius: '24px', padding: '48px', marginBottom: '60px', textAlign: 'center', position: 'relative', overflow: 'hidden' },
    faqBox: { background: 'rgba(255,255,255,0.03)', borderRadius: '24px', padding: '50px', border: '1px solid rgba(212,175,55,0.15)' },
  };

  return (
    <main>
      <div style={S.hero} className="page-hero">
        <PageHeroBg />
        <motion.div style={{ position: 'relative', zIndex: 2 }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span style={S.badge}>💎 Pricing</span>
          <h1 style={S.heading}>Honest,<br />Transparent Pricing</h1>
          <p style={S.sub}>No hidden fees. No surprises. Pay only ₹50/person to confirm your booking.</p>
        </motion.div>
      </div>



      <div style={S.content} className="section-pad">
        {/* Advance Payment Highlight */}
        <motion.div style={S.advanceBox} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div style={{ fontSize: '3rem', marginBottom: '12px' }}>💳</div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#fff', marginBottom: '12px' }}>
            Only ₹50/person to Confirm!
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.05rem', maxWidth: '500px', margin: '0 auto 24px', lineHeight: 1.7 }}>
            Book your resort spot with just ₹50 per person as advance. Pay the remaining balance directly at the resort after you arrive.
          </p>
          <div style={{ display: 'inline-flex', gap: '32px', background: 'rgba(255,255,255,0.1)', borderRadius: '16px', padding: '20px 36px', flexWrap: 'wrap' }} className="advance-stats">
            {[
              { label: 'Advance (online)', value: '₹50/person' },
              { label: 'Balance (at resort)', value: 'Remaining' },
              { label: 'No extra charges', value: '0 hidden fees' },
            ].map((item, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: 900, color: '#FFD700', fontSize: '1.3rem' }}>{item.value}</div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.78rem', marginTop: '4px' }}>{item.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Resort Price Table */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 style={S.secTitle}>Resort-wise Pricing</h2>
          <p style={S.secSub}>All prices are per adult per day. Kids (under 8 years): ₹350 flat.</p>
        </motion.div>
        <div className="pricing-table-wrap">
          <motion.table style={S.table} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <thead>
              <tr>
                <th style={S.th}>Resort</th>
                <th style={S.th} className="pricing-hide-mobile">Location</th>
                <th style={S.th}>Adult Price</th>
                <th style={S.th}>Kids (under 8)</th>
                <th style={S.th}>Advance</th>
                <th style={S.th} className="pricing-hide-mobile">Rooms</th>
              </tr>
            </thead>
            <tbody>
              {resorts.map((r, i) => (
                <tr key={r.id}>
                  <td style={S.tdBold(i % 2)}>{r.emoji} {r.name}</td>
                  <td style={S.td(i % 2)} className="pricing-hide-mobile">{r.location}</td>
                  <td style={S.priceCell(i % 2)}>₹{r.price}</td>
                  <td style={{ ...S.td(i % 2), color: '#FFD700', fontWeight: 600 }}>₹350</td>
                  <td style={{ ...S.td(i % 2), color: '#16a34a', fontWeight: 700 }}>₹50/person</td>
                  <td style={S.td(i % 2)} className="pricing-hide-mobile">
                    {r.roomAvailability
                      ? <span style={{ color: '#16a34a', fontWeight: 600, fontSize: '0.82rem' }}>✓ Available*</span>
                      : <span style={{ color: '#dc2626', fontSize: '0.82rem' }}>✗ N/A</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </motion.table>
        </div>
        <p style={{ color: '#90A4B8', fontSize: '0.82rem', marginTop: '-50px', marginBottom: '60px' }}>
          * Rooms are subject to availability. Contact us before booking.
        </p>

        {/* Add-ons */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 style={S.secTitle}>Optional Add-ons</h2>
          <p style={S.secSub}>Enhance your experience with these optional services.</p>
        </motion.div>
        <div style={S.addonsGrid} className="addon-grid">
          {[
            { icon: '🚗', title: 'Travel Assistance', price: 'FREE', note: 'Min 4 members required', color: '#16a34a' },

            { icon: '🍼', title: 'Kids (under 8)', price: '₹350', note: 'Flat rate per child', color: '#D4AF37' },
          ].map((item, i) => (
            <motion.div key={i} style={S.addonCard}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1 }} whileHover={{ y: -6 }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>{item.icon}</div>
              <div style={{ fontWeight: 800, color: item.color, fontSize: '1rem', marginBottom: '6px' }}>{item.title}</div>
              <div style={{ fontWeight: 900, color: '#FFD700', fontSize: '1.8rem', marginBottom: '4px' }}>{item.price}</div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.82rem' }}>{item.note}</div>
            </motion.div>
          ))}
        </div>

        {/* FAQs */}
        <motion.div style={S.faqBox} className="faq-box" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#D4AF37', marginBottom: '30px' }}>Pricing FAQs</h3>
          {faqs.map((f, i) => (
            <div key={i} style={{ borderBottom: '1px solid rgba(212,175,55,0.15)', paddingBottom: '20px', marginBottom: '20px' }}>
              <p style={{ fontWeight: 700, color: '#D4AF37', marginBottom: '8px', fontSize: '0.97rem' }}>Q: {f.q}</p>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.93rem', lineHeight: 1.7 }}>A: {f.a}</p>
            </div>
          ))}
        </motion.div>

        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <Link to="/booking" style={{ display: 'inline-block', padding: '18px 50px', borderRadius: '50px', background: 'linear-gradient(135deg, #D4AF37, #FFD700)', color: '#fff', fontWeight: 800, fontSize: '1.1rem', boxShadow: '0 8px 32px rgba(212,175,55,0.4)' }}>
            Book Now — ₹50 Advance Only
          </Link>
        </div>
      </div>
    </main>
  );
}
