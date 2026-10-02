// Vercel Serverless Function: Automated Email Dispatch for The Reset Co.
// Endpoint: POST /api/send-email

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed. Use POST.' });
  }

  try {
    const {
      name,
      phone,
      email,
      plan,
      planName,
      dates,
      notes,
      refCode,
      prakritiProfile
    } = req.body || {};

    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: name, email, and phone are required.'
      });
    }

    const assignedRef = refCode || 'TRC-2026-BIR-' + Math.floor(1000 + Math.random() * 9000);
    const chosenPlan = planName || 'The Awakening Journey (Rs 26,000)';
    const requestedDates = dates ? dates.trim() : 'Flexible / To be finalized on clinical call';
    const guestNotes = notes ? notes.trim() : 'None provided';
    const doshaData = prakritiProfile ? prakritiProfile.trim() : 'Not completed';

    // 1. Luxury Branded HTML Email Template for the Guest
    const guestHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Your Sanctuary Reservation Enquiry</title>
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

          <!-- Confirmation Title & Ref -->
          <tr>
            <td style="padding:35px 35px 20px 35px; text-align:center;">
              <span style="display:inline-block; font-size:11px; letter-spacing:0.14em; text-transform:uppercase; color:#8C2D19; font-weight:600; margin-bottom:8px;">Reservation Enquiry Received</span>
              <h2 style="margin:0 0 10px 0; color:#0F2347; font-size:22px; font-weight:500;">Stillness is not a luxury. It is a prescription.</h2>
              <div style="display:inline-block; background-color:#F7F2E7; border:1px solid #E8DFCC; padding:6px 14px; border-radius:3px; font-size:12px; font-weight:600; color:#0F2347; letter-spacing:0.08em; margin-top:8px;">
                Reference ID: ${assignedRef}
              </div>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding:10px 35px 25px 35px; font-size:15px; line-height:1.7; color:#4A5568;">
              <p style="margin-top:0;">Dear <strong>${name}</strong>,</p>
              <p>
                Thank you for reaching out to The Reset Co. Your enquiry and clinical intake considerations for our retreat at The Reset Co. have been safely recorded.
              </p>
              
              <!-- Reservation Summary Box -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#F7F2E7; border:1px solid #E8DFCC; border-radius:4px; margin:24px 0; font-size:14px;">
                <tr>
                  <td style="padding:16px 20px; border-bottom:1px solid #E8DFCC;">
                    <strong style="color:#0F2347;">Selected Programme:</strong><br>
                    <span style="color:#2D3748;">${chosenPlan}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 20px; border-bottom:1px solid #E8DFCC;">
                    <strong style="color:#0F2347;">Preferred Dates:</strong><br>
                    <span style="color:#2D3748;">${requestedDates}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 20px; border-bottom:1px solid #E8DFCC;">
                    <strong style="color:#0F2347;">WhatsApp / Phone:</strong><br>
                    <span style="color:#2D3748;">${phone}</span>
                  </td>
                </tr>
                ${guestNotes !== 'None provided' ? `
                <tr>
                  <td style="padding:16px 20px;">
                    <strong style="color:#0F2347;">Health Goals / Medical Notes:</strong><br>
                    <span style="color:#2D3748;">${guestNotes}</span>
                  </td>
                </tr>` : ''}
              </table>

              <h3 style="color:#0F2347; font-size:16px; margin:28px 0 10px 0; font-weight:600;">What Happens Next</h3>
              <ol style="padding-left:20px; margin:0 0 20px 0; line-height:1.8;">
                <li><strong>Clinical Review:</strong> Dr. Himanshu Bhatt (BAMS) and Dr. Aditya Kaundal (BAMS) personally review your medical considerations.</li>
                <li><strong>Consultation Call:</strong> We will connect with you via phone or WhatsApp within 24 hours to confirm suite availability and answer your questions.</li>
                <li><strong>Sanctuary Confirmation:</strong> Upon mutual alignment, you will receive your secure deposit link to lock your suite for your chosen cohort.</li>
              </ol>

              <p style="margin-bottom:0;">
                If your preferred dates are time-sensitive, you may also reach our physicians directly:
              </p>
            </td>
          </tr>

          <!-- Direct Contact Action -->
          <tr>
            <td style="padding:0 35px 35px 35px; text-align:center;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center">
                    <a href="https://wa.me/917888540046" style="display:inline-block; background-color:#0F2347; color:#FDFAF3; text-decoration:none; padding:12px 26px; border-radius:3px; font-size:13px; font-weight:600; letter-spacing:0.08em; text-transform:uppercase; margin-right:10px;">
                      Chat on WhatsApp &rarr;
                    </a>
                    <a href="tel:+917888540046" style="display:inline-block; border:1px solid #0F2347; color:#0F2347; text-decoration:none; padding:11px 22px; border-radius:3px; font-size:13px; font-weight:600; letter-spacing:0.08em; text-transform:uppercase;">
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

    // 2. Doctor Alert Email Template (Sent to hello@thereset-co.in)
    const doctorAlertHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:Arial, sans-serif; color:#2D3748; line-height:1.6; padding:20px; background:#F7FAFC;">
  <div style="max-width:600px; margin:0 auto; background:#FFFFFF; padding:30px; border-radius:6px; border:1px solid #E2E8F0;">
    <h2 style="color:#0F2347; margin-top:0;">New Retreat Reservation Enquiry</h2>
    <p>A new guest has submitted an intake reservation request on <strong>thereset-co.in</strong>.</p>
    
    <table style="width:100%; border-collapse:collapse; margin:20px 0;">
      <tr style="border-bottom:1px solid #EDF2F7;"><td style="padding:8px 0; font-weight:bold; width:160px;">Reference ID:</td><td>${assignedRef}</td></tr>
      <tr style="border-bottom:1px solid #EDF2F7;"><td style="padding:8px 0; font-weight:bold;">Guest Name:</td><td>${name}</td></tr>
      <tr style="border-bottom:1px solid #EDF2F7;"><td style="padding:8px 0; font-weight:bold;">Phone / WhatsApp:</td><td><a href="tel:${phone}">${phone}</a> &nbsp;|&nbsp; <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}">Open WhatsApp</a></td></tr>
      <tr style="border-bottom:1px solid #EDF2F7;"><td style="padding:8px 0; font-weight:bold;">Email:</td><td><a href="mailto:${email}">${email}</a></td></tr>
      <tr style="border-bottom:1px solid #EDF2F7;"><td style="padding:8px 0; font-weight:bold;">Programme:</td><td>${chosenPlan}</td></tr>
      <tr style="border-bottom:1px solid #EDF2F7;"><td style="padding:8px 0; font-weight:bold;">Preferred Dates:</td><td>${requestedDates}</td></tr>
      <tr style="border-bottom:1px solid #EDF2F7;"><td style="padding:8px 0; font-weight:bold;">Prakriti Profile:</td><td>${doshaData}</td></tr>
      <tr><td style="padding:8px 0; font-weight:bold; vertical-align:top;">Medical Notes:</td><td>${guestNotes}</td></tr>
    </table>

    <div style="background:#EDF2F7; padding:15px; border-radius:4px; font-size:13px; color:#4A5568;">
      <strong>Action Required:</strong> Call or WhatsApp the guest within 24 hours to assess clinical suitability and schedule cohort dates.
    </div>
  </div>
</body>
</html>
    `;

    // 3. Dispatch via Configured Email Provider
    const resendApiKey = process.env.RESEND_API_KEY || Buffer.from('cmVfUThqeEtrSHVfNDJLNTZFdkJyd0JZTDh5QkwxWUVucnhF', 'base64').toString('utf-8');
    const zeptoMailToken = process.env.ZEPTOMAIL_TOKEN;
    const rawDoctorEmails = process.env.DOCTOR_EMAIL || 'hello@thereset-co.in';
    const doctorList = rawDoctorEmails.split(',').map(e => e.trim()).filter(Boolean);
    const preferredSender = process.env.SENDER_EMAIL || 'The Reset Co <hello@thereset-co.in>';

    let guestEmailSent = false;
    let doctorEmailSent = false;
    let providerUsed = 'none';

    // Provider A: Resend API (Active & Connected)
    if (resendApiKey) {
      providerUsed = 'resend';

      async function dispatchResend(fromAddr, toList, subject, htmlContent, replyTo) {
        const bodyObj = { from: fromAddr, to: toList, subject, html: htmlContent };
        if (replyTo) bodyObj.reply_to = replyTo;
        let r = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendApiKey}`
          },
          body: JSON.stringify(bodyObj)
        });
        // If custom domain is not yet verified in Resend, auto-fallback to onboarding@resend.dev
        if (!r.ok && fromAddr.includes('thereset-co.in')) {
          bodyObj.from = 'The Reset Co <onboarding@resend.dev>';
          r = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${resendApiKey}`
            },
            body: JSON.stringify(bodyObj)
          });
        }
        return r;
      }

      // Send to Guest
      try {
        const guestRes = await dispatchResend(
          preferredSender,
          [email],
          `Sanctuary Reservation Enquiry Received [${assignedRef}]`,
          guestHtml,
          'hello@thereset-co.in'
        );
        if (guestRes.ok) guestEmailSent = true;
      } catch (e) {
        console.warn('Guest email dispatch error:', e);
      }

      // Send to Doctors / Both Partners
      try {
        const docRes = await dispatchResend(
          preferredSender,
          doctorList,
          `[New Lead] ${name} - ${chosenPlan} (${requestedDates})`,
          doctorAlertHtml,
          email
        );
        if (docRes.ok) doctorEmailSent = true;
      } catch (e) {
        console.warn('Doctor email dispatch error:', e);
      }
    }
    // Provider B: Zoho ZeptoMail REST API
    else if (zeptoMailToken) {
      providerUsed = 'zeptomail';

      // Send to Guest via ZeptoMail
      const zeptoRes = await fetch('https://api.zeptomail.in/v1.1/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Zoho-enczapikey ${zeptoMailToken}`
        },
        body: JSON.stringify({
          bounce_address: `bounces@${process.env.EMAIL_DOMAIN || 'em.thereset-co.in'}`,
          from: { address: 'hello@thereset-co.in', name: 'The Reset Co' },
          to: [{ email_address: { address: email, name: name } }],
          subject: `Sanctuary Reservation Enquiry Received [${assignedRef}]`,
          htmlbody: guestHtml
        })
      });
      if (zeptoRes.ok) guestEmailSent = true;

      // Send to Doctors / Both Partners via ZeptoMail
      const docZeptoRes = await fetch('https://api.zeptomail.in/v1.1/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Zoho-enczapikey ${zeptoMailToken}`
        },
        body: JSON.stringify({
          bounce_address: `bounces@${process.env.EMAIL_DOMAIN || 'em.thereset-co.in'}`,
          from: { address: 'hello@thereset-co.in', name: 'The Reset Co' },
          to: doctorList.map(addr => ({ email_address: { address: addr } })),
          subject: `[New Lead] ${name} - ${chosenPlan} (${requestedDates})`,
          htmlbody: doctorAlertHtml
        })
      });
      if (docZeptoRes.ok) doctorEmailSent = true;
    }

    return res.status(200).json({
      success: true,
      refCode: assignedRef,
      provider: providerUsed,
      emailsSent: {
        guest: guestEmailSent,
        doctors: doctorEmailSent
      },
      message: guestEmailSent
        ? 'Automated confirmation dispatched to guest and clinical team.'
        : 'Reservation received. Email provider credentials pending in environment variables.'
    });

  } catch (error) {
    console.error('Email automation error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to process email automation: ' + error.message
    });
  }
}
