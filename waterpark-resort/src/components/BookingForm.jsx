import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { resorts } from '../data/siteData';
import { paymentAPI } from '../services/api';
import {
  FaCheck, FaCar, FaCalendarAlt, FaUser, FaUsers,
  FaInfoCircle, FaWhatsapp, FaChild, FaSpinner,
} from 'react-icons/fa';

// ─── Razorpay loader ─────────────────────────────────────────────────────────
const loadRazorpay = () =>
  new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

// ─── Toast component ──────────────────────────────────────────────────────────
function Toast({ msg, type }) {
  if (!msg) return null;
  const bg = type === 'error' ? '#FF4444' : type === 'success' ? '#22C55E' : '#D4AF37';
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
      style={{ position: 'fixed', top: 24, right: 24, zIndex: 9999, background: bg, color: '#fff', padding: '14px 22px', borderRadius: 12, fontWeight: 700, boxShadow: '0 8px 32px rgba(0,0,0,0.2)', maxWidth: 360 }}
    >
      {msg}
    </motion.div>
  );
}

export default function BookingForm() {
  const navigate = useNavigate();
  const {
    selectedResort, setSelectedResort,
    adults, setAdults, kids, setKids,
    date, setDate,
    travelAssistance, setTravelAssistance,
    name, setName, mobile, setMobile, email, setEmail,
    specialNote, setSpecialNote,
    totalMembers, canUseTravelAssistance,
    adultTotal, kidsTotal,
    finalTotal, advanceAmount, remainingAmount,
    BOOKING_PRICING,
  } = useBooking();

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ msg: '', type: '' });
  const [currentImg, setCurrentImg] = useState(0);

  const bannerImages = selectedResort?.images || [];

  const showToast = (msg, type = 'info') => {
    setToast({ msg, type });
    setTimeout(() => setToast({ msg: '', type: '' }), 4500);
  };

  const validate = () => {
    const e = {};
    if (!selectedResort) e.resort = 'Please select a resort.';
    if (!name.trim()) e.name = 'Please enter your full name.';
    if (!mobile.trim() || mobile.length < 10) e.mobile = 'Enter a valid 10-digit mobile number.';
    if (!email.trim() || !email.includes('@')) e.email = 'Enter a valid email address.';
    if (!date) e.date = 'Please select a date.';
    if (adults < 1) e.adults = 'At least 1 adult required.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    showToast('Creating your booking...', 'info');

    try {
      // Load Razorpay script
      const loaded = await loadRazorpay();
      if (!loaded) throw new Error('Razorpay SDK failed to load. Check your internet connection.');

      // Find matching backend resort (by name or use first)
      // In production: use the MongoDB _id. Here we match by name from siteData.
      const resortPayload = {
        resortId: selectedResort._id || selectedResort.id,
        guestCount: totalMembers,
        adults,
        kids,
        checkIn: date,
        userDetails: { name, email, phone: mobile },
        specialNote,
        travelAssistance,
      };

      // Create order on backend
      const orderRes = await paymentAPI.createOrder(resortPayload);
      const { orderId, amount, key, bookingId, bookingRef, resortName, prefill } = orderRes.data;

      showToast('Opening payment gateway...', 'info');

      // Open Razorpay checkout
      const options = {
        key,
        amount: amount * 100,
        currency: 'INR',
        name: 'Book My Resorts',
        description: resortName,
        order_id: orderId,
        prefill: {
          name: prefill.name,
          email: prefill.email,
          contact: prefill.contact,
        },
        theme: { color: '#D4AF37' },
        modal: {
          ondismiss: () => {
            setLoading(false);
            showToast('Payment cancelled. Your booking is on hold.', 'error');
          },
        },
        handler: async (response) => {
          try {
            showToast('Verifying payment...', 'info');
            const verifyRes = await paymentAPI.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              bookingId,
            });
            showToast('Payment verified! Booking confirmed 🎉', 'success');
            setTimeout(() => {
              navigate(`/booking/success?ref=${bookingRef}&bookingId=${bookingId}`);
            }, 1000);
          } catch (err) {
            showToast(`Payment verification failed: ${err.message}`, 'error');
            navigate(`/booking/failed?bookingId=${bookingId}`);
          } finally {
            setLoading(false);
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', (response) => {
        setLoading(false);
        showToast(`Payment failed: ${response.error.description}`, 'error');
        navigate(`/booking/failed?bookingId=${bookingId}`);
      });
      rzp.open();

    } catch (err) {
      setLoading(false);
      showToast(err.message || 'Something went wrong. Please try again.', 'error');
    }
  };

  const S = {
    wrapper: { display: 'grid', gridTemplateColumns: '1fr 400px', gap: '32px', alignItems: 'start' },
    form: { background: '#1a1a1a', borderRadius: '28px', padding: '44px', boxShadow: '0 8px 40px rgba(0,0,0,0.4)', border: '1px solid rgba(212,175,55,0.15)' },
    secTitle: { fontSize: '0.9rem', fontWeight: 700, color: '#D4AF37', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '14px', marginTop: '28px', display: 'flex', alignItems: 'center', gap: '8px' },
    label: { fontSize: '0.85rem', fontWeight: 600, color: '#D4AF37', marginBottom: '6px', display: 'block' },
    input: (err) => ({ padding: '12px 16px', borderRadius: '12px', border: `1.5px solid ${err ? '#FF6B6B' : 'rgba(212,175,55,0.25)'}`, fontSize: '0.95rem', color: '#FFD700', outline: 'none', background: 'rgba(255,255,255,0.05)', width: '100%', boxSizing: 'border-box' }),
    inputRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' },
    inputGroup: { display: 'flex', flexDirection: 'column' },
    errMsg: { color: '#FF6B6B', fontSize: '0.8rem', marginTop: '4px' },
    counterRow: { display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '8px' },
    counterBtn: { width: '38px', height: '38px', borderRadius: '50%', border: '2px solid rgba(212,175,55,0.4)', background: '#000', color: '#D4AF37', fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
    counterNum: { fontSize: '1.5rem', fontWeight: 900, color: '#FFD700', minWidth: '36px', textAlign: 'center' },
    toggleRow: (active) => ({ display: 'flex', alignItems: 'center', gap: '14px', padding: '16px 18px', borderRadius: '14px', background: active ? 'rgba(212,175,55,0.08)' : 'rgba(255,255,255,0.03)', border: `1.5px solid ${active ? 'rgba(212,175,55,0.4)' : 'rgba(212,175,55,0.15)'}`, cursor: 'pointer', userSelect: 'none', marginBottom: '12px' }),
    toggleSwitch: (active) => ({ width: '46px', height: '25px', borderRadius: '13px', background: active ? 'linear-gradient(135deg, #D4AF37, #FFD700)' : '#CBD5E1', position: 'relative', transition: 'all 0.3s', flexShrink: 0 }),
    toggleKnob: (active) => ({ position: 'absolute', top: '3px', left: active ? '23px' : '3px', width: '19px', height: '19px', borderRadius: '50%', background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', transition: 'left 0.3s cubic-bezier(0.4,0,0.2,1)' }),
    warnBox: { background: 'rgba(255,150,50,0.08)', border: '1px solid rgba(255,150,50,0.3)', borderRadius: '10px', padding: '10px 14px', fontSize: '0.82rem', color: '#c45e00', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' },
    infoBox: { background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '10px', padding: '10px 14px', fontSize: '0.82rem', color: '#22c55e', marginBottom: '16px', display: 'flex', alignItems: 'flex-start', gap: '8px' },
    submitBtn: { width: '100%', padding: '16px', borderRadius: '14px', background: loading ? '#333' : 'linear-gradient(135deg, #D4AF37, #FFD700)', color: '#000', fontWeight: 800, fontSize: '1.05rem', marginTop: '28px', boxShadow: '0 8px 32px rgba(212,175,55,0.4)', letterSpacing: '0.3px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: loading ? 'not-allowed' : 'pointer' },
    summaryWrap: { position: 'sticky', top: '100px', borderRadius: '28px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.25)' },
    banner: { position: 'relative', height: '160px', overflow: 'hidden', background: '#111' },
    bannerImg: { width: '100%', height: '100%', objectFit: 'cover', opacity: 0.75 },
    bannerOverlay: { position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.7))' },
    bannerLabel: { position: 'absolute', bottom: '14px', left: '16px', color: '#FFD700', fontWeight: 800, fontSize: '1rem' },
    summary: { background: 'linear-gradient(160deg, #D4AF37, #FFD700)', padding: '28px 32px', color: '#111' },
    summaryTitle: { fontSize: '1rem', fontWeight: 800, marginBottom: '20px', letterSpacing: '-0.2px', color: '#111' },
    sItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid rgba(0,0,0,0.1)', fontSize: '0.9rem' },
    sLabel: { color: 'rgba(0,0,0,0.7)' },
    sValue: { fontWeight: 700, color: '#111' },
    totalRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', paddingTop: '16px', borderTop: '2px solid rgba(0,0,0,0.2)' },
    advanceBox: { background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '14px', padding: '16px', marginTop: '16px', textAlign: 'center' },
  };

  return (
    <>
      <AnimatePresence>
        {toast.msg && <Toast msg={toast.msg} type={toast.type} />}
      </AnimatePresence>

      <div style={S.wrapper} className="booking-grid">
        {/* FORM */}
        <form onSubmit={handlePayment} style={S.form}>
          <div style={{ ...S.secTitle, marginTop: 0 }}>🏖️ Select Resort</div>
          <select style={{ ...S.input(errors.resort), marginBottom: '8px' }}
            value={selectedResort?.id || ''}
            onChange={(e) => { const r = resorts.find(res => res.id === parseInt(e.target.value)); setSelectedResort(r || null); setErrors(p => ({ ...p, resort: '' })); }}>
            <option value="">-- Choose a Resort --</option>
            {resorts.map(r => <option key={r.id} value={r.id}>{r.name} (₹{r.price}/person)</option>)}
          </select>
          {errors.resort && <p style={S.errMsg}>{errors.resort}</p>}

          {selectedResort && (
            <div style={{ ...S.infoBox, marginTop: '10px' }}>
              <FaInfoCircle style={{ flexShrink: 0, marginTop: '2px' }} />
              <span><strong>{selectedResort.name}</strong> — ₹{selectedResort.price}/adult · Kids (under 8): ₹{BOOKING_PRICING.KIDS_PRICE}</span>
            </div>
          )}

          <div style={S.secTitle}><FaUser /> Personal Details</div>
          <div style={S.inputRow} className="booking-input-row">
            <div style={S.inputGroup}>
              <label style={S.label}>Full Name *</label>
              <input style={S.input(errors.name)} value={name} placeholder="Your full name"
                onChange={e => { setName(e.target.value); setErrors(p => ({ ...p, name: '' })); }} />
              {errors.name && <p style={S.errMsg}>{errors.name}</p>}
            </div>
            <div style={S.inputGroup}>
              <label style={S.label}>Mobile Number *</label>
              <input style={S.input(errors.mobile)} value={mobile} placeholder="10-digit mobile"
                maxLength={10} onChange={e => { setMobile(e.target.value.replace(/\D/g, '')); setErrors(p => ({ ...p, mobile: '' })); }} />
              {errors.mobile && <p style={S.errMsg}>{errors.mobile}</p>}
            </div>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={S.label}>Email Address *</label>
            <input style={S.input(errors.email)} value={email} placeholder="you@email.com"
              onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: '' })); }} />
            {errors.email && <p style={S.errMsg}>{errors.email}</p>}
          </div>

          <div style={S.secTitle}><FaCalendarAlt /> Visit Date</div>
          <div style={{ marginBottom: '8px' }}>
            <input type="date" style={S.input(errors.date)} value={date}
              min={new Date().toISOString().split('T')[0]}
              onChange={e => { setDate(e.target.value); setErrors(p => ({ ...p, date: '' })); }} />
            {errors.date && <p style={S.errMsg}>{errors.date}</p>}
          </div>

          <div style={S.secTitle}><FaUser /> Adults</div>
          <div style={S.counterRow}>
            <motion.button type="button" style={S.counterBtn} onClick={() => setAdults(a => Math.max(1, a - 1))} whileTap={{ scale: 0.9 }}>−</motion.button>
            <span style={S.counterNum}>{adults}</span>
            <motion.button type="button" style={S.counterBtn} onClick={() => setAdults(a => Math.min(30, a + 1))} whileTap={{ scale: 0.9 }}>+</motion.button>
            <span style={{ color: '#90A4B8', fontSize: '0.85rem' }}>× ₹{selectedResort?.price || '—'} = ₹{adultTotal().toLocaleString()}</span>
          </div>

          <div style={S.secTitle}><FaChild /> Kids (under 8 years)</div>
          <div style={S.counterRow}>
            <motion.button type="button" style={S.counterBtn} onClick={() => setKids(k => Math.max(0, k - 1))} whileTap={{ scale: 0.9 }}>−</motion.button>
            <span style={S.counterNum}>{kids}</span>
            <motion.button type="button" style={S.counterBtn} onClick={() => setKids(k => Math.min(20, k + 1))} whileTap={{ scale: 0.9 }}>+</motion.button>
            <span style={{ color: '#90A4B8', fontSize: '0.85rem' }}>× ₹{BOOKING_PRICING.KIDS_PRICE} = ₹{kidsTotal().toLocaleString()}</span>
          </div>
          <p style={{ color: '#90A4B8', fontSize: '0.8rem', marginBottom: '8px' }}>
            Total Members: <strong style={{ color: '#B8860B' }}>{totalMembers}</strong>
          </p>

          <div style={S.secTitle}><FaCar /> Travel Assistance</div>
          {!canUseTravelAssistance && (
            <div style={S.warnBox}><FaInfoCircle /> Travel assistance available only for groups of 4 or more.</div>
          )}
          <div style={S.toggleRow(travelAssistance && canUseTravelAssistance)} onClick={() => canUseTravelAssistance && setTravelAssistance(t => !t)}>
            <div style={S.toggleSwitch(travelAssistance && canUseTravelAssistance)}><div style={S.toggleKnob(travelAssistance && canUseTravelAssistance)} /></div>
            <div>
              <div style={{ fontWeight: 700, color: canUseTravelAssistance ? '#B8860B' : '#aaa', fontSize: '0.92rem' }}>{travelAssistance && canUseTravelAssistance ? 'Travel Assistance Included ✓' : 'Add Travel Assistance'}</div>
              <div style={{ color: '#16a34a', fontSize: '0.85rem', fontWeight: 700 }}>✓ Pickup & Drop Included</div>
            </div>
          </div>



          <div style={S.secTitle}>📝 Special Note (Optional)</div>
          <textarea style={{ ...S.input(false), minHeight: '90px', resize: 'vertical', fontFamily: 'inherit' }}
            value={specialNote} placeholder="Any special requests..."
            onChange={e => setSpecialNote(e.target.value)} />

          <div style={{ ...S.infoBox, marginTop: '16px' }}>
            <FaInfoCircle style={{ flexShrink: 0, marginTop: '2px', color: '#B8860B' }} />
            <span>
              <strong>Only ₹50 per person is required to confirm booking.</strong>
              {' '}Advance: ₹{advanceAmount().toLocaleString()} for {totalMembers} member{totalMembers > 1 ? 's' : ''}.
              Remaining ₹{remainingAmount().toLocaleString()} paid at resort.
            </span>
          </div>

          <motion.button type="submit" style={S.submitBtn} disabled={loading}
            whileHover={!loading ? { scale: 1.02, boxShadow: '0 12px 40px rgba(212,175,55,0.55)' } : {}}
            whileTap={!loading ? { scale: 0.97 } : {}}>
            {loading ? <><FaSpinner style={{ animation: 'spin 1s linear infinite' }} /> Processing...</> : `Pay ₹${advanceAmount().toLocaleString()} Advance via Razorpay`}
          </motion.button>

          <style>{`@keyframes spin { to { transform: rotate(360deg); } } @media (max-width: 900px) { .booking-grid { grid-template-columns: 1fr !important; } .booking-summary { position: static !important; } .booking-input-row { grid-template-columns: 1fr !important; } }`}</style>
        </form>

        {/* SUMMARY PANEL */}
        <div style={S.summaryWrap} className="booking-summary">
          {bannerImages.length > 0 && (
            <div style={S.banner}>
              <AnimatePresence mode="wait">
                <motion.img key={currentImg} src={bannerImages[currentImg % bannerImages.length]} alt="resort" style={S.bannerImg}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}
                  onError={e => { e.target.style.display = 'none'; }} />
              </AnimatePresence>
              <div style={S.bannerOverlay} />
              <div style={S.bannerLabel}>{selectedResort?.name || 'Select a Resort'}</div>
              <div style={{ position: 'absolute', bottom: '10px', right: '12px', display: 'flex', gap: '5px', zIndex: 2 }}>
                {bannerImages.slice(0, 5).map((_, i) => (
                  <div key={i} onClick={() => setCurrentImg(i)}
                    style={{ width: i === currentImg % bannerImages.length ? '14px' : '6px', height: '6px', borderRadius: '3px', background: i === currentImg % bannerImages.length ? '#FFD700' : 'rgba(255,255,255,0.4)', transition: 'all 0.25s', cursor: 'pointer' }} />
                ))}
              </div>
            </div>
          )}
          <div style={S.summary}>
            <h3 style={S.summaryTitle}>📋 Booking Summary</h3>
            {selectedResort && (
              <div style={{ ...S.sItem, borderBottom: '2px solid rgba(0,0,0,0.2)', paddingBottom: '14px', marginBottom: '10px' }}>
                <span style={{ fontWeight: 800, fontSize: '1rem' }}>{selectedResort.emoji} {selectedResort.name}</span>
                <span style={{ fontWeight: 700 }}>₹{selectedResort.price}/adult</span>
              </div>
            )}
            <div style={S.sItem}><span style={S.sLabel}><FaUser style={{ marginRight: '6px' }} />Adults × {adults}</span><span style={S.sValue}>₹{adultTotal().toLocaleString()}</span></div>
            {kids > 0 && <div style={S.sItem}><span style={S.sLabel}><FaChild style={{ marginRight: '6px' }} />Kids × {kids}</span><span style={S.sValue}>₹{kidsTotal().toLocaleString()}</span></div>}
            {date && <div style={S.sItem}><span style={S.sLabel}><FaCalendarAlt style={{ marginRight: '6px' }} />Date</span><span style={S.sValue}>{date}</span></div>}
            <div style={S.sItem}><span style={S.sLabel}><FaUsers style={{ marginRight: '6px' }} />Total Members</span><span style={S.sValue}>{totalMembers}</span></div>
            <div style={S.totalRow}>
              <span style={{ fontSize: '0.95rem', fontWeight: 700 }}>Total Amount</span>
              <span style={{ fontSize: '2rem', fontWeight: 900 }}>₹{finalTotal().toLocaleString()}</span>
            </div>
            <div style={S.advanceBox}>
              <div style={{ color: '#111', fontWeight: 800, fontSize: '0.95rem', marginBottom: '8px' }}>💳 Pay Now (Advance)</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, marginBottom: '4px' }}>₹{advanceAmount().toLocaleString()}</div>
              <div style={{ color: 'rgba(0,0,0,0.65)', fontSize: '0.78rem' }}>₹50 × {totalMembers} member{totalMembers > 1 ? 's' : ''}</div>
              <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid rgba(0,0,0,0.15)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.83rem' }}>
                  <span style={{ color: 'rgba(0,0,0,0.65)' }}>Pay at Resort</span>
                  <span style={{ fontWeight: 700 }}>₹{remainingAmount().toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
