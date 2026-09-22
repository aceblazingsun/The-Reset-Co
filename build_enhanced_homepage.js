const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'homepage.html');
const backupPath = path.join(__dirname, 'homepage.backup.html');

console.log('Reading existing homepage.backup.html...');
let html = fs.readFileSync(backupPath, 'utf8');

// 2. Prepare CSS to inject before </style>
const additionalStyles = `
  /* ═══════════════════════════════════════════════════════
     NEW ARCHITECTURAL UPGRADES: RETREAT COHORTS & SECTIONS
     ═══════════════════════════════════════════════════════ */

  /* ─── SITE HEADER, TOP RETREAT COHORT ANNOUNCEMENT & FLYOUT ─── */
  .site-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    transition: all 0.35s var(--ease-spring);
  }
  .upcoming-strip {
    background: #071224;
    border-bottom: 1px solid rgba(201, 168, 76, 0.35);
    position: relative;
    z-index: 1001;
    font-size: 0.78rem;
    color: var(--text-light);
  }
  .upcoming-inner {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0.5rem 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  nav {
    position: relative !important;
    top: auto !important;
    left: auto !important;
    right: auto !important;
    padding: 1.1rem 4rem !important;
    background: rgba(10, 25, 49, 0.92) !important;
    backdrop-filter: blur(16px) !important;
    -webkit-backdrop-filter: blur(16px) !important;
    border-bottom: 1px solid rgba(201, 168, 76, 0.22) !important;
    transition: padding 0.35s var(--ease-spring), background 0.35s ease !important;
  }
  .site-header.scrolled nav {
    padding: 0.75rem 4rem !important;
    background: rgba(10, 25, 49, 0.98) !important;
    box-shadow: 0 4px 30px rgba(0,0,0,0.4) !important;
  }
  .hero {
    padding-top: 9.5rem !important;
  }
  .mobile-menu {
    top: 96px !important;
  }
  @media (max-width: 768px) {
    .hero {
      padding-top: 8rem !important;
    }
  }
  .upcoming-trigger {
    background: transparent;
    border: none;
    color: var(--gold-light);
    display: inline-flex;
    align-items: center;
    gap: 9px;
    cursor: pointer;
    font-family: var(--sans);
    font-size: 0.76rem;
    letter-spacing: 0.08em;
    padding: 4px 12px;
    border-radius: 9999px;
    transition: all 0.25s var(--ease-spring);
  }
  .upcoming-trigger:hover, .upcoming-trigger:focus-visible {
    background: rgba(201, 168, 76, 0.15);
    color: #FFF;
    outline: none;
  }
  .upcoming-pulse {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #4ADE80;
    box-shadow: 0 0 10px #4ADE80;
    display: inline-block;
  }
  .upcoming-chevron {
    transition: transform 0.3s var(--ease-spring);
    font-size: 0.7rem;
  }
  .upcoming-trigger[aria-expanded="true"] .upcoming-chevron {
    transform: rotate(180deg);
  }

  /* Interactive Flyout Popover */
  .upcoming-flyout {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(8px);
    width: min(94vw, 1100px);
    background: linear-gradient(180deg, #0A1931 0%, #071224 100%);
    border: 1px solid var(--gold);
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.75), 0 0 30px rgba(201, 168, 76, 0.15);
    border-radius: 8px;
    padding: 2.2rem;
    z-index: 2000;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition: opacity 0.3s var(--ease-spring), transform 0.3s var(--ease-spring), visibility 0.3s;
  }
  .upcoming-flyout.open {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    transform: translateX(-50%) translateY(0);
  }
  .flyout-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    border-bottom: 1px solid rgba(201, 168, 76, 0.2);
    padding-bottom: 1.2rem;
    margin-bottom: 1.8rem;
  }
  .flyout-header h3 {
    font-family: var(--serif);
    font-size: 1.6rem;
    color: var(--ivory);
    font-weight: 500;
  }
  .flyout-header p {
    font-size: 0.8rem;
    color: rgba(250, 247, 240, 0.65);
    margin-top: 4px;
  }
  .flyout-close {
    background: transparent;
    border: 1px solid rgba(201, 168, 76, 0.3);
    color: var(--gold-light);
    width: 32px;
    height: 32px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    line-height: 1;
    transition: all 0.2s;
  }
  .flyout-close:hover {
    background: rgba(201, 168, 76, 0.2);
    color: #FFF;
  }
  .flyout-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }
  .flyout-card {
    background: rgba(19, 39, 79, 0.6);
    border: 1px solid rgba(201, 168, 76, 0.25);
    border-radius: 6px;
    padding: 1.6rem 1.4rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    transition: border-color 0.25s, transform 0.25s;
  }
  .flyout-card:hover {
    border-color: var(--gold);
    transform: translateY(-2px);
    background: rgba(19, 39, 79, 0.85);
  }
  .flyout-badge {
    display: inline-block;
    background: rgba(201, 168, 76, 0.15);
    border: 1px solid rgba(201, 168, 76, 0.4);
    color: var(--gold-light);
    font-size: 0.62rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    padding: 3px 9px;
    border-radius: 3px;
    margin-bottom: 0.8rem;
    align-self: flex-start;
  }
  .flyout-title {
    font-family: var(--serif);
    font-size: 1.35rem;
    color: var(--ivory);
    margin-bottom: 0.4rem;
  }
  .flyout-dates {
    font-size: 0.78rem;
    color: var(--gold);
    font-weight: 600;
    margin-bottom: 0.8rem;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .flyout-desc {
    font-size: 0.78rem;
    color: rgba(250, 247, 240, 0.65);
    line-height: 1.6;
    margin-bottom: 1.2rem;
    flex-grow: 1;
  }
  .flyout-footer-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid rgba(201, 168, 76, 0.15);
    padding-top: 1rem;
    margin-top: 0.5rem;
  }
  .flyout-price-val {
    font-family: var(--serif);
    font-size: 1.4rem;
    color: var(--gold-light);
    font-weight: 500;
  }
  .flyout-per {
    font-size: 0.65rem;
    color: rgba(250, 247, 240, 0.5);
    display: block;
  }
  .flyout-btn {
    background: var(--gold);
    color: var(--royal-deep);
    border: none;
    font-family: var(--sans);
    font-size: 0.68rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    font-weight: 600;
    padding: 0.6rem 1.1rem;
    border-radius: 2px;
    cursor: pointer;
    transition: background 0.2s, transform 0.2s;
  }
  .flyout-btn:hover {
    background: var(--gold-light);
    transform: translateY(-1px);
  }

  /* ─── SURYA NAMASKAR SCROLLYTELLING PINNED SECTION ─── */
  .surya-track {
    position: relative;
    height: 380vh;
    background: #081427;
  }
  .surya-stage {
    position: sticky;
    top: 0;
    height: 100vh;
    width: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: radial-gradient(circle at 45% 45%, rgba(19, 39, 79, 0.7) 0%, #061020 85%);
  }
  .surya-header-bar {
    position: absolute;
    top: 2rem;
    left: 4rem;
    right: 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 20;
    border-bottom: 1px solid rgba(201, 168, 76, 0.2);
    padding-bottom: 1rem;
  }
  .surya-header-tag {
    font-size: 0.68rem;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: var(--gold);
    font-weight: 600;
  }
  .surya-header-title {
    font-family: var(--serif);
    font-size: 1.4rem;
    color: var(--ivory);
  }
  .surya-grid {
    display: grid;
    grid-template-columns: 55% 45%;
    height: 80vh;
    margin-top: 5vh;
    padding: 0 4rem;
    align-items: center;
    position: relative;
    z-index: 10;
  }
  .surya-visual-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    height: 100%;
  }
  .surya-breath-indicator {
    position: absolute;
    width: 380px;
    height: 380px;
    border-radius: 50%;
    border: 1px dashed rgba(201, 168, 76, 0.35);
    box-shadow: 0 0 60px rgba(201, 168, 76, 0.12);
    pointer-events: none;
    transition: transform 0.6s var(--ease-spring), border-color 0.4s;
    transform: scale(1);
  }
  .surya-breath-indicator.inhale {
    transform: scale(1.18);
    border-color: rgba(201, 168, 76, 0.7);
    box-shadow: 0 0 90px rgba(201, 168, 76, 0.25);
  }
  .surya-breath-indicator.exhale {
    transform: scale(0.86);
    border-color: rgba(201, 168, 76, 0.25);
    box-shadow: 0 0 40px rgba(201, 168, 76, 0.08);
  }
  .surya-yogi-svg-stage {
    width: 340px;
    height: 340px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 5;
  }
  .surya-yogi-svg-stage svg {
    width: 100%;
    height: 100%;
    filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.6));
    transition: transform 0.5s var(--ease-spring), opacity 0.4s;
  }
  .surya-dial-row {
    position: absolute;
    bottom: 1.5rem;
    left: 4rem;
    right: 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid rgba(201, 168, 76, 0.15);
    padding-top: 1rem;
    z-index: 20;
  }
  .surya-dots {
    display: flex;
    gap: 12px;
    align-items: center;
  }
  .surya-dot-btn {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: rgba(19, 39, 79, 0.8);
    border: 1px solid rgba(201, 168, 76, 0.3);
    color: rgba(250, 247, 240, 0.5);
    font-size: 0.62rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--sans);
    transition: all 0.25s;
  }
  .surya-dot-btn.active, .surya-dot-btn:hover {
    background: var(--gold);
    color: var(--royal-deep);
    border-color: var(--gold);
    font-weight: 700;
    transform: scale(1.15);
  }
  .surya-info-card {
    background: rgba(10, 25, 49, 0.85);
    border: 1px solid rgba(201, 168, 76, 0.35);
    border-radius: 8px;
    padding: 2.5rem 3rem;
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);
  }
  .surya-step-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
  .surya-step-idx {
    font-family: var(--serif);
    font-size: 1.8rem;
    color: var(--gold);
    font-weight: 600;
  }
  .surya-step-mantra {
    font-family: var(--serif);
    font-size: 1.1rem;
    color: var(--gold-light);
    font-style: italic;
    letter-spacing: 0.05em;
  }
  .surya-step-name {
    font-family: var(--serif);
    font-size: 2.2rem;
    color: var(--ivory);
    font-weight: 500;
    line-height: 1.15;
    margin-bottom: 0.4rem;
  }
  .surya-step-english {
    font-size: 0.82rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(250, 247, 240, 0.5);
    margin-bottom: 1.4rem;
  }
  .surya-breath-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(201, 168, 76, 0.12);
    border: 1px solid rgba(201, 168, 76, 0.4);
    padding: 6px 14px;
    border-radius: 9999px;
    font-size: 0.76rem;
    color: var(--gold-light);
    font-weight: 600;
    margin-bottom: 1.6rem;
  }
  .surya-clinical-p {
    font-size: 0.92rem;
    color: rgba(250, 247, 240, 0.8);
    line-height: 1.75;
    margin-bottom: 1.6rem;
  }
  .surya-doc-advice {
    border-left: 2px solid var(--gold);
    padding-left: 1.2rem;
    font-size: 0.82rem;
    color: rgba(250, 247, 240, 0.65);
    font-style: italic;
    line-height: 1.65;
  }

  /* ─── WHAT YOU WILL EXPERIENCE (5 IMMERSIVE PILLARS) ─── */
  .experience-sec {
    background: var(--stone);
    padding: 7rem 0;
  }
  .exp-tabs {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 3rem;
    margin-bottom: 3.5rem;
    flex-wrap: wrap;
  }
  .exp-tab-btn {
    background: transparent;
    border: 1px solid rgba(201, 168, 76, 0.35);
    padding: 0.75rem 1.6rem;
    font-family: var(--sans);
    font-size: 0.74rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--royal-deep);
    font-weight: 600;
    cursor: pointer;
    border-radius: 2px;
    transition: all 0.25s;
  }
  .exp-tab-btn.active, .exp-tab-btn:hover {
    background: var(--royal-deep);
    color: var(--gold-light);
    border-color: var(--royal-deep);
  }
  .exp-panel {
    display: none;
    grid-template-columns: 1fr 1fr;
    gap: 3.5rem;
    align-items: center;
    background: #FFF;
    border: 1px solid rgba(201, 168, 76, 0.22);
    padding: 3.5rem;
    box-shadow: 0 10px 40px rgba(10, 25, 49, 0.05);
  }
  .exp-panel.active {
    display: grid;
  }
  .exp-text-content h3 {
    font-family: var(--serif);
    font-size: 2.2rem;
    color: var(--royal-deep);
    margin-bottom: 0.6rem;
    line-height: 1.2;
  }
  .exp-text-time {
    font-size: 0.75rem;
    color: var(--gold);
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    margin-bottom: 1.5rem;
  }
  .exp-text-body {
    font-size: 0.92rem;
    color: var(--text-muted);
    line-height: 1.85;
    margin-bottom: 1.8rem;
  }
  .exp-highlights {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    margin-bottom: 2rem;
  }
  .exp-highlights li {
    font-size: 0.85rem;
    color: var(--text);
    display: flex;
    gap: 10px;
    align-items: baseline;
  }
  .exp-highlights li::before {
    content: '✦';
    color: var(--gold);
    font-size: 0.65rem;
  }
  .exp-img-frame {
    height: 420px;
    border-radius: 4px;
    overflow: hidden;
    position: relative;
    border: 1px solid rgba(201, 168, 76, 0.3);
  }
  .exp-img-frame img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* ─── HOW IT WILL HELP YOU (CLINICAL RECOVERY) ─── */
  .clinical-sec {
    background: var(--royal-deep);
    padding: 7rem 0;
  }
  .clinical-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    margin-top: 4rem;
  }
  .clinical-card {
    background: rgba(19, 39, 79, 0.65);
    border: 1px solid rgba(201, 168, 76, 0.25);
    border-radius: 6px;
    padding: 2.5rem 1.8rem;
    position: relative;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    transition: all 0.3s;
  }
  .clinical-card:hover {
    border-color: var(--gold);
    transform: translateY(-4px);
    background: rgba(19, 39, 79, 0.95);
  }
  .clinical-num {
    font-family: var(--serif);
    font-size: 1.6rem;
    color: var(--gold);
    margin-bottom: 1rem;
  }
  .clinical-card h3 {
    font-family: var(--serif);
    font-size: 1.45rem;
    color: var(--ivory);
    margin-bottom: 0.8rem;
    line-height: 1.25;
  }
  .clinical-metric {
    font-size: 0.7rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--gold-light);
    margin-bottom: 1.2rem;
    display: block;
    font-weight: 600;
  }
  .clinical-card p {
    font-size: 0.85rem;
    color: rgba(250, 247, 240, 0.68);
    line-height: 1.75;
  }

  /* ─── THE SACRED WELCOME KIT ─── */
  .kit-sec {
    background: #08162B;
    padding: 7rem 0;
    border-top: 1px solid rgba(201, 168, 76, 0.2);
  }
  .kit-split {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
    margin-top: 4rem;
  }
  .kit-photo-card {
    border-radius: 8px;
    overflow: hidden;
    border: 2px solid var(--gold);
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6);
    position: relative;
  }
  .kit-photo-card img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
  }
  .kit-list {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.2rem;
  }
  .kit-item {
    background: rgba(19, 39, 79, 0.5);
    border: 1px solid rgba(201, 168, 76, 0.2);
    padding: 1.2rem 1.6rem;
    border-radius: 4px;
    display: flex;
    gap: 1.2rem;
    align-items: flex-start;
  }
  .kit-icon {
    font-family: var(--serif);
    font-size: 1.4rem;
    color: var(--gold);
    line-height: 1;
    margin-top: 2px;
  }
  .kit-info h4 {
    font-family: var(--serif);
    font-size: 1.15rem;
    color: var(--ivory);
    margin-bottom: 0.25rem;
  }
  .kit-info p {
    font-size: 0.82rem;
    color: rgba(250, 247, 240, 0.62);
    line-height: 1.6;
  }

  /* ─── PROGRAM ESSENTIALS & GUEST CONDUCT ─── */
  .conduct-sec {
    background: var(--stone);
    padding: 6.5rem 0;
  }
  .conduct-agreement-card {
    background: #FFF;
    border: 2px solid rgba(201, 168, 76, 0.4);
    border-radius: 6px;
    padding: 3.5rem;
    margin-top: 3.5rem;
    box-shadow: 0 15px 45px rgba(10, 25, 49, 0.05);
  }
  .conduct-header {
    text-align: center;
    max-width: 700px;
    margin: 0 auto 3rem;
  }
  .conduct-header h3 {
    font-family: var(--serif);
    font-size: 2rem;
    color: var(--royal-deep);
    margin-bottom: 0.6rem;
  }
  .conduct-header p {
    font-size: 0.88rem;
    color: var(--text-muted);
    line-height: 1.7;
  }
  .conduct-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2.5rem;
  }
  .conduct-item {
    display: flex;
    gap: 1.4rem;
    align-items: flex-start;
  }
  .conduct-badge {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(201, 168, 76, 0.15);
    border: 1px solid var(--gold);
    color: var(--royal-deep);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 0.85rem;
    flex-shrink: 0;
  }
  .conduct-text h4 {
    font-family: var(--serif);
    font-size: 1.25rem;
    color: var(--royal-deep);
    margin-bottom: 0.4rem;
  }
  .conduct-text p {
    font-size: 0.85rem;
    color: var(--text-muted);
    line-height: 1.7;
  }

  /* ─── ALL-INCLUSIVE PACKAGE INCLUSIONS MATRIX ─── */
  .inclusions-sec {
    background: var(--ivory);
    padding: 6.5rem 0;
  }
  .inclusions-table-card {
    background: white;
    border: 1px solid rgba(201, 168, 76, 0.3);
    border-radius: 6px;
    overflow-x: auto;
    margin-top: 3.5rem;
    box-shadow: 0 10px 30px rgba(10, 25, 49, 0.04);
  }
  .inc-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.85rem;
  }
  .inc-table th, .inc-table td {
    padding: 1.2rem 1.6rem;
    text-align: left;
    border-bottom: 1px solid rgba(201, 168, 76, 0.15);
  }
  .inc-table th {
    background: var(--royal-deep);
    color: var(--ivory);
    font-family: var(--serif);
    font-size: 1.15rem;
    font-weight: 500;
    letter-spacing: 0.04em;
  }
  .inc-table th.highlight {
    background: var(--royal);
    color: var(--gold-light);
    border-bottom: 2px solid var(--gold);
  }
  .inc-table tr:hover td {
    background: rgba(201, 168, 76, 0.04);
  }
  .inc-feature {
    font-weight: 600;
    color: var(--royal-deep);
  }
  .inc-feature-desc {
    display: block;
    font-size: 0.75rem;
    color: var(--text-muted);
    font-weight: 400;
    margin-top: 3px;
  }
  .inc-check {
    color: #16A34A;
    font-weight: 700;
    font-size: 1.1rem;
  }

  /* ─── CANCELLATION POLICY MODAL ─── */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(7, 18, 36, 0.88);
    backdrop-filter: blur(12px);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition: opacity 0.3s var(--ease-spring), visibility 0.3s;
  }
  .modal-overlay.open {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
  }
  .modal-dialog {
    background: var(--royal-deep);
    border: 1px solid var(--gold);
    width: min(92vw, 850px);
    max-height: 88vh;
    overflow-y: auto;
    border-radius: 8px;
    padding: 3rem;
    box-shadow: 0 25px 70px rgba(0, 0, 0, 0.8), 0 0 35px rgba(201, 168, 76, 0.2);
    position: relative;
    transform: scale(0.96) translateY(15px);
    transition: transform 0.3s var(--ease-spring);
  }
  .modal-overlay.open .modal-dialog {
    transform: scale(1) translateY(0);
  }
  .modal-close-btn {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    background: transparent;
    border: 1px solid rgba(201, 168, 76, 0.4);
    color: var(--gold-light);
    width: 36px;
    height: 36px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
  }
  .modal-close-btn:hover {
    background: rgba(201, 168, 76, 0.2);
    color: #FFF;
  }
  .cancel-tier-card {
    background: rgba(19, 39, 79, 0.7);
    border: 1px solid rgba(201, 168, 76, 0.25);
    border-radius: 6px;
    padding: 1.5rem 1.8rem;
    margin-bottom: 1.2rem;
  }
  .cancel-tier-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }
  .cancel-tier-window {
    font-family: var(--serif);
    font-size: 1.25rem;
    color: var(--ivory);
  }
  .cancel-tier-refund {
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--gold-light);
  }
  .cancel-tier-desc {
    font-size: 0.82rem;
    color: rgba(250, 247, 240, 0.65);
    line-height: 1.6;
  }

  /* Responsive refinements */
  @media (max-width: 1024px) {
    .surya-grid { grid-template-columns: 1fr; height: auto; padding: 0 2rem; }
    .surya-yogi-svg-stage { width: 260px; height: 260px; }
    .surya-breath-indicator { width: 280px; height: 280px; }
    .flyout-grid { grid-template-columns: 1fr; }
    .exp-panel { grid-template-columns: 1fr; padding: 2rem; }
    .exp-img-frame { height: 280px; }
    .clinical-grid { grid-template-columns: repeat(2, 1fr); }
    .kit-split { grid-template-columns: 1fr; }
    .conduct-grid { grid-template-columns: 1fr; }
  }
  @media (max-width: 768px) {
    .clinical-grid { grid-template-columns: 1fr; }
    .surya-header-bar { left: 1.5rem; right: 1.5rem; }
    .surya-dial-row { left: 1.5rem; right: 1.5rem; }
    .surya-dots { overflow-x: auto; max-width: 100%; padding-bottom: 6px; }
    .surya-dot-btn { flex-shrink: 0; min-width: 28px; }
    .upcoming-strip { font-size: 0.72rem; }
    .upcoming-inner { padding: 0.4rem 1rem; }
    .upcoming-trigger { font-size: 0.72rem; padding: 4px 8px; }
    .flyout-header h3 { font-size: 1.3rem; }
    .flyout-card { padding: 1.2rem 1rem; }
    .conduct-agreement-card { padding: 1.8rem 1.2rem; }
    .inclusions-table-card { padding: 0.5rem; }
    .inc-table th, .inc-table td { padding: 0.75rem 0.6rem; font-size: 0.75rem; }
  }

  /* Calm Aesthetic & Interaction Overrides */
  .cursor-ring, .cursor-dot, .sound-toggle {
    display: none !important;
  }
  .card-interactive {
    transform: none !important;
    transition: border-color 0.25s ease, background 0.25s ease !important;
  }

  /* Fixed Header Scroll Padding */
  html {
    scroll-padding-top: 7rem;
  }

  /* Medical Disclaimer and Consent Styling */
  .medical-disclaimer {
    font-size: 0.78rem;
    color: rgba(250, 247, 240, 0.65);
    line-height: 1.6;
    margin: 1.2rem 0;
    padding: 0.9rem 1rem;
    background: rgba(19, 39, 79, 0.5);
    border-left: 2px solid var(--gold);
    border-radius: 0 4px 4px 0;
  }
  .consent-row {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    font-size: 0.8rem;
    color: var(--ivory);
    line-height: 1.5;
    margin-bottom: 1rem;
    cursor: pointer;
  }
  .consent-row input[type="checkbox"] {
    margin-top: 0.2rem;
    accent-color: var(--gold);
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }

  /* Minimum 44px Touch Targets */
  button, a.btn-primary, a.btn-outline, .flyout-btn, .surya-dot-btn {
    min-height: 44px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  /* Reduced Motion Compliance */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;

// Inject CSS right before </style>
html = html.replace('</style>', `${additionalStyles}\n</style>`);
console.log('Injected additional CSS styles successfully.');

// 3. Prepare Top Banner & Flyout HTML
const upcomingBannerHtml = `
<!-- TOP RETREAT COHORT NOTIFICATION & INTERACTIVE FLYOUT -->
<div class="upcoming-strip" id="upcomingStrip">
  <div class="upcoming-inner">
    <button class="upcoming-trigger" id="upcomingTrigger" aria-expanded="false" aria-haspopup="true" aria-controls="upcomingFlyout">
      <span class="upcoming-pulse"></span>
      <span>&#10022; Upcoming Retreat Cohort: <strong>Dates confirmed after enquiry</strong> &bull; Bir Billing</span>
      <span class="upcoming-chevron">▾</span>
    </button>
  </div>

  <!-- Extended Interactive Flyout comparing the 3 packages -->
  <div class="upcoming-flyout" id="upcomingFlyout" role="region" aria-label="Upcoming Retreat Cohorts & Packages">
    <div class="flyout-header">
      <div>
        <h3>Upcoming Himalayan Immersion Cohorts</h3>
        <p>Bir Billing Sanctuary, Himachal Pradesh &bull; 1,525m Altitude &bull; Strictly 15 Guests Per Cohort</p>
      </div>
      <button class="flyout-close" id="flyoutCloseBtn" aria-label="Close Cohort Menu">&times;</button>
    </div>
    <div class="flyout-grid">
      <!-- Package 1 -->
      <div class="flyout-card">
        <div>
          <span class="flyout-badge">4-Day Cohort</span>
          <h4 class="flyout-title">The Serenity Immersion</h4>
          <div class="flyout-dates">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            <span>4 Days (3 Nights)</span>
          </div>
          <p class="flyout-desc">Check-in 14:00 &bull; Check-out 11:00. Designed for autonomic nervous system reboot, daily warm Abhyanga, Dinacharya circadian routine, and 1:1 BAMS pulse diagnosis.</p>
        </div>
        <div class="flyout-footer-row">
          <div>
            <span class="flyout-price-val">&#8377;22,000</span>
            <span class="flyout-per">per person / full programme</span>
          </div>
          <button class="flyout-btn" onclick="reserveCohort('serenity', 'Dates confirmed after enquiry')">Select</button>
        </div>
      </div>

      <!-- Package 2 -->
      <div class="flyout-card" style="border-color: var(--gold); background: rgba(19,39,79,0.85);">
        <div>
          <span class="flyout-badge" style="background: var(--gold); color: var(--royal-deep); font-weight:700;">Signature Retreat &bull; 4-Day</span>
          <h4 class="flyout-title">The Awakening Journey</h4>
          <div class="flyout-dates">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            <span>4 Days (3 Nights)</span>
          </div>
          <p class="flyout-desc">Check-in 14:00 &bull; Check-out 11:00. Comprehensive Panchakarma detox, classical Shatkarma kriyas, daily Shirodhara medicated oil flow, and silent Dhauladhar mountain walking.</p>
        </div>
        <div class="flyout-footer-row">
          <div>
            <span class="flyout-price-val">&#8377;26,000</span>
            <span class="flyout-per">per person / full programme</span>
          </div>
          <button class="flyout-btn" onclick="reserveCohort('awakening', 'Dates confirmed after enquiry')">Select</button>
        </div>
      </div>

      <!-- Package 3 -->
      <div class="flyout-card">
        <div>
          <span class="flyout-badge">4-Day Cellular Reset</span>
          <h4 class="flyout-title">The Complete Transformation</h4>
          <div class="flyout-dates">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            <span>4 Days (3 Nights)</span>
          </div>
          <p class="flyout-desc">Check-in 14:00 &bull; Check-out 11:00. Our pinnacle clinical immersion. Full Ayurvedic Basti regimen, Rasayana deep cellular nourishment, and customized post-retreat herbal medicine regimen.</p>
        </div>
        <div class="flyout-footer-row">
          <div>
            <span class="flyout-price-val">&#8377;35,000</span>
            <span class="flyout-per">per person / full programme</span>
          </div>
          <button class="flyout-btn" onclick="reserveCohort('transformation', 'Dates confirmed after enquiry')">Select</button>
        </div>
      </div>
    </div>
  </div>
</div>
`;

// Inject site-header wrapper containing upcoming retreat flyout banner and navigation
const headerOpen = `<!-- SITE FIXED HEADER: ANNOUNCEMENT + NAV -->\n<header class="site-header" id="siteHeader">\n${upcomingBannerHtml}\n`;
html = html.replace('<nav id="mainNav"', `${headerOpen}<nav id="mainNav"`);
html = html.replace('</nav>', '</nav>\n</header>');
console.log('Injected site-header wrapper and upcoming retreat flyout banner.');

// 4. Prepare the Surya Namaskar Scrollytelling Pinned Section HTML
const suryaNamaskarHtml = `
<!-- SECTION: SURYA NAMASKAR 12-STEP SCROLLYTELLING COMPONENT -->
<div class="surya-track" id="suryaTrack" aria-label="12-Beat Surya Namaskar Scrollytelling">
  <div class="surya-stage" id="suryaStage">
    <!-- Top Meta Bar -->
    <div class="surya-header-bar">
      <div>
        <div class="surya-header-tag">Brahma Muhurta Protocol &bull; Solar Awakening</div>
        <div class="surya-header-title">The 12-Beat Circadian Surya Namaskar</div>
      </div>
      <div style="font-size:0.75rem; color:rgba(250,247,240,0.5); letter-spacing:0.12em;">
        SCROLL TO SCRUB POSTURES &darr;
      </div>
    </div>

    <!-- Central Interactive Split Stage -->
    <div class="surya-grid">
      <!-- Left Yogi Figure & Breath Ring -->
      <div class="surya-visual-wrap">
        <div class="surya-breath-indicator" id="suryaBreathRing"></div>
        <div class="surya-yogi-svg-stage" id="suryaSvgStage">
          <!-- Dynamic SVG Yogi Silhouettes with Sacred Gold Geometry -->
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" id="suryaYogiSvg">
            <!-- Outer Sacred Aura Circle -->
            <circle cx="100" cy="100" r="90" stroke="rgba(201,168,76,0.3)" stroke-width="1.5" stroke-dasharray="3 3"/>
            <circle cx="100" cy="100" r="75" stroke="rgba(201,168,76,0.15)" stroke-width="1"/>
            <!-- Posture Path (Dynamically swapped by JS) -->
            <path id="suryaPath" d="M100 40 A10 10 0 1 0 100 20 A10 10 0 1 0 100 40 Z M95 45 L105 45 L105 110 L95 110 Z M95 55 L75 80 L82 85 L95 65 Z M105 55 L125 80 L118 85 L105 65 Z M95 110 L85 175 L93 175 L100 120 L107 175 L115 175 L105 110 Z" fill="#C9A84C" stroke="#FFE082" stroke-width="1.2"/>
            <!-- Marma Centers (Heart & Third Eye) -->
            <circle cx="100" cy="30" r="2.5" fill="#FFF"/>
            <circle cx="100" cy="65" r="3" fill="#FFE082" stroke="#C9A84C"/>
          </svg>
        </div>
      </div>

      <!-- Right Step Information Card -->
      <div class="surya-info-wrap">
        <div class="surya-info-card" id="suryaInfoCard">
          <div class="surya-step-meta">
            <div class="surya-step-idx" id="suryaIdx">[ 01 / 12 ]</div>
            <div class="surya-step-mantra" id="suryaMantra">&#2384; मित्राय नमः &bull; Om Mitraya Namaha</div>
          </div>
          <h3 class="surya-step-name" id="suryaName">Pranamasana</h3>
          <div class="surya-step-english" id="suryaEnglish">Salutation Pose &bull; Standing Anjali Mudra</div>
          
          <div class="surya-breath-badge" id="suryaBreath">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v8M8 12h8"></path></svg>
            <span id="suryaBreathText">Exhale (Rechaka) &bull; Solar Plexus Centering</span>
          </div>

          <p class="surya-clinical-p" id="suryaClinical">
            Establishes autonomic equilibrium by lowering sympathetic nervous tone. Palms pressed in Anjali Mudra at the sternum gently stimulate the Anahata cardiac nerve plexus, creating respiratory stillness before dynamic spinal extension.
          </p>

          <div class="surya-doc-advice" id="suryaDoc">
            <strong>BAMS Clinical Guidance:</strong> Keep weight evenly distributed through all four corners of the feet. Ground the sacrum downward to decompress the L4-L5 lumbar vertebrae.
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom 12-Step Solar Dial Scrubber -->
    <div class="surya-dial-row">
      <div style="font-size:0.75rem; color:var(--gold); font-weight:600; letter-spacing:0.15em; text-transform:uppercase;">
        Solar Asana Dial
      </div>
      <div class="surya-dots" id="suryaDots">
        <!-- 12 Buttons generated by JS or static -->
        <button class="surya-dot-btn active" data-step="0">01</button>
        <button class="surya-dot-btn" data-step="1">02</button>
        <button class="surya-dot-btn" data-step="2">03</button>
        <button class="surya-dot-btn" data-step="3">04</button>
        <button class="surya-dot-btn" data-step="4">05</button>
        <button class="surya-dot-btn" data-step="5">06</button>
        <button class="surya-dot-btn" data-step="6">07</button>
        <button class="surya-dot-btn" data-step="7">08</button>
        <button class="surya-dot-btn" data-step="8">09</button>
        <button class="surya-dot-btn" data-step="9">10</button>
        <button class="surya-dot-btn" data-step="10">11</button>
        <button class="surya-dot-btn" data-step="11">12</button>
      </div>
      <div style="font-size:0.72rem; color:rgba(250,247,240,0.5);">
        Click any step or scroll page
      </div>
    </div>
  </div>
</div>
`;

// Inject Surya Namaskar right after </section> of disciplines
html = html.replace('<!-- SECTION 3: SACRED DINACHARYA (CIRCADIAN RHYTHM EXPLORER) -->', `${suryaNamaskarHtml}\n<!-- SECTION 3: SACRED DINACHARYA (CIRCADIAN RHYTHM EXPLORER) -->`);
console.log('Injected Surya Namaskar scrollytelling section.');

// 5. Prepare "What You Will Experience" + "How It Will Help You" + "Welcome Kit" + "Sanctuary Essentials" + "Package Inclusions" HTML
const experienceAndBenefitsHtml = `
<!-- SECTION: WHAT YOU WILL EXPERIENCE (5 SACRED PILLARS) -->
<section class="experience-sec" id="experience" aria-label="What You Will Experience">
  <div class="inner">
    <div class="sec-header">
      <div class="sec-tag">Retreat Immersion</div>
      <h2 class="sec-title">What you will <em>experience</em></h2>
      <div class="sec-divider"></div>
      <p class="sec-subtitle">Five immersive dimensions of care orchestrated each day to awaken somatic vitality, calm cognitive fatigue, and rekindle deep biological rest.</p>
    </div>

    <!-- Experience Category Tabs -->
    <div class="exp-tabs" role="tablist">
      <button class="exp-tab-btn active" role="tab" aria-selected="true" aria-controls="exp-panel-1" onclick="switchExpTab(1, this)">Brahma Muhurta</button>
      <button class="exp-tab-btn" role="tab" aria-selected="false" aria-controls="exp-panel-2" onclick="switchExpTab(2, this)">Panchakarma Care</button>
      <button class="exp-tab-btn" role="tab" aria-selected="false" aria-controls="exp-panel-3" onclick="switchExpTab(3, this)">Classical Hatha</button>
      <button class="exp-tab-btn" role="tab" aria-selected="false" aria-controls="exp-panel-4" onclick="switchExpTab(4, this)">Sattvic Gastronomy</button>
      <button class="exp-tab-btn" role="tab" aria-selected="false" aria-controls="exp-panel-5" onclick="switchExpTab(5, this)">Forest Bathing</button>
    </div>

    <!-- Panel 1: Brahma Muhurta -->
    <div class="exp-panel active" id="exp-panel-1" role="tabpanel">
      <div class="exp-text-content">
        <div class="exp-text-time">05:30 AM to 07:00 AM &bull; Dawn Silence</div>
        <h3>Brahma Muhurta Awakening</h3>
        <p class="exp-text-body">
          The 96 minutes preceding dawn carry the purest atmospheric prana and highest concentration of nascent ozone in the Himalayas. Waking during Brahma Muhurta harmonizes the pineal gland, resets melatonin synthesis, and restores mental clarity before sensory distractions begin.
        </p>
        <ul class="exp-highlights">
          <li>Warming Copper Tamra Jal &bull; Fresh morning alkaline water ritual</li>
          <li>Trataka Candle Flame Gazing &bull; Decongesting optic nerve tension</li>
          <li>Silent Mountain Dawn Contemplation overlooking Dhauladhar snow ridges</li>
        </ul>
        <a class="btn-outline" href="#reserve" style="color:var(--royal-deep); border-color:var(--royal-deep);">Experience This Dawn</a>
      </div>
      <div class="exp-img-frame">
        <img src="images/hero_sanctuary.jpg" alt="Brahma Muhurta Dawn Yoga in Bir Billing" loading="lazy">
      </div>
    </div>

    <!-- Panel 2: Panchakarma -->
    <div class="exp-panel" id="exp-panel-2" role="tabpanel">
      <div class="exp-text-content">
        <div class="exp-text-time">10:30 AM to 01:00 PM &bull; Clinical Treatment Shala</div>
        <h3>Doctor-Supervised Panchakarma</h3>
        <p class="exp-text-body">
          Every procedure is formulated specifically for your Prakriti dosha following morning pulse diagnosis (Nadi Pariksha). Authentic four-hand synchronized warm oil Abhyanga, rhythmic Shirodhara oil flow over the forehead, and Himalayan herbal Swedana steam baths melt deep-seated somatic tension.
        </p>
        <ul class="exp-highlights">
          <li>Warm Medicated Oil Abhyanga formulated with wild Himalayan herbs</li>
          <li>Shirodhara Continuous Forehead Flow &bull; Clinically proven alpha brainwave inducer</li>
          <li>Targeted Basti Treatments for spinal and digestive channel restoration</li>
        </ul>
        <a class="btn-outline" href="#doctors" style="color:var(--royal-deep); border-color:var(--royal-deep);">Consult Our Doctors</a>
      </div>
      <div class="exp-img-frame">
        <img src="images/dinacharya_ritual.jpg" alt="Authentic Ayurvedic Panchakarma oils and brass urli" loading="lazy">
      </div>
    </div>

    <!-- Panel 3: Classical Hatha -->
    <div class="exp-panel" id="exp-panel-3" role="tabpanel">
      <div class="exp-text-content">
        <div class="exp-text-time">07:00 AM &amp; 05:30 PM &bull; Elevated Mountain Pavilion</div>
        <h3>Therapeutic Classical Hatha &amp; Dhyana</h3>
        <p class="exp-text-body">
          Move away from modern fitness-industry workouts into the meditative, anatomical science of classical Hatha. We emphasize prolonged spinal holds, conscious diaphragmatic breath regulation, and Bandha locks that systematically decompress cervical and lumbar discs.
        </p>
        <ul class="exp-highlights">
          <li>Anatomical spinal alignments guided with zero performance pressure</li>
          <li>Pranayama series (Nadi Shodhana, Bhramari) to stimulate vagal tone</li>
          <li>Evening Yoga Nidra psychic sleep for profound neuro-endocrine repair</li>
        </ul>
        <a class="btn-outline" href="#suryaTrack" style="color:var(--royal-deep); border-color:var(--royal-deep);">Explore The 12 Asanas</a>
      </div>
      <div class="exp-img-frame">
        <img src="images/yoga.png" alt="Classical Hatha Yoga instruction at 1525m altitude" loading="lazy">
      </div>
    </div>

    <!-- Panel 4: Sattvic Gastronomy -->
    <div class="exp-panel" id="exp-panel-4" role="tabpanel">
      <div class="exp-text-content">
        <div class="exp-text-time">Three Daily Meals &bull; Organic Veranda Dining</div>
        <h3>Medicinal Sattvic Gastronomy</h3>
        <p class="exp-text-body">
          Food is your primary medicine. Our meals are formulated jointly by our BAMS doctors and Ayurvedic chefs using organic, farm-to-table mountain produce harvested daily from Kangra Valley. Prepared in pure A2 mountain cow ghee with digestive spices that balance Agni without mucosal irritation.
        </p>
        <ul class="exp-highlights">
          <li>Individualized Dosha balancing portions (Vata, Pitta, Kapha)</li>
          <li>Warm freshly stone-ground ancient grains and restorative herbal broths</li>
          <li>Zero refined sugars, inflammatory oils, or artificial preservatives</li>
        </ul>
        <a class="btn-outline" href="#suites" style="color:var(--royal-deep); border-color:var(--royal-deep);">View Suite Inclusions</a>
      </div>
      <div class="exp-img-frame">
        <img src="images/group.png" alt="Sattvic dining with community in Kangra Valley" loading="lazy">
      </div>
    </div>

    <!-- Panel 5: Forest Bathing -->
    <div class="exp-panel" id="exp-panel-5" role="tabpanel">
      <div class="exp-text-content">
        <div class="exp-text-time">03:30 PM to 05:00 PM &bull; Dhauladhar Forest Trail</div>
        <h3>Silent Forest Bathing (Shinrin-Yoku)</h3>
        <p class="exp-text-body">
          Immerse your senses in the pristine deodar cedar and Himalayan pine forests surrounding our retreat. Mindful silent walks at 1,525 meters saturate your lungs with tree-emitted antimicrobial phytoncides, proven to lower salivary cortisol, reduce blood pressure, and boost natural killer immune cells.
        </p>
        <ul class="exp-highlights">
          <li>Guided mindful walking meditation along ancient shepherd paths</li>
          <li>Fresh glacial stream water immersion and barefoot grounding</li>
          <li>Himalayan herbal tea ceremony under high-altitude cedar canopies</li>
        </ul>
        <a class="btn-outline" href="#reserve" style="color:var(--royal-deep); border-color:var(--royal-deep);">Join The Next Cohort</a>
      </div>
      <div class="exp-img-frame">
        <img src="images/meditation.png" alt="Silent forest meditation in Bir Billing" loading="lazy">
      </div>
    </div>
  </div>
</section>

<!-- SECTION: GUEST EXPERIENCE & WELLNESS OBSERVATIONS -->
<section class="clinical-sec" id="clinical-benefits" aria-label="Guest Experience and Wellness Observations">
  <div class="inner">
    <div class="sec-header">
      <div class="sec-tag">Guest Experience</div>
      <h2 class="sec-title" style="color:var(--ivory);">What guests may <em>notice</em></h2>
      <div class="sec-divider"></div>
      <p class="sec-subtitle" style="color:rgba(250,247,240,0.65);">Time away from work and daily responsibilities, in a structured mountain setting with Ayurvedic support.</p>
    </div>

    <div class="clinical-grid">
      <!-- Card 1 -->
      <div class="clinical-card">
        <div class="clinical-num">01</div>
        <h3>Time for Rest</h3>
        <span class="clinical-metric">Rest &amp; Routine</span>
        <p>A quiet mountain environment, scheduled meal times, and dedicated rest periods can support feelings of recovery and improved sleep patterns.</p>
      </div>

      <!-- Card 2 -->
      <div class="clinical-card">
        <div class="clinical-num">02</div>
        <h3>Mindful Movement</h3>
        <span class="clinical-metric">Gentle Activity</span>
        <p>Daily yoga and guided walks provide gentle physical activity suited to your comfort level, supporting mobility and body awareness.</p>
      </div>

      <!-- Card 3 -->
      <div class="clinical-card">
        <div class="clinical-num">03</div>
        <h3>Ayurvedic Consultation</h3>
        <span class="clinical-metric">Personalised Guidance</span>
        <p>A consultation with an Ayurvedic practitioner to explore individual wellness goals and discuss diet, lifestyle, and supportive traditional practices.</p>
      </div>

      <!-- Card 4 -->
      <div class="clinical-card">
        <div class="clinical-num">04</div>
        <h3>Practical Takeaways</h3>
        <span class="clinical-metric">Habits to Take Home</span>
        <p>Experience daily rhythms, cooking approaches, and mindfulness exercises that you can adapt to support your well-being after returning home.</p>
      </div>
    </div>
  </div>
</section>

<!-- SECTION: THE SACRED WELCOME KIT (UNBOXING ARTISAN SANCTUARY TOOLS) -->
<section class="kit-sec" id="welcome-kit" aria-label="The Sacred Welcome Kit">
  <div class="inner">
    <div class="sec-header">
      <div class="sec-tag">Delivered Upon Arrival</div>
      <h2 class="sec-title" style="color:var(--ivory);">The sacred <em>welcome kit</em></h2>
      <div class="sec-divider"></div>
      <p class="sec-subtitle" style="color:rgba(250,247,240,0.65);">Every retreatant receives an artisan welcome box of handcrafted Ayurvedic tools, organic textiles, and herbal elixirs to support your stay and take home.</p>
    </div>

    <div class="kit-split">
      <div class="kit-photo-card">
        <img src="images/welcome_kit.jpg" alt="Artisan Ayurvedic Welcome Kit featuring copper carafe, brass tools, linen shawl, and journal" loading="lazy">
      </div>

      <div class="kit-list">
        <div class="kit-item">
          <div class="kit-icon">✦</div>
          <div class="kit-info">
            <h4>Hand-Hammered Copper Tamra Jal Vessel</h4>
            <p>Pure copper carafe and cup for storing bedside water overnight, naturally alkalizing and charging your morning hydration.</p>
          </div>
        </div>

        <div class="kit-item">
          <div class="kit-icon">✦</div>
          <div class="kit-info">
            <h4>Artisanal Brass Tongue Scraper &amp; Danta Manjan</h4>
            <p>Traditional copper-alloy scraper and wildcrafted herbal tooth powder for classical morning oral channel purification.</p>
          </div>
        </div>

        <div class="kit-item">
          <div class="kit-icon">✦</div>
          <div class="kit-info">
            <h4>Brass Jala Neti Pot &amp; Mountain Salt Crystals</h4>
            <p>Classical nasal irrigation vessel designed to decongest respiratory passages in high-altitude mountain air.</p>
          </div>
        </div>

        <div class="kit-item">
          <div class="kit-icon">✦</div>
          <div class="kit-info">
            <h4>Unbleached Khadi Linen Meditation Shawl</h4>
            <p>Hand-woven by regional Himachali weavers from breathable unbleached natural plant fibers for dawn contemplation.</p>
          </div>
        </div>

        <div class="kit-item">
          <div class="kit-icon">✦</div>
          <div class="kit-info">
            <h4>Medicated Abhyanga Oil &amp; Pahadi Cedar Incense</h4>
            <p>Doctor-formulated Bala-Ashwagandha body oil alongside wildcrafted temple incense sticks with a brass holder.</p>
          </div>
        </div>

        <div class="kit-item">
          <div class="kit-icon">✦</div>
          <div class="kit-info">
            <h4>Embossed Intention Journal &amp; Brass Pen</h4>
            <p>A navy leather journal for documenting your daily Prakriti reflections, doctor's prescriptions, and circadian insights.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- SECTION: PROGRAM ESSENTIALS & GUEST CODE OF CONDUCT -->
<section class="conduct-sec" id="sanctuary-essentials" aria-label="Program Essentials and Conduct">
  <div class="inner">
    <div class="sec-header">
      <div class="sec-tag">Preserving The Sacred Container</div>
      <h2 class="sec-title">Sanctuary <em>essentials</em></h2>
      <div class="sec-divider"></div>
      <p class="sec-subtitle">To ensure uncompromised psychological peace, privacy, and clinical efficacy, every guest honors our sacred code of conduct.</p>
    </div>

    <div class="conduct-agreement-card">
      <div class="conduct-header">
        <h3>The Sacred Sanctuary Agreement</h3>
        <p>Our strict 15-guest limit is created to foster profound collective quiet. By confirming your reservation, you agree to uphold these essential community agreements.</p>
      </div>

      <div class="conduct-grid">
        <!-- Rule 1: Digital Restraint -->
        <div class="conduct-item">
          <div class="conduct-badge">1</div>
          <div class="conduct-text">
            <h4>Digital Restraint &bull; Phones in Private Suites Only</h4>
            <p>Mobile phones, tablets, and laptops may only be operated within the privacy of your private suite. Common verandas, dining spaces, gardens, and the yoga shala remain completely screen-free and notification-free zones.</p>
          </div>
        </div>

        <!-- Rule 2: Mandatory Attendance -->
        <div class="conduct-item">
          <div class="conduct-badge">2</div>
          <div class="conduct-text">
            <h4>Mandatory Punctual Attendance</h4>
            <p>Attending all scheduled yoga, meditation, and clinical doctor consultations on time is mandatory. Late arrivals disrupt the collective meditative container and impact the synchronized scheduling of Panchakarma doctors.</p>
          </div>
        </div>

        <!-- Rule 3: Silent Hours -->
        <div class="conduct-item">
          <div class="conduct-badge">3</div>
          <div class="conduct-text">
            <h4>Silent Morning Hours (Mauna)</h4>
            <p>From morning awakening (05:30 AM) until the completion of breakfast (09:00 AM), guests observe noble silence (Mauna). This allows internal bio-rhythms to awaken without verbal energy depletion.</p>
          </div>
        </div>

        <!-- Rule 4: Clean Living -->
        <div class="conduct-item">
          <div class="conduct-badge">4</div>
          <div class="conduct-text">
            <h4>100% Clean Substance-Free Living</h4>
            <p>Alcohol, tobacco, electronic vapes, and all recreational substances are strictly prohibited across the sanctuary grounds. Complete purity is essential for the cellular efficacy of Ayurvedic Panchakarma.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- SECTION: WHAT YOUR PACKAGE INCLUDES (ALL-INCLUSIVE MATRIX) -->
<section class="inclusions-sec" id="package-inclusions" aria-label="What Your Package Includes">
  <div class="inner">
    <div class="sec-header">
      <div class="sec-tag">Complete Inclusions</div>
      <h2 class="sec-title">What your retreat <em>includes</em></h2>
      <div class="sec-divider"></div>
      <p class="sec-subtitle">Clear inclusions across all 4-day programmes in Bir Billing. Zero hidden charges.</p>
    </div>

    <div class="inclusions-table-card">
      <table class="inc-table">
        <thead>
          <tr>
            <th style="width:40%;">Sanctuary Provision</th>
            <th class="highlight" style="width:20%;">Serenity (4 Days)</th>
            <th class="highlight" style="width:20%;">Awakening (4 Days)</th>
            <th class="highlight" style="width:20%;">Transformation (4 Days)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span class="inc-feature">Accommodation and meals</span>
              <span class="inc-feature-desc">Private room in Bir Billing with three wholesome vegetarian meals daily.</span>
            </td>
            <td><span class="inc-check">&check;</span> Included</td>
            <td><span class="inc-check">&check;</span> Included</td>
            <td><span class="inc-check">&check;</span> Included</td>
          </tr>
          <tr>
            <td>
              <span class="inc-feature">Yoga and meditation</span>
              <span class="inc-feature-desc">Daily morning and evening sessions suitable for all experience levels.</span>
            </td>
            <td><span class="inc-check">&check;</span> Included</td>
            <td><span class="inc-check">&check;</span> Included</td>
            <td><span class="inc-check">&check;</span> Included</td>
          </tr>
          <tr>
            <td>
              <span class="inc-feature">Ayurvedic consultation</span>
              <span class="inc-feature-desc">Individual assessment with an Ayurvedic practitioner to discuss lifestyle and goals.</span>
            </td>
            <td><span class="inc-check">&check;</span> Included</td>
            <td><span class="inc-check">&check;</span> Included</td>
            <td><span class="inc-check">&check;</span> Included</td>
          </tr>
          <tr>
            <td>
              <span class="inc-feature">Ayurvedic therapies</span>
              <span class="inc-feature-desc">Traditional wellness treatments selected following consultation.</span>
            </td>
            <td><span class="inc-check">&check;</span> 1 Daily Session</td>
            <td><span class="inc-check">&check;</span> 2 Daily Sessions</td>
            <td><span class="inc-check">&check;</span> Comprehensive Sessions</td>
          </tr>
          <tr>
            <td>
              <span class="inc-feature">Welcome kit</span>
              <span class="inc-feature-desc">Practical items to support your stay and daily routines.</span>
            </td>
            <td><span class="inc-check">&check;</span> Included</td>
            <td><span class="inc-check">&check;</span> Included</td>
            <td><span class="inc-check">&check;</span> Included</td>
          </tr>
          <tr>
            <td>
              <span class="inc-feature">Transfer support</span>
              <span class="inc-feature-desc">Assistance with local travel coordination to and from Bir Billing.</span>
            </td>
            <td><span class="inc-check">&check;</span> On Request</td>
            <td><span class="inc-check">&check;</span> Included</td>
            <td><span class="inc-check">&check;</span> Included</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</section>
`;

// Inject Experience, Clinical Benefits, Welcome Kit, Conduct, and Inclusions right before <!-- SECTION 4: THE RETREAT SUITES & PACKAGES -->
html = html.replace('<!-- SECTION 4: THE RETREAT SUITES & PACKAGES -->', `${experienceAndBenefitsHtml}\n<!-- SECTION 4: THE RETREAT SUITES & PACKAGES -->`);
console.log('Injected Experience, Clinical Benefits, Welcome Kit, Conduct, and Inclusions sections.');

// 6. Prepare Cancellation Policy Modal HTML
const cancellationModalHtml = `
<!-- CANCELLATION & RESCHEDULING POLICY MODAL -->
<div class="modal-overlay" id="cancellationModal" role="dialog" aria-modal="true" aria-labelledby="cancelModalTitle">
  <div class="modal-dialog">
    <button class="modal-close-btn" id="cancelModalCloseBtn" aria-label="Close Cancellation Policy">&times;</button>
    <div style="font-size:0.7rem; color:var(--gold); letter-spacing:0.2em; text-transform:uppercase; margin-bottom:0.5rem; font-weight:600;">
      Transparent Sanctuary Governance
    </div>
    <h3 id="cancelModalTitle" style="font-family:var(--serif); font-size:2.2rem; color:var(--ivory); margin-bottom:1rem; font-weight:500;">
      Cancellation &amp; Rescheduling Policy
    </h3>
    <p style="font-size:0.88rem; color:rgba(250,247,240,0.7); line-height:1.75; margin-bottom:2rem;">
      Because The Reset Co operates with an uncompromised maximum of only 15 retreatants and guarantees 2 dedicated BAMS physicians per cohort, each reservation represents a committed medical retreat slot. Our policy balances guest peace of mind with clinical preparation.
    </p>

    <!-- Tier 1: > 30 Days -->
    <div class="cancel-tier-card">
      <div class="cancel-tier-header">
        <div class="cancel-tier-window">&gt; 30 Days Before Check-in</div>
        <div class="cancel-tier-refund" style="color:#4ADE80;">100% Full Refund</div>
      </div>
      <p class="cancel-tier-desc">
        Cancellations requested more than 30 days prior to cohort arrival receive a complete 100% refund minus a nominal 3% payment gateway processing fee, OR you may reschedule to any open cohort within 12 months with zero fees.
      </p>
    </div>

    <!-- Tier 2: 15 - 30 Days -->
    <div class="cancel-tier-card">
      <div class="cancel-tier-header">
        <div class="cancel-tier-window">15 to 30 Days Before Check-in</div>
        <div class="cancel-tier-refund" style="color:var(--gold-light);">50% Cash Refund or 100% Credit</div>
      </div>
      <p class="cancel-tier-desc">
        You may choose between a 50% direct bank refund OR a 100% retreat credit transfer to any available cohort within 12 months with zero penalty fee.
      </p>
    </div>

    <!-- Tier 3: < 15 Days -->
    <div class="cancel-tier-card">
      <div class="cancel-tier-header">
        <div class="cancel-tier-window">&lt; 15 Days Before Check-in</div>
        <div class="cancel-tier-refund" style="color:#F87171;">75% Emergency Credit</div>
      </div>
      <p class="cancel-tier-desc">
        Due to finalized physician staffing and perishable herbal preparations, payments are non-refundable within 14 days of arrival. However, in certified emergency situations, a 75% credit is preserved toward a future retreat.
      </p>
    </div>

    <!-- Tier 4: Certified Medical Emergency -->
    <div class="cancel-tier-card" style="border-color:var(--gold);">
      <div class="cancel-tier-header">
        <div class="cancel-tier-window">Certified Medical Emergency</div>
        <div class="cancel-tier-refund" style="color:var(--gold-light);">100% Date Rollover</div>
      </div>
      <p class="cancel-tier-desc">
        If an acute medical condition or hospitalization prevents travel, providing written medical certification from a licensed physician allows 100% of your booking deposit to be rolled over to any future retreat date within 18 months.
      </p>
    </div>

    <div style="text-align:center; margin-top:2rem;">
      <button class="btn-primary" onclick="closeCancelPolicy()" style="padding:0.7rem 2rem;">Understood &amp; Close</button>
    </div>
  </div>
</div>
`;

// Inject modal right before </body>
html = html.replace('</body>', `${cancellationModalHtml}\n</body>`);

// Update footer link to open modal
html = html.replace('<a href="#" style="color:rgba(250,247,240,0.5); text-decoration:none;">Cancellation Terms</a>', '<a href="#cancellationModal" onclick="openCancelPolicy(event)" style="color:rgba(250,247,240,0.5); text-decoration:none;">Cancellation &amp; Rescheduling Policy</a>');
console.log('Injected Cancellation Policy modal and updated footer link.');

// 7. Prepare JavaScript Engine for new interactive components
const interactiveScript = `
  // ═══════════════════════════════════════════════════════
  // NEW INTERACTIVE CONTROLS (UPCOMING FLYOUT, SURYA, MODAL)
  // ═══════════════════════════════════════════════════════

  // A0. SITE HEADER SCROLL LISTENER
  const siteHeaderEl = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    if (siteHeaderEl) siteHeaderEl.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // A. UPCOMING RETREAT FLYOUT TOGGLE & HOVER
  const upcomingTrigger = document.getElementById('upcomingTrigger');
  const upcomingFlyout = document.getElementById('upcomingFlyout');
  const flyoutCloseBtn = document.getElementById('flyoutCloseBtn');
  let flyoutTimer = null;

  function openFlyout() {
    if (flyoutTimer) clearTimeout(flyoutTimer);
    upcomingFlyout.classList.add('open');
    upcomingTrigger.setAttribute('aria-expanded', 'true');
  }
  function closeFlyout() {
    upcomingFlyout.classList.remove('open');
    upcomingTrigger.setAttribute('aria-expanded', 'false');
  }

  if (upcomingTrigger && upcomingFlyout) {
    upcomingTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = upcomingFlyout.classList.contains('open');
      if (isOpen) closeFlyout(); else openFlyout();
    });

    if (flyoutCloseBtn) {
      flyoutCloseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeFlyout();
      });
    }

    // Hover intent on desktop
    upcomingTrigger.parentElement.addEventListener('mouseenter', () => {
      if (window.matchMedia('(pointer: fine)').matches) {
        flyoutTimer = setTimeout(openFlyout, 150);
      }
    });
    upcomingTrigger.parentElement.addEventListener('mouseleave', () => {
      if (window.matchMedia('(pointer: fine)').matches) {
        flyoutTimer = setTimeout(closeFlyout, 250);
      }
    });

    document.addEventListener('click', (e) => {
      if (!upcomingFlyout.contains(e.target) && !upcomingTrigger.contains(e.target)) {
        closeFlyout();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeFlyout();
    });
  }

  function reserveCohort(suiteId, dateString) {
    closeFlyout();
    preselectPlan(suiteId);
    const dateInput = document.getElementById('resDates');
    if (dateInput) dateInput.value = dateString;
    const resSec = document.getElementById('reserve');
    if (resSec) resSec.scrollIntoView({ behavior: 'smooth' });
  }

  // B. SURYA NAMASKAR 12-STEP SCROLLYTELLING ENGINE
  const suryaData = [
    {
      idx: '[ 01 / 12 ]',
      mantra: '&#2384; मित्राय नमः &bull; Om Mitraya Namaha',
      name: 'Pranamasana',
      english: 'Salutation Pose &bull; Standing Anjali Mudra',
      breath: 'Exhale (Rechaka) &bull; Solar Plexus Centering',
      breathType: 'exhale',
      clinical: 'Establishes autonomic equilibrium by lowering sympathetic nervous tone. Palms pressed in Anjali Mudra at the sternum gently stimulate the Anahata cardiac nerve plexus, creating respiratory stillness before dynamic spinal extension.',
      doc: 'Dr. Himanshu Bhatt: Keep weight evenly distributed through all four corners of the feet. Ground the sacrum downward to decompress the L4-L5 lumbar vertebrae.',
      path: 'M100 38 A10 10 0 1 0 100 18 A10 10 0 1 0 100 38 Z M95 44 L105 44 L105 110 L95 110 Z M95 55 L75 80 L82 85 L95 65 Z M105 55 L125 80 L118 85 L105 65 Z M95 110 L85 175 L93 175 L100 120 L107 175 L115 175 L105 110 Z'
    },
    {
      idx: '[ 02 / 12 ]',
      mantra: '&#2384; रवये नमः &bull; Om Ravaye Namaha',
      name: 'Hastauttanasana',
      english: 'Raised Arms Pose &bull; Gentle Spinal Extension',
      breath: 'Inhale (Puraka) &bull; Ribcage &amp; Thoracic Expansion',
      breathType: 'inhale',
      clinical: 'Stretches the abdominal viscera, activates the thyroid gland via cervical extension, and expands thoracic vital capacity. Enhances lymphatic drainage from the axillary nodes into the circulatory system.',
      doc: 'Dr. Aditya Kaundal: Arch backward from the mid-thoracic spine rather than hinging sharply at the lumbar curve. Keep the glutes gently engaged to support pelvic alignment.',
      path: 'M105 32 A10 10 0 1 0 105 12 A10 10 0 1 0 105 32 Z M92 42 L102 40 L98 108 L88 110 Z M95 48 L115 20 L122 25 L98 56 Z M102 44 L122 16 L129 21 L105 52 Z M88 110 L75 172 L83 174 L94 118 L98 174 L106 172 L98 108 Z'
    },
    {
      idx: '[ 03 / 12 ]',
      mantra: '&#2384; सूर्याय नमः &bull; Om Suryaya Namaha',
      name: 'Hastapadasana',
      english: 'Standing Forward Fold &bull; Spinal Decompression',
      breath: 'Exhale (Rechaka) &bull; Arterial Pressure Regulation',
      breathType: 'exhale',
      clinical: 'Increases cerebral blood circulation, releases hamstring tension, and massages abdominal digestive organs (liver, spleen, kidneys), stimulating sluggish digestive fire (Mandagni).',
      doc: 'Dr. Himanshu Bhatt: Hinge strictly from the femoral hip crease rather than rounding the upper back. Micro-bend the knees if hamstring stiffness pulls on the sciatic nerve.',
      path: 'M85 105 A10 10 0 1 0 85 85 A10 10 0 1 0 85 105 Z M90 100 L115 75 L108 70 L85 92 Z M90 100 L75 140 L82 142 L95 108 Z M115 75 L115 170 L123 170 L123 75 Z'
    },
    {
      idx: '[ 04 / 12 ]',
      mantra: '&#2384; भानवे नमः &bull; Om Bhanave Namaha',
      name: 'Ashwa Sanchalanasana',
      english: 'Equestrian Lunge (Right) &bull; Psoas Stretch',
      breath: 'Inhale (Puraka) &bull; Solar Plexus Awakening',
      breathType: 'inhale',
      clinical: 'Releases deep emotional and physical stress stored within the psoas muscle. Stimulates liver and pancreas meridian pathways and improves venous blood return from the lower extremities.',
      doc: 'Dr. Aditya Kaundal: Keep the front right knee directly above the heel at a 90-degree angle to protect collateral ligaments. Soften the shoulders and gaze upward toward the mountain skyline.',
      path: 'M65 65 A10 10 0 1 0 65 45 A10 10 0 1 0 65 65 Z M70 70 L95 100 L60 135 L50 130 Z M95 100 L160 145 L170 142 L110 95 Z M70 85 L70 145 L78 145 L78 92 Z'
    },
    {
      idx: '[ 05 / 12 ]',
      mantra: '&#2384; खगाय नमः &bull; Om Khagaya Namaha',
      name: 'Dandasana',
      english: 'Plank Pose &bull; Core Agni Alignment',
      breath: 'Kumbhaka (Breath Retention) &bull; Energetic Consolidation',
      breathType: 'exhale',
      clinical: 'Strengthens the serratus anterior and core abdominal wall, aligning the entire vertebral column into a neutral axial plane. Kindles the internal digestive fire (Agni) without creating metabolic heat spikes.',
      doc: 'Dr. Himanshu Bhatt: Press the palms firmly into the earth and broaden through the collarbones. Avoid letting the lumbar spine sag toward the floor.',
      path: 'M55 105 A9 9 0 1 0 55 87 A9 9 0 1 0 55 105 Z M60 100 L155 130 L155 138 L60 110 Z M65 104 L65 160 L73 160 L73 107 Z M155 130 L165 165 L158 167 L148 135 Z'
    },
    {
      idx: '[ 06 / 12 ]',
      mantra: '&#2384; पूष्णे नमः &bull; Om Pushne Namaha',
      name: 'Ashtanga Namaskara',
      english: 'Eight-Limbed Salute &bull; Surrender to Ground',
      breath: 'Exhale (Rechaka) &bull; Thoracic Spine Mobilization',
      breathType: 'exhale',
      clinical: 'Eight contact points touch the earth (feet, knees, hands, chest, chin). Relieves thoracic kyphosis, strengthens triceps and deltoids, and promotes humility and nervous quietude.',
      doc: 'Dr. Aditya Kaundal: Keep the abdomen gently elevated away from the floor while resting the chest and chin between the hands. Breathe smoothly into the posterior ribs.',
      path: 'M50 120 A8 8 0 1 0 50 104 A8 8 0 1 0 50 120 Z M55 118 L85 140 L125 125 L165 155 Z M80 125 L80 155 L88 155 L88 130 Z M125 125 L125 160 L133 160 L133 130 Z'
    },
    {
      idx: '[ 07 / 12 ]',
      mantra: '&#2384; हिरण्यगर्भाय नमः &bull; Om Hiranyagarbhaya Namaha',
      name: 'Bhujangasana',
      english: 'Cobra Pose &bull; Heart Opening Extension',
      breath: 'Inhale (Puraka) &bull; Adrenal &amp; Kidney Circulation',
      breathType: 'inhale',
      clinical: 'Gently compresses the posterior adrenal glands, reducing cortisol buildup. Expands the bronchial chambers and restores natural lordotic curvature to the lumbar vertebrae.',
      doc: 'Dr. Himanshu Bhatt: Use back extensor strength rather than pushing aggressively with the arms. Keep the elbows tucked close to the ribs and shoulders pulled down.',
      path: 'M60 70 A9 9 0 1 0 60 52 A9 9 0 1 0 60 70 Z M65 72 L85 120 L165 150 L165 156 L85 130 Z M75 95 L75 150 L83 150 L83 105 Z'
    },
    {
      idx: '[ 08 / 12 ]',
      mantra: '&#2384; मरीचये नमः &bull; Om Marichaye Namaha',
      name: 'Adho Mukha Svanasana',
      english: 'Downward-Facing Dog &bull; Inverted Calming Axis',
      breath: 'Exhale (Rechaka) &bull; Cerebrospinal Fluid Flush',
      breathType: 'exhale',
      clinical: 'A gentle semi-inversion that encourages venous blood return to the heart without elevating blood pressure. Decompresses the lumbar spine and stretches Achilles tendons and calves.',
      doc: 'Dr. Aditya Kaundal: Press through index finger and thumb knuckles to protect the carpal tunnel. Send sitting bones toward the sky while relaxing the neck completely.',
      path: 'M100 85 A9 9 0 1 0 100 67 A9 9 0 1 0 100 85 Z M100 80 L65 145 L73 148 L104 88 Z M100 80 L145 150 L138 153 L96 88 Z'
    },
    {
      idx: '[ 09 / 12 ]',
      mantra: '&#2384; आदित्याय नमः &bull; Om Adityaya Namaha',
      name: 'Ashwa Sanchalanasana',
      english: 'Equestrian Lunge (Left) &bull; Bilateral Balancing',
      breath: 'Inhale (Puraka) &bull; Pelvic &amp; Respiratory Vitality',
      breathType: 'inhale',
      clinical: 'Brings symmetrical equilibrium to the left hip flexor and sacroiliac joint. Stimulates ascending colon peristalsis and reinforces pelvic floor tonus.',
      doc: 'Dr. Himanshu Bhatt: Step the left foot decisively forward between the hands. Lower the hips while maintaining length through the crown of the head.',
      path: 'M65 65 A10 10 0 1 0 65 45 A10 10 0 1 0 65 65 Z M70 70 L95 100 L60 135 L50 130 Z M95 100 L160 145 L170 142 L110 95 Z M70 85 L70 145 L78 145 L78 92 Z'
    },
    {
      idx: '[ 10 / 12 ]',
      mantra: '&#2384; सवित्रे नमः &bull; Om Savitre Namaha',
      name: 'Hastapadasana',
      english: 'Standing Forward Bend &bull; Deep Introspection',
      breath: 'Exhale (Rechaka) &bull; Cranial Circulation',
      breathType: 'exhale',
      clinical: 'Reinforces the soothing parasympathetic reflex. Calms rapid thoughts and lowers elevated resting pulse rate after dynamic movements.',
      doc: 'Dr. Aditya Kaundal: Let the weight of the head gently traction the cervical spine. Release all facial tension and jaw clenching.',
      path: 'M85 105 A10 10 0 1 0 85 85 A10 10 0 1 0 85 105 Z M90 100 L115 75 L108 70 L85 92 Z M90 100 L75 140 L82 142 L95 108 Z M115 75 L115 170 L123 170 L123 75 Z'
    },
    {
      idx: '[ 11 / 12 ]',
      mantra: '&#2384; अर्काय नमः &bull; Om Arkaya Namaha',
      name: 'Hastauttanasana',
      english: 'Raised Arms Arc &bull; Vital Energy Return',
      breath: 'Inhale (Puraka) &bull; Vital Prana Expansion',
      breathType: 'inhale',
      clinical: 'Draws fresh oxygenated blood into the upper pulmonary lobes. Stimulates sympathetic-parasympathetic balance, leaving the mind alert yet grounded.',
      doc: 'Dr. Himanshu Bhatt: Inhale deeply through both nostrils. Lift the sternum skyward as if welcoming the Himalayan dawn sun into the chest.',
      path: 'M105 32 A10 10 0 1 0 105 12 A10 10 0 1 0 105 32 Z M92 42 L102 40 L98 108 L88 110 Z M95 48 L115 20 L122 25 L98 56 Z M102 44 L122 16 L129 21 L105 52 Z M88 110 L75 172 L83 174 L94 118 L98 174 L106 172 L98 108 Z'
    },
    {
      idx: '[ 12 / 12 ]',
      mantra: '&#2384; भास्कराय नमः &bull; Om Bhaskaraya Namaha',
      name: 'Pranamasana',
      english: 'Sacred Centering &bull; Return to Balance',
      breath: 'Exhale / Natural Breath &bull; Systemic Homeostasis',
      breathType: 'exhale',
      clinical: 'Completes the solar circuit. Blood pressure, respiration, and autonomic tone settle into a peaceful, coherent baseline. The body feels light, centered, and revitalized.',
      doc: 'Dr. Aditya Kaundal: Close your eyes for three steady breath cycles. Observe the internal warmth and silence circulating through your tissues.',
      path: 'M100 38 A10 10 0 1 0 100 18 A10 10 0 1 0 100 38 Z M95 44 L105 44 L105 110 L95 110 Z M95 55 L75 80 L82 85 L95 65 Z M105 55 L125 80 L118 85 L105 65 Z M95 110 L85 175 L93 175 L100 120 L107 175 L115 175 L105 110 Z'
    }
  ];

  let currentSuryaStep = 0;
  const suryaTrackEl = document.getElementById('suryaTrack');
  const suryaPathEl = document.getElementById('suryaPath');
  const suryaIdxEl = document.getElementById('suryaIdx');
  const suryaMantraEl = document.getElementById('suryaMantra');
  const suryaNameEl = document.getElementById('suryaName');
  const suryaEnglishEl = document.getElementById('suryaEnglish');
  const suryaBreathTextEl = document.getElementById('suryaBreathText');
  const suryaBreathRingEl = document.getElementById('suryaBreathRing');
  const suryaClinicalEl = document.getElementById('suryaClinical');
  const suryaDocEl = document.getElementById('suryaDoc');
  const suryaDotsEl = document.getElementById('suryaDots');

  function renderSuryaStep(stepIndex) {
    if (stepIndex === currentSuryaStep && suryaIdxEl.textContent.includes(String(stepIndex + 1).padStart(2, '0'))) return;
    currentSuryaStep = stepIndex;
    const step = suryaData[stepIndex];
    if (!step) return;

    if (suryaPathEl) suryaPathEl.setAttribute('d', step.path);
    if (suryaIdxEl) suryaIdxEl.textContent = step.idx;
    if (suryaMantraEl) suryaMantraEl.innerHTML = step.mantra;
    if (suryaNameEl) suryaNameEl.textContent = step.name;
    if (suryaEnglishEl) suryaEnglishEl.innerHTML = step.english;
    if (suryaBreathTextEl) suryaBreathTextEl.innerHTML = step.breath;
    if (suryaClinicalEl) suryaClinicalEl.textContent = step.clinical;
    if (suryaDocEl) suryaDocEl.innerHTML = '<strong>' + step.doc.split(':')[0] + ':</strong>' + step.doc.split(':')[1];

    if (suryaBreathRingEl) {
      suryaBreathRingEl.classList.remove('inhale', 'exhale');
      suryaBreathRingEl.classList.add(step.breathType);
    }

    if (suryaDotsEl) {
      const btns = suryaDotsEl.querySelectorAll('.surya-dot-btn');
      btns.forEach((btn, i) => btn.classList.toggle('active', i === stepIndex));
    }
  }

  // Scroll listener for sticky track
  window.addEventListener('scroll', () => {
    if (!suryaTrackEl) return;
    const rect = suryaTrackEl.getBoundingClientRect();
    const trackHeight = suryaTrackEl.offsetHeight - window.innerHeight;
    if (trackHeight <= 0) return;

    const scrolledInTrack = -rect.top;
    if (scrolledInTrack >= 0 && scrolledInTrack <= trackHeight) {
      const progress = Math.min(Math.max(scrolledInTrack / trackHeight, 0), 0.999);
      const stepIndex = Math.floor(progress * 12);
      renderSuryaStep(stepIndex);
    }
  }, { passive: true });

  // Direct dot click navigation
  if (suryaDotsEl) {
    suryaDotsEl.addEventListener('click', (e) => {
      const btn = e.target.closest('.surya-dot-btn');
      if (btn && btn.dataset.step) {
        const step = parseInt(btn.dataset.step, 10);
        renderSuryaStep(step);
        // Scroll smoothly to approximate section height
        if (suryaTrackEl) {
          const trackTop = suryaTrackEl.getBoundingClientRect().top + window.scrollY;
          const trackHeight = suryaTrackEl.offsetHeight - window.innerHeight;
          const targetY = trackTop + (step / 12) * trackHeight;
          window.scrollTo({ top: targetY, behavior: 'smooth' });
        }
      }
    });
  }

  // C. WHAT YOU WILL EXPERIENCE TABS
  function switchExpTab(tabNum, btn) {
    document.querySelectorAll('.exp-tab-btn').forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    document.querySelectorAll('.exp-panel').forEach(p => p.classList.remove('active'));

    const targetPanel = document.getElementById('exp-panel-' + tabNum);
    if (targetPanel) targetPanel.classList.add('active');
    if (btn) {
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
    }
  }

  // D. CANCELLATION POLICY MODAL LOGIC
  function openCancelPolicy(e) {
    if (e) e.preventDefault();
    const modal = document.getElementById('cancellationModal');
    if (modal) {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
      const closeBtn = document.getElementById('cancelModalCloseBtn');
      if (closeBtn) closeBtn.focus();
    }
  }
  function closeCancelPolicy() {
    const modal = document.getElementById('cancellationModal');
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }
  document.addEventListener('DOMContentLoaded', () => {
    const cancelClose = document.getElementById('cancelModalCloseBtn');
    if (cancelClose) cancelClose.addEventListener('click', closeCancelPolicy);

    const cancelModal = document.getElementById('cancellationModal');
    if (cancelModal) {
      cancelModal.addEventListener('click', (e) => {
        if (e.target === cancelModal) closeCancelPolicy();
      });
    }
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeCancelPolicy();
    });
  });
`;

// Inject JS engine before the LAST </script> tag (executable script block at bottom of body)
const lastScriptIdx = html.lastIndexOf('</script>');
html = html.slice(0, lastScriptIdx) + '\n' + interactiveScript + '\n' + html.slice(lastScriptIdx);
console.log('Injected interactive JavaScript engine for all components into main script block.');

// Write back updated homepage.html
fs.writeFileSync(filePath, html, 'utf8');
console.log('Successfully wrote updated homepage.html!');

