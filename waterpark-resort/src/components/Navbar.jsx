import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { brand } from '../data/siteData';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/resorts', label: 'Resorts' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/collaboration', label: 'Collaboration' },
  { path: '/pricing', label: 'Pricing' },
  { path: '/about', label: 'About Us' },
  { path: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  const styles = {
    nav: {
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      padding: scrolled ? '10px 40px' : '18px 40px',
      background: scrolled ? 'rgba(20,20,20,0.95)' : 'rgba(255,255,255,0.06)',
      backdropFilter: 'blur(20px)',
      borderBottom: scrolled ? '1px solid rgba(212,175,55,0.15)' : 'none',
      boxShadow: scrolled ? '0 4px 30px rgba(212,175,55,0.1)' : 'none',
      transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    },
    logoWrap: { display: 'flex', alignItems: 'center', gap: '10px' },
    logoImg: { height: '40px', width: 'auto', objectFit: 'contain' },
    logoText: {
      fontWeight: 800, fontSize: '1.15rem',
      color: scrolled ? '#D4AF37' : '#fff', letterSpacing: '-0.3px',
    },
    links: { display: 'flex', alignItems: 'center', gap: '4px', listStyle: 'none' },
    link: (active) => ({
      padding: '8px 16px', borderRadius: '50px',
      fontWeight: active ? 700 : 500, fontSize: '0.92rem',
      color: scrolled ? (active ? '#D4AF37' : '#FFFFFF') : (active ? '#FFD700' : 'rgba(255,255,255,0.9)'),
      background: active ? (scrolled ? 'rgba(212,175,55,0.1)' : 'rgba(255,255,255,0.12)') : 'transparent',
      transition: 'all 0.25s ease',
    }),
    cta: {
      padding: '10px 24px', borderRadius: '50px',
      background: 'linear-gradient(135deg, #D4AF37, #FFD700)', color: '#000000ff',
      fontWeight: 700, fontSize: '0.92rem', boxShadow: '0 4px 20px rgba(212,175,55,0.4)',
    },
    waBtn: {
      padding: '9px 18px', borderRadius: '50px',
      background: scrolled ? 'rgba(212,175,55,0.1)' : 'rgba(255,255,255,0.12)',
      border: scrolled ? '1px solid rgba(212,175,55,0.3)' : '1px solid rgba(255,255,255,0.25)',
      color: scrolled ? '#D4AF37' : '#fff',
      fontWeight: 600, fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '6px',
    },
    hamburger: { background: 'none', color: scrolled ? '#D4AF37' : '#fff', fontSize: '1.4rem', cursor: 'pointer', display: 'none' },
    mobileMenu: {
      position: 'fixed', inset: 0, background: 'rgba(212,175,55,0.97)', backdropFilter: 'blur(20px)',
      zIndex: 999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '28px',
    },
    mobileLink: (active) => ({ fontSize: '1.8rem', fontWeight: 700, color: active ? '#FFD700' : '#fff' }),
    closeBtn: { position: 'absolute', top: '24px', right: '30px', background: 'none', color: '#fff', fontSize: '1.8rem', cursor: 'pointer' },
  };

  return (
    <>
      <div id="scroll-progress" />
      <motion.nav style={styles.nav} className="header-pad" initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}>
        <Link to="/" style={styles.logoWrap}>
          <img src={brand.logo} alt={brand.name} style={styles.logoImg} onError={e => { e.target.style.display = 'none'; }} />
          <span style={styles.logoText}>{brand.name}</span>
        </Link>

        <ul style={styles.links} className="desktop-nav">
          {navLinks.map(({ path, label }) => (
            <li key={path}>
              <Link to={path} style={styles.link(location.pathname === path)}>{label}</Link>
            </li>
          ))}
        </ul>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }} className="desktop-nav">
          <a href={brand.whatsapp} target="_blank" rel="noopener noreferrer" style={styles.waBtn}>
             WhatsApp
          </a>
          <Link to="/booking" style={styles.cta}>Book Now </Link>
        </div>

        <button style={{ ...styles.hamburger, display: 'flex' }} className="mobile-menu-btn" onClick={() => setMenuOpen(true)} aria-label="Open menu">
          <FaBars />
        </button>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div style={styles.mobileMenu} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <button style={styles.closeBtn} onClick={() => setMenuOpen(false)}><FaTimes /></button>
            {navLinks.map(({ path, label }) => (
              <Link key={path} to={path} style={styles.mobileLink(location.pathname === path)}>{label}</Link>
            ))}
            <Link to="/booking" style={{ ...styles.cta, fontSize: '1.1rem', padding: '14px 36px' }}>Book Now </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        @media (min-width: 901px) {
          .mobile-menu-btn { display: none !important; }
        }
        a:hover { opacity: 0.85; }
        #scroll-progress {
          position: fixed; top: 0; left: 0; height: 3px; z-index: 9999;
          background: linear-gradient(90deg, #D4AF37, #FFD700); width: 0%; transition: width 0.1s;
        }
      `}</style>
    </>
  );
}
