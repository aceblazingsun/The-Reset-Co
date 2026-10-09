// Endpoint: /api/dashboard-bookings
// Authenticated Server-Side Proxy for Sanctuary Operations HQ (Supabase)

import { applyCors, verifySessionToken, isValidUUID, sanitizeString, checkRateLimit } from './security.js';

export default async function handler(req, res) {
  if (applyCors(req, res, 'GET, PATCH, DELETE, OPTIONS')) return;

  // 1. Session Token Verification
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : req.headers['x-dashboard-token'];
  const session = verifySessionToken(token);

  if (!session) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized. Active session token is missing or expired. Please sign in again.'
    });
  }

  // 2. Rate Limit (60 requests per minute per authenticated user)
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'ip';
  const limiter = checkRateLimit(`dash-api:${clientIp}`, 60, 60000);
  if (!limiter.allowed) {
    return res.status(429).json({ success: false, error: 'Rate limit exceeded. Please wait a moment.' });
  }

  const supabaseUrl = process.env.SUPABASE_URL || 'https://vsscbjpuafnniouqzwvj.supabase.co';
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || 'sb_publishable_0Vnbd-77R7dP5UklEz90Mw_uS_SCn_5';

  if (!supabaseUrl || !supabaseKey) {
    return res.status(503).json({
      success: false,
      error: 'Database configuration missing in environment variables.'
    });
  }

  const headers = {
    'apikey': supabaseKey,
    'Authorization': `Bearer ${supabaseKey}`,
    'Content-Type': 'application/json'
  };

  try {
    // ─── A. GET: Fetch all inquiries ───
    if (req.method === 'GET') {
      const resp = await fetch(`${supabaseUrl}/rest/v1/retreat_bookings?select=*&order=created_at.desc`, {
        headers
      });

      if (!resp.ok) {
        console.error('Supabase fetch failed with status:', resp.status);
        return res.status(502).json({ success: false, error: 'Failed to retrieve bookings from database.' });
      }

      const data = await resp.json();
      return res.status(200).json({ success: true, data: Array.isArray(data) ? data : [] });
    }

    // ─── B. PATCH: Update inquiry status or notes ───
    if (req.method === 'PATCH') {
      const { id, status, notes } = req.body || {};

      if (!id || typeof id !== 'string') {
        return res.status(400).json({ success: false, error: 'Valid booking ID is required.' });
      }

      // Restrict status to allowed lifecycle values
      const allowedStatuses = ['new', 'consultation', 'confirmed', 'cancelled', 'archived'];
      const patchPayload = {};

      if (status) {
        if (!allowedStatuses.includes(status)) {
          return res.status(400).json({ success: false, error: 'Invalid booking status value.' });
        }
        patchPayload.status = status;
      }

      if (notes !== undefined) {
        patchPayload['health notes'] = sanitizeString(notes, 4000);
      }

      if (Object.keys(patchPayload).length === 0) {
        return res.status(400).json({ success: false, error: 'No valid update fields provided.' });
      }

      const resp = await fetch(`${supabaseUrl}/rest/v1/retreat_bookings?id=eq.${encodeURIComponent(id)}`, {
        method: 'PATCH',
        headers: { ...headers, 'Prefer': 'return=representation' },
        body: JSON.stringify(patchPayload)
      });

      if (!resp.ok) {
        console.error('Supabase PATCH failed with status:', resp.status);
        return res.status(502).json({ success: false, error: 'Failed to update booking status.' });
      }

      const updated = await resp.json();
      return res.status(200).json({ success: true, updated });
    }

    // ─── C. DELETE: Remove booking inquiry ───
    if (req.method === 'DELETE') {
      const id = req.query.id || (req.body && req.body.id);

      if (!id || typeof id !== 'string') {
        return res.status(400).json({ success: false, error: 'Valid booking ID is required.' });
      }

      const resp = await fetch(`${supabaseUrl}/rest/v1/retreat_bookings?id=eq.${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: { ...headers, 'Prefer': 'return=minimal' }
      });

      if (!resp.ok) {
        console.error('Supabase DELETE failed with status:', resp.status);
        return res.status(502).json({ success: false, error: 'Failed to delete booking.' });
      }

      return res.status(200).json({ success: true, message: 'Inquiry record removed successfully.' });
    }

    return res.status(405).json({ success: false, error: 'Method not allowed.' });

  } catch (error) {
    console.error('Dashboard bookings proxy error:', error);
    return res.status(500).json({
      success: false,
      error: 'An unexpected internal error occurred. Please try again.'
    });
  }
}
