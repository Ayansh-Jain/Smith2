import { motion } from 'framer-motion';
import { FaAward, FaUsers, FaHeart, FaStar, FaMapMarkerAlt } from 'react-icons/fa';
import { aboutContent } from '../data/siteData';
import PageHeroBg from '../components/PageHeroBg';

const milestones = [
  { year: '2019', title: 'Founded', desc: 'Book My Resorts was founded with a mission to simplify resort bookings across Virar West, Mumbai.' },
  { year: '2020', title: 'First 1,000 Bookings', desc: 'Crossed 1,000 successful bookings, partnering with top water parks in the Mumbai region.' },
  { year: '2022', title: 'Expanded to 6 Resorts', desc: 'Grew our portfolio to 6 premium water parks in Virar West.' },
  { year: '2025', title: '50,000+ Happy Guests', desc: 'Welcomed our 50,000th guest — a milestone we celebrate with continued discounts.' },
];

const values = [
  { icon: FaHeart, title: 'Guest Happiness', desc: 'Your experience is our priority. Every decision we make starts with guest satisfaction.' },
  { icon: FaUsers, title: 'Family First', desc: 'All our resorts are vetted for safety and fun for guests of all ages.' },
  { icon: FaAward, title: 'Best Prices', desc: 'We guarantee the lowest prices. Get up to 32% off — no hidden fees.' },
  { icon: FaStar, title: 'Trusted by Thousands', desc: 'Over 50,000 guests have trusted us. Rated 4.9★ across all resorts.' },
];

export default function About() {
  const s = {
    hero: { position: 'relative', overflow: 'hidden', padding: '160px 60px 80px', textAlign: 'center' },
    badge: { display: 'inline-block', background: 'rgba(255,255,255,0.12)', color: '#F1C40F', padding: '6px 18px', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px' },
    h1: { fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, color: '#fff', letterSpacing: '-1.5px', marginBottom: '16px' },
    sub: { color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', maxWidth: '540px', margin: '0 auto', lineHeight: 1.7 },
    wave: { background: 'linear-gradient(135deg, #050505 0%, #D4AF37 60%, #FFD700 100%)' },
    wrap: { maxWidth: '1100px', margin: '0 auto', padding: '80px 60px' },
    grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center', marginBottom: '80px' },
    sbadge: { display: 'inline-block', background: 'rgba(212,175,55,0.1)', color: '#D4AF37', padding: '6px 18px', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' },
    h2: { fontSize: '2.2rem', fontWeight: 900, color: '#D4AF37', letterSpacing: '-0.8px', lineHeight: 1.15, marginBottom: '20px' },
    p: { color: 'rgba(255,255,255,0.8)', lineHeight: 1.85, fontSize: '0.97rem', marginBottom: '16px' },
    statBox: { background: 'linear-gradient(135deg, #1A1A1A, #F1C40F)', borderRadius: '28px', padding: '60px 40px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '32px' },
    statN: { fontSize: '3rem', fontWeight: 900, color: '#ffffffff', lineHeight: 1 },
    statL: { color: '#FFD700', fontSize: '0.9rem', fontWeight: 600, marginTop: '6px' },
    tlWrap: { position: 'relative', paddingLeft: '40px', marginBottom: '80px' },
    tlBar: { position: 'absolute', left: '10px', top: 0, bottom: 0, width: '2px', background: 'linear-gradient(180deg, #D4AF37, rgba(212,175,55,0.1))' },
    tlItem: { position: 'relative', marginBottom: '44px' },
    tlDot: { position: 'absolute', left: '-36px', top: '4px', width: '14px', height: '14px', borderRadius: '50%', background: '#D4AF37', border: '3px solid #1A1A1A' },
    tlYear: { fontSize: '0.8rem', fontWeight: 800, color: '#D4AF37', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '6px' },
    tlTitle: { fontSize: '1.1rem', fontWeight: 800, color: '#D4AF37', marginBottom: '6px' },
    tlDesc: { color: 'rgba(255,255,255,0.7)', fontSize: '0.93rem', lineHeight: 1.7 },
    valGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '24px' },
    valCard: { background: '#1a1a1a', borderRadius: '20px', padding: '32px 28px', boxShadow: '0 6px 30px rgba(0,0,0,0.4)', border: '1px solid rgba(212,175,55,0.15)' },
    valIcon: { width: '50px', height: '50px', borderRadius: '14px', background: 'linear-gradient(135deg, #D4AF37, #FFD700)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.2rem', marginBottom: '18px' },
    locBanner: { background: 'linear-gradient(135deg, #D4AF37, #FFD700)', borderRadius: '24px', padding: '40px', marginTop: '80px', color: '#fff', display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' },
  };

  return (
    <main>
      <div style={s.hero} className="page-hero section-pad">
        <PageHeroBg />
        <motion.div style={{ position: 'relative', zIndex: 2 }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span style={s.badge}> Our Story</span>
          <h1 style={s.h1}>About My Resort<br />Booking</h1>
          <p style={s.sub}>{aboutContent.tagline}</p>
        </motion.div>
      </div>

      <div style={s.wrap} className="section-pad">
        <div style={s.grid2} className="about-grid">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span style={s.sbadge}>🏖️ Who We Are</span>
            <h2 style={s.h2}>{aboutContent.headline}</h2>
            {aboutContent.paragraphs.slice(0, 3).map((p, i) => <p key={i} style={s.p}>{p}</p>)}
          </motion.div>
          <motion.div style={s.statBox} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
            {[{ num: '6+', label: 'Premium Resorts' }, { num: '50K+', label: 'Happy Guests' }, { num: '₹550', label: 'Starting Price' }, { num: '4.9★', label: 'Average Rating' }].map((st, i) => (
              <div key={i}><div style={s.statN}>{st.num}</div><div style={s.statL}>{st.label}</div></div>
            ))}
          </motion.div>
        </div>

        <motion.h2 style={{ ...s.h2, marginBottom: '40px' }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>Our Journey</motion.h2>
        <div style={s.tlWrap}>
          <div style={s.tlBar} />
          {milestones.map((m, i) => (
            <motion.div key={i} style={s.tlItem} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}>
              <div style={s.tlDot} />
              <p style={s.tlYear}>{m.year}</p>
              <h3 style={s.tlTitle}>{m.title}</h3>
              <p style={s.tlDesc}>{m.desc}</p>
            </motion.div>
          ))}
        </div>

        <span style={s.sbadge}>💙 Our Values</span>
        <h2 style={{ ...s.h2, marginBottom: '40px', marginTop: '16px' }}>What Drives Us</h2>
        <div style={s.valGrid} className="grid-3">
          {values.map(({ icon: Icon, title, desc }, i) => (
            <motion.div key={i} style={s.valCard} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} whileHover={{ y: -6 }}>
              <div style={s.valIcon}><Icon /></div>
              <h3 style={{ fontWeight: 800, color: '#D4AF37', marginBottom: '10px' }}>{title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', lineHeight: 1.7 }}>{desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div style={s.locBanner} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <div style={{ fontSize: '3rem' }}><FaMapMarkerAlt /></div>
          <div>
            <h3 style={{ fontWeight: 800, fontSize: '1.4rem', marginBottom: '8px' }}>Based in Virar West, Mumbai</h3>
            <p style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>
              All our resort partners are located in Virar West, Maharashtra — easily accessible from Mumbai by road or train. Just 1 hour from the city.
            </p>
          </div>
        </motion.div>
      </div>
      <style>{`@media(max-width:768px){.about-grid{grid-template-columns:1fr!important;}}`}</style>
    </main>
  );
}
