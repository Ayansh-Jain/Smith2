/**
 * API Service Layer — centralised Axios-like fetch wrapper
 * All backend calls go through here.
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Generic fetch helper
 */
const apiFetch = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint}`;
  const token = localStorage.getItem('adminToken');

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(url, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || `Request failed with status ${response.status}`);
  }

  return data;
};

// ─── Resort APIs ──────────────────────────────────────────────────────────────
export const resortAPI = {
  /** Fetch all active resorts from backend */
  getAll: () => apiFetch('/resorts'),

  /** Fetch a single resort by MongoDB _id */
  getById: (id) => apiFetch(`/resorts/${id}`),
};

// ─── Payment APIs ─────────────────────────────────────────────────────────────
export const paymentAPI = {
  /**
   * Step 1: Create Razorpay order
   * @param {Object} payload - { resortId, guestCount, checkIn, checkOut, userDetails, ... }
   */
  createOrder: (payload) =>
    apiFetch('/payment/create-order', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  /**
   * Step 2: Verify payment after Razorpay success
   * @param {Object} payload - { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId }
   */
  verifyPayment: (payload) =>
    apiFetch('/payment/verify-payment', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  /**
   * Get booking status by bookingId
   */
  getBookingStatus: (bookingId) => apiFetch(`/payment/booking/${bookingId}`),
};

// ─── Admin APIs ───────────────────────────────────────────────────────────────
export const adminAPI = {
  login: (credentials) =>
    apiFetch('/admin/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  getMe: () => apiFetch('/admin/me'),
  getDashboard: () => apiFetch('/admin/dashboard'),

  // Bookings
  getBookings: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return apiFetch(`/admin/bookings${qs ? `?${qs}` : ''}`);
  },
  getBookingById: (id) => apiFetch(`/admin/bookings/${id}`),
  cancelBooking: (id) => apiFetch(`/admin/bookings/${id}/cancel`, { method: 'PATCH' }),
  markRefund: (bookingId, note = '') =>
    apiFetch(`/admin/refund/${bookingId}`, {
      method: 'PATCH',
      body: JSON.stringify({ note }),
    }),

  // Resorts (admin)
  getResorts: () => apiFetch('/admin/resorts'),
  createResort: (formData) =>
    apiFetch('/admin/resorts', {
      method: 'POST',
      headers: {}, // Let browser set multipart boundary
      body: formData,
    }),
  updateResort: (id, formData) =>
    apiFetch(`/admin/resorts/${id}`, {
      method: 'PUT',
      headers: {},
      body: formData,
    }),
  deleteResort: (id) => apiFetch(`/admin/resorts/${id}`, { method: 'DELETE' }),
};

export default apiFetch;
