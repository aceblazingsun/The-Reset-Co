// Security utilities for The Reset Co. serverless endpoints
import crypto from 'crypto';

// 1. Allowed CORS origins
const ALLOWED_ORIGINS = [
  'https://thereset-co.in',
  'https://www.thereset-co.in',
  'http://localhost:3000',
  'http://localhost:5000',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5000',
  'http://127.0.0.1:5500'
];

export function applyCors(req, res, allowedMethods = 'POST, OPTIONS') {
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else if (!origin) {
    // Same-origin or server-to-server request
    res.setHeader('Access-Control-Allow-Origin', 'https://thereset-co.in');
  } else {
    // Disallowed origin; do not reflect wildcard
    res.setHeader('Access-Control-Allow-Origin', 'null');
  }

  res.setHeader('Access-Control-Allow-Methods', allowedMethods);
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-dashboard-token, x-webhook-secret');
  res.setHeader('Access-Control-Max-Age', '86400');
  res.setHeader('Vary', 'Origin');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return true;
  }
  return false;
}

// 2. HTML escaping for email templates and user reflections
export function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// 3. String Sanitization with max length bounds
export function sanitizeString(val, maxLength = 255) {
  if (val === null || val === undefined) return '';
  return String(val)
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '') // strip control chars
    .trim()
    .slice(0, maxLength);
}

// 4. Format Validations
export function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return re.test(email.trim()) && email.length <= 254;
}

export function isValidPhone(phone) {
  if (!phone || typeof phone !== 'string') return false;
  const digits = phone.replace(/[^0-9]/g, '');
  return digits.length >= 7 && digits.length <= 15;
}

export function isValidUUID(id) {
  if (!id || typeof id !== 'string') return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);
}

// 5. In-Memory Sliding Window Rate Limiter
const rateLimitMap = new Map();
const CLEANUP_INTERVAL = 60 * 1000;
let lastCleanup = Date.now();

export function checkRateLimit(ip, limit = 10, windowMs = 60000) {
  const now = Date.now();
  if (now - lastCleanup > CLEANUP_INTERVAL) {
    for (const [key, record] of rateLimitMap.entries()) {
      if (now > record.resetTime) {
        rateLimitMap.delete(key);
      }
    }
    lastCleanup = now;
  }

  const clientKey = ip || 'anonymous';
  const current = rateLimitMap.get(clientKey);

  if (!current || now > current.resetTime) {
    rateLimitMap.set(clientKey, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }

  if (current.count >= limit) {
    return { allowed: false, remaining: 0, retryAfterSec: Math.ceil((current.resetTime - now) / 1000) };
  }

  current.count += 1;
  return { allowed: true, remaining: limit - current.count };
}

// 6. Timing-safe string comparison to prevent timing attacks
export function safeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  const bufA = Buffer.from(a, 'utf-8');
  const bufB = Buffer.from(b, 'utf-8');
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

// 7. Lightweight HMAC-SHA256 Token Auth for Dashboard Sessions
const DEFAULT_SECRET = process.env.DASHBOARD_SESSION_SECRET || 'trc_sanctuary_secure_session_key_2026';

export function createSessionToken(userId = 'founding_partner', expiresInMs = 12 * 60 * 60 * 1000) {
  const expiresAt = Date.now() + expiresInMs;
  const payload = JSON.stringify({ u: userId, exp: expiresAt, rnd: crypto.randomBytes(8).toString('hex') });
  const b64Payload = Buffer.from(payload).toString('base64url');
  const signature = crypto.createHmac('sha256', DEFAULT_SECRET).update(b64Payload).digest('base64url');
  return `${b64Payload}.${signature}`;
}

export function verifySessionToken(token) {
  if (!token || typeof token !== 'string') return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  const [b64Payload, signature] = parts;

  const expectedSig = crypto.createHmac('sha256', DEFAULT_SECRET).update(b64Payload).digest('base64url');
  if (!safeEqual(signature, expectedSig)) {
    return false;
  }

  try {
    const payload = JSON.parse(Buffer.from(b64Payload, 'base64url').toString('utf-8'));
    if (!payload.exp || Date.now() > payload.exp) {
      return false; // Expired
    }
    return payload;
  } catch (_) {
    return false;
  }
}
