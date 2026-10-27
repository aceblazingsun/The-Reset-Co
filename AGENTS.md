## graphify

This project has a knowledge graph at `graphify-out/` with god nodes, community structure, and cross-file relationships.

When the user types `/graphify` or `$graphify`, use the installed graphify skill or instructions before doing anything else.

### Graph Query Rules for Codex & Antigravity:
- For codebase questions, first run `graphify query "<question>"` when `graphify-out/graph.json` exists. Use `graphify path "<A>" "<B>" --undirected` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than `GRAPH_REPORT.md` or raw grep output.
- Navigation hubs:
  - Markdown Wiki: `graphify-out/wiki/index.md` (71 cross-linked articles covering architecture and business truth)
  - Interactive D3 Graph: `graphify-out/graph.html`
  - Collapsible Tree: `graphify-out/GRAPH_TREE.html`
  - Architecture Report: `graphify-out/GRAPH_REPORT.md`
- Dirty `graphify-out/` files are expected after hooks or incremental updates; dirty graph files are not a reason to skip graphify. Only skip graphify if the task is about stale or incorrect graph output, or the user explicitly says not to use it.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).

---

## The Reset Co. — Core Project Context & Source of Truth (For Codex)

### 1. Brand & Physical Sanctuary
- **Brand:** The Reset Co.
- **Website:** [https://www.thereset-co.in/](https://www.thereset-co.in/)
- **Business Email:** `Hello@thereset-co.in`
- **Contact Numbers:** `+91 78885 40046` &bull; `+91 94184 92145` (Direct / WhatsApp Concierge)
- **Official Instagram:** `@thereset_co_`
- **Location:** Vaikunth Mud House, Upper Bir Khas Pine Valley, Bir Billing, Kangra, Himachal Pradesh (PIN 176077) at 1,525m altitude.
- **Founders & Clinical Directors:** Dr. Himanshu Bhatt & Dr. Aditya Kaundal (Licensed BAMS Vaidyas, Rajiv Gandhi Govt. Post Graduate Ayurvedic College, Paprola). Lineage rooted in Caraka Samhita.
- **Regulatory Status:** Authentic non-prescriptive restorative Ayush wellness sanctuary (not a hospital/diagnostic clinic).

### 2. Confirmed Business Rules (Strict Source of Truth)
- **Confirmed Residency Dates:** November 26–30, 2026 (4 Nights / 5 Days). Check-in Nov 26 (12 PM), Check-out Nov 30 (11 AM).
- **Cohort Capacity:** Strictly capped at **8–10 guests across 5 handcrafted earthen mud suites** to maintain clinical depth and unhurried doctor-patient interaction. Minimum confirmation threshold: 6 guests.
- **Domestic All-Inclusive Pricing (2 Pathways Only):**
  1. *The Awakening Pathway:* **₹27,990** (General burnout, modern screen fatigue & circadian reset, 2 days Bahya Basti, high-altitude stargazing, trails with Daisy 🐾, Tratak flame meditation, and Reflective Samvada mindful life dialogue)
  2. *The Deep Rejuvenation:* **₹35,990** (Prolonged desk posture, physical stiffness & deep sensory renewal, 3 days Bahya Basti, Netra Tarpana with Triphala Ghrita, mindful Himalayan pottery workshop, Tibetan sound healing, and fireside acoustic music jamming session)
  *All prices include accommodation across 5 handcrafted earthen mud suites, sattvic meals, and stated therapies. Guests arrange and pay for travel tickets to Bir only.*
- **International Pricing:** **₹55,000** (Awakening) / **₹65,000** (Deep Rejuvenation) (includes guaranteed private single occupancy earthen suite and DHM airport chauffeur).
- **Botanical Precision:**
  - *Netra Tarpana* = **Triphala Ghrita** (warm medicated ghee eye bath).
  - *Netra Prakshalana* = **Triphala Kwath** (herbal decoction ocular wash).
  - *Bahya Basti* = Localized warm oil reservoirs: Kati Basti (lumbar) & Greeva Basti (cervical spine).
  - *Abhyanga* = Synchronized full-body warm herb-infused massage.
- **Welcome Kit:** Standardized and identical across both retreat pathways (copper bottle, reflection journal, herbal blend).
- **Post-Retreat Continuity:** Awakening = 3 days; Deep Rejuvenation = 5 days.
- **Deposit & Cancellation Policy:** ₹10,000 reservation deposit. Cancellations ≥15 days before arrival receive 100% refund (less 5% processing fee). Cancellations within 14 days receive 100% credit transfer to any cohort within 3 months (90 days).
- **Conduct Pillars:** Arya Mauna (noble silence) until after breakfast; Digital Sundown protocol (screens kept in private suites during sessions, meals, and treatments).

### 3. Public Route Inventory (14 Canonical Routes)
All pages are pure static HTML5/CSS3/ES6+ served with clean URLs on Vercel Edge:
1. `/` (`index.html`): Homepage, scroll-expand hero, Dinacharya clock, 5-group nav, FAQ accordion, booking modal.
2. `/programmes` (`programmes.html`): Master programmes comparison matrix and pricing.
3. `/programme-awakening` (`programme-awakening.html`): Awakening Pathway deep-dive.
4. `/programme-rejuvenation` (`programme-rejuvenation.html`): Deep Rejuvenation deep-dive.
5. `/programme-reset` (`programme-reset.html`): 301 Permanent Redirect to `/programme-rejuvenation`.
6. `/properties` (`properties.html`): Vaikunth Mud House property showcase.
7. `/meet-the-doctors` (`meet-the-doctors.html`): Founding Vaidyas biographies.
8. `/dosha-prakriti-assessment` (`dosha-prakriti-assessment.html`): 30-question interactive Prakriti quiz.
9. `/review` (`review.html`): Guest reflections and verified submission modal.
10. `/international` (`international.html`): International travel guide, visas, transit, climate.
11. `/guidelines` (`guidelines.html`): Six Sanctuary Conduct Pillars.
12. `/terms` (`terms.html`): Terms of service & cancellation protocol.
13. `/privacy` (`privacy.html`): Health data privacy under DPDP Act.
14. `/404` (`404.html`): Custom 404 error page.

### 4. Technical Architecture & Backend Pipeline
- **Hosting & Edge Configuration:** Vercel Edge (`vercel.json`), HSTS preload, strict CSP, immutable image caching.
- **Database:** Supabase PostgreSQL (`retreat_bookings` table storing guest reservations: name, email, phone, programme, dates, allergies, status).
- **Email API:** Resend serverless edge endpoint at `/api/send-email.js`.
- **WhatsApp Concierge:** Direct channel at `+91 78885 40046`.
- **Structured Data:** 26 validated Schema.org JSON-LD scripts (`WebSite`, `HealthAndBeautyBusiness`, `TouristTrip`, `LodgingBusiness`, `Person`, `BreadcrumbList`, `FAQPage`, `WebApplication`).
- **Accessibility:** WCAG 2.2 AA compliant with `<main id="main-content">` and skip-to-content bypass links on all pages. Zero Cumulative Layout Shift (CLS) with 100% explicit image dimensions.
- **Telemetry:** Vercel Speed Insights (`/_vercel/speed-insights/script.js`) and Analytics (`/_vercel/insights/script.js`).

### 5. Git Status & Milestones
- **Production Commit:** `b43f04b` (`feat(seo-a11y): implement 10-pillar SEO, AEO/GEO FAQ schemas, WCAG skip links, image dimensions, and Vercel telemetry`). Verified live on production.
- **Safety Backup Branch:** `backup/pre-seo-audit-20261014` at `57ab4fc`.
