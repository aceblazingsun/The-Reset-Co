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

  /* ─── AMBIENT SCROLL-DRIVEN SURYA NAMASKAR BACKGROUND ─── */
  .ambient-surya-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    height: 100dvh;
    z-index: -2;
    overflow: hidden;
    pointer-events: none;
  }
  .surya-bg-slide {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center 25%;
    background-repeat: no-repeat;
    opacity: 0;
    transform: scale(1.03);
    transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
    will-change: opacity, transform;
  }
  .surya-bg-slide.active {
    opacity: 0.34;
    transform: scale(1);
  }
  .surya-bg-overlay {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 50% 25%, rgba(10, 25, 49, 0.72) 0%, rgba(7, 18, 36, 0.94) 85%);
    backdrop-filter: blur(1.5px);
    -webkit-backdrop-filter: blur(1.5px);
    z-index: 1;
  }

  /* ─── FLOATING CIRCADIAN ASANA COMPANION ─── */
  .surya-companion {
    position: fixed;
    bottom: 2rem;
    right: 2.5rem;
    z-index: 999;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    font-family: var(--sans);
  }
  .companion-pill {
    background: rgba(10, 25, 49, 0.92);
    border: 1px solid rgba(201, 168, 76, 0.45);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(201, 168, 76, 0.12);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border-radius: 9999px;
    padding: 6px 14px 6px 8px;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    user-select: none;
  }
  .companion-pill:hover, .companion-pill:focus-visible {
    border-color: var(--gold);
    background: rgba(19, 39, 79, 0.96);
    transform: translateY(-2px);
    outline: none;
  }
  .companion-ring-wrap {
    position: relative;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .companion-ring {
    transform: rotate(-90deg);
  }
  .companion-sun {
    position: absolute;
    font-size: 0.65rem;
    color: var(--gold-light);
    line-height: 1;
  }
  .companion-label {
    display: flex;
    flex-direction: column;
    text-align: left;
    line-height: 1.15;
  }
  .companion-step-txt {
    font-size: 0.62rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--gold);
    font-weight: 700;
  }
  .companion-pose-name {
    font-family: var(--serif);
    font-size: 0.95rem;
    color: var(--ivory);
    font-weight: 500;
    white-space: nowrap;
  }
  .companion-chevron {
    font-size: 0.68rem;
    color: var(--gold-light);
    transition: transform 0.3s;
  }
  .companion-pill[aria-expanded="true"] .companion-chevron {
    transform: rotate(180deg);
  }

  /* Collapsible Mini Guide Card */
  .companion-card {
    position: absolute;
    bottom: calc(100% + 12px);
    right: 0;
    width: min(90vw, 340px);
    background: linear-gradient(180deg, #0A1931 0%, #071224 100%);
    border: 1px solid var(--gold);
    border-radius: 8px;
    padding: 1.4rem;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7);
    opacity: 0;
    visibility: hidden;
    transform: translateY(8px);
    transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.3s;
    pointer-events: none;
    z-index: 1000;
  }
  .companion-card.open {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
    pointer-events: auto;
  }
  .companion-card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0.6rem;
  }
  .companion-card-sub {
    font-family: var(--serif);
    font-size: 0.82rem;
    color: var(--gold-light);
    font-style: italic;
    display: block;
    margin-bottom: 2px;
  }
  .companion-card-title {
    font-family: var(--serif);
    font-size: 1.25rem;
    color: var(--ivory);
    font-weight: 500;
    line-height: 1.2;
  }
  .companion-close-btn {
    background: transparent;
    border: none;
    color: var(--gold-light);
    font-size: 1.2rem;
    cursor: pointer;
    line-height: 1;
    padding: 2px 6px;
  }
  .companion-card-breath {
    font-size: 0.72rem;
    color: var(--gold);
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 0.6rem;
  }
  .companion-card-desc {
    font-size: 0.8rem;
    color: rgba(250, 247, 240, 0.72);
    line-height: 1.55;
    margin-bottom: 1rem;
  }
  .companion-scrubber {
    display: flex;
    justify-content: space-between;
    gap: 4px;
    padding-top: 0.6rem;
    border-top: 1px solid rgba(201, 168, 76, 0.2);
  }
  .comp-dot {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: rgba(19, 39, 79, 0.8);
    border: 1px solid rgba(201, 168, 76, 0.3);
    cursor: pointer;
    transition: all 0.2s;
    padding: 0;
  }
  .comp-dot.active, .comp-dot:hover {
    background: var(--gold);
    border-color: var(--gold);
    transform: scale(1.2);
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
    .flyout-grid { grid-template-columns: 1fr; }
    .exp-panel { grid-template-columns: 1fr; padding: 2rem; }
    .exp-img-frame { height: 280px; }
    .clinical-grid { grid-template-columns: repeat(2, 1fr); }
    .kit-split { grid-template-columns: 1fr; }
    .conduct-grid { grid-template-columns: 1fr; }
  }
  @media (max-width: 768px) {
    .clinical-grid { grid-template-columns: 1fr; }
    .upcoming-strip { font-size: 0.72rem; }
    .upcoming-inner { padding: 0.4rem 1rem; }
    .upcoming-trigger { font-size: 0.72rem; padding: 4px 8px; }
    .flyout-header h3 { font-size: 1.3rem; }
    .flyout-card { padding: 1.2rem 1rem; }
    .conduct-agreement-card { padding: 1.8rem 1.2rem; }
    .inclusions-table-card { padding: 0.5rem; }
    .inc-table th, .inc-table td { padding: 0.75rem 0.6rem; font-size: 0.75rem; }
    .surya-companion {
      bottom: 1.2rem;
      right: 1.2rem;
    }
    .companion-pill {
      padding: 5px 12px 5px 6px;
      gap: 8px;
    }
    .companion-pose-name {
      font-size: 0.82rem;
    }
    .companion-card {
      width: calc(100vw - 2.4rem);
      right: 0;
      padding: 1.1rem;
    }
    .surya-bg-slide.active {
      opacity: 0.24;
      background-position: 60% 20%;
    }
    .surya-bg-overlay {
      background: radial-gradient(circle at 50% 20%, rgba(10, 25, 49, 0.88) 0%, rgba(7, 18, 36, 0.98) 85%);
    }
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

// 4. Prepare Ambient Surya Namaskar Background & Floating Asana Companion HTML
const ambientSuryaBgHtml = `
<!-- AMBIENT SCROLL-DRIVEN SURYA NAMASKAR BACKGROUND CANVAS -->
<div class="ambient-surya-bg" id="ambientSuryaBg" aria-hidden="true">
  <div class="surya-bg-slide active" id="suryaSlide-1" style="background-image: url('images/surya_pose1.jpg');"></div>
  <div class="surya-bg-slide" id="suryaSlide-2" style="background-image: url('images/surya_pose2.jpg');"></div>
  <div class="surya-bg-slide" id="suryaSlide-3" style="background-image: url('images/surya_pose3.jpg');"></div>
  <div class="surya-bg-slide" id="suryaSlide-4" style="background-image: url('images/surya_pose4.jpg');"></div>
  <div class="surya-bg-slide" id="suryaSlide-5" style="background-image: url('images/surya_pose5.jpg');"></div>
  <div class="surya-bg-slide" id="suryaSlide-6" style="background-image: url('images/surya_pose6.jpg');"></div>
  <div class="surya-bg-slide" id="suryaSlide-7" style="background-image: url('images/surya_pose7.jpg');"></div>
  <div class="surya-bg-slide" id="suryaSlide-8" style="background-image: url('images/surya_pose8.jpg');"></div>
  <div class="surya-bg-overlay"></div>
</div>
`;

const suryaCompanionHtml = `
<!-- FLOATING CIRCADIAN ASANA COMPANION PILL & CARD -->
<aside class="surya-companion" id="suryaCompanion" aria-label="Circadian Surya Namaskar Progress">
  <div class="companion-pill" id="companionPill" role="button" tabindex="0" aria-expanded="false" aria-controls="companionCard">
    <div class="companion-ring-wrap">
      <svg class="companion-ring" width="28" height="28" viewBox="0 0 36 36">
        <path class="ring-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(201,168,76,0.25)" stroke-width="3"/>
        <path class="ring-progress" id="companionRingPath" stroke-dasharray="100, 100" stroke-dashoffset="92" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--gold)" stroke-width="3" stroke-linecap="round"/>
      </svg>
      <span class="companion-sun">&#10022;</span>
    </div>
    <div class="companion-label">
      <span class="companion-step-txt" id="companionStepTxt">01 / 12</span>
      <span class="companion-pose-name" id="companionPoseName">Pranamasana</span>
    </div>
    <span class="companion-chevron">&#9662;</span>
  </div>

  <!-- Collapsible Mini Guide Card -->
  <div class="companion-card" id="companionCard">
    <div class="companion-card-header">
      <div>
        <span class="companion-card-sub" id="companionCardMantra">&#2384; मित्राय नमः &bull; Om Mitraya Namaha</span>
        <h4 class="companion-card-title" id="companionCardTitle">Pranamasana (Prayer Pose)</h4>
      </div>
      <button class="companion-close-btn" id="companionCloseBtn" aria-label="Minimize Asana Guide">&times;</button>
    </div>
    <div class="companion-card-breath" id="companionCardBreath">
      <span>Breath: Exhale (Rechaka)</span>
    </div>
    <p class="companion-card-desc" id="companionCardDesc">
      Centering the nervous system at dawn. Stimulates the Anahata cardiac nerve plexus.
    </p>
    <div class="companion-scrubber" id="companionScrubber">
      <button class="comp-dot active" data-step="0" aria-label="Step 1"></button>
      <button class="comp-dot" data-step="1" aria-label="Step 2"></button>
      <button class="comp-dot" data-step="2" aria-label="Step 3"></button>
      <button class="comp-dot" data-step="3" aria-label="Step 4"></button>
      <button class="comp-dot" data-step="4" aria-label="Step 5"></button>
      <button class="comp-dot" data-step="5" aria-label="Step 6"></button>
      <button class="comp-dot" data-step="6" aria-label="Step 7"></button>
      <button class="comp-dot" data-step="7" aria-label="Step 8"></button>
      <button class="comp-dot" data-step="8" aria-label="Step 9"></button>
      <button class="comp-dot" data-step="9" aria-label="Step 10"></button>
      <button class="comp-dot" data-step="10" aria-label="Step 11"></button>
      <button class="comp-dot" data-step="11" aria-label="Step 12"></button>
    </div>
  </div>
</aside>
`;

// Inject ambient background right after <body>
html = html.replace('<body>', `<body>\n${ambientSuryaBgHtml}`);
// Inject companion pill right before </body>
html = html.replace('</body>', `${suryaCompanionHtml}\n</body>`);
console.log('Injected ambient Surya Namaskar background and floating companion pill.');

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
        <button class="btn-outline" type="button" onclick="openCompanionCard()" style="color:var(--royal-deep); border-color:var(--royal-deep); cursor:pointer;">Explore The 12 Asanas</button>
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

  // B. AMBIENT SCROLL-DRIVEN SURYA NAMASKAR & FLOATING ASANA COMPANION
  const suryaSteps = [
    {
      num: '01 / 12',
      name: 'Pranamasana',
      english: 'Prayer Pose',
      mantra: '&#2384; मित्राय नमः &bull; Om Mitraya Namaha',
      breath: 'Exhale (Rechaka)',
      desc: 'Centering the nervous system at dawn. Stimulates the Anahata cardiac nerve plexus.',
      slide: 1
    },
    {
      num: '02 / 12',
      name: 'Hastauttanasana',
      english: 'Raised Arms Pose',
      mantra: '&#2384; रवये नमः &bull; Om Ravaye Namaha',
      breath: 'Inhale (Puraka)',
      desc: 'Expands thoracic vital capacity and gently stretches abdominal viscera.',
      slide: 2
    },
    {
      num: '03 / 12',
      name: 'Hastapadasana',
      english: 'Standing Forward Fold',
      mantra: '&#2384; सूर्याय नमः &bull; Om Suryaya Namaha',
      breath: 'Exhale (Rechaka)',
      desc: 'Decompresses lumbar vertebrae and increases cerebral blood circulation.',
      slide: 3
    },
    {
      num: '04 / 12',
      name: 'Ashwa Sanchalanasana',
      english: 'Equestrian Lunge (Right)',
      mantra: '&#2384; भानवे नमः &bull; Om Bhanave Namaha',
      breath: 'Inhale (Puraka)',
      desc: 'Releases deep tension within the psoas muscle and opens the pelvic floor.',
      slide: 4
    },
    {
      num: '05 / 12',
      name: 'Dandasana',
      english: 'Plank Pose',
      mantra: '&#2384; खगाय नमः &bull; Om Khagaya Namaha',
      breath: 'Kumbhaka (Retention)',
      desc: 'Kindles internal digestive fire (Agni) and strengthens axial spinal alignment.',
      slide: 5
    },
    {
      num: '06 / 12',
      name: 'Ashtanga Namaskara',
      english: 'Eight-Limbed Salute',
      mantra: '&#2384; पूष्णे नमः &bull; Om Pushne Namaha',
      breath: 'Exhale (Rechaka)',
      desc: 'Eight contact points touch the earth, relieving thoracic kyphosis.',
      slide: 6
    },
    {
      num: '07 / 12',
      name: 'Bhujangasana',
      english: 'Cobra Pose',
      mantra: '&#2384; हिरण्यगर्भाय नमः &bull; Om Hiranyagarbhaya Namaha',
      breath: 'Inhale (Puraka)',
      desc: 'Gentle compression of the adrenal glands, lowering systemic cortisol.',
      slide: 7
    },
    {
      num: '08 / 12',
      name: 'Adho Mukha Svanasana',
      english: 'Downward Dog',
      mantra: '&#2384; मरीचये नमः &bull; Om Marichaye Namaha',
      breath: 'Exhale (Rechaka)',
      desc: 'Calming semi-inversion promoting venous blood return to the heart.',
      slide: 8
    },
    {
      num: '09 / 12',
      name: 'Ashwa Sanchalanasana',
      english: 'Equestrian Lunge (Left)',
      mantra: '&#2384; आदित्याय नमः &bull; Om Adityaya Namaha',
      breath: 'Inhale (Puraka)',
      desc: 'Restores bilateral balance to the sacroiliac joint and hip flexors.',
      slide: 4
    },
    {
      num: '10 / 12',
      name: 'Hastapadasana',
      english: 'Forward Bend',
      mantra: '&#2384; सवित्रे नमः &bull; Om Savitre Namaha',
      breath: 'Exhale (Rechaka)',
      desc: 'Deep cranial circulation and parasympathetic nervous activation.',
      slide: 3
    },
    {
      num: '11 / 12',
      name: 'Hastauttanasana',
      english: 'Raised Arms Arc',
      mantra: '&#2384; अर्काय नमः &bull; Om Arkaya Namaha',
      breath: 'Inhale (Puraka)',
      desc: 'Vital Prana expansion, drawing fresh oxygenated blood to the lungs.',
      slide: 2
    },
    {
      num: '12 / 12',
      name: 'Pranamasana',
      english: 'Sacred Centering',
      mantra: '&#2384; भास्कराय नमः &bull; Om Bhaskaraya Namaha',
      breath: 'Exhale / Natural Baseline',
      desc: 'Completes the solar circuit, returning blood pressure and breath to stillness.',
      slide: 1
    }
  ];

  let currentSuryaStep = -1;
  const companionPill = document.getElementById('companionPill');
  const companionCard = document.getElementById('companionCard');
  const companionCloseBtn = document.getElementById('companionCloseBtn');
  const companionStepTxt = document.getElementById('companionStepTxt');
  const companionPoseName = document.getElementById('companionPoseName');
  const companionRingPath = document.getElementById('companionRingPath');
  const companionCardMantra = document.getElementById('companionCardMantra');
  const companionCardTitle = document.getElementById('companionCardTitle');
  const companionCardBreath = document.getElementById('companionCardBreath');
  const companionCardDesc = document.getElementById('companionCardDesc');
  const companionScrubber = document.getElementById('companionScrubber');

  function updateSuryaState(stepIdx) {
    if (stepIdx === currentSuryaStep) return;
    currentSuryaStep = stepIdx;
    const step = suryaSteps[stepIdx];
    if (!step) return;

    // Cross-fade background slide
    const targetSlideId = 'suryaSlide-' + step.slide;
    for (let i = 1; i <= 8; i++) {
      const slide = document.getElementById('suryaSlide-' + i);
      if (slide) {
        slide.classList.toggle('active', 'suryaSlide-' + i === targetSlideId);
      }
    }

    // Update pill text & circular gauge
    if (companionStepTxt) companionStepTxt.textContent = step.num;
    if (companionPoseName) companionPoseName.textContent = step.name;
    if (companionRingPath) {
      const progressPercent = ((stepIdx + 1) / 12) * 100;
      const offset = 100 - progressPercent;
      companionRingPath.style.strokeDashoffset = offset;
    }

    // Update card content
    if (companionCardMantra) companionCardMantra.innerHTML = step.mantra;
    if (companionCardTitle) companionCardTitle.textContent = step.name + ' (' + step.english + ')';
    if (companionCardBreath) companionCardBreath.innerHTML = '<span>Breath: ' + step.breath + '</span>';
    if (companionCardDesc) companionCardDesc.textContent = step.desc;

    // Update mini-scrubber dots
    if (companionScrubber) {
      const dots = companionScrubber.querySelectorAll('.comp-dot');
      dots.forEach((dot, i) => dot.classList.toggle('active', i === stepIdx));
    }
  }

  // Smooth scroll listener via requestAnimationFrame
  let suryaTicking = false;
  function onScrollSurya() {
    if (!suryaTicking) {
      window.requestAnimationFrame(() => {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight > 0) {
          const scrollFrac = Math.min(Math.max(window.scrollY / docHeight, 0), 0.999);
          const stepIndex = Math.floor(scrollFrac * 12);
          updateSuryaState(stepIndex);
        }
        suryaTicking = false;
      });
      suryaTicking = true;
    }
  }
  window.addEventListener('scroll', onScrollSurya, { passive: true });
  updateSuryaState(0);

  // Companion pill toggle & card controls
  function openCompanionCard() {
    if (companionCard) {
      companionCard.classList.add('open');
      if (companionPill) companionPill.setAttribute('aria-expanded', 'true');
    }
  }
  function closeCompanionCard() {
    if (companionCard) {
      companionCard.classList.remove('open');
      if (companionPill) companionPill.setAttribute('aria-expanded', 'false');
    }
  }
  window.openCompanionCard = openCompanionCard;

  if (companionPill) {
    companionPill.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = companionCard && companionCard.classList.contains('open');
      if (isOpen) {
        closeCompanionCard();
      } else {
        openCompanionCard();
      }
    });
    companionPill.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        companionPill.click();
      }
    });
  }

  if (companionCloseBtn) {
    companionCloseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeCompanionCard();
    });
  }

  document.addEventListener('click', (e) => {
    if (companionCard && companionCard.classList.contains('open')) {
      if (!companionCard.contains(e.target) && (!companionPill || !companionPill.contains(e.target))) {
        closeCompanionCard();
      }
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && companionCard && companionCard.classList.contains('open')) {
      closeCompanionCard();
    }
  });

  // Micro scrubber click
  if (companionScrubber) {
    companionScrubber.addEventListener('click', (e) => {
      const dot = e.target.closest('.comp-dot');
      if (dot && dot.dataset.step !== undefined) {
        const step = parseInt(dot.dataset.step, 10);
        updateSuryaState(step);
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight > 0) {
          const targetY = (step / 12) * docHeight;
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

