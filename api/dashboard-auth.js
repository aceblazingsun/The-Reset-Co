// Endpoint: POST /api/dashboard-auth
// Server-Side Authentication Gate for Sanctuary Operations HQ

import { applyCors, safeEqual, checkRateLimit, createSessionToken } from './security.js';

export default async function handler(req, res) {
  if (applyCors(req, res, 'POST, OPTIONS')) return;

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed.' });
  }

  // 1. Strict rate limit on authentication attempts (5 per 5 minutes per IP)
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'ip';
  const limiter = checkRateLimit(`auth:${clientIp}`, 5, 300 * 1000);
  if (!limiter.allowed) {
    return res.status(429).json({
      success: false,
      error: `Too many authentication attempts. Please try again in ${limiter.retryAfterSec} seconds.`
    });
  }

  try {
    const { passkey } = req.body || {};

    if (!passkey || typeof passkey !== 'string') {
      return res.status(400).json({ success: false, error: 'Sanctuary passkey is required.' });
    }

    // Configured server-side passkey (fallback to secure default only if env not set)
    const configuredKey = process.env.DASHBOARD_PASSKEY || 'reset2026';

    const cleanInput = passkey.trim();
    const isValid = safeEqual(cleanInput, configuredKey);

    if (!isValid) {
      return res.status(401).json({
        success: false,
        error: 'Incorrect passkey. Please check with your founding partner.'
      });
    }

    // Issue signed 12-hour session token
    const token = createSessionToken('founding_partner', 12 * 60 * 60 * 1000);

    return res.status(200).json({
      success: true,
      token,
      expiresIn: 43200, // 12 hours in seconds
      message: 'Access granted to Sanctuary Operations HQ.'
    });

  } catch (error) {
    console.error('Dashboard auth error:', error);
    return res.status(500).json({
      success: false,
      error: 'Authentication service temporarily unavailable. Please try again.'
    });
  }
}
