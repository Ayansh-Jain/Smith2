import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaSearch, FaMapMarkerAlt } from 'react-icons/fa';
import { brand } from '../data/siteData';

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease: 'easeOut' } },
});

export default function Hero() {
  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        paddingTop: '5rem',
        maxHeight: '700px',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        fontFamily: "'Inter', 'Poppins', sans-serif",
      }}
    >
      {/* ── Background Image ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* ── Left-to-right gradient overlay — dark on left, transparent on right ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(100deg, rgba(10,8,5,0.97) 0%, rgba(10,8,5,0.88) 30%, rgba(10,8,5,0.62) 55%, rgba(10,8,5,0.10) 80%, transparent 100%)',
        }}
      />

      {/* ── Content — left side ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          padding: '80px 60px 60px 20px',
        
          maxWidth: '800px',
          width: '100%',
        }}
        className="hero-inner"
      >
        {/* Tagline */}
        <motion.p
          {...fade(0)}
          style={{
            fontSize: '0.78rem',
            fontWeight: 700,
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: '#D4AF37',
            marginBottom: '18px',
            margin: '0 0 18px 0',
          }}
        >
          ESCAPE. RELAX. ENJOY.
        </motion.p>

        {/* Main Heading */}
        <motion.h1
          {...fade(0.1)}
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.6rem)',
            fontWeight: 900,
      
            margin: '0 0 16px 0',
           
            color: '#fff',
          }}
          className="hero-heading"
        >
          Book Verified Resorts
          <br />
          Near Mumbai
          <br />
          at the{' '}
          <span
            style={{
              color: '#D4AF37',
              fontStyle: 'italic',
            }}
          >
            Best Prices
          </span>
        </motion.h1>

        {/* Location line */}
        <motion.p
          {...fade(0.2)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '7px',
            fontSize: '0.95rem',
            color: 'rgba(255,255,255,0.75)',
            margin: '0 0 32px 0',
            fontWeight: 500,
          }}
        >
          <FaMapMarkerAlt style={{ color: '#D4AF37', flexShrink: 0 }} />
          Virar &bull; Vasai &bull; Palghar &amp; More
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          {...fade(0.3)}
          style={{
            display: 'flex',
            gap: '14px',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
          className="hero-btn-row"
        >
          {/* WhatsApp Check Availability */}
          <motion.a
            href={brand.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '11px',
              padding: '13px 22px',
              background: 'rgba(20,16,10,0.85)',
              border: '1.5px solid rgba(212,175,55,0.55)',
              borderRadius: '8px',
              color: '#fff',
              fontWeight: 700,
              textDecoration: 'none',
              backdropFilter: 'blur(8px)',
              cursor: 'pointer',
            }}
          >
            <span
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'rgba(212,175,55,0.15)',
                border: '1px solid rgba(212,175,55,0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <FaWhatsapp style={{ color: '#25D366', fontSize: '1.1rem' }} />
            </span>
            <span>
              <div style={{ fontSize: '0.78rem', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#fff' }}>
                CHECK AVAILABILITY
              </div>
              <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.55)', fontWeight: 500 }}>
                on WhatsApp
              </div>
            </span>
          </motion.a>

          {/* Browse Resorts */}
          <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/resorts"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '13px 24px',
                background: 'rgba(20,16,10,0.75)',
                border: '1.5px solid rgba(255,255,255,0.25)',
                borderRadius: '8px',
                color: '#fff',
                fontWeight: 700,
                textDecoration: 'none',
                backdropFilter: 'blur(8px)',
                fontSize: '0.85rem',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
              }}
            >
              <FaSearch style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.65)' }} />
              BROWSE RESORTS
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Floating WhatsApp Badge — right edge ── */}
       

      {/* ── Wave divider ── */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 3 }}>
        <svg
          viewBox="0 0 1440 60"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ display: 'block' }}
        >
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#0A0A0A" />
        </svg>
      </div>

      {/* ── Responsive ── */}
      <style>{`
        @media (max-width: 768px) {
          .hero-inner {
            padding: 100px 24px 60px !important;
            max-width: 100% !important;
          }
          .hero-heading {
            font-size: clamp(1.8rem, 8vw, 2.6rem) !important;
          }
          .hero-btn-row {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </section>
  );
}
