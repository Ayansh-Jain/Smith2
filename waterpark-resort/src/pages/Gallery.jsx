import { motion } from 'framer-motion';
import { galleryImages } from '../data/siteData';
import PageHeroBg from '../components/PageHeroBg';

export default function Gallery() {
  const styles = {
    hero: {
      position: 'relative', overflow: 'hidden',
      padding: '160px 60px 80px',
      textAlign: 'center',
    },
    badge: {
      display: 'inline-block',
      background: 'rgba(255,255,255,0.12)',
      color: '#F1C40F',
      padding: '6px 18px',
      borderRadius: '50px',
      fontSize: '0.8rem',
      fontWeight: 700,
      letterSpacing: '2px',
      textTransform: 'uppercase',
      marginBottom: '20px',
    },
    heading: {
      fontSize: 'clamp(2.5rem, 5vw, 4rem)',
      fontWeight: 900,
      color: '#fff',
      letterSpacing: '-1.5px',
      marginBottom: '16px',
    },
    sub: {
      color: 'rgba(255,255,255,0.7)',
      fontSize: '1.1rem',
      maxWidth: '520px',
      margin: '0 auto',
      lineHeight: 1.7,
    },
    wave: {
      background: 'linear-gradient(135deg, #050505 0%, #D4AF37 60%, #FFD700 100%)',
    },
    content: {
      maxWidth: '1300px',
      margin: '0 auto',
      padding: '80px 60px',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '20px',
    },
    imgCard: {
      borderRadius: '20px',
      overflow: 'hidden',
      aspectRatio: '4/3',
      background: '#eee',
      cursor: 'pointer',
      position: 'relative',
    },
    img: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform 0.6s cubic-bezier(0.33, 1, 0.68, 1)',
    },
    overlay: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)',
      opacity: 0,
      transition: 'opacity 0.3s ease',
      display: 'flex',
      alignItems: 'flex-end',
      padding: '20px',
    },
  };

  return (
    <main>
      <div style={styles.hero} className="page-hero section-pad">
        <PageHeroBg />
        <motion.div
          style={{ position: 'relative', zIndex: 2 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span style={styles.badge}>📸 Visual Journey</span>
          <h1 style={styles.heading}>Capture the Fun</h1>
          <p style={styles.sub}>
            Explore the vibrant moments, thrilling slides, and relaxing escapes at our partner resorts.
          </p>
        </motion.div>
      </div>



      <div style={styles.content} className="section-pad">
        <div style={styles.grid} className="gallery-grid">
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              style={styles.imgCard}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover="hover"
            >
              <motion.img
                src={img}
                alt={`Gallery ${i}`}
                style={styles.img}
                variants={{ hover: { scale: 1.1 } }}
              />
              <motion.div 
                style={styles.overlay}
                variants={{ hover: { opacity: 1 } }}
              >
                <span style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem' }}>View Moment</span>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
