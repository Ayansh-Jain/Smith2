import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn, FaTelegram, FaTwitter, FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';
import { brand } from '../data/siteData';

export default function Footer() {
  const styles = {
    footer: { background: 'linear-gradient(180deg, #050505 0%, #2d2300ff 100%)', color: '#fff', padding: '80px 60px 40px' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '50px', marginBottom: '60px' },
    logo: { display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 800, fontSize: '1.3rem', marginBottom: '16px', color: '#fff' },
    logoImg: { width: '36px', height: '36px', borderRadius: '8px', objectFit: 'contain', background: '#fff', padding: '2px' },
    desc: { color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, fontSize: '0.9rem', marginBottom: '24px' },
    socials: { display: 'flex', gap: '10px', flexWrap: 'wrap' },
    socialBtn: {
      width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)',
      border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center',
      justifyContent: 'center', color: '#FFD700', fontSize: '0.95rem', cursor: 'pointer', transition: 'all 0.25s',
    },
    colTitle: { fontWeight: 700, fontSize: '0.9rem', marginBottom: '20px', color: '#FFD700', letterSpacing: '1px', textTransform: 'uppercase' },
    linkList: { listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' },
    linkItem: { color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem', transition: 'color 0.2s' },
    contactItem: { display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px', color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem' },
    contactIcon: { color: '#FFD700', marginTop: '3px', flexShrink: 0 },
    divider: { borderColor: 'rgba(255,255,255,0.1)', marginBottom: '30px' },
    bottom: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' },
  };

  const socialLinks = [
    { href: brand.socials.facebook, icon: FaFacebookF },
    { href: brand.socials.instagram, icon: FaInstagram },
    { href: brand.socials.youtube, icon: FaYoutube },
    { href: brand.socials.linkedin, icon: FaLinkedinIn },
    { href: brand.socials.telegram, icon: FaTelegram },
    { href: brand.socials.twitter, icon: FaTwitter },
  ];

  return (
    <footer style={styles.footer} className="section-pad">
      <div style={styles.grid}>
        <div>
          <div style={styles.logo}>
            <img src={brand.logo} alt={brand.name} style={styles.logoImg} />
            {brand.name}
          </div>
          <p style={styles.desc}>{brand.tagline}. Connecting you to the best resort experiences in Mumbai & Virar West.</p>
          <div style={styles.socials}>
            {socialLinks.map(({ href, icon: Icon }, i) => (
              <motion.a key={i} href={href} target="_blank" rel="noopener noreferrer" style={styles.socialBtn} whileHover={{ scale: 1.15, background: 'rgba(212,175,55,0.3)' }}>
                <Icon />
              </motion.a>
            ))}
          </div>
        </div>

        <div>
          <p style={styles.colTitle}>Quick Links</p>
          <ul style={styles.linkList}>
            {[['/', 'Home'], ['/resorts', 'Resorts'], ['/pricing', 'Pricing'], ['/about', 'About Us'], ['/contact', 'Contact']].map(([path, label]) => (
              <li key={path}><Link to={path} style={styles.linkItem}>→ {label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <p style={styles.colTitle}>Our Resorts</p>
          <ul style={styles.linkList}>
            {['DreamWorld Resort', 'Manthan Resort', 'Aqua Palace Resort', 'Vaity Aqua Resort', 'Visava Resort', 'Magnum Resort', 'Kshitij Resort', 'Blue Wave Waterpark'].map(name => (
              <li key={name} style={styles.linkItem}>→ {name}</li>
            ))}
          </ul>
        </div>

        <div>
          <p style={styles.colTitle}>Contact</p>
          <div style={styles.contactItem}><FaMapMarkerAlt style={styles.contactIcon} /><span>{brand.address}</span></div>
          <div style={styles.contactItem}><FaPhone style={styles.contactIcon} /><span>{brand.phone}</span></div>
          <div style={styles.contactItem}><FaEnvelope style={styles.contactIcon} /><span>{brand.email}</span></div>
          <div style={styles.contactItem}>
            <FaWhatsapp style={styles.contactIcon} />
            <a href={brand.whatsapp} target="_blank" rel="noopener noreferrer" style={{ color: '#FFD700' }}>WhatsApp Us</a>
          </div>
        </div>
      </div>
      <hr style={styles.divider} />
      <div style={styles.bottom} className="footer-bottom">
        <span>{brand.copyright}</span>
        <span>Made with 💙 for water lovers</span>
        <span>
          <a href="https://myresortbooking.in/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', marginRight: '12px' }}>Privacy Policy</a>
          <a href="https://myresortbooking.in/terms-conditions" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>Terms & Conditions</a>
        </span>
      </div>
    </footer>
  );
}
