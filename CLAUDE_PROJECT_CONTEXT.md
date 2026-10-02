# Project Context: The Reset Co.

## 1. Executive Summary & Brand Identity
- **Brand Name**: The Reset Co.
- **Tagline**: "Stillness is not a luxury. It is a prescription."
- **Founders & Clinical Directors**: Dr. Aditya Kaundal (BAMS) and Dr. Himanshu Bhatt (BAMS).
- **Core Offering**: Authentic, physician-supervised 4-day Ayurvedic wellness retreats in Bir Billing, Himachal Pradesh (1,525m altitude).
- **Operational Model**: Asset-light property partnership with closed cohorts of 8 to 15 guests in private suites and a 6-bed community dormitory. Strictly 4-day all-inclusive programs (no per-night rates).
- **Key Inclusions**: Localized Basti procedures (Kati, Greeva, Nabhi), Netra Tarpana, Ashchyotana, Day 3 Shatkarma, mindful pottery, stargazing, nature treks, and live Sufi acoustic sessions.
- **Primary Contact**:
  - Direct Doctor Helpline: +91 78885 40046 (`tel:+917888540046`)
  - WhatsApp Concierge: https://wa.me/917888540046
  - Email: hello@thereset-co.in
  - Location: Bir Billing, Himachal Pradesh, India

---

## 2. Technical Stack & Deployment
- **Frontend Core**: Vanilla HTML5, CSS3, modern ES6+ JavaScript (zero external JavaScript frameworks or heavy runtime libraries).
- **Hosting & CDN**: Vercel (`vercel.json` configured with clean routing and long-term cache headers).
- **GitHub Repository**: `https://github.com/aceblazingsun/The-Reset-Co.git` (branch: `main`).
- **Database & Lead Pipeline**: Dual-dispatch architecture:
  - Primary: Direct REST dispatch to Supabase PostgreSQL table (`retreat_inquiries` / `retreat_bookings`).
  - Fallback / Confirmation: Pre-filled WhatsApp concierge launch and direct doctor phone links ensuring zero lead loss.

---

## 3. Repository Architecture & File Map
- **`index.html`**:
  - Primary sanctuary portal.
  - Interactive ambient Surya Namaskar sequence with pose-by-pose visual guides.
  - Mobile-optimized Tinder-style swipe cards for the Dinacharya daily routine (swipe right to advance, swipe left to return).
  - Retreat package pricing tiers:
    - The Serenity Immersion (Rs 22,000)
    - The Awakening Journey (Rs 26,000 - flagship)
    - The Complete Transformation (Rs 35,000)
    - Community Dormitory (Rs 18,000)
  - Reservation form with client-side validation, top alert banner (`#bookingFormError`), field-level errors (`#bNameError`, `#bPhoneError`, `#bEmailError`), and confirmation screen (`#bookingSuccess`) with reference ID (`Ref: TRC-2026-CONFIRMED`).
  - Slide-out mobile navigation drawer with touch controls and clickable phone helpline.
  - Verified internal anchor navigation with aliases (`#reviews` and `#testimonials` linked to guest feedback).
- **`dosha-prakriti-assessment.html`**:
  - Clinical 15-question Ayurvedic diagnostic parikshan.
  - Calculates Vata, Pitta, and Kapha constitution percentages.
  - Seamless handover to `index.html#reserve` with preselected retreat tier and diagnostic summary banner.
- **`the-reset-co-presentation.html`**:
  - 15-page corporate overview, investment deck, and medical doctrine formatted for high-resolution A4 print/PDF.
- **`images/`**:
  - All visual assets compressed strictly under 100 kB (range: 26 kB to 87 kB).
  - Main hero assets (`hero.jpg`, `hero_sanctuary.jpg`, `welcome_kit.jpg`, `ayurveda.jpg`, `yoga.jpg`, `meditation.jpg`, `dinacharya_ritual.jpg`, `logo-emblem.png`).
  - 8-pose Surya Namaskar sequence (`surya_pose1.jpg` through `surya_pose8.jpg`).
- **`vercel.json`**:
  - Production deployment configuration, security headers, and asset caching rules.
- **`robots.txt` & `sitemap.xml`**:
  - Canonical indexing definitions pointing to `https://thereset-co.in/`.

---

## 4. Design System & Aesthetics
- **Color Palette**:
  - Deep Royal Navy: `#0F2347` (`--royal-deep`) and `#1A365D` (`--royal`)
  - Warm Gold: `#C9A84C` (`--gold`), `#DFBF6A` (`--gold-light`), `#A68532` (`--gold-dark`)
  - Ivory / Sand: `#FDFAF3` (`--ivory`), `#F7F2E7` (`--stone`)
  - Text & Accents: `#2D3748` (`--text`), `#4A5568` (`--text-muted`), `#8C2D19` (`--terracotta` accent)
- **Typography**:
  - Headings & Titles: `Cormorant Garamond`, serif
  - Body & Microcopy: `Jost`, sans-serif
- **Motion & Transitions**:
  - Smooth custom cubic bezier: `cubic-bezier(0.16, 1, 0.3, 1)`
  - Animate only GPU-accelerated properties (`transform`, `opacity`)
  - Respect `prefers-reduced-motion`

---

## 5. Strict Project Rules & Constraints
1. **NO EM DASHES**:
   - Strictly avoid em dashes across all code, text, comments, and markdown.
   - Use standard hyphens (-), colons (:), or parentheses instead.
2. **Anti-Slop Craft Standards**:
   - Palette restraint: maximum 2 core brand colors plus 1 intentional accent color.
   - Authentic, grounded tone reflecting classical Ayurvedic science and physician integrity.
   - Strictly avoid generic AI buzzwords ("cutting-edge", "revolutionary", "seamless", "game-changing").
   - Complete, production-ready code with zero placeholders or dead buttons (`// TODO`).
3. **Mobile Resilience & Viewport Boundaries**:
   - Prevent horizontal overflow at all costs (`width: 100%; max-width: 100%; overflow-x: hidden;`).
   - Hidden offscreen elements (like the mobile navigation drawer) must have `visibility: hidden; pointer-events: none;` when closed.
   - Swipe deck elements must have `overflow: hidden;` on their container so swiped cards do not inflate the document scroll width.
   - Minimum 44x44px touch targets on mobile interactive elements.

---

## 6. Recent Improvements Completed
- **Mobile & Desktop Horizontal Scroll**: Completely eliminated by enforcing strict width containment on `html, body` and clipping the swipe card container.
- **Dinacharya Swipe Cards**: Tinder-style touch interaction on mobile (swipe right to advance, swipe left to return, with smooth physics).
- **Form Error & Success Feedback**: Added comprehensive validation with top error banners, individual field alerts, auto-scroll to invalid inputs, and an enhanced booking confirmation screen with reference tracking code.
- **Clickable Telephone Links**: Direct `tel:+917888540046` links added across contact methods, navigation drawer, and booking confirmations.
- **Asset Optimization**: All project imagery compressed under 100 kB to ensure sub-second page loads.
- **Broken Links & Redirections**: Audited all 30 internal anchors and established alias targets for `#reviews` and `#testimonials`.

---

## 7. Local Workspaces
- Primary Workspace: `C:\Users\Administrator\.gemini\antigravity\scratch\the-reset-co`
- Mirror Workspace: `D:\.gemini\antigravity\scratch\the-reset-co`
