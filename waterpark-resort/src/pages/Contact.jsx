import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaClock } from 'react-icons/fa';
import { contactInfo, brand } from '../data/siteData';
import PageHeroBg from '../components/PageHeroBg';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required.';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required.';
    if (!form.message.trim()) e.message = 'Please write a message.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => { ev.preventDefault(); if (validate()) setSent(true); };

  const s = {
    hero: { position: 'relative', overflow: 'hidden', padding: '160px 60px 80px', textAlign: 'center' },
    badge: { display: 'inline-block', background: 'rgba(255,255,255,0.12)', color: '#F1C40F', padding: '6px 18px', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px' },
    h1: { fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, color: '#fff', letterSpacing: '-1.5px', marginBottom: '16px' },
    sub: { color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 },
    wave: { background: 'linear-gradient(135deg, #050505 0%, #D4AF37 60%, #FFD700 100%)' },
    wrap: { maxWidth: '1200px', margin: '0 auto', padding: '80px 60px 100px' },
    grid: { display: 'grid', gridTemplateColumns: '1fr 380px', gap: '40px', alignItems: 'start' },
    card: { background: '#1a1a1a', borderRadius: '28px', padding: '50px', boxShadow: '0 8px 40px rgba(0,0,0,0.4)', border: '1px solid rgba(212,175,55,0.15)' },
    cardTitle: { fontSize: '1.6rem', fontWeight: 900, color: '#D4AF37', marginBottom: '8px' },
    cardSub: { color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', marginBottom: '36px' },
    iGroup: { marginBottom: '20px' },
    label: { display: 'block', fontSize: '0.87rem', fontWeight: 600, color: '#D4AF37', marginBottom: '8px' },
    input: (err) => ({ width: '100%', padding: '13px 16px', borderRadius: '12px', border: `1.5px solid ${err ? '#FF6B6B' : 'rgba(212,175,55,0.25)'}`, fontSize: '0.95rem', color: '#FFD700', background: 'rgba(255,255,255,0.05)', outline: 'none', boxSizing: 'border-box' }),
    textarea: (err) => ({ width: '100%', padding: '13px 16px', borderRadius: '12px', border: `1.5px solid ${err ? '#FF6B6B' : 'rgba(212,175,55,0.25)'}`, fontSize: '0.95rem', color: '#FFD700', background: 'rgba(255,255,255,0.05)', outline: 'none', resize: 'vertical', minHeight: '130px', boxSizing: 'border-box' }),
    row2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' },
    err: { color: '#FF6B6B', fontSize: '0.82rem', marginTop: '4px' },
    btn: { width: '100%', padding: '15px', borderRadius: '14px', background: 'linear-gradient(135deg, #D4AF37, #FFD700)', color: '#000', fontWeight: 800, fontSize: '1.02rem', boxShadow: '0 6px 24px rgba(212,175,55,0.4)', marginTop: '8px' },
    sidebar: { display: 'flex', flexDirection: 'column', gap: '20px' },
    infoCard: { background: 'linear-gradient(160deg, #D4AF37, #FFD700)', borderRadius: '24px', padding: '36px', color: '#111' },
    infoItem: { display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '20px' },
    infoIcon: { width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#111', flexShrink: 0 },
    mapCard: { borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(212,175,55,0.2)', height: '260px' },
    waCard: { background: 'linear-gradient(135deg, #25D366, #128C7E)', borderRadius: '20px', padding: '28px', color: '#fff', textAlign: 'center' },
    success: { textAlign: 'center', padding: '60px 40px', background: '#1a1a1a', borderRadius: '28px', boxShadow: '0 8px 40px rgba(0,0,0,0.4)', border: '1px solid rgba(212,175,55,0.15)' },
  };

  return (
    <main>
      <div style={s.hero} className="page-hero section-pad">
        <PageHeroBg />
        <motion.div style={{ position: 'relative', zIndex: 2 }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span style={s.badge}>📬 Get In Touch</span>
          <h1 style={s.h1}>Contact Us</h1>
          <p style={s.sub}>Questions about booking? Want to check availability? We're here 24/7 on WhatsApp.</p>
        </motion.div>
      </div>



      <div style={s.wrap} className="section-pad">
        <div style={s.grid} className="contact-grid">
          <motion.div style={s.card} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            {sent ? (
              <div style={s.success}>
                <div style={{ fontSize: '4rem', marginBottom: '16px' }}>💌</div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#D4AF37', marginBottom: '10px' }}>Message Sent!</h2>
                <p style={{ color: '#5E7D9E' }}>Thanks {form.name}! We'll get back to you shortly via WhatsApp or email.</p>
                <a href={brand.whatsapp} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '24px', padding: '12px 28px', borderRadius: '50px', background: '#25D366', color: '#fff', fontWeight: 700 }}>
                  <FaWhatsapp /> Chat on WhatsApp
                </a>
              </div>
            ) : (
              <>
                <h2 style={s.cardTitle}>Send a Message</h2>
                <p style={s.cardSub}>Fill out the form and our team will respond within 24 hours. Or WhatsApp us for instant help!</p>
                <form onSubmit={handleSubmit}>
                  <div style={s.row2} className="booking-input-row">
                    <div style={s.iGroup}>
                      <label style={s.label}>Full Name *</label>
                      <input style={s.input(errors.name)} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Rahul Mehta" />
                      {errors.name && <p style={s.err}>{errors.name}</p>}
                    </div>
                    <div style={s.iGroup}>
                      <label style={s.label}>Email *</label>
                      <input type="email" style={s.input(errors.email)} value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="rahul@email.com" />
                      {errors.email && <p style={s.err}>{errors.email}</p>}
                    </div>
                  </div>
                  <div style={s.iGroup}>
                    <label style={s.label}>Phone Number</label>
                    <input style={s.input(false)} value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+91 98765 43210" />
                  </div>
                  <div style={s.iGroup}>
                    <label style={s.label}>Message *</label>
                    <textarea style={s.textarea(errors.message)} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="I'd like to book for 10 people at Vaity Aqua on Sunday..." />
                    {errors.message && <p style={s.err}>{errors.message}</p>}
                  </div>
                  <motion.button type="submit" style={s.btn} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                    Send Message 🚀
                  </motion.button>
                </form>
              </>
            )}
          </motion.div>

          <motion.div style={s.sidebar} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
            <div style={s.infoCard}>
              <p style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: '24px', color: '#111' }}>📍 Contact Information</p>
              {[
                { icon: FaMapMarkerAlt, label: 'Address', val: contactInfo.address },
                { icon: FaPhone, label: 'Phone', val: contactInfo.phone },
                { icon: FaEnvelope, label: 'Email', val: contactInfo.email },
                { icon: FaClock, label: 'Hours', val: 'Mon–Sun: 9 AM – 7 PM' },
              ].map(({ icon: Icon, label, val }, i) => (
                <div key={i} style={s.infoItem}>
                  <div style={s.infoIcon}><Icon /></div>
                  <div>
                    <p style={{ fontSize: '0.8rem', color: 'rgba(0,0,0,0.6)', marginBottom: '4px' }}>{label}</p>
                    <p style={{ fontWeight: 600, fontSize: '0.93rem', color: '#111' }}>{val}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={s.waCard}>
              <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}><FaWhatsapp /></div>
              <h3 style={{ fontWeight: 800, fontSize: '1.2rem', marginBottom: '8px' }}>WhatsApp Us!</h3>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', marginBottom: '20px' }}>Get instant replies on WhatsApp. Send us your ticket screenshot after booking.</p>
              <a href={brand.whatsapp} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '12px 28px', borderRadius: '50px', background: '#fff', color: '#128C7E', fontWeight: 800, fontSize: '0.95rem' }}>
                +91 {brand.phone}
              </a>
            </div>

            <div style={s.mapCard}>
              <iframe
                src={contactInfo.mapEmbed}
                width="100%" height="100%" style={{ border: 0, display: 'block' }}
                allowFullScreen="" loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Book My Resorts Location"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media(max-width:900px){.contact-grid{grid-template-columns:1fr!important;}}
      `}</style>
    </main>
  );
}
