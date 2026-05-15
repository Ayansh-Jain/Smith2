import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import ResortCard from '../components/ResortCard';
import { resorts, brand } from '../data/siteData';
import { useBooking } from '../context/BookingContext';
import {
  FaStar, FaShieldAlt, FaLeaf, FaHeadset,
  FaAward, FaUsers, FaWhatsapp, FaCheck, FaTimes,
  FaWifi, FaParking, FaUmbrellaBeach, FaSwimmer,
} from 'react-icons/fa';

const whyUs = [
  { icon: FaShieldAlt, title: 'Verified Resorts', desc: 'All resorts are verified with safety certifications and international standards.' },
  { icon: FaLeaf, title: 'Easy Booking', desc: 'Book your resort in under 2 minutes. Simple, fast, no hidden charges.' },
  { icon: FaHeadset, title: '24/7 Support', desc: 'WhatsApp us anytime. Our team is always available to assist you.' },
  { icon: FaAward, title: 'Best Prices', desc: 'Guaranteed best prices in Virar West starting at just ₹525/person.' },
  { icon: FaUsers, title: 'Group Friendly', desc: 'Travel assistance for groups of 4+. Pickup & drop now absolutely FREE.' },
  { icon: FaStar, title: 'Rated 4.9★', desc: 'Thousands of happy guests have rated us as the #1 resort booking platform.' },
];

export default function Home() {
  const { selectedResort } = useBooking();

  const styles = {
    section: { padding: '100px 60px', maxWidth: '1300px', margin: '0 auto' },
    sectionWhite: { padding: '100px 60px', background: 'rgba(212,175,55,0.03)' },
    sectionInner: { maxWidth: '1300px', margin: '0 auto' },
    badge: {
      display: 'inline-block', background: 'rgba(212,175,55,0.1)', color: '#D4AF37',
      padding: '6px 18px', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 700,
      letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px',
    },
    title: { fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#D4AF37', letterSpacing: '-1px', lineHeight: 1.1, marginBottom: '16px' },
    sub: { color: '#5E7D9E', fontSize: '1.05rem', maxWidth: '560px', lineHeight: 1.7, marginBottom: '60px' },
    grid3: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '28px' },
    whyGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' },
    whyCard: {
      padding: '32px 28px', borderRadius: '20px',
      background: 'linear-gradient(135deg, #f0f9ff, #e0f2ff)',
      border: '1px solid rgba(212,175,55,0.12)',
    },
    whyIcon: {
      width: '52px', height: '52px', borderRadius: '14px',
      background: 'linear-gradient(135deg, #D4AF37, #FFD700)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontSize: '1.3rem', marginBottom: '20px',
      boxShadow: '0 6px 20px rgba(212,175,55,0.3)',
    },
    ctaBanner: {
      background: 'linear-gradient(135deg, #D4AF37, #FFD700)',
      borderRadius: '32px', padding: '80px 60px', textAlign: 'center',
      margin: '0 60px 100px', position: 'relative', overflow: 'hidden',
    },
    // Pricing comparison table
    pricingTable: {
      background: '#fff', borderRadius: '24px', overflow: 'hidden',
      boxShadow: '0 8px 40px rgba(0,100,160,0.08)', border: '1px solid rgba(212,175,55,0.1)',
    },
    pricingHeader: {
      background: 'linear-gradient(135deg, #D4AF37, #FFD700)',
      padding: '20px 32px', display: 'grid',
      gridTemplateColumns: '1fr 120px 120px',
      gap: '16px', color: '#fff', fontWeight: 700, fontSize: '0.9rem',
    },
    pricingRow: (alt) => ({
      padding: '16px 32px', display: 'grid',
      gridTemplateColumns: '1fr 120px 120px',
      gap: '16px', alignItems: 'center',
      background: alt ? 'rgba(212,175,55,0.04)' : '#fff',
      borderBottom: '1px solid rgba(212,175,55,0.08)',
    }),
    // Reviews carousel
    reviewCard: {
      background: '#fff', borderRadius: '20px', padding: '28px',
      boxShadow: '0 6px 30px rgba(0,100,160,0.07)', border: '1px solid rgba(212,175,55,0.1)',
    },
    stars: { display: 'flex', gap: '4px', color: '#FFB800', fontSize: '0.9rem', marginBottom: '12px' },
  };

  // Flatten all reviews from all resorts
  const allReviews = resorts.flatMap(r =>
    r.reviews.map(rev => ({ ...rev, resort: r.name, emoji: r.emoji }))
  ).slice(0, 6);

  // Current resort details for details section
  const displayResort = selectedResort || resorts[0];

  return (
    <main>
      <Hero />

      {/* Resort Cards */}
      <section style={styles.section} className="section-pad">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span style={styles.badge}>🏖️ Top Pick Resorts</span>
          <h2 style={styles.title}>Creating Memories,<br />One Adventure at a Time</h2>
          <p style={styles.sub}>Hand-picked premium water parks in Virar West. Click a resort to see its details and images.</p>
        </motion.div>
        <div style={{ ...styles.grid3, gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }} className="grid-3">
          {resorts.map((r, i) => <ResortCard key={r.id} resort={r} index={i} />)}
        </div>
      </section>

      {/* Pricing Table */}
      {/* <section style={styles.sectionWhite} className="section-pad">
        <div style={styles.sectionInner} className="section-pad-inner">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span style={styles.badge}>💰 Pricing</span>
            <h2 style={styles.title}>Simple,<br />Transparent Pricing</h2>
            <p style={styles.sub}>No hidden charges. Pay only ₹50/person to confirm your booking.</p>
          </motion.div>

          <motion.div style={styles.pricingTable} className="pricing-table-wrap" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div style={{ ...styles.pricingHeader, minWidth: '500px' }}>
              <span>Resort</span>
              <span style={{ textAlign: 'center' }}>Price/Adult</span>
              <span style={{ textAlign: 'center' }}>Advance</span>
            </div>
            {resorts.map((r, i) => (
              <div key={r.id} style={{ ...styles.pricingRow(i % 2), minWidth: '500px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '1.2rem' }}>{r.emoji}</span>
                  <div>
                    <div style={{ fontWeight: 700, color: '#D4AF37', fontSize: '0.95rem' }}>{r.name}</div>
                    <div style={{ color: '#90A4B8', fontSize: '0.78rem' }}>Kids (under 8): ₹350</div>
                  </div>
                </div>
                <div style={{ textAlign: 'center', fontWeight: 900, color: '#D4AF37', fontSize: '1.1rem' }}>₹{r.price}</div>
                <div style={{ textAlign: 'center', fontWeight: 700, color: '#5E7D9E', fontSize: '0.95rem' }}>₹50/person</div>
              </div>
            ))}
            <div style={{ padding: '16px 32px', background: 'rgba(212,175,55,0.06)', display: 'flex', gap: '24px', flexWrap: 'wrap', fontSize: '0.83rem', color: '#5E7D9E' }} className="pricing-footer-pills">
              <span>🚗 Travel Assistance: FREE (min 4 members)</span>

              <span>🍼 Kids (under 8): ₹350</span>
            </div>
          </motion.div>

          <div style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: '16px', padding: '20px 28px', marginTop: '24px', display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
            <span style={{ fontSize: '1.5rem' }}>💳</span>
            <div>
              <div style={{ fontWeight: 800, color: '#15803d', fontSize: '1rem', marginBottom: '4px' }}>Only ₹50/person advance to confirm booking!</div>
              <div style={{ color: '#5E7D9E', fontSize: '0.88rem' }}>Remaining balance is paid directly at the resort after you arrive. No stress, no full payment upfront.</div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Reviews */}
      <section style={styles.section} className="section-pad">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span style={styles.badge}>💬 Reviews</span>
          <h2 style={styles.title}>What Our Guests<br />Are Saying</h2>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }} className="review-grid">
          {allReviews.map((t, i) => (
            <motion.div key={i} style={styles.reviewCard}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }} whileHover={{ y: -6 }}>
              <div style={styles.stars}>{[...Array(t.rating)].map((_, j) => <FaStar key={j} />)}</div>
              <p style={{ color: '#5E7D9E', lineHeight: 1.8, fontSize: '0.95rem', marginBottom: '20px', fontStyle: 'italic' }}>
                "{t.comment}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'linear-gradient(135deg, #1A1A1A, #D4AF37)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', overflow: 'hidden' }}>
                  {t.avatar.startsWith('http') ? (
                    <img src={t.avatar} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : t.avatar}
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: '#D4AF37', fontSize: '0.95rem' }}>{t.name}</div>
                  <div style={{ color: '#90A4B8', fontSize: '0.78rem' }}>{t.emoji} {t.resort}</div>
                </div>
                <div style={{ marginLeft: 'auto', background: 'rgba(34,197,94,0.1)', color: '#16a34a', fontSize: '0.7rem', fontWeight: 700, padding: '3px 10px', borderRadius: '50px' }}>
                  ✓ Verified
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Us */}
      <section style={styles.sectionWhite} className="section-pad">
        <div style={styles.sectionInner} className="section-pad-inner">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span style={styles.badge}>✦ Why Us</span>
            <h2 style={styles.title}>Why Choose<br />Book My Resorts?</h2>
          </motion.div>
          <div style={styles.whyGrid} className="why-grid">
            {whyUs.map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={i} style={styles.whyCard}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }} whileHover={{ y: -6 }}>
                <div style={styles.whyIcon}><Icon /></div>
                <h3 style={{ fontWeight: 800, color: '#D4AF37', fontSize: '1.05rem', marginBottom: '10px' }}>{title}</h3>
                <p style={{ color: '#5E7D9E', fontSize: '0.9rem', lineHeight: 1.7 }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <motion.div style={styles.ctaBanner} className="cta-banner" initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 900, color: '#fff', marginBottom: '16px', letterSpacing: '-1px' }}>
          Ready for Your Next<br />Resort Adventure?
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', marginBottom: '40px' }}>
          Starting at ₹525/person. Only ₹50 advance to confirm. Limited slots available!
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Link to="/booking" style={{ display: 'inline-block', padding: '18px 50px', borderRadius: '50px', background: 'linear-gradient(135deg, #887400ff, #9c7f00ff)', color: '#fff', fontWeight: 800, fontSize: '1.1rem', boxShadow: '0 10px 40px rgba(255,215,0,0.5)' }}>
              Book Now
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <a href={brand.whatsapp} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '18px 40px', borderRadius: '50px', background: 'rgba(255, 255, 255, 0.55)', border: '1.5px solid rgba(255,255,255,0.3)', color: '#000000ff', fontWeight: 700, fontSize: '1rem' }}>
              <FaWhatsapp /> WhatsApp Us
            </a>
          </motion.div>
        </div>
      </motion.div>

      <style>{`@media(max-width:768px){.grid-responsive{grid-template-columns:1fr !important;}}`}</style>
    </main>
  );
}
