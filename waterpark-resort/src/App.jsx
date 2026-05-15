import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from '@studio-freight/lenis';

import { BookingProvider } from './context/BookingContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './index.css';

// ── Lazy-loaded pages (each becomes its own chunk) ──────────────────────────
const Home         = lazy(() => import('./pages/Home'));
const Resorts      = lazy(() => import('./pages/Resorts'));
const Activities   = lazy(() => import('./pages/Activities'));
const Booking      = lazy(() => import('./pages/Booking'));
const BookingSuccess = lazy(() => import('./pages/BookingSuccess'));
const BookingFailed  = lazy(() => import('./pages/BookingFailed'));
const AdminPanel   = lazy(() => import('./pages/AdminPanel'));
const Pricing      = lazy(() => import('./pages/Pricing'));
const About        = lazy(() => import('./pages/About'));
const Gallery      = lazy(() => import('./pages/Gallery'));
const Collaboration = lazy(() => import('./pages/Collaboration'));
const Contact      = lazy(() => import('./pages/Contact'));

// ── Page Loading Fallback ────────────────────────────────────────────────────
function PageLoader() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0A0A0A',
    }}>
      <div style={{
        width: 48,
        height: 48,
        border: '3px solid rgba(212,175,55,0.2)',
        borderTopColor: '#D4AF37',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ── Scroll Progress Bar ──────────────────────────────────────────────────────
function ScrollProgress() {
  useEffect(() => {
    const el = document.getElementById('scroll-progress');
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      if (el) el.style.width = `${pct}%`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return null;
}

// ── Scroll to Top on route change ───────────────────────────────────────────
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// ── Page transition wrapper ──────────────────────────────────────────────────
const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.25 } },
};

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{ minHeight: '100vh' }}
      >
        <Suspense fallback={<PageLoader />}>
          <Routes location={location}>
            <Route path="/"                 element={<Home />} />
            <Route path="/resorts"          element={<Resorts />} />
            <Route path="/activities"       element={<Activities />} />
            <Route path="/booking"          element={<Booking />} />
            <Route path="/booking/success"  element={<BookingSuccess />} />
            <Route path="/booking/failed"   element={<BookingFailed />} />
            <Route path="/gallery"          element={<Gallery />} />
            <Route path="/collaboration"    element={<Collaboration />} />
            <Route path="/pricing"          element={<Pricing />} />
            <Route path="/about"            element={<About />} />
            <Route path="/contact"          element={<Contact />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Lenis smooth scroll ──────────────────────────────────────────────────────
function LenisProvider() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);
  return null;
}

// ── Root App ─────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <BookingProvider>
      <BrowserRouter>
        <Routes>
          {/* Admin panel — standalone, no Navbar/Footer, lazy loaded */}
          <Route path="/admin/*" element={
            <Suspense fallback={<PageLoader />}>
              <AdminPanel />
            </Suspense>
          } />

          {/* Public site with Navbar + Footer */}
          <Route path="/*" element={
            <>
              <LenisProvider />
              <ScrollToTop />
              <ScrollProgress />
              <Navbar />
              <AnimatedRoutes />
              <Footer />
            </>
          } />
        </Routes>
      </BrowserRouter>
    </BookingProvider>
  );
}
