// Vercel Serverless Function: Retreat Dates Confirmation & Calendar Dispatch
// Endpoint: POST /api/confirm-booking

import { applyCors, escapeHtml, sanitizeString, isValidEmail, isValidUUID, checkRateLimit, verifySessionToken, safeEqual } from './security.js';

export default async function handler(req, res) {
  // Apply restricted CORS policy
  if (applyCors(req, res, 'POST, OPTIONS')) return;

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed. Use POST.' });
  }

  // 1. Rate limiting (15 requests per minute per IP)
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'ip';
  const limiter = checkRateLimit(`confirm:${clientIp}`, 15, 60000);
  if (!limiter.allowed) {
    return res.status(429).json({
      success: false,
      error: `Too many requests. Please try again in ${limiter.retryAfterSec} seconds.`
    });
  }

  // 2. Authentication & Authorization Enforcement
  // Must be either:
  // a) A verified Supabase Database Webhook with secret header
  // b) An authenticated Operations HQ administrator with signed session token
  const webhookSecret = req.headers['x-webhook-secret'];
  const expectedSecret = process.env.SUPABASE_WEBHOOK_SECRET;
  const isVerifiedWebhook = !!(webhookSecret && expectedSecret && safeEqual(webhookSecret, expectedSecret));

  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : req.headers['x-dashboard-token'];
  const session = verifySessionToken(token);

  if (!isVerifiedWebhook && !session) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized. Valid administrative session token or verified webhook signature required.'
    });
  }

  try {
    const body = req.body || {};
    const record = body.record || body;

    // Idempotent guard for Supabase Database Webhook
    if (body.type === 'UPDATE') {
      if (record.status !== 'confirmed') {
        return res.status(200).json({ success: true, message: 'Record updated but status is not confirmed; skipped.' });
      }
      if (body.old_record && body.old_record.status === 'confirmed') {
        return res.status(200).json({ success: true, message: 'Booking already confirmed previously; duplicate skipped.' });
      }
    }

    const rawEmail = (record.email || '').trim();
    if (!rawEmail || !isValidEmail(rawEmail)) {
      return res.status(400).json({
        success: false,
        error: 'A valid guest email is required to dispatch confirmation pass.'
      });
    }

    const checkIn = sanitizeString(record.check_in_date || record.checkIn || record.dates_from, 30);
    const checkOut = sanitizeString(record.check_out_date || record.checkOut || record.dates_to, 30);

    if (!checkIn || !checkOut) {
      return res.status(400).json({
        success: false,
        error: 'Missing retreat dates: check_in_date and check_out_date are required (e.g. 2026-11-15).'
      });
    }

    const guestName = sanitizeString(record.full_name || record.name || 'Valued Guest', 100);
    const guestPhone = sanitizeString(record.phone || record.whatsapp_number || 'Not provided', 30);
    const planName = sanitizeString(record.selected_plan || record.planName || record.plan || 'The Awakening Journey', 120);
    const bookingId = sanitizeString(record.id || record.refCode || 'TRC-' + Math.floor(1000 + Math.random() * 9000), 50);
    const suiteAssigned = sanitizeString(record.suite_assigned || record.suite || 'Sanctuary Suite', 80);
    const customNotes = sanitizeString(record.notes || record.doctor_notes || record['health notes'] || '', 2000);

    // Format dates for display
    const checkInDateObj = new Date(checkIn);
    const checkOutDateObj = new Date(checkOut);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const checkInFormatted = isNaN(checkInDateObj.getTime()) ? checkIn : checkInDateObj.toLocaleDateString('en-US', options);
    const checkOutFormatted = isNaN(checkOutDateObj.getTime()) ? checkOut : checkOutDateObj.toLocaleDateString('en-US', options);

    // Calculate nights
    let nights = 3;
    if (!isNaN(checkInDateObj.getTime()) && !isNaN(checkOutDateObj.getTime())) {
      const diffTime = Math.abs(checkOutDateObj - checkInDateObj);
      nights = Math.max(1, Math.round(diffTime / (1000 * 60 * 60 * 24)));
    }

    // Compact date tokens for calendar (YYYYMMDD)
    const sDateClean = checkIn.replace(/[^0-9]/g, '').slice(0, 8);
    const eDateClean = checkOut.replace(/[^0-9]/g, '').slice(0, 8);

    // 1. Generate Google Calendar 1-Click Link
    const gCalTitle = encodeURIComponent('The Reset Co. Ayurvedic Sanctuary Retreat');
    const gCalDetails = encodeURIComponent(
      'Your confirmed Ayurvedic sanctuary retreat at The Reset Co.\n\n' +
      'Programme: ' + planName + '\n' +
      'Suite: ' + suiteAssigned + '\n' +
      'Reservation Ref: ' + bookingId + '\n' +
      'Clinical Directors: Dr. Aditya Kaundal & Dr. Himanshu Bhatt\n' +
      'Concierge WhatsApp: +91 78885 40046\n\n' +
      'Location: The Reset Co.'
    );
    const gCalLocation = encodeURIComponent('The Reset Co.');
    const gCalLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${gCalTitle}&dates=${sDateClean}T090000Z/${eDateClean}T060000Z&details=${gCalDetails}&location=${gCalLocation}`;

    // 2. Generate RFC 5545 iCalendar (.ics) Attachment
    const nowStamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//The Reset Co//Sanctuary Reservation Pass//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:REQUEST',
      'BEGIN:VEVENT',
      `UID:TRC-${bookingId}-${sDateClean}@thereset-co.in`,
      `DTSTAMP:${nowStamp}`,
      `DTSTART;VALUE=DATE:${sDateClean}`,
      `DTEND;VALUE=DATE:${eDateClean}`,
      'SUMMARY:The Reset Co. Ayurvedic Sanctuary Retreat',
      `DESCRIPTION:Your confirmed Ayurvedic retreat at The Reset Co. Programme: ${planName}. Suite: ${suiteAssigned}. Clinical Directors: Dr. Aditya Kaundal & Dr. Himanshu Bhatt. Concierge: +91 78885 40046.`,
      'LOCATION:The Reset Co.',
      'STATUS:CONFIRMED',
      'SEQUENCE:0',
      'BEGIN:VALARM',
      'TRIGGER:-P2D',
      'ACTION:DISPLAY',
      'DESCRIPTION:Reminder: The Reset Co. Sanctuary Retreat begins in 2 days.',
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    // 3. Luxury Branded HTML Email Template (HTML Escaped)
    const confirmationHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Sanctuary Reservation Confirmed</title>
</head>
<body style="margin:0; padding:0; background-color:#FDFAF3; font-family:'Helvetica Neue', Arial, sans-serif; color:#2D3748;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#FDFAF3; padding:40px 15px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px; width:100%; background-color:#FFFFFF; border:1px solid #E8DFCC; border-radius:4px; overflow:hidden; box-shadow:0 8px 30px rgba(15,35,71,0.06);">
          
          <!-- Header Banner with Logo -->
          <tr>
            <td style="background-color:#0F2347; padding:36px 30px; text-align:center;">
              <div style="text-align:center; margin-bottom:12px;">
                <img src="https://thereset-co.in/images/logo-emblem.png" alt="The Reset Co." width="58" height="58" style="display:inline-block; border:0; outline:none;" />
              </div>
              <h1 style="margin:0; color:#FDFAF3; font-size:24px; letter-spacing:0.18em; text-transform:uppercase; font-weight:400;">The Reset Co.</h1>
              <p style="margin:8px 0 0 0; color:#DFBF6A; font-size:11px; letter-spacing:0.16em; text-transform:uppercase;">Ayurvedic Wellness Sanctuary</p>
            </td>
          </tr>

          <!-- Confirmation Badge -->
          <tr>
            <td style="padding:35px 35px 20px 35px; text-align:center;">
              <div style="display:inline-block; background-color:#EBF8F1; border:1px solid #0B5D34; color:#0B5D34; font-size:11px; font-weight:700; letter-spacing:0.16em; text-transform:uppercase; padding:6px 16px; border-radius:20px; margin-bottom:12px;">
                &#10003; Dates Confirmed &amp; Secured
              </div>
              <h2 style="margin:0 0 8px 0; color:#0F2347; font-size:24px; font-weight:500;">Your Sanctuary Pass is Ready</h2>
              <p style="margin:0; color:#718096; font-size:13px; letter-spacing:0.06em;">Reservation Reference: <strong style="color:#0F2347;">${escapeHtml(bookingId)}</strong></p>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding:10px 35px 25px 35px; font-size:15px; line-height:1.7; color:#4A5568;">
              <p style="margin-top:0;">Dear <strong>${escapeHtml(guestName)}</strong>,</p>
              <p>
                We are pleased to formally confirm your dates at The Reset Co. Your private suite and Ayurvedic clinical itinerary have been reserved.
              </p>

              <!-- Confirmed Schedule Box -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#F7F2E7; border:1px solid #E8DFCC; border-radius:4px; margin:24px 0; font-size:14px;">
                <tr>
                  <td style="padding:14px 20px; border-bottom:1px solid #E8DFCC; width:45%;">
                    <strong style="color:#0F2347; font-size:11px; letter-spacing:0.1em; text-transform:uppercase;">Check-In Date</strong><br>
                    <span style="color:#0F2347; font-size:15px; font-weight:600;">${escapeHtml(checkInFormatted)}</span>
                  </td>
                  <td style="padding:14px 20px; border-bottom:1px solid #E8DFCC; width:55%;">
                    <strong style="color:#0F2347; font-size:11px; letter-spacing:0.1em; text-transform:uppercase;">Check-Out Date</strong><br>
                    <span style="color:#0F2347; font-size:15px; font-weight:600;">${escapeHtml(checkOutFormatted)}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 20px; border-bottom:1px solid #E8DFCC;">
                    <strong style="color:#0F2347; font-size:11px; letter-spacing:0.1em; text-transform:uppercase;">Duration</strong><br>
                    <span style="color:#2D3748;">${nights} Nights</span>
                  </td>
                  <td style="padding:14px 20px; border-bottom:1px solid #E8DFCC;">
                    <strong style="color:#0F2347; font-size:11px; letter-spacing:0.1em; text-transform:uppercase;">Suite Assigned</strong><br>
                    <span style="color:#2D3748;">${escapeHtml(suiteAssigned)}</span>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="padding:14px 20px;">
                    <strong style="color:#0F2347; font-size:11px; letter-spacing:0.1em; text-transform:uppercase;">Programme</strong><br>
                    <span style="color:#2D3748;">${escapeHtml(planName)}</span>
                  </td>
                </tr>
              </table>

              <!-- Add to Calendar Callout -->
              <div style="background-color:#FFFFFF; border:1px solid #C9A84C; border-radius:4px; padding:20px; text-align:center; margin:24px 0;">
                <h3 style="margin:0 0 6px 0; color:#0F2347; font-size:15px;">Add Your Retreat to Your Calendar</h3>
                <p style="margin:0 0 16px 0; color:#718096; font-size:13px;">We have attached a calendar invitation (<code>.ics</code>) to this email, or you can add it directly to Google Calendar below:</p>
                <a href="${gCalLink}" style="display:inline-block; background-color:#0F2347; color:#FDFAF3; text-decoration:none; padding:11px 24px; border-radius:3px; font-size:13px; font-weight:600; letter-spacing:0.06em; text-transform:uppercase;">
                  Add to Google Calendar &rarr;
                </a>
              </div>

              ${customNotes ? `
              <div style="background:#F7F4EC; border-left:3px solid #C9A84C; padding:12px 16px; margin:20px 0; font-size:13px; color:#4A5568;">
                <strong>Clinical Notes for Your Arrival:</strong><br>${escapeHtml(customNotes)}
              </div>` : ''}

              <h3 style="color:#0F2347; font-size:15px; margin:24px 0 10px 0; font-weight:600;">Preparing for Your Arrival</h3>
              <ul style="padding-left:20px; margin:0 0 20px 0; line-height:1.8; font-size:14px;">
                <li><strong>Arrival Time:</strong> Check-in is from 12:00 PM onwards. Your initial physician consultation takes place at 4:30 PM.</li>
                <li><strong>What to Bring:</strong> Warm layers for Himalayan evenings, walking footwear, and comfortable clothing for yoga.</li>
                <li><strong>Dietary Considerations:</strong> All sattvic meals are prepared fresh in our kitchen aligned with your Prakriti balance.</li>
              </ul>
            </td>
          </tr>

          <!-- Direct Contact Action -->
          <tr>
            <td style="padding:0 35px 35px 35px; text-align:center;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center">
                    <a href="https://wa.me/917888540046" style="display:inline-block; background-color:#0F2347; color:#FDFAF3; text-decoration:none; padding:12px 24px; border-radius:3px; font-size:13px; font-weight:600; letter-spacing:0.08em; text-transform:uppercase; margin-right:10px;">
                      Concierge WhatsApp
                    </a>
                    <a href="tel:+917888540046" style="display:inline-block; border:1px solid #0F2347; color:#0F2347; text-decoration:none; padding:11px 20px; border-radius:3px; font-size:13px; font-weight:600; letter-spacing:0.08em; text-transform:uppercase;">
                      Call: +91 78885 40046
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#F7F2E7; border-top:1px solid #E8DFCC; padding:24px 30px; text-align:center; font-size:12px; color:#718096; line-height:1.6;">
              <div style="text-align:center; margin-bottom:8px;">
                <img src="https://thereset-co.in/images/logo-emblem-navy.png" alt="The Reset Co." width="36" height="36" style="display:inline-block; border:0;" />
              </div>
              <p style="margin:0 0 6px 0; color:#0F2347; font-weight:600;">The Reset Co.</p>
              <p style="margin:0;">Clinically Directed by Dr. Aditya Kaundal (BAMS) &amp; Dr. Himanshu Bhatt (BAMS)</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    // 4. Dispatch Email with Calendar Attachment via Resend (Env key only)
    const resendApiKey = process.env.RESEND_API_KEY;
    const senderEmail = process.env.SENDER_EMAIL || 'The Reset Co <hello@thereset-co.in>';
    const doctorEmails = (process.env.DOCTOR_EMAIL || 'hello@thereset-co.in').split(',').map(e => e.trim()).filter(Boolean);

    let resendId = null;

    if (resendApiKey) {
      const emailPayload = {
        from: senderEmail,
        to: [rawEmail],
        reply_to: 'hello@thereset-co.in',
        subject: `Retreat Booking Confirmed: Your Dates are Locked (${checkInFormatted} to ${checkOutFormatted}) [${bookingId}]`,
        html: confirmationHtml,
        attachments: [
          {
            filename: `The-Reset-Co-Retreat-${sDateClean}.ics`,
            content: Buffer.from(icsContent).toString('base64')
          }
        ]
      };

      let r = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resendApiKey}`
        },
        body: JSON.stringify(emailPayload)
      });

      if (!r.ok && senderEmail.includes('thereset-co.in')) {
        emailPayload.from = 'The Reset Co <onboarding@resend.dev>';
        r = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendApiKey}`
          },
          body: JSON.stringify(emailPayload)
        });
      }

      if (r.ok) {
        try {
          const resendData = await r.json();
          resendId = resendData.id || null;
        } catch (_) {}
      }

      // Notify doctors
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendApiKey}`
          },
          body: JSON.stringify({
            from: senderEmail,
            to: doctorEmails,
            subject: `[Dates Confirmed] ${guestName} - ${checkInFormatted} to ${checkOutFormatted} (${suiteAssigned})`,
            html: `
            <div style="font-family:sans-serif; padding:20px;">
              <h2>Retreat Dates Confirmed</h2>
              <p>Guest dates have been confirmed and the official sanctuary pass has been dispatched.</p>
              <ul>
                <li><strong>Guest:</strong> ${escapeHtml(guestName)}</li>
                <li><strong>Ref ID:</strong> ${escapeHtml(bookingId)}</li>
                <li><strong>Dates:</strong> ${escapeHtml(checkInFormatted)} to ${escapeHtml(checkOutFormatted)} (${nights} Nights)</li>
                <li><strong>Phone:</strong> ${escapeHtml(guestPhone)}</li>
                <li><strong>Suite:</strong> ${escapeHtml(suiteAssigned)}</li>
                <li><strong>Programme:</strong> ${escapeHtml(planName)}</li>
              </ul>
            </div>`
          })
        });
      } catch (_) {}
    }

    // 5. Optionally sync back to Supabase using server credentials
    const supabaseUrl = process.env.SUPABASE_URL || 'https://vsscbjpuafnniouqzwvj.supabase.co';
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

    if (record.id && supabaseUrl && supabaseKey) {
      try {
        await fetch(`${supabaseUrl}/rest/v1/retreat_bookings?id=eq.${encodeURIComponent(record.id)}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify({
            status: 'confirmed',
            'health notes': (record['health notes'] ? record['health notes'] + '\n' : '') + `[CONFIRMED DATES: ${checkIn} to ${checkOut} | Suite: ${suiteAssigned}]`
          })
        });
      } catch (err) {
        console.error('Supabase sync notice:', err);
      }
    }

    return res.status(200).json({
      success: true,
      bookingId,
      guestEmail: rawEmail,
      confirmedDates: {
        checkIn: checkInFormatted,
        checkOut: checkOutFormatted,
        nights
      },
      calendarInviteAttached: true,
      googleCalendarUrl: gCalLink,
      resendId,
      message: 'Retreat confirmation pass and calendar invitation dispatched to guest.'
    });

  } catch (error) {
    console.error('Confirm booking error:', error);
    // Generic error response to prevent leaking internal stack trace
    return res.status(500).json({
      success: false,
      error: 'An internal error occurred while processing retreat confirmation. Please contact support.'
    });
  }
}
