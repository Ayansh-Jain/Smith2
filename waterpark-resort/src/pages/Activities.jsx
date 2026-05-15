import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { resorts } from '../data/siteData';
import PageHeroBg from '../components/PageHeroBg';

// Generate activity cards from resort features
const allActivities = [
  { id: 1, emoji: '🌊', name: 'Wave Pool', desc: 'Ride massive artificial waves in our Olympic-sized wave pools at select resorts.', resorts: ['Manthan Resort', 'Vaity Aqua Resort', 'Blue Wave Waterpark'] },
  { id: 2, emoji: '⚡', name: 'Water Slides', desc: 'Plunge down thrilling high-speed slides with heart-pounding drops and twists.', resorts: ['DreamWorld Resort', 'Manthan Resort', 'Aqua Palace Resort', 'Magnum Resort'] },
  { id: 3, emoji: '🌧️', name: 'Rain Dance', desc: 'Dance under artificial rain showers with DJ music in an electrifying setting.', resorts: ['DreamWorld Resort', 'Manthan Resort', 'Magnum Resort'] },
  { id: 4, emoji: '🏖️', name: 'Beach Access', desc: 'Enjoy direct beach access for sand play, sunbathing, and coastal relaxation.', resorts: ['DreamWorld Resort', 'Visava Resort'] },
  { id: 5, emoji: '🎵', name: 'DJ Music', desc: 'Groove to live DJ music in themed dance zones throughout the waterpark.', resorts: ['Manthan Resort'] },
  { id: 6, emoji: '🍽️', name: 'Unlimited Meals', desc: 'Enjoy unlimited buffet breakfast and lunch included in your ticket price.', resorts: ['DreamWorld Resort'] },
  { id: 7, emoji: '🦀', name: 'Crab Slide (360°)', desc: 'Experience the unique 360-degree aqua crab slide — unlike anything in the region!', resorts: ['Blue Wave Waterpark'] },
  { id: 8, emoji: '🌴', name: 'Jungle Theme', desc: 'Immerse yourself in a thrilling jungle-themed waterpark with lush décor and ambience.', resorts: ['Manthan Resort'] },
  { id: 9, emoji: '🏠', name: 'Room Stays', desc: 'Book a comfortable room and extend your stay at select resorts (subject to availability).', resorts: ['DreamWorld Resort', 'Aqua Palace Resort', 'Vaity Aqua Resort', 'Visava Resort', 'Kshitij Resort'] },
  { id: 10, emoji: '🅿️', name: 'Ample Parking', desc: 'Free parking available at all resorts for cars and two-wheelers.', resorts: ['All Resorts'] },
  { id: 11, emoji: '📶', name: 'Free WiFi', desc: 'Stay connected with complimentary WiFi at select resorts.', resorts: ['DreamWorld Resort', 'Manthan Resort', 'Aqua Palace Resort', 'Vaity Aqua Resort', 'Blue Wave Waterpark'] },

];

export default function Activities() {
  const S = {
    hero: { position: 'relative', overflow: 'hidden', padding: '160px 60px 80px', textAlign: 'center' },
    badge: { display: 'inline-block', background: 'rgba(255,255,255,0.12)', color: '#F1C40F', padding: '6px 18px', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px' },
    heading: { fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, color: '#fff', letterSpacing: '-1.5px', marginBottom: '16px' },
    sub: { color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 },
    content: { maxWidth: '1300px', margin: '0 auto', padding: '80px 60px' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '28px', marginBottom: '60px' },
    card: {
      background: '#fff', borderRadius: '20px', padding: '28px',
      boxShadow: '0 4px 24px rgba(0,100,160,0.07)', border: '1px solid rgba(212,175,55,0.1)',
    },
    emojiBox: {
      width: '60px', height: '60px', borderRadius: '16px',
      background: 'linear-gradient(135deg, rgba(212,175,55,0.12), rgba(255,215,0,0.08))',
      border: '1.5px solid rgba(212,175,55,0.2)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '1.8rem', marginBottom: '16px',
    },
    cardTitle: { fontWeight: 800, color: '#D4AF37', fontSize: '1.05rem', marginBottom: '10px' },
    cardDesc: { color: '#5E7D9E', fontSize: '0.87rem', lineHeight: 1.65, marginBottom: '16px' },
    resortTag: {
      display: 'inline-block', background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.18)',
      color: '#FFD700', fontSize: '0.72rem', fontWeight: 600, padding: '3px 10px',
      borderRadius: '50px', marginRight: '5px', marginBottom: '5px',
    },
    ctaBar: {
      background: 'linear-gradient(135deg, rgba(212,175,55,0.08), rgba(255,215,0,0.04))',
      border: '1px solid rgba(212,175,55,0.2)', borderRadius: '20px',
      padding: '32px 40px', display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px',
    },
  };

  return (
    <main>
      <div style={S.hero} className="page-hero section-pad">
        <PageHeroBg />
        <motion.div style={{ position: 'relative', zIndex: 2 }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span style={S.badge}>🏄 Activities & Features</span>
          <h1 style={S.heading}>Resort Activities<br />& Experiences</h1>
          <p style={S.sub}>Explore what's available across our 8 partner resorts in Virar West, Mumbai.</p>
        </motion.div>
      </div>



      <div style={S.content} className="section-pad">
        <div style={S.grid} className="grid-3">
          {allActivities.map((act, i) => (
            <motion.div key={act.id} style={S.card}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06 }} whileHover={{ y: -6, boxShadow: '0 16px 50px rgba(212,175,55,0.15)' }}>
              <div style={S.emojiBox}>{act.emoji}</div>
              <h3 style={S.cardTitle}>{act.name}</h3>
              <p style={S.cardDesc}>{act.desc}</p>
              <div>
                {act.resorts.map((r, j) => <span key={j} style={S.resortTag}>{r}</span>)}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div style={S.ctaBar} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div>
            <p style={{ fontSize: '1.2rem', fontWeight: 700, color: '#D4AF37' }}>🎯 Ready to book your resort experience?</p>
            <p style={{ color: '#5E7D9E', fontSize: '0.9rem', marginTop: '4px' }}>Select a resort and confirm with just ₹50/person advance.</p>
          </div>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link to="/booking" style={{ padding: '14px 34px', borderRadius: '14px', background: 'linear-gradient(135deg, #D4AF37, #FFD700)', color: '#fff', fontWeight: 700, fontSize: '1rem', boxShadow: '0 6px 24px rgba(212,175,55,0.4)', display: 'inline-block' }}>
              Book Now →
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
