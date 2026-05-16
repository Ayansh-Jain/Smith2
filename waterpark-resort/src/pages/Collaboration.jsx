import { motion } from 'framer-motion';
import { FiInstagram, FiYoutube, FiSend, FiStar } from 'react-icons/fi';
import PageHeroBg from '../components/PageHeroBg';

export default function Collaboration() {
  const styles = {
    hero: {
      position: 'relative',
      overflow: 'hidden',
      padding: '160px 60px 100px',
      textAlign: 'center',
    },
    badge: {
      display: 'inline-block',
      background: 'rgba(255,255,255,0.2)',
      color: '#fff',
      padding: '8px 20px',
      borderRadius: '50px',
      fontSize: '0.85rem',
      fontWeight: 700,
      letterSpacing: '1px',
      marginBottom: '24px',
    },
    heading: {
      fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
      fontWeight: 900,
      color: '#fff',
      lineHeight: 1.1,
      marginBottom: '20px',
    },
    sub: {
      color: 'rgba(255,255,255,0.9)',
      fontSize: '1.2rem',
      maxWidth: '650px',
      margin: '0 auto',
      lineHeight: 1.6,
    },
    content: {
      maxWidth: '1200px',
      margin: '-60px auto 80px',
      padding: '0 40px',
      position: 'relative',
      zIndex: 10,
    },
    card: {
      background: '#1a1a1a',
      borderRadius: '30px',
      padding: '60px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      border: '1px solid rgba(212,175,55,0.15)',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '60px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    },
    label: {
      fontSize: '0.9rem',
      fontWeight: 600,
      color: '#D4AF37',
    },
    input: {
      padding: '15px 20px',
      borderRadius: '12px',
      border: '2px solid rgba(212,175,55,0.2)',
      background: 'rgba(255,255,255,0.05)',
      fontSize: '1rem',
      outline: 'none',
      color: '#FFD700',
      transition: 'border-color 0.3s ease',
    },
    textarea: {
      padding: '15px 20px',
      borderRadius: '12px',
      border: '2px solid rgba(212,175,55,0.2)',
      background: 'rgba(255,255,255,0.05)',
      fontSize: '1rem',
      minHeight: '120px',
      outline: 'none',
      color: '#FFD700',
      resize: 'vertical',
    },
    button: {
      background: 'linear-gradient(135deg, #D4AF37, #FFD700)',
      color: '#000',
      padding: '18px',
      borderRadius: '12px',
      border: 'none',
      fontSize: '1.1rem',
      fontWeight: 800,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      marginTop: '10px',
    },
    infoSection: {
      display: 'flex',
      flexDirection: 'column',
      gap: '40px',
    },
    feature: {
      display: 'flex',
      gap: '20px',
    },
    iconBox: {
      width: '50px',
      height: '50px',
      borderRadius: '15px',
      background: '#0A0A0A',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#FFD700',
      fontSize: '1.5rem',
      flexShrink: 0,
    },
  };

  return (
    <main>
      <div style={styles.hero} className="page-hero section-pad">
        <PageHeroBg />
        <motion.div
          style={{ position: 'relative', zIndex: 2 }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <span style={styles.badge}>🤝 Partner With Us</span>
          <h1 style={styles.heading}>Influencer <br/>Collaboration</h1>
          <p style={styles.sub}>
            Are you a content creator? Join us in showcasing the most exciting water resorts in India to your audience.
          </p>
        </motion.div>
      </div>

      <div style={styles.content} className="section-pad">
        <motion.div 
          style={styles.card} className="collab-card"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div style={styles.infoSection}>
            <h2 style={{ fontSize: '2rem', color: '#D4AF37', fontWeight: 800 }}>Why Collab?</h2>
            <div style={styles.feature}>
              <div style={styles.iconBox}><FiStar /></div>
              <div>
                <h4 style={{ color: '#D4AF37', marginBottom: '5px' }}>Exclusive Access</h4>
                <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>Get priority entry and VIP treatment at our partner water parks.</p>
              </div>
            </div>
            <div style={styles.feature}>
              <div style={styles.iconBox}><FiInstagram /></div>
              <div>
                <h4 style={{ color: '#D4AF37', marginBottom: '5px' }}>Content Opportunities</h4>
                <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>Capture stunning visuals and create viral reels with high production value.</p>
              </div>
            </div>
            <div style={styles.feature}>
              <div style={styles.iconBox}><FiYoutube /></div>
              <div>
                <h4 style={{ color: '#D4AF37', marginBottom: '5px' }}>Growth Support</h4>
                <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>We feature top creators on our official channels, boosting your reach.</p>
              </div>
            </div>
          </div>

          <form style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Full Name</label>
              <input type="text" placeholder="John Doe" style={styles.input} />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email Address</label>
              <input type="email" placeholder="john@example.com" style={styles.input} />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Social Media Handle (IG/YT)</label>
              <input type="text" placeholder="@yourhandle" style={styles.input} />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Follower Count</label>
              <input type="text" placeholder="e.g. 50K+" style={styles.input} />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Tell us about your content</label>
              <textarea placeholder="How would you like to collaborate?" style={styles.textarea}></textarea>
            </div>
            <button style={styles.button}>
              <FiSend /> Send Proposal
            </button>
          </form>
        </motion.div>
      </div>
    </main>
  );
}
