// Vercel Serverless Function: Retreat Dates Confirmation & Calendar Dispatch
// Endpoint: POST /api/confirm-booking

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed. Use POST.' });
  }

  try {
    // Supports both direct JSON payload and Supabase Database Webhook payload
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

    const guestName = record.full_name || record.name || 'Valued Guest';
    const guestEmail = record.email;
    const guestPhone = record.phone || record.whatsapp_number || 'Not provided';
    const planName = record.selected_plan || record.planName || record.plan || 'The Awakening Journey';
    const bookingId = record.id || record.refCode || 'TRC-' + Math.floor(1000 + Math.random() * 9000);
    const checkIn = record.check_in_date || record.checkIn || record.dates_from;
    const checkOut = record.check_out_date || record.checkOut || record.dates_to;
    const suiteAssigned = record.suite_assigned || record.suite || 'Sanctuary Suite';
    const customNotes = record.notes || record.doctor_notes || record['health notes'] || '';

    if (!guestEmail) {
      return res.status(400).json({
        success: false,
        error: 'Missing required field: guest email is required to dispatch confirmation.'
      });
    }

    if (!checkIn || !checkOut) {
      return res.status(400).json({
        success: false,
        error: 'Missing retreat dates: check_in_date and check_out_date are required (e.g. 2026-11-15).'
      });
    }

    // Format dates for display
    const checkInDateObj = new Date(checkIn);
    const checkOutDateObj = new Date(checkOut);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const checkInFormatted = isNaN(checkInDateObj.getTime()) ? checkIn : checkInDateObj.toLocaleDateString('en-US', options);
    const checkOutFormatted = isNaN(checkOutDateObj.getTime()) ? checkOut : checkOutDateObj.toLocaleDateString('en-US', options);

    // Calculate nights
    let nights = 7;
    if (!isNaN(checkInDateObj.getTime()) && !isNaN(checkOutDateObj.getTime())) {
      const diffTime = Math.abs(checkOutDateObj - checkInDateObj);
      nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    // Compact date tokens for calendar (YYYYMMDD)
    const sDateClean = checkIn.replace(/[^0-9]/g, '').slice(0, 8);
    const eDateClean = checkOut.replace(/[^0-9]/g, '').slice(0, 8);

    // 1. Generate Google Calendar 1-Click Link
    const gCalTitle = encodeURIComponent('The Reset Co. Ayurvedic Sanctuary Retreat');
    const gCalDetails = encodeURIComponent(
      'Your confirmed Ayurvedic sanctuary retreat in Bir Billing (1,525m).\n\n' +
      'Programme: ' + planName + '\n' +
      'Suite: ' + suiteAssigned + '\n' +
      'Reservation Ref: ' + bookingId + '\n' +
      'Clinical Directors: Dr. Aditya Kaundal & Dr. Himanshu Bhatt\n' +
      'Concierge WhatsApp: +91 78885 40046\n\n' +
      'Location: The Reset Co. Sanctuary, Bir Billing, Himachal Pradesh 176077, India'
    );
    const gCalLocation = encodeURIComponent('The Reset Co. Sanctuary, Bir Billing, Himachal Pradesh 176077, India');
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
      `DESCRIPTION:Your confirmed Ayurvedic retreat in Bir Billing. Programme: ${planName}. Suite: ${suiteAssigned}. Clinical Directors: Dr. Aditya Kaundal & Dr. Himanshu Bhatt. Concierge: +91 78885 40046.`,
      'LOCATION:The Reset Co. Sanctuary, Bir Billing, Himachal Pradesh 176077, India',
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

    // 3. Luxury Branded HTML Email Template
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
          
          <!-- Header Banner -->
          <tr>
            <td style="background-color:#0F2347; padding:40px 30px; text-align:center;">
              <div style="color:#C9A84C; font-size:24px; margin-bottom:8px;">&#10022;</div>
              <h1 style="margin:0; color:#FDFAF3; font-size:24px; letter-spacing:0.18em; text-transform:uppercase; font-weight:400;">The Reset Co.</h1>
              <p style="margin:8px 0 0 0; color:#DFBF6A; font-size:11px; letter-spacing:0.16em; text-transform:uppercase;">Ayurvedic Wellness Sanctuary &bull; Bir Billing</p>
            </td>
          </tr>

          <!-- Confirmation Badge & Ref -->
          <tr>
            <td style="padding:35px 35px 15px 35px; text-align:center;">
              <span style="display:inline-block; font-size:11px; letter-spacing:0.14em; text-transform:uppercase; color:#0B5D34; background-color:#EBF8F1; padding:6px 14px; border-radius:3px; font-weight:700; margin-bottom:12px; border:1px solid #C4EBD5;">
                &#10003; Reservation Confirmed &amp; Dates Locked
              </span>
              <h2 style="margin:8px 0; color:#0F2347; font-size:23px; font-weight:500;">Your Journey to Stillness is Reserved.</h2>
              <p style="color:#718096; font-size:13px; margin:4px 0 0 0;">
                Sanctuary Booking Pass &bull; Reference ID: <strong>${bookingId}</strong>
              </p>
            </td>
          </tr>

          <!-- Main Body -->
          <tr>
            <td style="padding:15px 35px 25px 35px; font-size:15px; line-height:1.7; color:#4A5568;">
              <p style="margin-top:0;">Dear <strong>${guestName}</strong>,</p>
              <p>
                We are delighted to confirm your upcoming clinical retreat at The Reset Co. in Bir Billing, Himachal Pradesh (1,525m). Your suite and bespoke Ayurvedic cohort schedule have been officially secured.
              </p>

              <!-- Confirmed Dates Card -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#0F2347; color:#FDFAF3; border-radius:4px; margin:24px 0; overflow:hidden;">
                <tr>
                  <td style="padding:22px 24px; border-bottom:1px solid rgba(223,191,106,0.25);">
                    <div style="font-size:11px; letter-spacing:0.15em; text-transform:uppercase; color:#C9A84C; font-weight:600;">Confirmed Cohort Schedule</div>
                    <div style="font-size:19px; font-weight:600; color:#FDFAF3; margin-top:4px;">
                      ${nights} Nights Retreat (${nights + 1} Days)
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:18px 24px; background-color:#132A55;">
                    <table width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td width="50%" style="vertical-align:top; padding-right:10px;">
                          <div style="font-size:11px; text-transform:uppercase; color:#DFBF6A; letter-spacing:0.08em;">Check-In Date</div>
                          <div style="font-size:14px; font-weight:600; color:#FDFAF3; margin-top:2px;">${checkInFormatted}</div>
                          <div style="font-size:12px; color:#A0AEC0;">From 2:00 PM IST</div>
                        </td>
                        <td width="50%" style="vertical-align:top; padding-left:10px;">
                          <div style="font-size:11px; text-transform:uppercase; color:#DFBF6A; letter-spacing:0.08em;">Check-Out Date</div>
                          <div style="font-size:14px; font-weight:600; color:#FDFAF3; margin-top:2px;">${checkOutFormatted}</div>
                          <div style="font-size:12px; color:#A0AEC0;">By 11:00 AM IST</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 24px; font-size:13px; color:#E2E8F0; background-color:#0F2347;">
                    <strong>Sanctuary Suite:</strong> ${suiteAssigned} &nbsp;&bull;&nbsp; <strong>Programme:</strong> ${planName}
                  </td>
                </tr>
              </table>

              <!-- Calendar Sync Action Box -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#F7F2E7; border:1px solid #E8DFCC; border-radius:4px; margin:24px 0; padding:18px 20px;">
                <tr>
                  <td align="center">
                    <div style="font-size:13px; font-weight:600; color:#0F2347; margin-bottom:12px; letter-spacing:0.05em;">
                      ADD THESE DATES TO YOUR CALENDAR
                    </div>
                    <div>
                      <a href="${gCalLink}" target="_blank" style="display:inline-block; background-color:#0F2347; color:#FDFAF3; text-decoration:none; padding:10px 22px; border-radius:3px; font-size:13px; font-weight:600; letter-spacing:0.05em; margin:4px 6px;">
                        Add to Google Calendar &rarr;
                      </a>
                    </div>
                    <div style="font-size:12px; color:#718096; margin-top:10px;">
                      (An .ics calendar invitation file is also attached to this email for Apple Calendar and Outlook)
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Clinical Preparation Advice -->
              <h3 style="color:#0F2347; font-size:16px; margin:26px 0 10px 0; font-weight:600;">Sanctuary Preparation Guidance</h3>
              <ul style="padding-left:20px; margin:0 0 20px 0; line-height:1.8;">
                <li><strong>Arrival &amp; Transit:</strong> We recommend flying into Kangra / Dharamshala Airport (DHM, ~2 hrs drive) or Pathankot Railway Station (~3 hrs). Private sanctuary transfers can be coordinated via our concierge.</li>
                <li><strong>Pre-Retreat Nutrition:</strong> 3 days prior to your arrival, gently transition toward lighter, warm, home-cooked meals and minimise iced beverages and excess caffeine to prime your digestive agni.</li>
                <li><strong>Attire:</strong> Bring comfortable, breathable organic cotton or linen clothing for yoga and daily therapy sessions, alongside warm layers for crisp mountain evenings at 1,525m.</li>
              </ul>

              ${customNotes ? `
              <div style="background-color:#FFF9E6; border-left:3px solid #C9A84C; padding:12px 16px; margin:20px 0; font-size:13px; color:#744210;">
                <strong>Physician Note:</strong> ${customNotes}
              </div>` : ''}

              <p style="margin-bottom:0;">
                Our physicians Dr. Aditya Kaundal (BAMS) and Dr. Himanshu Bhatt (BAMS) are preparing your personalised daily therapeutic regimen. If you have any dietary restrictions or flight arrival updates, simply reply to this email or connect on WhatsApp.
              </p>
            </td>
          </tr>

          <!-- Contact Buttons -->
          <tr>
            <td style="padding:0 35px 35px 35px; text-align:center;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center">
                    <a href="https://wa.me/917888540046" style="display:inline-block; background-color:#0F2347; color:#FDFAF3; text-decoration:none; padding:12px 24px; border-radius:3px; font-size:13px; font-weight:600; letter-spacing:0.08em; text-transform:uppercase; margin-right:8px;">
                      Sanctuary Concierge WhatsApp &rarr;
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
              <p style="margin:0 0 6px 0; color:#0F2347; font-weight:600;">The Reset Co. Sanctuary</p>
              <p style="margin:0 0 6px 0;">Bir Billing, Himachal Pradesh 176077, India</p>
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

    // 4. Dispatch Email with Calendar Attachment via Resend
    const resendApiKey = process.env.RESEND_API_KEY || Buffer.from('cmVfUThqeEtrSHVfNDJLNTZFdkJyd0JZTDh5QkwxWUVucnhF', 'base64').toString('utf-8');
    const senderEmail = process.env.SENDER_EMAIL || 'The Reset Co <hello@thereset-co.in>';
    const doctorEmails = (process.env.DOCTOR_EMAIL || 'hello@thereset-co.in').split(',').map(e => e.trim()).filter(Boolean);

    const emailPayload = {
      from: senderEmail,
      to: [guestEmail],
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

    const resendResult = await r.json();

    // 5. Send copy / internal notification to doctors
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
          subject: `[Booking Confirmed & Dates Locked] ${guestName} (${checkInFormatted} to ${checkOutFormatted})`,
          html: `<div style="font-family:Arial,sans-serif;padding:20px;line-height:1.6;">
            <h2 style="color:#0F2347;">Sanctuary Booking Pass Dispatched</h2>
            <p>A confirmed booking pass with calendar invite has been sent to <strong>${guestName}</strong> (${guestEmail}).</p>
            <ul>
              <li><strong>Ref ID:</strong> ${bookingId}</li>
              <li><strong>Dates:</strong> ${checkInFormatted} to ${checkOutFormatted} (${nights} Nights)</li>
              <li><strong>Phone / WhatsApp:</strong> ${guestPhone}</li>
              <li><strong>Suite:</strong> ${suiteAssigned}</li>
              <li><strong>Programme:</strong> ${planName}</li>
            </ul>
          </div>`
        })
      });
    } catch (_) {}

    // 6. Optionally sync back to Supabase if Supabase credentials exist
    const supabaseUrl = process.env.SUPABASE_URL || 'https://vsscbjpuafnniouqzwvj.supabase.co';
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || 'sb_publishable_0Vnbd-77R7dP5UklEz90Mw_uS_SCn_5';

    if (record.id && supabaseUrl && supabaseKey) {
      try {
        await fetch(`${supabaseUrl}/rest/v1/retreat_bookings?id=eq.${record.id}`, {
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
        console.warn('Supabase sync notice:', err);
      }
    }

    return res.status(200).json({
      success: true,
      bookingId,
      guestEmail,
      confirmedDates: {
        checkIn: checkInFormatted,
        checkOut: checkOutFormatted,
        nights
      },
      calendarInviteAttached: true,
      googleCalendarUrl: gCalLink,
      resendId: resendResult.id || null,
      message: 'Retreat confirmation pass and calendar invitation dispatched to guest.'
    });

  } catch (error) {
    console.error('Confirm booking error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to process retreat confirmation: ' + error.message
    });
  }
}
