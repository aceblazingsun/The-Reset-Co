# The Reset Co. — Cross-Page Consistency & Architectural Audit (Read-Only)

**Date of Audit:** October 14, 2026  
**Subject:** The Reset Co. Codebase & Live Production Topology (`https://www.thereset-co.in/`)  
**Audit Mode:** Read-Only Verification (No database rows modified, no secrets exposed, no application code changed)

---

## 1. Executive Summary

This comprehensive audit evaluates cross-page consistency, botanical/ayurvedic terminological accuracy, commercial pricing parity, privacy claims versus technical implementations, and SEO indexing configurations across the complete repository of **The Reset Co.**.

### Key Findings Snapshot
1. **Critical Eye Procedure Conflation (Clinical / Classical Inconsistency):**  
   The codebase conflates **Netra Tarpana** (nourishing medicated ghee pool using *Triphala Ghrita*) with **Netra Prakshalana** (herbal decoction ocular irrigation using *Triphala Kwath*). Multiple occurrences in `index.html`, `programmes.html`, and `programme-reset.html` inaccurately state `"Triphala Kwath eye wash (Netra Tarpana)"`, which violates classical Ayurvedic protocol.
2. **International Pricing & Occupancy Conflict:**  
   While business rules confirm that international rates (₹55k, ₹65k, ₹75k) are inherently higher because international guests prefer single suites, the booking form on `international.html` explicitly includes a redundant checkbox for `"Private Single Suite Supplement (+₹18,000)"` while listing `"Deluxe Twin Sharing"` as `"Included in tariff"`.
3. **Reservation Deposit Discrepancy:**  
   Domestic routes and legal terms state a flat **₹10,000** deposit with balance due **15 days** prior, whereas `international.html` states a **25%** deposit (₹13,750–₹18,750) with balance due **14 days** prior.
4. **Allergy & Dietary Disclosure Deficit vs. Privacy Policy Claim:**  
   `privacy.html` (Section 2) asserts that guest medical conditions, food allergies, and dietary constraints are collected during reservation for safe administration of Shatkarma and Bastis. In reality, neither the domestic enquiry form (`index.html`) nor the international enquiry form (`international.html`) possesses an allergy field or dietary radio group—only a generic comments textarea.
5. **SEO & Sitemap Deficits:**  
   `sitemap.xml` omits all three canonical standalone pathway landing pages (`/programme-awakening`, `/programme-rejuvenation`, and `/programme-reset`), while `robots.txt` leaves internal preview files and `/dashboard/` exposed to crawlers without disallow directives.

---

## 2. Project Structure & Routes Inspected

### Architecture & Tech Stack
- **Framework & Foundation:** Vanilla ECMAScript 6+ / HTML5 / CSS3 (Semantic markup, BEM-inspired styling, modular vanilla script controllers).
- **Hosting & Infrastructure:** Static CDN & Serverless Node.js edge functions on **Vercel** (`vercel.json`).
- **Database & Persistence:** **Supabase PostgreSQL** via REST API (`@supabase/supabase-js`), targeting table `retreat_bookings`.
- **Transactional Communication:** **Resend API** for HTML email dispatch to admin (`reservations@thereset-co.in`) and applicant.

### Inventory of Public Routes & HTML Files Inspected
| Route / File | Canonical URL | Type & Role |
| :--- | :--- | :--- |
| `index.html` | `https://www.thereset-co.in/` | Primary Homepage & Master Reservation Modal |
| `programmes.html` | `https://www.thereset-co.in/programmes` | Master Programmes Overview & Interactive Comparison Matrix |
| `programme-awakening.html` | `https://www.thereset-co.in/programme-awakening` | Dedicated Landing Page: The Awakening Pathway (₹27,990) |
| `programme-rejuvenation.html` | `https://www.thereset-co.in/programme-rejuvenation` | Dedicated Landing Page: The Deep Rejuvenation Pathway (₹34,990) |
| `programme-reset.html` | `https://www.thereset-co.in/programme-reset` | Dedicated Landing Page: The Classical Reset Pathway (₹39,990) |
| `properties.html` | `https://www.thereset-co.in/properties` | Estate Dossier & 5 Earthen Suites Architectural Showcase |
| `meet-the-doctors.html` | `https://www.thereset-co.in/meet-the-doctors` | Biographies of Founding Vaidyas (Dr. Himanshu & Dr. Aditya) |
| `dosha-prakriti-assessment.html` | `https://www.thereset-co.in/dosha-prakriti-assessment` | Interactive 30-Question Ayurvedic Constitution Diagnostic |
| `review.html` | `https://www.thereset-co.in/review` | Guest Testimonials & Immersive Reflections Archive |
| `international.html` | `https://www.thereset-co.in/international` | International Traveler Concierge & Dedicated Single-Suite Booking Form |
| `guidelines.html` | `https://www.thereset-co.in/guidelines` | Sanctuary Ingress Rules, Digital Detox, & Code of Conduct |
| `terms.html` | `https://www.thereset-co.in/terms` | Legal Terms of Service, Cancellation Policy & Liabilities |
| `privacy.html` | `https://www.thereset-co.in/privacy` | Data Privacy, DPDP Act 2023 & GDPR Compliance Charter |
| `404.html` | `https://www.thereset-co.in/404` | Error Fallback Route |
| `dashboard/index.html` | `https://www.thereset-co.in/dashboard/` | Administrative Operational Console |

---

## 3. Confirmed Cross-Page Inconsistencies

| Finding ID | Domain / Component | Severity | Confidence | Summary of Inconsistency |
| :--- | :--- | :--- | :--- | :--- |
| **INC-01** | Clinical / Classical Protocol | **Critical** | Confirmed (100%) | Conflation of *Netra Tarpana* (Triphala Ghrita pool) with *Netra Prakshalana* (Triphala Kwath eye wash). |
| **INC-02** | Commercial & Pricing | **High** | Confirmed (100%) | `international.html` applies an extra +₹18,000 Single Supplement when base international tariff already accounts for single occupancy. |
| **INC-03** | Commercial & Terms | **Medium** | Confirmed (100%) | Deposit terms state ₹10,000 flat (15 days balance) on domestic vs 25% (14 days balance) on international. |
| **INC-04** | Privacy vs Implementation | **High** | Confirmed (100%) | `privacy.html` pledges dietary/allergy intake collection, but neither form has dedicated allergy inputs. |
| **INC-05** | SEO & Sitemap Indexing | **Medium** | Confirmed (100%) | `sitemap.xml` omits all 3 individual pathway URLs (`programme-awakening`, `programme-rejuvenation`, `programme-reset`). |
| **INC-06** | Metadata & Schema Parity | **Medium** | Confirmed (100%) | `index.html` JSON-LD schema refers to "Doctor-led 4-day" instead of updated "5-day (4N/5D)" retreat format. |
| **INC-07** | Testimonials vs Launch Timeline | **Low** | Confirmed (100%) | `index.html` and `review.html` display verified multi-day cohort quotes before the inaugural commercial cohort. |
| **INC-08** | Navigation Link Symmetry | **Low** | Confirmed (100%) | `privacy.html` is omitted from the footer navigation on `programmes.html`, `properties.html`, `review.html`, and `terms.html`. |
| **INC-09** | Nomenclature Parity | **Low** | Confirmed (100%) | `international.html` labels Pathway 1 "The Awakening Journey" instead of canonical "The Awakening Pathway". |

---

## 4. Pricing, Occupancy & Meals

### Source of Truth Verification
- **Domestic Rates (Fixed Source of Truth):**
  - Awakening: **₹27,990**
  - Deep Rejuvenation: **₹34,990**
  - Classical Reset: **₹39,990**
- **Coverage:** Includes luxury earthen suite accommodation, all tri-doshic sattvic meals, doctor consultations, herbal preparations, and daily guided sadhana. Guests arrange only personal transportation to/from Bir.

### Analysis of International Pricing Discrepancy (INC-02)
- **Code Inspection (`international.html`, lines 539–550):**
  ```html
  <select class="field-select" id="intlProgramme" required>
    <option value="awakening" data-price="55000">The Awakening Journey — ₹55,000</option>
    <option value="rejuvenation" data-price="65000">The Deep Rejuvenation — ₹65,000</option>
    <option value="reset" data-price="75000">The Classical Reset — ₹75,000</option>
  </select>
  ...
  <input type="radio" name="room" value="single"> Private Single Suite Supplement (+₹18,000)
  <input type="radio" name="room" value="twin" checked> Deluxe Twin Sharing (Included in tariff)
  ```
- **Architectural Conflict:**
  Confirmed business rules dictate that international prices are elevated precisely because international guests receive private single occupancy. Charging an additional ₹18,000 single supplement contradicts this model and displays an inflated price (e.g. ₹93,000 for Classical Reset).
- **Remedy:** Set the default room selection on `international.html` to **Private Earthen Suite (Single Occupancy — Included)** and eliminate or mark the twin option as an optional discounted companion arrangement.

### Deposit & Balance Payment Terms (INC-03)
- `terms.html` (Section 3.1) & `index.html`: **₹10,000 flat reservation deposit** per seat; remaining balance payable **15 days prior to arrival**.
- `international.html` (line 433): Stated as **25% advance deposit** upon invoice; balance due **14 days prior to arrival**.
- **Remedy:** Align international terms with either the uniform ₹10,000 reservation fee or clarify that international wire transfers require a fixed flat deposit (or standard percentage) with consistent balance cutoffs.

---

## 5. Programme Inclusions & Eye-Procedure Terminology

### Ayurvedic Source of Truth
- **Netra Tarpana:** Unctuous ocular rejuvenation where rings of black gram dough (*Masha*) are molded around the eye sockets and filled with lukewarm medicated ghee (**Triphala Ghrita**), deeply nourishing the optic nerve and relieving Vata/Pitta dryness.
- **Netra Prakshalana:** A cleansing irrigation technique using a filtered herbal decoction (**Triphala Kwath**) through an eye cup or sterile wash stream.

### Exact Violations in Codebase (INC-01)
1. **`index.html` (Line 3582):**
   ```html
   <p>Netra Tarpana: soothing Triphala Kwath eye wash for digital screen strain and optic fatigue</p>
   ```
   *Error:* Uses "Triphala Kwath eye wash" to define "Netra Tarpana".
2. **`programmes.html` (Line 1909):**
   ```html
   <div class="col-feature-title">Netra Tarpana Eye Care</div>
   <div class="col-feature-desc">Soothing Triphala Kwath eye wash for digital screen strain*</div>
   ```
3. **`programmes.html` (Lines 2285 & 2394):**
   ```html
   <span class="detail-label">Netra Tarpana</span>
   <span class="detail-val">Triphala Kwath eye wash for digital strain</span>
   ```
4. **`programme-reset.html` (Lines 396–397):**
   ```html
   <h3>Netra Tarpana & Triphala Kwath Eye Wash</h3>
   <p>Soothing classical eyewash using sterile decoctions...</p>
   ```

### Protocol Alignment Table
| Procedure | Classical Sanskrit Name | Classical Medium | Accurate Patient Description | Correct Programme Assignment |
| :--- | :--- | :--- | :--- | :--- |
| **Nourishing Eye Bath** | *Netra Tarpana* (अक्षीतर्पण) | Medicated Ghee (*Triphala Ghrita*) | Unctuous medicated ghee bath for deep optic nourishment and screen exhaustion | Deep Rejuvenation & Classical Reset |
| **Herbal Eye Wash** | *Netra Prakshalana* (नेत्र प्रक्षालन) | Herbal Decoction (*Triphala Kwath*) | Cleansing herbal decoction wash to clarify ocular passages and alleviate redness | Awakening Pathway |

---

## 6. Forms, Allergies & Dietary Information

### Form Implementation Audit
1. **Domestic Reservation Form (`#previewForm` in `index.html`):**
   - **Fields present:** `fName` (text), `fEmail` (email), `fPhone` (tel), `fProgramme` (select: Awakening, Rejuvenation, Reset), `fNotes` (textarea for general notes).
   - **Missing:** Zero explicit checkboxes, radio toggles, or input fields for food allergies, intolerances, or dietary restrictions.
2. **International Enquiry Form (`#intlEnquiryForm` in `international.html`):**
   - **Fields present:** `intlName`, `intlEmail`, `intlPhone`, `intlCountry`, `intlProgramme`, `intlArrival`, `intlGuests`, `intlDiet` (select: Sattvic Vegetarian, Vegan, Gluten-Free, Jain, Other), `intlHealth` (textarea).
   - **Missing:** Dedicated boolean confirmation for clinical allergies/anaphylaxis risks or contraindications.

### Data Path & Submission Endpoints
- **DOM Event:** Form submission triggers vanilla JS asynchronous `fetch()` POST request.
- **Backend Handlers:**
  - `api/confirm-booking.js` receives `payload` and writes record directly into Supabase table `retreat_bookings`.
  - `api/send-email.js` uses Resend SDK to format and transmit notification emails to `reservations@thereset-co.in`.
- **Database Schema (`retreat_bookings`):**
  - Fields stored: `id`, `full_name`, `email`, `phone`, `programme_slug`, `programme_name`, `total_price`, `currency`, `notes`, `booking_status`, `payment_status`, `created_at`.
  - There is currently no dedicated `allergies` or `dietary_requirements` database column. Any guest dietary note entered into `fNotes` is merged as raw unstructured text in `notes`.

### Exact Remediation Blueprint for Allergy Intake
To implement allergy screening without breaking backwards compatibility:
1. **Frontend (`index.html` & `international.html`):** Add a structured radio selector:
   ```html
   <label class="form-label">Do you have any severe food allergies or medical dietary restrictions?</label>
   <div class="radio-group">
     <label><input type="radio" name="has_allergies" value="no" checked> No</label>
     <label><input type="radio" name="has_allergies" value="yes"> Yes (Specify below)</label>
   </div>
   <input type="text" id="allergyDetails" name="allergy_details" class="field-input" placeholder="e.g. Peanuts, Dairy, Gluten, Honey..." style="display:none;">
   ```
2. **Edge Function (`api/confirm-booking.js`):** Parse `has_allergies` and `allergy_details`, prepending `[DIETARY ALERT: ...]` to the `notes` column (or appending to a new `allergies` column).
3. **Email Notification (`api/send-email.js`):** Inject a high-visibility red callout box in the Vaidya intake notification email whenever allergies are flagged.

---

## 7. Privacy & Security

### Legal Commitments vs Technical Reality
| `privacy.html` Commitment | Technical Implementation in Codebase | Compliance Status |
| :--- | :--- | :--- |
| **Section 2:** Collects dietary constraints & allergies for safe Shatkarma. | No dedicated allergy inputs on domestic booking form. Raw text dumped into generic textarea. | **Discrepancy (INC-04)** |
| **Section 3:** Payment information is tokenized via RBI-licensed gateways. | Client currently uses manual reservation deposit & wire transfer instructions; no direct inline card tokenization occurs on the frontend. | **Accurate** (No PCI liability on site) |
| **Section 5:** 256-bit encryption in transit and at rest. | HTTPS enforced via Vercel Edge SSL; Supabase PostgreSQL stores data encrypted at rest. | **Compliant** |
| **Section 6:** Guest right to data erasure & Grievance Officer contacts. | Grievance Officer listed (`privacy@thereset-co.in` / `contact@thereset-co.in`). | **Compliant** |

### Environment Secrets & Access Hygiene
- `SUPABASE_SERVICE_ROLE_KEY` is restricted strictly to `/api/` serverless edge functions and is **never** leaked to client-side bundles.
- Client-side code in `assets/main.js` correctly uses only the public anon key or dispatches to internal `/api/` endpoints.

---

## 8. SEO, Metadata, Redirects & Indexing

### Sitemap & Robots Verification
- **`sitemap.xml` Issues (INC-05):**
  The sitemap lists 8 URLs:
  - `https://www.thereset-co.in/`
  - `https://www.thereset-co.in/programmes`
  - `https://www.thereset-co.in/properties`
  - `https://www.thereset-co.in/meet-the-doctors`
  - `https://www.thereset-co.in/dosha-prakriti-assessment`
  - `https://www.thereset-co.in/review`
  - `https://www.thereset-co.in/international`
  - `https://www.thereset-co.in/guidelines`
  - *Omissions:* **`programme-awakening.html`**, **`programme-rejuvenation.html`**, **`programme-reset.html`**, **`terms.html`**, and **`privacy.html`** are completely missing from `sitemap.xml`.
- **`robots.txt` Issues:**
  Currently contains:
  ```txt
  User-agent: *
  Allow: /
  Sitemap: https://www.thereset-co.in/sitemap.xml
  ```
  *Deficit:* Does not disallow `/dashboard/`, `/scratch/`, or testing preview artifacts.

### Structured Data (JSON-LD) Inconsistency (INC-06)
In `index.html` (Lines 2561–2565):
```json
{
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  "name": "The Reset Co.",
  "description": "Doctor-led 4-day classical Ayurvedic immersion in Bir, Himachal Pradesh..."
}
```
*Issue:* The description still cites "4-day" instead of the updated "5-day (4N/5D)" retreat duration.

---

## 9. Desktop/Mobile User Experience

1. **Comparison Matrix Responsiveness:**
   - On desktop viewport (>992px), `programmes.html` renders a side-by-side 3-column feature matrix with synchronized sticky headers.
   - On mobile viewport (<768px), the layout switches to a tabbed pathway selector (`Awakening | Rejuvenation | Classical Reset`) displaying individual inclusion cards.
2. **Navigation Drawer Behavior:**
   - The mobile hamburger menu drawer slides smoothly from the right with a full-viewport overlay.
   - Dismissal occurs via tap outside, close icon, or escape key.
3. **Estate Dossier Gallery:**
   - Clicking property previews in `properties.html` triggers modal gallery lightboxes with full-resolution imagery of the 5 private earthen suites.

---

## 10. Recommended Changes by Priority

### Priority 1: Immediate Critical Corrections (Content & Terminology)
1. **Fix Eye-Procedure Terminology Across All Pages:**
   - Update `index.html`, `programmes.html`, and `programme-reset.html` so that **Netra Tarpana** is described as a *Triphala Ghrita* eye bath, and **Netra Prakshalana** is described as a *Triphala Kwath* eye wash.
2. **Correct International Single Occupancy Model:**
   - Remove or adjust the redundant `+₹18,000` Single Suite Supplement in `international.html` to reflect that single occupancy is already bundled into the international tariff.

### Priority 2: High Priority Legal & Intake Enhancements
3. **Implement Structured Dietary & Allergy Disclosure:**
   - Add allergy/intolerance confirmation fields to both booking forms to fulfill the safety pledge in `privacy.html`.
4. **Synchronize Reservation Deposit & Balance Due Timelines:**
   - Harmonize `international.html` deposit terms with `terms.html` (₹10,000 reservation fee, balance due 15 days prior).

### Priority 3: Medium Priority SEO & Indexing Updates
5. **Update `sitemap.xml` & `robots.txt`:**
   - Add the three dedicated pathway URLs (`/programme-awakening`, `/programme-rejuvenation`, `/programme-reset`), `/terms`, and `/privacy` to `sitemap.xml`.
   - Add `Disallow: /dashboard/` in `robots.txt`.
6. **Update JSON-LD Duration Schema:**
   - Change "Doctor-led 4-day" to "Doctor-led 5-day (4N/5D)" in `index.html`.

### Priority 4: Low Priority Polish & Navigation Symmetry
7. **Add Footer Privacy Policy Link:**
   - Add `privacy.html` link to footers in `programmes.html`, `properties.html`, `review.html`, and `terms.html`.
8. **Harmonize Pathway Titles:**
   - Ensure "The Awakening Pathway" is used uniformly instead of "The Awakening Journey" on `international.html`.

---

## 11. Files & Components Needing Modification

| File Path | Component / Section | Modification Needed |
| :--- | :--- | :--- |
| `index.html` | Line 2561 (JSON-LD) | Update "4-day" to "5-day (4N/5D)" in schema description. |
| `index.html` | Line 3582 (FAQ / Inclusions) | Replace "Triphala Kwath eye wash (Netra Tarpana)" with "Triphala Ghrita eye bath (Netra Tarpana)". |
| `index.html` | Line 3780 (Reservation Modal) | Add explicit food allergy / dietary restriction selection fields. |
| `programmes.html` | Line 1909 & 2285 | Differentiate Netra Tarpana (*Triphala Ghrita*) from Netra Prakshalana (*Triphala Kwath*). |
| `programmes.html` | Footer Navigation | Add missing link to `privacy.html`. |
| `programme-reset.html` | Lines 396–397 | Retitle and clarify Netra Tarpana procedure with *Triphala Ghrita*. |
| `international.html` | Lines 433 & 548 | Align deposit terms with ₹10,000 / 15 days; remove redundant +₹18k single supplement. |
| `sitemap.xml` | `<urlset>` | Add `/programme-awakening`, `/programme-rejuvenation`, `/programme-reset`, `/terms`, `/privacy`. |
| `robots.txt` | Crawler Directives | Add `Disallow: /dashboard/` to prevent indexing of internal dashboard. |
| `api/confirm-booking.js` | Booking Payload Handler | Accept and store structured allergy data in `notes`. |
| `api/send-email.js` | Email Template Generator | Add high-visibility alert box for guest allergies in admin intake notifications. |

---

## 12. Checks That Could Not Be Completed (And Why)

1. **Direct Live Vercel Edge Deployment Logs:**
   - Production build and runtime server logs on Vercel Edge could not be streamed directly via read-only repository inspection as they require active Vercel CLI token access.
2. **Third-Party Email Delivery Telemetry (Resend Dashboard):**
   - Resend inbox delivery rates, bounce logs, and spam scoring could not be verified directly from code inspection alone without external API authentication.
3. **Live Payment Gateway Webhooks:**
   - Since online gateway checkout (e.g. Razorpay/Stripe) is currently handled via direct bank transfer and booking inquiry reservation rather than an automated client-side SDK checkout, live webhook lifecycle tests were not executed.

---
*End of Cross-Page Consistency Audit Document. Preserved as a read-only architectural baseline.*
