import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { resorts } from '../data/siteData';
import { useBooking } from '../context/BookingContext';
import {
  FaStar, FaMapMarkerAlt, FaWifi, FaParking, FaUmbrellaBeach,
  FaCheck, FaTimes, FaChevronLeft, FaChevronRight,
} from 'react-icons/fa';
import PageHeroBg from '../components/PageHeroBg';

export default function Resorts() {
  const { selectedResort, setSelectedResort } = useBooking();
  const [activeResort, setActiveResort] = useState(selectedResort || resorts[0]);
  const [imgIdx, setImgIdx] = useState(0);

  const handleSelect = (r) => {
    setActiveResort(r);
    setSelectedResort(r);
    setImgIdx(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextImg = () => setImgIdx(p => (p + 1) % activeResort.images.length);
  const prevImg = () => setImgIdx(p => (p - 1 + activeResort.images.length) % activeResort.images.length);

  const S = {
    hero: { position: 'relative', overflow: 'hidden', padding: '160px 60px 80px', textAlign: 'center' },
    badge: { display: 'inline-block', background: 'rgba(255,255,255,0.12)', color: '#F1C40F', padding: '6px 18px', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px' },
    heading: { fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, color: '#fff', letterSpacing: '-1.5px', marginBottom: '16px' },
    sub: { color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 },
    main: { maxWidth: '1300px', margin: '0 auto', padding: '80px 60px 100px' },
    grid: { display: 'grid', gridTemplateColumns: '320px 1fr', gap: '40px', alignItems: 'start' },
    sidebar: { position: 'sticky', top: '100px' },
    sideCard: (active) => ({
      padding: '14px 18px', borderRadius: '16px', cursor: 'pointer', marginBottom: '10px',
      background: active ? 'linear-gradient(135deg, rgba(212,175,55,0.12), rgba(255,215,0,0.08))' : '#1a1a1a',
      border: `2px solid ${active ? '#D4AF37' : 'rgba(212,175,55,0.15)'}`,
      boxShadow: active ? '0 0 0 2px rgba(212,175,55,0.3), 0 8px 30px rgba(0,0,0,0.5)' : 'none',
      transition: 'all 0.25s',
      display: 'flex', alignItems: 'center', gap: '12px',
    }),
    // Detail panel
    sliderWrap: { position: 'relative', borderRadius: '24px', overflow: 'hidden', height: '380px', marginBottom: '32px' },
    sliderImg: { width: '100%', height: '100%', objectFit: 'cover' },
    sliderBtn: (side) => ({
      position: 'absolute', top: '50%', [side]: '16px', transform: 'translateY(-50%)',
      width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(0,0,0,0.5)',
      color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', zIndex: 5, fontSize: '0.9rem',
      backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)',
    }),
    detailCard: { background: '#1a1a1a', borderRadius: '24px', padding: '36px', boxShadow: '0 8px 40px rgba(0,0,0,0.4)', marginBottom: '24px', border: '1px solid rgba(212,175,55,0.15)' },
    secTitle: { fontWeight: 800, color: '#D4AF37', fontSize: '1.1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' },
    featurePill: { background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.2)', color: '#D4AF37', fontSize: '0.82rem', fontWeight: 600, padding: '6px 14px', borderRadius: '50px', display: 'inline-block' },
    inclRow: { display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 0', borderBottom: '1px solid rgba(212,175,55,0.08)', fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' },
    reviewCard: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(212,175,55,0.12)', borderRadius: '16px', padding: '20px', marginBottom: '14px' },
    stars: { display: 'flex', gap: '3px', color: '#FFB800', fontSize: '0.85rem', marginBottom: '8px' },
  };

  return (
    <main>
      <div style={S.hero} className="page-hero">
        <PageHeroBg />
        <motion.div style={{ position: 'relative', zIndex: 2 }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span style={S.badge}>🏖️ All Resorts</span>
          <h1 style={S.heading}>Explore Our<br />Partner Resorts</h1>
          <p style={S.sub}>Click any resort to see full details, images, features, and reviews.</p>
        </motion.div>
      </div>

      <div style={S.main} className="section-pad">
        <div style={S.grid} className="resorts-grid">
          {/* Sidebar */}
          <div style={S.sidebar} className="resorts-sidebar">
            <div style={{ fontWeight: 700, color: '#D4AF37', fontSize: '0.85rem', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '14px' }}>
              Select Resort
            </div>
            {resorts.map(r => (
              <motion.div
                key={r.id}
                style={S.sideCard(activeResort?.id === r.id)}
                onClick={() => handleSelect(r)}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <span style={{ fontSize: '1.4rem' }}>{r.emoji}</span>
                <div>
                  <div style={{ fontWeight: 700, color: activeResort?.id === r.id ? '#FFD700' : '#D4AF37', fontSize: '0.9rem' }}>{r.name}</div>
                  <div style={{ color: '#D4AF37', fontWeight: 800, fontSize: '0.88rem' }}>₹{r.price}/person</div>
                </div>
                {activeResort?.id === r.id && <FaCheck style={{ marginLeft: 'auto', color: '#D4AF37' }} />}
              </motion.div>
            ))}
          </div>

          {/* Detail Panel */}
          <AnimatePresence mode="wait">
            <motion.div key={activeResort?.id}
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}>

              {/* Image Slider */}
              <div style={S.sliderWrap}>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={imgIdx}
                    src={activeResort.images[imgIdx]}
                    alt={activeResort.name}
                    style={S.sliderImg}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    onError={e => { e.target.src = `https://picsum.photos/seed/${activeResort.id}/800/380`; }}
                  />
                </AnimatePresence>
                <motion.div style={S.sliderBtn('left')} onClick={prevImg} whileTap={{ scale: 0.9 }}><FaChevronLeft /></motion.div>
                <motion.div style={S.sliderBtn('right')} onClick={nextImg} whileTap={{ scale: 0.9 }}><FaChevronRight /></motion.div>
                <div style={{ position: 'absolute', bottom: '14px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '6px', zIndex: 5 }}>
                  {activeResort.images.map((_, i) => (
                    <div key={i} onClick={() => setImgIdx(i)} style={{ width: i === imgIdx ? '20px' : '7px', height: '7px', borderRadius: '4px', background: i === imgIdx ? '#FFD700' : 'rgba(255,255,255,0.5)', transition: 'all 0.25s', cursor: 'pointer' }} />
                  ))}
                </div>
                {/* Price overlay */}
                <div style={{ position: 'absolute', top: '16px', right: '16px', background: 'linear-gradient(135deg, #D4AF37, #FFD700)', color: '#fff', padding: '8px 20px', borderRadius: '50px', fontWeight: 800, fontSize: '1.1rem', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
                  ₹{activeResort.price}/person
                </div>
              </div>

              {/* Info */}
              <div style={S.detailCard}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#D4AF37', marginBottom: '4px' }}>{activeResort.name}</h2>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(212,175,55,0.7)', fontSize: '0.85rem' }}>
                      <FaMapMarkerAlt />{activeResort.location}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {activeResort.wifi && <span title="WiFi"><FaWifi color="#D4AF37" /></span>}
                    {activeResort.parking && <span title="Parking"><FaParking color="#D4AF37" /></span>}
                    {activeResort.beachAccess && <span title="Beach Access"><FaUmbrellaBeach color="#D4AF37" /></span>}
                  </div>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.8, fontSize: '0.95rem', marginBottom: '20px' }}>{activeResort.description}</p>

                {/* Features */}
                <div style={S.secTitle}>🎯 Features</div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
                  {activeResort.features.map((f, i) => <span key={i} style={S.featurePill}>{f}</span>)}
                </div>

                {/* Included / Excluded */}
                {/* Included Section */}
                <div style={{ marginTop: '24px' }}>
                  <div style={{ ...S.secTitle, fontSize: '1.3rem' }}>✅ What's Included (Everything is Free!)</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px 24px' }} className="included-grid">
                    {activeResort.included.map((item, i) => (
                      <div key={i} style={{ ...S.inclRow, borderBottom: 'none' }}>
                        <FaCheck style={{ color: '#16a34a', flexShrink: 0 }} />
                        <span style={{ fontWeight: item.includes('Free') ? 700 : 400, color: item.includes('Free') ? '#16a34a' : 'rgba(255,255,255,0.7)' }}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Facilities */}
                <div style={{ marginTop: '20px' }}>
                  <div style={S.secTitle}>🏢 Facilities</div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {activeResort.facilities.map((f, i) => (
                      <span key={i} style={{ ...S.featurePill, background: 'rgba(34,197,94,0.07)', border: '1px solid rgba(34,197,94,0.2)', color: '#15803d' }}>{f}</span>
                    ))}
                  </div>
                </div>

                {activeResort.roomAvailability && (
                  <div style={{ marginTop: '16px', padding: '12px 16px', background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: '12px', color: '#15803d', fontSize: '0.85rem', fontWeight: 600 }}>
                    🏠 Rooms available — subject to availability. Contact us to check.
                  </div>
                )}
              </div>

              {/* Reviews */}
              <div style={S.detailCard}>
                <div style={S.secTitle}>⭐ Guest Reviews</div>
                {activeResort.reviews.map((rev, i) => (
                  <div key={i} style={S.reviewCard}>
                    <div style={S.stars}>{[...Array(rev.rating)].map((_, j) => <FaStar key={j} />)}</div>
                    <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, fontSize: '0.92rem', marginBottom: '12px', fontStyle: 'italic' }}>"{rev.comment}"</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #1A1A1A, #D4AF37)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', overflow: 'hidden' }}>
                        {rev.avatar.startsWith('http') ? (
                          <img src={rev.avatar} alt={rev.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : rev.avatar}
                      </div>
                      <span style={{ fontWeight: 700, color: '#D4AF37', fontSize: '0.9rem' }}>{rev.name}</span>
                      <span style={{ marginLeft: 'auto', background: 'rgba(34,197,94,0.1)', color: '#16a34a', fontSize: '0.7rem', fontWeight: 700, padding: '2px 8px', borderRadius: '50px' }}>✓ Verified</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Book CTA */}
              <Link to="/booking" onClick={() => setSelectedResort(activeResort)}
                style={{ display: 'block', textAlign: 'center', padding: '18px', borderRadius: '16px', background: 'linear-gradient(135deg, #D4AF37, #FFD700)', color: '#fff', fontWeight: 800, fontSize: '1.1rem', boxShadow: '0 8px 32px rgba(212,175,55,0.4)' }}>
                Book {activeResort.name} — Only ₹50/person Advance
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .resorts-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
