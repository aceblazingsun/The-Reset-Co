# The Reset Co. — Full Website Consistency & Cross-Page Audit (Read-Only)

**Date of Audit:** October 14, 2026  
**Audited Target:** [The Reset Co. Production Repository & Live Topology](https://www.thereset-co.in/)  
**Audit Protocol:** Strictly Read-Only (No application files modified, no database records altered, no environment variables or deployment configs touched)

---

## 1. Executive Summary

This comprehensive, evidence-based audit was executed across the complete repository of **The Reset Co.**, inspecting all 31 HTML files, client-side interaction scripts, serverless Node.js edge functions, database integration models, SEO schemas, and legal charters.

### Context & Status
Following the recent alignment updates (which deployed accurate botanical terminology for Netra Tarpana with Triphala Ghrita, updated international single-occupancy tariff inclusion, and expanded sitemap coverage), this audit inspects the remaining nuances across the codebase to ensure 100% architectural symmetry.

### Top Findings Summary
1. **Capacity Cap Inconsistency (Lingering 12-Guest References):**  
   While the homepage hero badge and guidelines state an intimate capacity of **8–10 guests across 5 private earthen suites**, two subpages ([`programmes.html#L2362`](file:///C:/Users/Administrator/.gemini/antigravity/scratch/the-reset-co/programmes.html#L2362) and [`meet-the-doctors.html#L403`](file:///C:/Users/Administrator/.gemini/antigravity/scratch/the-reset-co/meet-the-doctors.html#L403)) still cite a maximum cap of **12 guests/participants**.
2. **Pathway Title Asymmetry ("Awakening Journey" vs. "Awakening Pathway"):**  
   While the dedicated landing page is `/programme-awakening` titled **The Awakening Pathway**, several UI headings and tab buttons across [`index.html`](file:///C:/Users/Administrator/.gemini/antigravity/scratch/the-reset-co/index.html#L3133), [`programmes.html`](file:///C:/Users/Administrator/.gemini/antigravity/scratch/the-reset-co/programmes.html#L1735), [`dosha-prakriti-assessment.html`](file:///C:/Users/Administrator/.gemini/antigravity/scratch/the-reset-co/dosha-prakriti-assessment.html#L912), and [`review.html`](file:///C:/Users/Administrator/.gemini/antigravity/scratch/the-reset-co/review.html#L831) retain the older label **The Awakening Journey**.
3. **Internal Duration Conflict on Assessment Page:**  
   In [`dosha-prakriti-assessment.html#L912-L921`](file:///C:/Users/Administrator/.gemini/antigravity/scratch/the-reset-co/dosha-prakriti-assessment.html#L912-L921), the recommendation variable states `The Awakening Journey (4 Days)`, while the accompanying description text in the very next line describes it as a `restorative 5-day immersion`.
4. **Allergy Intake Field Structure:**  
   While [`index.html`](file:///C:/Users/Administrator/.gemini/antigravity/scratch/the-reset-co/index.html#L3684) now includes a dedicated text input for dietary preferences and allergies, neither form provides an explicit 3-way radio choice (`Yes` / `No` / `I'm not sure`), which would provide heightened clinical safety prior to oil and decoction administration.
5. **Social Proof vs. Commercial Launch:**  
   Published reflections cite past completed 4-day cohorts from named individuals. Since the commercial launch is scheduled for November 26–30, 2026 (preceded by an authentic feedback collection yoga session on October 25, 2026), these testimonials function as prototype demonstration assets.

---

## 2. Project Structure & Routes Inspected

### Tech Stack & Runtime Environment
- **Core Engine:** Vanilla HTML5, CSS3 (CSS Variables, Flexbox/Grid), ES6+ JavaScript.
- **Hosting & Edge Delivery:** Vercel Global Edge Network (`vercel.json`).
- **Serverless API:** Node.js Edge Functions (`api/confirm-booking.js`, `api/send-email.js`, `api/dashboard-bookings.js`, `api/dashboard-auth.js`).
- **Database Architecture:** Supabase PostgreSQL (`vsscbjpuafnniouqzwvj.supabase.co`) utilizing table `retreat_bookings`.
- **Communications:** Resend API for transactional email notifications to doctors and applicants.
- **Client Smooth Scrolling:** Lenis Scroll Engine (`js/lenis.min.js`).

### Public Routes & HTML Files Inspected
| Route / File | Canonical URL | Type & Role | Status |
| :--- | :--- | :--- | :--- |
| `index.html` | `https://www.thereset-co.in/` | Primary Homepage & Booking Modal | Operational |
| `programmes.html` | `https://www.thereset-co.in/programmes` | Comparison Matrix & Tariffs | Operational |
| `programme-awakening.html` | `https://www.thereset-co.in/programme-awakening` | The Awakening Pathway (₹27,990) | Operational |
| `programme-rejuvenation.html` | `https://www.thereset-co.in/programme-rejuvenation` | Deep Rejuvenation Pathway (₹34,990) | Operational |
| `programme-reset.html` | `https://www.thereset-co.in/programme-reset` | Classical Reset Pathway (₹39,990) | Operational |
| `properties.html` | `https://www.thereset-co.in/properties` | Vaikunth Mud House Architectural Dossier | Operational |
| `meet-the-doctors.html` | `https://www.thereset-co.in/meet-the-doctors` | Founding Vaidyas Biographies & Standards | Operational |
| `dosha-prakriti-assessment.html` | `https://www.thereset-co.in/dosha-prakriti-assessment` | 30-Question Ayurvedic Diagnostic Tool | Operational |
| `review.html` | `https://www.thereset-co.in/review` | Guest Reflections & Outcomes Archive | Operational |
| `international.html` | `https://www.thereset-co.in/international` | Concierge & Form for Overseas Guests | Operational |
| `guidelines.html` | `https://www.thereset-co.in/guidelines` | 6 Conduct Pillars & Noble Silence | Operational |
| `terms.html` | `https://www.thereset-co.in/terms` | Terms of Service & Cancellation Policy | Operational |
| `privacy.html` | `https://www.thereset-co.in/privacy` | DPDP Act 2023 & Medical Privacy Charter | Operational |
| `404.html` | `https://www.thereset-co.in/404` | Error Fallback Route | Operational |
| `dashboard/index.html` | `https://www.thereset-co.in/dashboard/` | Administrative Operational Console | Protected |

---

## 3. Confirmed Cross-Page Inconsistencies

```
┌───────────┬───────────────────────────┬──────────┬────────────┬─────────────────────────────────────────────────────────────┐
│ ID        │ Domain                    │ Severity │ Confidence │ Finding Description                                         │
├───────────┼───────────────────────────┼──────────┼────────────┼─────────────────────────────────────────────────────────────┤
│ INC-01    │ Capacity & Operations     │ High     │ Verified   │ Lingering "12 guests maximum" in programmes.html & doctors  │
│ INC-02    │ Branding & Nomenclature   │ Medium   │ Verified   │ "Awakening Journey" used instead of "Awakening Pathway"     │
│ INC-03    │ Assessment Consistency    │ Medium   │ Verified   │ Prakriti recommendation states 4 Days vs 5 Days in text     │
│ INC-04    │ Form Review Pathway Names │ Low      │ Verified   │ review.html pathway dropdown lists legacy "(4 Days)"        │
│ INC-05    │ Allergy Field Granularity │ Medium   │ Verified   │ Forms lack explicit Yes/No/Unsure structured triage radios  │
│ INC-06    │ Social Proof Timing       │ Low      │ Verified   │ Verified guest quotes displayed prior to Nov 2026 launch    │
│ INC-07    │ Founder Photo Assets      │ Inform.  │ Confirmed  │ Social preview card used as placeholder for doctor portraits │
└───────────┴───────────────────────────┴──────────┴────────────┴─────────────────────────────────────────────────────────────┘
```

### Detailed Breakdown of Inconsistencies

#### INC-01: Cohort Capacity Discrepancy (8–10 vs. 12 Guests)
- **Severity:** High
- **Affected URLs:** 
  - `https://www.thereset-co.in/programmes` ([`programmes.html#L2362`](file:///C:/Users/Administrator/.gemini/antigravity/scratch/the-reset-co/programmes.html#L2362))
  - `https://www.thereset-co.in/meet-the-doctors` ([`meet-the-doctors.html#L403`](file:///C:/Users/Administrator/.gemini/antigravity/scratch/the-reset-co/meet-the-doctors.html#L403))
- **Current Text:**
  - `programmes.html:2362`: *"Each cohort requires a minimum of 8 guests to confirm the residency, and is strictly capped at 12 guests maximum."*
  - `meet-the-doctors.html:403`: *"Our next 4-night residency runs 26–30 November 2026 in Bir Billing. Strictly limited to 12 participants."*
- **Source of Truth Conflict:** The confirmed business rule and estate specification state: **8–10 guests maximum across 5 private earthen suites**.
- **Impact:** Misinforms prospective guests about cohort size and overstates Vaikunth Mud House suite capacity.
- **Recommended Correction:** Change "strictly capped at 12 guests maximum" to "strictly capped at 8–10 guests across 5 private earthen suites".

#### INC-02: Pathway Title Asymmetry ("The Awakening Journey" vs "The Awakening Pathway")
- **Severity:** Medium
- **Affected URLs:**
  - `https://www.thereset-co.in/` ([`index.html#L3133`](file:///C:/Users/Administrator/.gemini/antigravity/scratch/the-reset-co/index.html#L3133), [`#L3147`](file:///C:/Users/Administrator/.gemini/antigravity/scratch/the-reset-co/index.html#L3147))
  - `https://www.thereset-co.in/programmes` ([`programmes.html#L1735`](file:///C:/Users/Administrator/.gemini/antigravity/scratch/the-reset-co/programmes.html#L1735), [`#L1749`](file:///C:/Users/Administrator/.gemini/antigravity/scratch/the-reset-co/programmes.html#L1749), [`#L1977`](file:///C:/Users/Administrator/.gemini/antigravity/scratch/the-reset-co/programmes.html#L1977), [`#L2065`](file:///C:/Users/Administrator/.gemini/antigravity/scratch/the-reset-co/programmes.html#L2065))
  - `https://www.thereset-co.in/dosha-prakriti-assessment` ([`dosha-prakriti-assessment.html#L912`](file:///C:/Users/Administrator/.gemini/antigravity/scratch/the-reset-co/dosha-prakriti-assessment.html#L912))
- **Current Text:** Tab buttons and card titles use "The Awakening Journey", whereas the reservation forms and canonical URL `/programme-awakening` use "The Awakening Pathway".
- **Impact:** Minor brand dissonance and cross-page inconsistency for Tier 1 applicants.
- **Recommended Correction:** Standardize to "The Awakening Pathway" across all tab buttons, card headers, and table columns.

#### INC-03: Internal Duration Conflict in Assessment Tool
- **Severity:** Medium
- **Affected URL:** `https://www.thereset-co.in/dosha-prakriti-assessment` ([`dosha-prakriti-assessment.html#L912-L921`](file:///C:/Users/Administrator/.gemini/antigravity/scratch/the-reset-co/dosha-prakriti-assessment.html#L912-L921))
- **Current Code:**
  ```javascript
  let recName = 'The Awakening Journey (4 Days)';
  let recDesc = 'A restorative 5-day immersion in Bir Billing featuring daily grounding asanas...';
  ```
- **Conflict:** `recName` cites "(4 Days)" while `recDesc` in the exact same object cites "5-day immersion".
- **Impact:** Confuses prospective guests viewing their diagnostic result about actual stay duration.
- **Recommended Correction:** Update `recName` to `"The Awakening Pathway (4N/5D)"`.

---

## 4. Pricing, Occupancy & Meals

### Source of Truth Verification
- **Confirmed Tariffs:**
  - The Awakening Pathway: **₹27,990**
  - The Deep Rejuvenation: **₹34,990**
  - The Classical Reset: **₹39,990**
- **Inclusions Model:** Stated tariffs represent complete, all-inclusive packages (accommodation in Vaikunth Mud House, all tri-doshic meals, herbal teas, doctor interactions, therapies, and workshops). Guests arrange and fund only personal transit to Bir.
- **International Pricing:** International guests are billed ₹55,000, ₹65,000, and ₹75,000 respectively. Following our recent update on [`international.html`](file:///C:/Users/Administrator/.gemini/antigravity/scratch/the-reset-co/international.html#L548), the dropdown now clearly states that private single earthen suite accommodation is **Included in Tariff**, resolving the previous +₹18,000 supplement confusion.
- **Meal Policy:** All meals are tri-doshic, organic, vegetarian, and sattvic. The policy explicitly accommodates gluten-free, vegan, and nut sensitivities upon advance disclosure.

---

## 5. Programme Inclusions & Eye-Procedure Terminology

### Ayurvedic Botanical Protocol Audit
- **Netra Tarpana (अक्षीतर्पण):** Nourishing ocular pool utilizing lukewarm medicated ghee (**Triphala Ghrita**), molded with black gram flour dams.
- **Netra Prakshalana (नेत्र प्रक्षालन):** Cleansing eye wash using filtered herbal decoction (**Triphala Kwath**).

### Status Across Routes
- [`index.html#L3582`](file:///C:/Users/Administrator/.gemini/antigravity/scratch/the-reset-co/index.html#L3582): **Accurate** — explicitly defines Netra Tarpana (*warm medicated Triphala Ghrita eye bath*) and Netra Prakshalana (*cleansing Triphala Kwath eye wash*).
- [`programmes.html#L1909`](file:///C:/Users/Administrator/.gemini/antigravity/scratch/the-reset-co/programmes.html#L1909), [`#L2285`](file:///C:/Users/Administrator/.gemini/antigravity/scratch/the-reset-co/programmes.html#L2285): **Accurate** — specifies *Triphala Ghrita* ocular care.
- [`programme-reset.html#L396`](file:///C:/Users/Administrator/.gemini/antigravity/scratch/the-reset-co/programme-reset.html#L396): **Accurate** — titled *"Netra Tarpana & Netra Prakshalana Ocular Care"* with distinct botanical mediums.

### Post-Retreat Continuity Schedule
- **Awakening Pathway:** **3-day** personalized post-retreat lifestyle plan with WhatsApp doctor access.
- **Deep Rejuvenation:** **5-day** post-retreat care & guidance handover + 1 virtual follow-up.
- **Classical Reset:** **7-day** personalized Dinacharya routine + 2 virtual doctor calls.
- *Status:* Verified consistent across all 3 individual pathway landing pages and the programmes comparison table.

---

## 6. Forms, Allergies & Dietary Information

### Form Architecture & Data Pathways
1. **Domestic Reservation Form (`#previewForm` in `index.html`):**
   - Fields captured: `fName`, `fEmail`, `fPhone`, `fPlan`, `fDates`, `fCountry`, `fDietAllergies`, `fNotes`.
   - Submission triggers: Dispatches to `/api/send-email` (Resend) and directly persists to Supabase table `retreat_bookings`.
2. **International Form (`#intlEnquiryForm` in `international.html`):**
   - Fields captured: `intlName`, `intlEmail`, `intlPhone`, `intlCountry`, `intlDates`, `intlPathway`, `intlRoom`, `intlTransit`, `intlHealth`.
   - Combines room preference, transit, and health/diet notes into structured payload sent to `/api/send-email`.

### Explicit 3-Way Allergy Intake Implementation Blueprint
To achieve medical-grade clinical triage without altering database schema:
1. **Frontend (`index.html` & `international.html`):**
   ```html
   <div class="form-group">
     <label class="form-label">Do you have any severe food allergies, asthma, or herbal sensitivities? *</label>
     <div class="radio-pill-group">
       <label><input type="radio" name="has_allergy" value="no" checked> No</label>
       <label><input type="radio" name="has_allergy" value="yes"> Yes</label>
       <label><input type="radio" name="has_allergy" value="unsure"> I'm not sure</label>
     </div>
     <div id="allergyDetailsWrap" style="display:none; margin-top:0.5rem;">
       <input type="text" id="allergyDetails" class="form-input" placeholder="Specify substances (e.g. Peanuts, Gluten, Dairy, Sesame, Latex, Ashwagandha)">
     </div>
   </div>
   ```
2. **Data Pipeline:**
   - In `handleUnifiedEnquiry()`: Prefix notes with `[ALLERGY STATUS: YES - Peanuts]`.
   - In `api/send-email.js`: If `has_allergy === 'yes'`, render an urgent amber callout box in the intake email for Dr. Himanshu and Dr. Aditya.

---

## 7. Privacy & Security

### Commitments vs. Technical Reality
- **Data Protection:** [`privacy.html`](file:///C:/Users/Administrator/.gemini/antigravity/scratch/the-reset-co/privacy.html) cites compliance with India's **Digital Personal Data Protection (DPDP) Act 2023** and GDPR rights.
- **Access Restrictions:** Supabase Service Role Key is confined strictly to `/api/` serverless execution; the frontend uses only the public anon key with Row Level Security (RLS) policies.
- **Payment Information:** No credit card credentials or bank numbers are handled on client-side forms. Reservations utilize direct bank transfers and verified invoices, eliminating PCI-DSS attack surfaces.

---

## 8. SEO, Metadata, Redirects & Indexing

### Indexability & Technical SEO Status
- **Canonical Tags:** All 14 major HTML routes declare absolute, clean canonical tags (`https://www.thereset-co.in/...`).
- **Sitemap Coverage:** [`sitemap.xml`](file:///C:/Users/Administrator/.gemini/antigravity/scratch/the-reset-co/sitemap.xml) includes all 11 core public routes, including the individual pathway pages (`/programme-awakening`, `/programme-rejuvenation`, `/programme-reset`).
- **Robots Directives:** [`robots.txt`](file:///C:/Users/Administrator/.gemini/antigravity/scratch/the-reset-co/robots.txt) correctly disallows `/dashboard/`, `/api/`, and `/scratch/`.
- **JSON-LD Structured Data:**
  - `index.html`: `HealthAndBeautyBusiness` schema with 5-day duration.
  - `properties.html`: `LodgingBusiness` schema specifying 5 guest suites.
  - `programmes.html`: `ItemList` schema indexing all 3 retreat pathways.

---

## 9. Desktop/Mobile User Experience

- **Responsive Viewports:**
  - Desktop (>992px): Synchronized 3-column comparative matrix on `programmes.html`.
  - Mobile (<768px): Interactive 3-tab switcher (`Awakening | Rejuvenation | Classical Reset`) preventing horizontal scroll fatigue.
- **Mobile Navigation:**
  - Sticky glassmorphic navbar with smooth slide-in drawer.
  - Enquire CTA is compact and positioned after initial scroll threshold.
- **Accessibility:**
  - High-contrast typography adhering to WCAG 2.1 AA standards for ivory-on-navy and gold-on-cream contrast ratios.
  - Form inputs feature explicit `<label for="...">` pairings.

---

## 10. Recommended Changes by Priority

### Priority 1: High Priority (Operational & Capacity Accuracy)
1. **Fix Lingering 12-Guest References:**
   - [`programmes.html:2362`](file:///C:/Users/Administrator/.gemini/antigravity/scratch/the-reset-co/programmes.html#L2362): Update "capped at 12 guests maximum" to "strictly capped at 8–10 guests (5 earthen suites)".
   - [`meet-the-doctors.html:403`](file:///C:/Users/Administrator/.gemini/antigravity/scratch/the-reset-co/meet-the-doctors.html#L403): Update "Strictly limited to 12 participants" to "Strictly limited to 8–10 guests".

### Priority 2: Medium Priority (Nomenclature & Diagnostic Sync)
2. **Harmonize Pathway Titles:**
   - Update remaining "The Awakening Journey" instances in `index.html` (lines 3133, 3147) and `programmes.html` (lines 1735, 1749, 1977, 2065) to **The Awakening Pathway**.
3. **Resolve Assessment Diagnostic Duration Conflict:**
   - In [`dosha-prakriti-assessment.html#L912`](file:///C:/Users/Administrator/.gemini/antigravity/scratch/the-reset-co/dosha-prakriti-assessment.html#L912), change `The Awakening Journey (4 Days)` to `The Awakening Pathway (4N/5D)`.
4. **Update Review Form Pathway Dropdown:**
   - In [`review.html#L831-L833`](file:///C:/Users/Administrator/.gemini/antigravity/scratch/the-reset-co/review.html#L831-L833), update `(4 Days)` to `(4N/5D)`.

### Priority 3: Low Priority (Form Triage Enhancement)
5. **Add Structured 3-Way Allergy Radios:**
   - Add `Yes / No / I'm not sure` radio pills to `#previewForm` in `index.html` and `#intlEnquiryForm` in `international.html`.

---

## 11. Files and Components Needing Modification

| File Path | Lines | Target Component | Modification |
| :--- | :--- | :--- | :--- |
| `programmes.html` | Line 2362 | FAQ Accordion Item 01 | Replace "12 guests maximum" with "8–10 guests (5 earthen suites)". |
| `programmes.html` | Lines 1735, 1749, 1977, 2065 | Tab, Card Header & Matrix Title | Replace "The Awakening Journey" with "The Awakening Pathway". |
| `meet-the-doctors.html` | Line 403 | Bottom CTA Section | Replace "12 participants" with "8–10 guests across 5 suites". |
| `index.html` | Lines 3133, 3147 | Programme Tab & Card Title | Replace "The Awakening Journey" with "The Awakening Pathway". |
| `dosha-prakriti-assessment.html` | Lines 912, 920 | Recommendation Object | Change "(4 Days)" to "(4N/5D)" and standardize to Pathway. |
| `review.html` | Lines 831–833 | Form Pathway Select | Update options to reflect 4N/5D duration format. |

---

## 12. Checks That Could Not Be Completed (And Why)

1. **Third-Party Email Delivery Telemetry (Resend Webhook Bounces):**
   - Live bounce, spam complaint, and delivery latency logs reside inside the authenticated Resend web dashboard and cannot be inspected via local static code.
2. **Production Supabase RLS Policy Simulation:**
   - While client connection keys were verified, live simulated insertion rejection tests under non-anon roles were omitted to adhere strictly to the read-only audit constraint.
3. **Google Search Console Live Coverage Indexing:**
   - External Google crawl logs and SERP impressions require authenticated Google Search Console access.

---
*End of Cross-Page Consistency Audit Document.*
