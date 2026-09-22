# The Reset Co — Project Memory & Agent Handoff File
**Last updated:** 22 September 2026  
**Purpose:** Complete context for any AI agent picking up this project. Read this before touching any file. Dr. Aditya should not need to explain anything already in here.

---

## 1. Who You Are Speaking With

**Dr. Aditya Kaundal** — Co-Founder, The Reset Co. BAMS degree, Patanjali trained, Head of Guest Wellness. Address him as **Dr. Aditya** at all times. He is a co-founder with equal say; do not treat him as a client or customer — treat him as a partner.

**Co-Founder #2:** Dr. Himanshu Bhatt — BAMS, trained at Mandi & Paprola. Retreat Design lead.

---

## 2. The Business

**Name:** The Reset Co  
**Type:** Ayurvedic wellness retreat operator  
**Location:** Bir Billing, Kangra District, Himachal Pradesh — 176077  
**Altitude:** 1,525 m  
**Domain:** theresetco.in  
**Email:** hello@theresetco.in  
**WhatsApp:** +91 78885 40046 (wa.me link: `wa.me/917888540046`)  
**Instagram:** @theresetco  
**Node server port:** 3000

### Business Model (ground truths — do not contradict)
- Pay-per-head accommodation. No committed block liability.
- Cost per guest for accommodation + food: approx Rs. 3,000-3,500 total.
- Max **15 guests per cohort**. This is a hard cap and a selling point.
- Certified shatkarma practitioner and yoga instructor on team.
- BAMS doctors handle clinical oversight: Nadi Pariksha, prescriptions, Basti procedures.
- Bir Billing has direct Volvo bus connectivity from Delhi — not a friction point.
- **No expansion of model.** Dr. Aditya's verbatim: *"i dont want to enlarge the model i have but improve the things that i am giving or servicing."* Deepen quality only. Never propose adding headcount or scaling up.

### Retreat Programmes & Pricing
| Programme | Duration | Price (per person) | Notes |
|---|---|---|---|
| Serenity | 3 Days / 2 Nights | Rs. 22,000 | Entry level |
| Awakening | 4 Days / 3 Nights | Rs. 26,000 | Signature retreat |
| Transformation | 4 Days / 3 Nights | Rs. 35,000 | Premium |

Prices are stored in localStorage key `trc_prices` and served by `shared.js` via `window.getPrices()`.

### Services Offered
1. Yoga (certified instructor on team)
2. Meditation
3. Shatkarma (certified practitioner on team)
4. Ayurvedic Treatment / Consultation

---

## 3. Project Stack

- **Pure HTML / CSS / JS** — no framework, no npm, no build step
- **Node.js v24.16.0** available for the dev server only
- **`npx` is disabled** by PowerShell execution policy — do not try to use it
- **Python is not available**
- **Server:** `node server.js` serves static files on port 3000
- **No puppeteer / playwright** installed — screenshots must use Edge headless flag or code inspection
- **File encoding:** ALL HTML files must be UTF-8 **NO BOM**. Always use `write_to_file` tool or `[System.IO.File]::WriteAllText(path, content, [System.Text.UTF8Encoding]::new($false))`. **Never use PowerShell `Set-Content`** for HTML files — it causes BOM corruption.

---

## 4. Design System (use these tokens everywhere, never deviate)

```css
--gold:       #C9A84C;
--gold-light: #E8C97A;
--navy:       #0F2347;   /* also --royal-deep in some files */
--navy-mid:   #1A3A6B;   /* also --royal in some files */
--ivory:      #FDFAF3;
--stone:      #F0EBE0;
--serif:      'Cormorant Garamond', 'Palatino Linotype', Georgia, serif;
--sans:       'Jost', 'Segoe UI', system-ui, sans-serif;
```

Google Fonts link required in every file:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap" rel="stylesheet">
```

**Accessibility standard (R-32):**
```css
:focus-visible { outline: 2px solid var(--gold); outline-offset: 3px; }
```

---

## 5. Antislop Rules (Always Active — Non-Negotiable)

| Rule | What it means |
|---|---|
| R-02 | **Zero em dashes** in any copy, strings, or code. Use ` - ` (hyphen with spaces) instead. |
| R-05 | No "Most popular" badges. Use "Signature Retreat" for the Awakening programme. |
| R-15 | No generic CTAs: "Explore", "Get Started", "Learn More", "Discover". Use specific action language. |
| R-16 | No AI buzzwords: "seamless", "journey", "unlock", "elevate", "empower", "revolutionary", "cutting-edge". |
| R-26 | All interactive elements must be functional. No dead buttons, no `// TODO`. |
| R-32 | Full keyboard accessibility, `:focus-visible` with 2px gold outline on every page. |

Additionally from **web-craft-master rules** (always active):
- Only animate GPU-accelerated properties: `transform` and `opacity`. Never animate layout properties.
- Stagger child reveals 0.06s-0.1s. No perpetual pulsing loops.
- Always respect `prefers-reduced-motion`.
- Strictly prevent mobile horizontal overflow: `overflow-x: hidden`, `clamp()` typography, `flex-wrap`.
- Minimum 44x44px touch targets on mobile.
- Palette restraint: max 2 core brand colors + 1 accent.

---

## 6. Project Root & File List

**Project root:** `C:\Users\Administrator\.gemini\antigravity\scratch\the-reset-co\`

### Current files (as of 22 Sep 2026):

| File | Purpose | Size |
|---|---|---|
| `hero.html` | Canonical standalone landing page (newest) | ~32 KB |
| `index.html` | Main full public website | ~112 KB |
| `dosha-prakriti-assessment.html` | Clinical Prakriti diagnostic app (lead capture) | ~37 KB |
| `dashboard.html` | Founder operations dashboard (passwordless) | ~175 KB |
| `prospectus.html` | Printable programme prospectus / PDF | ~48 KB |
| `brochure.html` | Marketing brochure | — |
| `invoice.html` | Invoice viewer | — |
| `implementation_improvements.html` | Service strategy document | — |
| `implementation_improvements.md` | Markdown version of strategy doc | — |
| `server.js` | Node.js static file server on port 3000 | ~49 lines |
| `shared.js` | `window.getPrices()` — price source of truth | 4 lines |
| `PROJECT_MEMORY.md` | This file | — |

### Deleted files (do not recreate):
- `audit.js` — deleted
- `audit_links.js` — deleted
- `prakriti.html` — deleted (replaced by `dosha-prakriti-assessment.html`)
- `new-website.html` — deleted (superseded by `hero.html`)

---

## 7. File-by-File Description

### `hero.html` — Canonical Landing Page
Built fresh with all antislop rules. Features:
- Full-viewport hero with mountain SVG silhouettes (3 parallax layers), star field, gold ridgeline
- Cormorant Garamond headline
- Constitution cards (Vata/Pitta/Kapha) with **IntersectionObserver scroll-reveal**
  - Cards start `opacity:0; transform:translateY(20px)` and get `.revealed` class when entering viewport
  - Stagger: 0ms / 80ms / 160ms delays
  - `prefers-reduced-motion` fallback: cards shown immediately
  - **NOT CSS animation-play-state** — the JS observer is the trigger
- Contact strip with live WhatsApp and mailto links
- Skip link to `#main-content`
- 9 aria-label attributes

### `index.html` — Main Website
Full single-page public site. Sections: hero, exclusivity strip, about, founders, services, retreats, pricing, testimonials, contact, footer.
- `shared.js` loaded in `<head>` (BEFORE inline scripts — critical)
- `getPrices()` called inline for price display
- Skip link to `#main-content`
- `:focus-visible` gold ring
- WhatsApp floating button (bottom-right, green #25D366)
- Contact form saves lead to `trc_leads` AND falls back to mailto
- **Known issue:** mailto fallback path does NOT save lead to dashboard

### `dosha-prakriti-assessment.html` — Prakriti Assessment
Clinical 15-question Ayurvedic constitution diagnostic. Primary lead-capture instrument.
- 5 domains: Sharira, Twak/Kesha, Agni, Nidra, Manas/Vyadhi
- Live Constitutional Balance Meter in header (Vata/Pitta/Kapha coloured bar)
- Results dossier with score bars, insights, retreat recommendation, WhatsApp pre-fill
- Accessibility: `role="radiogroup"`, `role="radio"`, `aria-checked`, `aria-label` on option cards
- `aria-live="polite"` on step indicator
- `min-height: 44px` on `.option-card`
- Skip link to `#assessment-main`
- Links point to `hero.html` (not deleted `new-website.html`)

### `dashboard.html` — Founder Dashboard (PASSWORDLESS)
Opens directly — no login screen, no auth.
- `currentSession` hardcoded: `{ username: 'aditya', role: 'founder', name: 'Dr. Aditya Kaundal' }`
- `isFounder` is arrow function returning `true`
- `launchApp()` called unconditionally at script end
- `doLogout()` does `location.reload()`
- Gold token `--gold: #C9A84C` (brand standard)
- `:focus-visible` gold ring
- Table `aria-label`, modal `aria-modal` + `aria-labelledby`, sidebar `role="navigation"`
- Skip link present
- 8 localStorage keys for all operational data

### `prospectus.html` — Programme Prospectus
Printable document. Three schedule tabs with day-by-day timetables.
- `:focus-visible` ring
- Tab buttons `min-height: 44px`
- Skip link to `#prospectus-main`

### `shared.js`
```js
window.getPrices = function() {
  try {
    return JSON.parse(localStorage.getItem('trc_prices')) || {serenity:22000,awakening:26000,transformation:35000};
  } catch(e) {
    return {serenity:22000,awakening:26000,transformation:35000};
  }
};
```
Must load in `<head>` of index.html, prospectus.html, brochure.html.

---

## 8. localStorage Key Reference

| Key | Contents |
|---|---|
| `trc_leads` | Guest enquiries and bookings (main data store) |
| `trc_retreats` | Retreat schedule records |
| `trc_partners` | Hotel partner records |
| `trc_invoices` | Invoice records |
| `trc_expenses` | Expense records |
| `trc_subs` | Subscriptions/services |
| `trc_staff` | Staff records |
| `trc_payroll` | Payroll records |
| `trc_prices` | `{serenity, awakening, transformation}` — read via `getPrices()` |
| `trc_users` | Seeded user accounts (auth removed but data harmlessly remains) |

---

## 9. Work Done — Session Summary

**Session 1:** Built index.html, dosha-prakriti-assessment.html, implementation docs, server.js with antislop sweep.

**Session 2:** Built dashboard.html (originally with username+password login), prospectus.html.

**Session 3:** Built hero.html — full-viewport landing page with mountain SVG, stars, parallax, constitution cards.

**Session 4 (ponytail review):** 
- Deleted: audit.js, audit_links.js, prakriti.html, new-website.html
- Cleaned server.js URL parse
- Created shared.js, injected getPrices() into 3 files
- Collapsed seedData/reset/reseed loops in dashboard
- Replaced IntersectionObserver in hero with CSS animation (LATER REVERTED — see Session 5)

**Session 5 (UI/UX audit + a11y fixes):**
- Fixed em dashes in dashboard JS strings (R-02 hard gate)
- Fixed dashboard gold token drift
- Added :focus-visible to dashboard and prospectus
- Added skip links to all pages
- Added full ARIA to prakriti assessment (was completely missing)
- Added 44px tap targets to prakriti options
- Fixed broken link (new-website.html -> hero.html) in prakriti
- Moved shared.js to <head> for correct load order
- Reverted hero cards from CSS animation back to proper IntersectionObserver with .revealed class

**Session 6 (passwordless dashboard):**
- Removed login screen HTML entirely
- Removed all auth JS (doLogin, doLogout, getSession, setSession, clearSession, togglePw)
- Hardcoded session as Dr. Aditya
- launchApp() called unconditionally at init

---

## 10. Pending / Known Issues

| ID | File | Issue | Priority |
|---|---|---|---|
| L1 | index.html | mailto fallback doesn't save lead to dashboard | Low |
| L2 | prospectus.html | Tab buttons lack `role="tab"` / `aria-selected` | Low |
| — | dashboard.html | `trc_users` seeded but unused (auth removed) | Cosmetic |
| — | All | No backend — all data is localStorage, per-browser per-device | Future |
| — | All | No images in `images/` folder — service cards use onerror fallbacks | Future |

---

## 11. How to Run

```powershell
cd C:\Users\Administrator\.gemini\antigravity\scratch\the-reset-co
node server.js
```

Pages:
- http://localhost:3000/hero.html
- http://localhost:3000/index.html
- http://localhost:3000/dashboard.html (no login needed)
- http://localhost:3000/dosha-prakriti-assessment.html
- http://localhost:3000/prospectus.html

---

## 12. Agent Rules (Read Before Acting)

1. Always address the user as **Dr. Aditya**.
2. **Never use em dashes** (`--`) anywhere. Use ` - ` instead.
3. **Never use buzzwords:** seamless, journey, unlock, elevate, empower, revolutionary, cutting-edge.
4. **Never propose business expansion** - Dr. Aditya does not want to scale headcount or model size.
5. **Gold is `#C9A84C`** - if you see `#AB8837` in any file, it is a drift to be corrected.
6. **shared.js must load in `<head>`** before any inline script that calls `getPrices()`.
7. **Dashboard is passwordless** - do not add a login screen back without being explicitly asked.
8. **hero.html is the canonical landing page** - `new-website.html` is deleted, do not reference it.
9. **HTML files must be UTF-8 NO BOM** - use write_to_file tool, never PowerShell Set-Content.
10. **Hero card animations use IntersectionObserver** adding `.revealed` class - not CSS animation-play-state.
11. **Mermaid does not render in chat** - use generate_image tool for diagrams.
