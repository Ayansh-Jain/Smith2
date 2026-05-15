import { useState, useEffect } from 'react';
import { adminAPI } from '../services/api';

const S = {
  page: { minHeight: '100vh', background: '#0f0f0f', fontFamily: 'Inter, sans-serif' },
  login: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0A0A0A, #1a1a1a)' },
  loginCard: { background: '#1a1a1a', borderRadius: 20, padding: '48px 40px', width: 400, boxShadow: '0 30px 80px rgba(0,0,0,0.5)', border: '1px solid rgba(212,175,55,0.2)' },
  sidebar: { position: 'fixed', top: 0, left: 0, width: 240, height: '100vh', background: '#111', borderRight: '1px solid rgba(212,175,55,0.15)', padding: '28px 0', zIndex: 100 },
  main: { marginLeft: 240, padding: '32px', background: '#0f0f0f', minHeight: '100vh' },
  card: { background: '#1a1a1a', borderRadius: 16, padding: '24px', border: '1px solid rgba(255,255,255,0.06)' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { background: 'rgba(212,175,55,0.1)', color: '#D4AF37', fontWeight: 700, padding: '12px 16px', textAlign: 'left', fontSize: '0.8rem', letterSpacing: '1px', textTransform: 'uppercase' },
  td: { padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#ccc', fontSize: '0.88rem' },
  badge: (color) => ({ background: color + '22', color, padding: '4px 10px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }),
  input: { width: '100%', padding: '12px 14px', background: '#111', border: '1px solid rgba(212,175,55,0.3)', borderRadius: 10, color: '#fff', fontSize: '0.95rem', boxSizing: 'border-box', marginBottom: 12 },
  btn: (bg='#D4AF37', color='#111') => ({ padding: '10px 20px', background: bg, color, borderRadius: 10, fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: '0.88rem' }),
  statCard: (color) => ({ background: '#1a1a1a', borderRadius: 14, padding: '22px 24px', borderLeft: `4px solid ${color}`, border: `1px solid rgba(255,255,255,0.06)` }),
};

const statusColor = { pending: '#F59E0B', confirmed: '#22C55E', cancelled: '#EF4444', paid: '#22C55E', failed: '#EF4444', refunded: '#8B5CF6', not_requested: '#6B7280', requested: '#F59E0B' };

function LoginPage({ onLogin }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true); setError('');
    try {
      const res = await adminAPI.login(form);
      localStorage.setItem('adminToken', res.data.token);
      onLogin(res.data);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  return (
    <div style={S.login}>
      <div style={S.loginCard}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: '2.5rem', marginBottom: 8 }}>🏖️</div>
          <h1 style={{ color: '#D4AF37', fontSize: '1.5rem', fontWeight: 900, margin: 0 }}>Admin Panel</h1>
          <p style={{ color: '#666', margin: '8px 0 0', fontSize: '0.88rem' }}>Book My Resorts</p>
        </div>
        {error && <div style={{ background: '#EF444422', border: '1px solid #EF4444', borderRadius: 10, padding: '10px 14px', color: '#EF4444', marginBottom: 16, fontSize: '0.88rem' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <input style={S.input} type="email" placeholder="Admin Email" value={form.email}
            onChange={e => setForm(p => ({ ...p, email: e.target.value }))} required />
          <input style={S.input} type="password" placeholder="Password" value={form.password}
            onChange={e => setForm(p => ({ ...p, password: e.target.value }))} required />
          <button type="submit" style={{ ...S.btn(), width: '100%', padding: '14px', fontSize: '1rem', marginTop: 4, opacity: loading ? 0.7 : 1 }} disabled={loading}>
            {loading ? 'Logging in...' : 'Login to Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
}

function Sidebar({ active, setActive, onLogout }) {
  const items = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'bookings', label: 'Bookings', icon: '📋' },
    { id: 'resorts', label: 'Resorts', icon: '🏖️' },
  ];
  return (
    <div style={S.sidebar}>
      <div style={{ padding: '0 24px 28px', borderBottom: '1px solid rgba(212,175,55,0.15)' }}>
        <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#D4AF37' }}>🏖️ BMR Admin</div>
      </div>
      <nav style={{ padding: '20px 12px' }}>
        {items.map(item => (
          <button key={item.id} onClick={() => setActive(item.id)}
            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 10, background: active === item.id ? 'rgba(212,175,55,0.12)' : 'transparent', color: active === item.id ? '#D4AF37' : '#999', fontWeight: active === item.id ? 700 : 400, border: 'none', cursor: 'pointer', fontSize: '0.92rem', marginBottom: 4 }}>
            <span>{item.icon}</span>{item.label}
          </button>
        ))}
      </nav>
      <div style={{ position: 'absolute', bottom: 24, left: 12, right: 12 }}>
        <button onClick={onLogout} style={{ ...S.btn('#EF444420', '#EF4444'), width: '100%', border: '1px solid #EF444440' }}>
          🚪 Logout
        </button>
      </div>
    </div>
  );
}

function Dashboard() {
  const [stats, setStats] = useState(null);
  useEffect(() => { adminAPI.getDashboard().then(r => setStats(r.data)).catch(() => {}); }, []);
  if (!stats) return <div style={{ color: '#666', padding: 40 }}>Loading dashboard...</div>;
  const statItems = [
    { label: 'Total Bookings', value: stats.totalBookings, color: '#D4AF37', icon: '📋' },
    { label: 'Confirmed', value: stats.confirmedBookings, color: '#22C55E', icon: '✅' },
    { label: 'Pending', value: stats.pendingBookings, color: '#F59E0B', icon: '⏳' },
    { label: 'Revenue Collected', value: `₹${(stats.totalRevenueCollected || 0).toLocaleString('en-IN')}`, color: '#8B5CF6', icon: '💰' },
    { label: 'Active Resorts', value: stats.totalResorts, color: '#06B6D4', icon: '🏖️' },
  ];
  return (
    <div>
      <h2 style={{ color: '#D4AF37', fontWeight: 900, marginBottom: 28, fontSize: '1.6rem' }}>Dashboard</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 16, marginBottom: 32 }}>
        {statItems.map(s => (
          <div key={s.label} style={S.statCard(s.color)}>
            <div style={{ fontSize: '2rem', marginBottom: 8 }}>{s.icon}</div>
            <div style={{ color: '#999', fontSize: '0.8rem', marginBottom: 4 }}>{s.label}</div>
            <div style={{ color: '#fff', fontWeight: 900, fontSize: '1.6rem' }}>{s.value}</div>
          </div>
        ))}
      </div>
      <div style={S.card}>
        <h3 style={{ color: '#D4AF37', fontWeight: 700, marginBottom: 16 }}>Recent Bookings</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={S.table}>
            <thead><tr>{['Ref', 'Customer', 'Resort', 'Date', 'Guests', 'Advance', 'Status'].map(h => <th key={h} style={S.th}>{h}</th>)}</tr></thead>
            <tbody>
              {(stats.recentBookings || []).map(b => (
                <tr key={b._id}>
                  <td style={{ ...S.td, color: '#D4AF37', fontFamily: 'monospace' }}>{b.bookingRef}</td>
                  <td style={S.td}>{b.customerName}</td>
                  <td style={S.td}>{b.resortName}</td>
                  <td style={S.td}>{b.checkIn ? new Date(b.checkIn).toLocaleDateString('en-IN') : '-'}</td>
                  <td style={S.td}>{b.guestCount}</td>
                  <td style={{ ...S.td, color: '#22C55E', fontWeight: 700 }}>₹{b.advanceAmount}</td>
                  <td style={S.td}><span style={S.badge(statusColor[b.bookingStatus] || '#666')}>{b.bookingStatus}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [msg, setMsg] = useState('');

  const load = () => {
    setLoading(true);
    const params = filter ? { paymentStatus: filter } : {};
    adminAPI.getBookings(params).then(r => { setBookings(r.data); setLoading(false); }).catch(() => setLoading(false));
  };
  useEffect(load, [filter]);

  const handleRefund = async (id, ref) => {
    if (!confirm(`Mark booking ${ref} as refunded?`)) return;
    try {
      await adminAPI.markRefund(id, 'Manual refund by admin');
      setMsg(`✅ Booking ${ref} marked as refunded`);
      load();
    } catch (err) { setMsg(`❌ ${err.message}`); }
    setTimeout(() => setMsg(''), 4000);
  };

  const handleCancel = async (id, ref) => {
    if (!confirm(`Cancel booking ${ref}?`)) return;
    try {
      await adminAPI.cancelBooking(id);
      setMsg(`✅ Booking ${ref} cancelled`);
      load();
    } catch (err) { setMsg(`❌ ${err.message}`); }
    setTimeout(() => setMsg(''), 4000);
  };

  return (
    <div>
      <h2 style={{ color: '#D4AF37', fontWeight: 900, marginBottom: 20, fontSize: '1.6rem' }}>All Bookings</h2>
      {msg && <div style={{ background: msg.startsWith('✅') ? '#22C55E22' : '#EF444422', border: `1px solid ${msg.startsWith('✅') ? '#22C55E' : '#EF4444'}`, color: msg.startsWith('✅') ? '#22C55E' : '#EF4444', borderRadius: 10, padding: '10px 16px', marginBottom: 16 }}>{msg}</div>}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
        {['', 'pending', 'paid', 'failed', 'refunded'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ ...S.btn(filter === f ? '#D4AF37' : '#222', filter === f ? '#111' : '#999'), border: '1px solid rgba(212,175,55,0.3)' }}>
            {f || 'All'}
          </button>
        ))}
      </div>
      <div style={S.card}>
        {loading ? <div style={{ color: '#666', padding: 20 }}>Loading...</div> : (
          <div style={{ overflowX: 'auto' }}>
            <table style={S.table}>
              <thead><tr>{['Ref', 'Customer', 'Resort', 'Date', 'Guests', 'Advance', 'Remaining', 'Payment', 'Booking', 'Actions'].map(h => <th key={h} style={S.th}>{h}</th>)}</tr></thead>
              <tbody>
                {bookings.map(b => (
                  <tr key={b._id}>
                    <td style={{ ...S.td, color: '#D4AF37', fontFamily: 'monospace', fontSize: '0.78rem' }}>{b.bookingRef}</td>
                    <td style={S.td}><div style={{ fontWeight: 600, color: '#fff' }}>{b.customerName}</div><div style={{ fontSize: '0.78rem', color: '#666' }}>{b.email}</div></td>
                    <td style={S.td}>{b.resortName}</td>
                    <td style={S.td}>{b.checkIn ? new Date(b.checkIn).toLocaleDateString('en-IN') : '-'}</td>
                    <td style={{ ...S.td, textAlign: 'center' }}>{b.guestCount}</td>
                    <td style={{ ...S.td, color: '#22C55E', fontWeight: 700 }}>₹{b.advanceAmount}</td>
                    <td style={{ ...S.td, color: '#F59E0B', fontWeight: 700 }}>₹{b.remainingAmount}</td>
                    <td style={S.td}><span style={S.badge(statusColor[b.paymentStatus] || '#666')}>{b.paymentStatus}</span></td>
                    <td style={S.td}><span style={S.badge(statusColor[b.bookingStatus] || '#666')}>{b.bookingStatus}</span></td>
                    <td style={S.td}>
                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                        {b.paymentStatus === 'paid' && b.refundStatus !== 'refunded' && (
                          <button onClick={() => handleRefund(b._id, b.bookingRef)} style={{ ...S.btn('#8B5CF620', '#8B5CF6'), border: '1px solid #8B5CF640', padding: '6px 10px', fontSize: '0.75rem' }}>↩ Refund</button>
                        )}
                        {b.bookingStatus !== 'cancelled' && (
                          <button onClick={() => handleCancel(b._id, b.bookingRef)} style={{ ...S.btn('#EF444420', '#EF4444'), border: '1px solid #EF444440', padding: '6px 10px', fontSize: '0.75rem' }}>✕ Cancel</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {bookings.length === 0 && <tr><td colSpan={10} style={{ ...S.td, textAlign: 'center', color: '#444', padding: '40px' }}>No bookings found</td></tr>}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function ResortForm({ resort, onSave, onCancel }) {
  const [form, setForm] = useState({
    name: resort?.name || '', location: resort?.location || '',
    description: resort?.description || '', shortDesc: resort?.shortDesc || '',
    pricePerPerson: resort?.pricePerPerson || '', capacity: resort?.capacity || '',
    availableRooms: resort?.availableRooms || 0, emoji: resort?.emoji || '🏖️',
    amenities: (resort?.amenities || []).join(', '), isFeatured: resort?.isFeatured || false,
    imageUrls: (resort?.images || []).map(i => i.url || i).join('\n'),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true); setError('');
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (k === 'imageUrls') { v.split('\n').filter(Boolean).forEach(url => fd.append('imageUrls', url.trim())); }
        else fd.append(k, v);
      });
      if (resort?._id) await adminAPI.updateResort(resort._id, fd);
      else await adminAPI.createResort(fd);
      onSave();
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  const field = (label, key, type = 'text', extra = {}) => (
    <div style={{ marginBottom: 14 }}>
      <label style={{ color: '#999', fontSize: '0.82rem', display: 'block', marginBottom: 4 }}>{label}</label>
      {type === 'textarea'
        ? <textarea style={{ ...S.input, minHeight: 80, resize: 'vertical', fontFamily: 'inherit' }} value={form[key]} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))} {...extra} />
        : <input type={type} style={S.input} value={form[key]} onChange={e => setForm(p => ({ ...p, [key]: type === 'checkbox' ? e.target.checked : e.target.value }))} {...extra} />}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} style={S.card}>
      <h3 style={{ color: '#D4AF37', fontWeight: 800, marginBottom: 20 }}>{resort ? 'Edit Resort' : 'Add New Resort'}</h3>
      {error && <div style={{ background: '#EF444422', color: '#EF4444', borderRadius: 10, padding: '10px 14px', marginBottom: 14 }}>{error}</div>}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>{field('Resort Name *', 'name')}{field('Location *', 'location')}{field('Price Per Person (₹) *', 'pricePerPerson', 'number')}</div>
        <div>{field('Capacity *', 'capacity', 'number')}{field('Available Rooms', 'availableRooms', 'number')}{field('Emoji', 'emoji')}</div>
      </div>
      {field('Short Description', 'shortDesc', 'textarea')}
      {field('Full Description *', 'description', 'textarea')}
      {field('Amenities (comma-separated)', 'amenities')}
      {field('Image URLs (one per line)', 'imageUrls', 'textarea', { rows: 4 })}
      <label style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#ccc', marginBottom: 20, cursor: 'pointer' }}>
        <input type="checkbox" checked={form.isFeatured} onChange={e => setForm(p => ({ ...p, isFeatured: e.target.checked }))} style={{ width: 18, height: 18 }} />
        Featured Resort (shown prominently)
      </label>
      <div style={{ display: 'flex', gap: 12 }}>
        <button type="submit" style={{ ...S.btn(), padding: '12px 28px', opacity: loading ? 0.7 : 1 }} disabled={loading}>{loading ? 'Saving...' : (resort ? 'Update Resort' : 'Create Resort')}</button>
        <button type="button" onClick={onCancel} style={{ ...S.btn('#333', '#ccc') }}>Cancel</button>
      </div>
    </form>
  );
}

function Resorts() {
  const [resorts, setResorts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null=list, 'new'=create, resort=edit
  const [msg, setMsg] = useState('');

  const load = () => { setLoading(true); adminAPI.getResorts().then(r => { setResorts(r.data); setLoading(false); }).catch(() => setLoading(false)); };
  useEffect(load, []);

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete resort "${name}"? This cannot be undone.`)) return;
    try { await adminAPI.deleteResort(id); setMsg(`✅ "${name}" deleted`); load(); }
    catch (err) { setMsg(`❌ ${err.message}`); }
    setTimeout(() => setMsg(''), 4000);
  };

  if (editing !== null) return <ResortForm resort={editing === 'new' ? null : editing} onSave={() => { setEditing(null); load(); }} onCancel={() => setEditing(null)} />;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ color: '#D4AF37', fontWeight: 900, fontSize: '1.6rem', margin: 0 }}>Resorts</h2>
        <button onClick={() => setEditing('new')} style={{ ...S.btn(), display: 'flex', alignItems: 'center', gap: 8 }}>+ Add Resort</button>
      </div>
      {msg && <div style={{ background: msg.startsWith('✅') ? '#22C55E22' : '#EF444422', color: msg.startsWith('✅') ? '#22C55E' : '#EF4444', borderRadius: 10, padding: '10px 16px', marginBottom: 16 }}>{msg}</div>}
      {loading ? <div style={{ color: '#666' }}>Loading...</div> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 16 }}>
          {resorts.map(r => (
            <div key={r._id} style={{ ...S.card, position: 'relative' }}>
              {r.images?.[0] && <img src={r.images[0].url || r.images[0]} alt={r.name} style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 10, marginBottom: 12 }} onError={e => e.target.style.display = 'none'} />}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div>
                  <h3 style={{ color: '#fff', fontWeight: 800, margin: '0 0 4px', fontSize: '1rem' }}>{r.emoji} {r.name}</h3>
                  <p style={{ color: '#666', fontSize: '0.8rem', margin: 0 }}>📍 {r.location}</p>
                </div>
                {r.isFeatured && <span style={S.badge('#D4AF37')}>Featured</span>}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
                <span style={{ color: '#22C55E', fontWeight: 700 }}>₹{r.pricePerPerson}/person</span>
                <span style={{ color: '#666', fontSize: '0.82rem' }}>Cap: {r.capacity}</span>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => setEditing(r)} style={{ ...S.btn('#D4AF3722', '#D4AF37'), border: '1px solid #D4AF3740', flex: 1 }}>✏️ Edit</button>
                <button onClick={() => handleDelete(r._id, r.name)} style={{ ...S.btn('#EF444420', '#EF4444'), border: '1px solid #EF444440', flex: 1 }}>🗑 Delete</button>
              </div>
            </div>
          ))}
          {resorts.length === 0 && <div style={{ color: '#666', gridColumn: '1/-1', textAlign: 'center', padding: 40 }}>No resorts found. Add one!</div>}
        </div>
      )}
    </div>
  );
}

export default function AdminPanel() {
  const [admin, setAdmin] = useState(null);
  const [active, setActive] = useState('dashboard');

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      adminAPI.getMe().then(r => setAdmin(r.data)).catch(() => { localStorage.removeItem('adminToken'); });
    }
  }, []);

  const handleLogout = () => { localStorage.removeItem('adminToken'); setAdmin(null); };

  if (!admin) return <LoginPage onLogin={setAdmin} />;

  const panels = { dashboard: <Dashboard />, bookings: <Bookings />, resorts: <Resorts /> };

  return (
    <div style={S.page}>
      <Sidebar active={active} setActive={setActive} onLogout={handleLogout} />
      <main style={S.main}>
        <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ color: '#666', fontSize: '0.88rem' }}>Welcome back, <span style={{ color: '#D4AF37', fontWeight: 700 }}>{admin.name}</span></div>
          <span style={{ ...S.badge('#22C55E'), padding: '5px 12px' }}>● Live</span>
        </div>
        {panels[active]}
      </main>
    </div>
  );
}
