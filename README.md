# The Reset Co.

> **Stillness is not a luxury. It is a prescription.**  
> Authentic, physician-led Ayurvedic wellness retreats in Bir Billing, Himachal Pradesh (1,525m). Founded and clinically directed by licensed BAMS doctors.

---

## Production File Architecture

This repository is kept strictly minimal and deployment-ready:

```
the-reset-co/
├── index.html                     # Core Sanctuary Website (responsive, ambient Surya Namaskar, booking flow)
├── dosha-prakriti-assessment.html  # Interactive Clinical Prakriti Parikshan (15-question dosha diagnostic)
├── the-reset-co-presentation.html # 15-Page Business Overview & Investment Memorandum (A4 Print/PDF ready)
├── images/                        # All retreat visual assets and reference-matched asanas
│   ├── hero_sanctuary.jpg
│   ├── dinacharya_ritual.jpg
│   ├── welcome_kit.jpg
│   ├── yoga.png, meditation.png, group.png
│   └── surya_pose1.jpg ... surya_pose8.jpg
├── vercel.json                    # Clean static deployment configuration with asset caching
└── .gitignore                     # Production Git rules
```

---

## Key Features

1. **Integrated Clinical Prakriti Parikshan**
   - Direct reciprocal link between `index.html` and `dosha-prakriti-assessment.html`.
   - On completing the 15-question assessment, clicking "Book Recommended Plan" redirects seamlessly to `index.html#reserve`, auto-selects the recommended 4-day suite (Serenity, Awakening, or Transformation), and displays an active Prakriti handover confirmation banner.

2. **Physician-Supervised 4-Day Retreat Programs**
   - Strictly 4-day all-inclusive programs (no per-night pricing).
   - Inclusions: Localized Basti procedures (Kati, Greeva, Nabhi), Netra Tarpana, Ashchyotana, supervised Day 3 Shatkarma, mindful pottery, stargazing, nature treks, and live Sufi acoustic sessions (Transformation tier).

3. **Asset-Light Operational Model**
   - Zero fixed real estate lease. High-occupancy partnership with shortlisted mountain property in Bir Billing.
   - Closed cohorts of 8 to 12 guests in private suites and a 6-bed community dormitory.

---

## Deployment & Hosting

### Deploying to Vercel
1. Push this repository to your GitHub account:
   ```bash
   git add .
   git commit -m "Production release: The Reset Co Sanctuary & Prakriti Parikshan"
   git branch -M main
   git remote add origin https://github.com/<YOUR-USERNAME>/the-reset-co.git
   git push -u origin main
   ```
2. Log in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your `the-reset-co` repository.
4. Keep the default settings (Framework Preset: **Other**) and click **Deploy**.
5. Your website will be live globally in ~30 seconds with custom domain support.

---

## Future Backend Roadmap (Supabase / Firebase)

The reservation form in `index.html` currently routes inquiries via direct WhatsApp concierge and mailto fallback. For automated database storage and notifications:

- **Supabase**: Connect an `inquiries` table with row-level security and a Supabase Edge Function to trigger email / SMS alerts.
- **Firebase**: Connect Cloud Firestore with a Firebase Cloud Function or Firebase Extension (Trigger Email) for automated doctor and guest notification.

---

*Confidential &bull; Directed by Dr. Aditya Kaundal (BAMS) &amp; Dr. Himanshu Bhatt (BAMS)*
