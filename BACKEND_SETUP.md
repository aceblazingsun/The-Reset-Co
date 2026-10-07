# The Reset Co. — Backend Integration Blueprint

This document contains ready-to-run setup scripts and security configurations for connecting **The Reset Co** reservation form to either **Supabase** or **Firebase**.

---

## Architecture Overview

The booking form in `index.html` submits a structured payload containing both retreat reservation details and Ayurvedic Prakriti diagnostic findings:

```json
{
  "full_name": "Aarav Sharma",
  "whatsapp_number": "+91 98765 43210",
  "email": "aarav@example.com",
  "selected_tier": "awakening",
  "tier_display_name": "The Awakening Journey (Rs 26,000)",
  "preferred_dates": "November 2026",
  "health_notes": "Mild lower back stiffness from desk work.",
  "prakriti_profile": "Vata-Pitta Constitution",
  "submitted_at": "2026-09-24T10:30:00.000Z",
  "source": "website_reservation_form"
}
```

---

## Option 1: Supabase (PostgreSQL + RLS) — Recommended

Supabase gives you a relational PostgreSQL database with built-in Row-Level Security (RLS) so that public visitors can insert inquiries, but only authenticated BAMS doctors can read them.

### 1. SQL Schema (Run in Supabase SQL Editor)

```sql
-- Create table for retreat bookings (if not already created)
CREATE TABLE IF NOT EXISTS retreat_bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    phone TEXT,
    email TEXT NOT NULL,
    selected_plan TEXT,
    preferred_dates TEXT,
    "health notes" TEXT,
    prakriti_profile TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'consultation', 'confirmed', 'cancelled', 'archived')),
    doctor_notes TEXT
);

-- ─── HARDENED ROW LEVEL SECURITY (RLS) ───
-- 1. Enable RLS immediately
ALTER TABLE retreat_bookings ENABLE ROW LEVEL SECURITY;

-- 2. Drop any legacy open policies
DROP POLICY IF EXISTS "Public Full Access" ON retreat_bookings;
DROP POLICY IF EXISTS "Allow anonymous submissions" ON retreat_bookings;
DROP POLICY IF EXISTS "Allow public read" ON retreat_bookings;

-- 3. Policy 1: Allow public visitors (anon) ONLY to insert new booking inquiries
CREATE POLICY "Allow public insert only" 
ON retreat_bookings 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- 4. Policy 2: Allow authenticated service_role / doctors full access (SELECT, UPDATE, DELETE)
-- Public visitors have ZERO read/update/delete permissions (default-deny)
CREATE POLICY "Allow service role full access" 
ON retreat_bookings 
FOR ALL 
TO service_role 
USING (true) 
WITH CHECK (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON retreat_bookings (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON retreat_bookings (status);
```

### 2. Website Configuration

In `index.html`, locate the `BACKEND_CONFIG` object near the bottom of `<script>`:

```javascript
const BACKEND_CONFIG = {
  provider: 'supabase',
  supabase: {
    url: 'https://YOUR_PROJECT_ID.supabase.co',
    anonKey: 'YOUR_SUPABASE_ANON_PUBLIC_KEY',
    table: 'retreat_inquiries'
  }
};
```

---

## Option 2: Firebase (Cloud Firestore)

### 1. Firestore Security Rules (In Firebase Console)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /retreat_inquiries/{inquiryId} {
      // Allow public creation of inquiries with required fields
      allow create: if request.resource.data.full_name is string
                    && request.resource.data.whatsapp_number is string
                    && request.resource.data.email is string
                    && request.resource.data.selected_tier in ['serenity', 'awakening', 'transformation', 'dorm'];
      
      // Only authenticated staff/doctors can read or modify inquiries
      allow read, update, delete: if request.auth != null;
    }
  }
}
```

### 2. Website Configuration

In `index.html`:

```javascript
const BACKEND_CONFIG = {
  provider: 'firebase',
  firebase: {
    projectId: 'YOUR_FIREBASE_PROJECT_ID',
    apiKey: 'YOUR_FIREBASE_WEB_API_KEY',
    collection: 'retreat_inquiries'
  }
};
```

---

## Fail-Safe Guarantee

The frontend client uses a dual-dispatch pattern:
1. It asynchronously posts the data to your configured backend.
2. Even if the network drops or your backend returns an error, the form **never fails silently**. It automatically preserves the guest's inputs and opens the WhatsApp concierge with the complete prefilled summary, ensuring zero lead loss.
