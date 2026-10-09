/**
 * The Reset Co. - Sanctuary Accord & Key Terms Modal
 * Production-ready, accessible, physics-animated modal for guest awareness.
 */

(function () {
  'use strict';

  let modalOverlay = null;
  let lastFocusedElement = null;
  let pendingAction = null;

  const ACCORD_POINTS = [
    {
      num: '01',
      title: 'Restorative Sanctuary, Not an Acute Hospital',
      desc: 'Our retreats are physician-led classical Ayurvedic restorative immersions, not acute emergency or surgical facilities. All guests must fully disclose relevant medical history, active medications, allergies, and prior spinal procedures during intake.'
    },
    {
      num: '02',
      title: 'Zero Intoxicants & 100% Pure Perimeter',
      desc: 'The entire sanctuary is strictly smoke-free, alcohol-free, and substance-free. Outside packaged snacks, commercial junk foods, and artificial stimulants are not permitted so digestive fire (Agni) can reset undisturbed.'
    },
    {
      num: '03',
      title: 'Digital Sundown & Sensory Fasting',
      desc: 'Smartphones and laptops remain in private room sanctums during morning practices, communal dining, and evening hours. Therapy suites, gardens, and dining halls are screen-free zones to assist deep nervous system recovery.'
    },
    {
      num: '04',
      title: 'Noble Silence Mornings (Arya Mauna)',
      desc: 'From waking until the completion of morning restorative yoga and breakfast, all guests observe noble silence. Quietude protects subtle vital energy (Prana) and prevents mental dispersion.'
    },
    {
      num: '05',
      title: 'Physician Clinical Discretion',
      desc: 'Founding Vaidyas Dr. Himanshu Bhatt and Dr. Aditya Kaundal evaluate your daily pulse and physical responses. Doctors retain full clinical discretion to adjust, adapt, or substitute any therapy in your biological interest.'
    },
    {
      num: '06',
      title: 'Acoustic Peace & Cohort Decorum (12 Guests)',
      desc: 'Cohorts are limited to 12 guests to maintain serenity. Personal loud music is not allowed; our faculty uses acoustic speakers solely for sacred Om chanting and soothing sounds. Commercial filming is permitted with prior coordination.'
    },
    {
      num: '07',
      title: 'Reservation & 30-Day Rescheduling Window',
      desc: 'A 50% advance deposit secures your private room. Cancellations within 14 days of arrival are non-refundable, but 100% of funds paid can be transferred to any future Reset Co. cohort within 1 month (30 days).'
    }
  ];

  function ensureStyles() {
    if (document.getElementById('sanctuaryAccordInlineStyles')) return;
    const style = document.createElement('style');
    style.id = 'sanctuaryAccordInlineStyles';
    style.textContent = `
      .accord-overlay {
        position: fixed !important;
        inset: 0 !important;
        top: 0 !important; left: 0 !important; width: 100vw !important; height: 100vh !important;
        background-color: rgba(15, 35, 71, 0.82) !important;
        backdrop-filter: blur(8px) !important;
        -webkit-backdrop-filter: blur(8px) !important;
        z-index: 999999 !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        padding: 1rem !important;
        opacity: 0 !important;
        visibility: hidden !important;
        pointer-events: none !important;
        transition: opacity 0.28s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.28s !important;
      }
      .accord-overlay.active {
        opacity: 1 !important;
        visibility: visible !important;
        pointer-events: auto !important;
      }
      .accord-modal {
        position: relative !important;
        width: 100% !important;
        max-width: 680px !important;
        max-height: 90vh !important;
        background-color: #FAF7F0 !important;
        border: 1px solid rgba(201, 168, 76, 0.5) !important;
        border-radius: 6px !important;
        box-shadow: 0 25px 60px rgba(15, 35, 71, 0.45) !important;
        display: flex !important;
        flex-direction: column !important;
        transform: scale(0.96) !important;
        transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1) !important;
        overflow: hidden !important;
      }
      .accord-overlay.active .accord-modal {
        transform: scale(1) !important;
      }
      .accord-header {
        background-color: #0F2347 !important;
        color: #FDFAF3 !important;
        padding: 1.35rem 1.5rem !important;
        border-bottom: 1px solid rgba(201, 168, 76, 0.3) !important;
        display: flex !important;
        align-items: flex-start !important;
        justify-content: space-between !important;
        gap: 1rem !important;
      }
      .accord-header-info { flex: 1 !important; }
      .accord-shloka-badge {
        font-family: 'Noto Serif Devanagari', 'Cormorant Garamond', Georgia, serif !important;
        font-size: 0.95rem !important;
        color: #E8C97A !important;
        letter-spacing: 0.04em !important;
        font-weight: 500 !important;
        margin-bottom: 0.25rem !important;
        display: inline-block !important;
      }
      .accord-title {
        font-family: 'Cormorant Garamond', Georgia, serif !important;
        font-size: clamp(1.35rem, 3.2vw, 1.8rem) !important;
        font-weight: 500 !important;
        line-height: 1.25 !important;
        color: #FDFAF3 !important;
        margin-bottom: 0.35rem !important;
      }
      .accord-subtitle {
        font-family: 'Jost', system-ui, sans-serif !important;
        font-size: 0.84rem !important;
        color: rgba(253, 250, 243, 0.85) !important;
        line-height: 1.5 !important;
      }
      .accord-close-btn {
        background: transparent !important;
        border: 1px solid rgba(201, 168, 76, 0.35) !important;
        color: #FDFAF3 !important;
        width: 44px !important;
        height: 44px !important;
        min-width: 44px !important;
        min-height: 44px !important;
        border-radius: 4px !important;
        cursor: pointer !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        font-size: 1.4rem !important;
        line-height: 1 !important;
        transition: background 0.2s, border-color 0.2s !important;
        flex-shrink: 0 !important;
      }
      .accord-close-btn:hover {
        background: rgba(201, 168, 76, 0.15) !important;
        border-color: #C9A84C !important;
      }
      .accord-body {
        padding: 1.25rem 1.5rem !important;
        overflow-y: auto !important;
        flex: 1 1 auto !important;
        -webkit-overflow-scrolling: touch !important;
        display: flex !important;
        flex-direction: column !important;
        gap: 0.85rem !important;
        background-color: #FAF7F0 !important;
      }
      .accord-item {
        background: #FFFFFF !important;
        border: 1px solid #E8DFCC !important;
        border-left: 3px solid #C9A84C !important;
        border-radius: 4px !important;
        padding: 0.85rem 1.1rem !important;
        display: flex !important;
        gap: 0.85rem !important;
        align-items: flex-start !important;
      }
      .accord-item-num {
        font-family: 'Cinzel', Georgia, serif !important;
        font-size: 0.78rem !important;
        font-weight: 700 !important;
        color: #8C651E !important;
        background: rgba(201, 168, 76, 0.14) !important;
        padding: 3px 6px !important;
        border-radius: 3px !important;
        min-width: 26px !important;
        text-align: center !important;
        flex-shrink: 0 !important;
        margin-top: 1px !important;
      }
      .accord-item-content { flex: 1 !important; }
      .accord-item-title {
        font-family: 'Cormorant Garamond', Georgia, serif !important;
        font-size: 1.15rem !important;
        font-weight: 600 !important;
        color: #0F2347 !important;
        margin-bottom: 0.2rem !important;
        line-height: 1.3 !important;
      }
      .accord-item-desc {
        font-family: 'Jost', system-ui, sans-serif !important;
        font-size: 0.85rem !important;
        color: #4A5568 !important;
        line-height: 1.6 !important;
      }
      .accord-footer {
        background-color: #F0ECE1 !important;
        border-top: 1px solid #E8DFCC !important;
        padding: 1.1rem 1.5rem !important;
        display: flex !important;
        flex-direction: column !important;
        gap: 0.85rem !important;
      }
      .accord-check-label {
        display: flex !important;
        align-items: center !important;
        gap: 0.65rem !important;
        font-family: 'Jost', system-ui, sans-serif !important;
        font-size: 0.88rem !important;
        font-weight: 500 !important;
        color: #0F2347 !important;
        cursor: pointer !important;
        min-height: 44px !important;
        user-select: none !important;
      }
      .accord-checkbox {
        width: 18px !important;
        height: 18px !important;
        accent-color: #0F2347 !important;
        cursor: pointer !important;
      }
      .accord-actions {
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        gap: 1rem !important;
        flex-wrap: wrap !important;
      }
      .accord-proceed-btn {
        background: #0F2347 !important;
        color: #FDFAF3 !important;
        border: 1px solid #C9A84C !important;
        padding: 0.75rem 1.6rem !important;
        border-radius: 3px !important;
        font-family: 'Jost', system-ui, sans-serif !important;
        font-size: 0.85rem !important;
        font-weight: 600 !important;
        letter-spacing: 0.08em !important;
        text-transform: uppercase !important;
        cursor: pointer !important;
        min-height: 44px !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        gap: 0.5rem !important;
        transition: background 0.2s, opacity 0.2s !important;
      }
      .accord-proceed-btn:hover { background: #173364 !important; }
      .accord-proceed-btn:disabled { opacity: 0.45 !important; cursor: not-allowed !important; }
      .accord-links {
        display: flex !important;
        align-items: center !important;
        gap: 0.85rem !important;
        font-family: 'Jost', system-ui, sans-serif !important;
        font-size: 0.8rem !important;
        color: #5C6779 !important;
      }
      .accord-link {
        color: #0F2347 !important;
        text-decoration: underline !important;
        text-underline-offset: 3px !important;
      }
      .accord-link:hover { color: #8C651E !important; }
      @media (max-width: 600px) {
        .accord-overlay { padding: 0.5rem !important; }
        .accord-modal { max-height: 94vh !important; }
        .accord-header { padding: 1rem 1.15rem !important; }
        .accord-body { padding: 0.85rem 1rem !important; }
        .accord-footer { padding: 0.85rem 1rem !important; }
        .accord-actions { flex-direction: column !important; align-items: stretch !important; }
        .accord-proceed-btn { width: 100% !important; }
        .accord-links { justify-content: center !important; }
      }
    `;
    document.head.appendChild(style);
  }

  function buildModalDOM() {
    ensureStyles();
    if (document.getElementById('sanctuaryAccordOverlay')) {
      return document.getElementById('sanctuaryAccordOverlay');
    }

    const overlay = document.createElement('div');
    overlay.id = 'sanctuaryAccordOverlay';
    overlay.className = 'accord-overlay';
    overlay.setAttribute('aria-hidden', 'true');

    const pointsHTML = ACCORD_POINTS.map(p => `
      <div class="accord-item">
        <span class="accord-item-num">${p.num}</span>
        <div class="accord-item-content">
          <h4 class="accord-item-title">${p.title}</h4>
          <p class="accord-item-desc">${p.desc}</p>
        </div>
      </div>
    `).join('');

    overlay.innerHTML = `
      <div class="accord-modal" role="dialog" aria-modal="true" aria-labelledby="accordTitle" aria-describedby="accordSubtitle">
        <header class="accord-header">
          <div class="accord-header-info">
            <span class="accord-shloka-badge">स्वस्थस्य स्वास्थ्यरक्षणम्</span>
            <h3 class="accord-title" id="accordTitle">The Sanctuary Accord &amp; Key Terms</h3>
            <p class="accord-subtitle" id="accordSubtitle">7 essential commitments every guest acknowledges before joining our doctor-led cohort.</p>
          </div>
          <button type="button" class="accord-close-btn" id="accordCloseBtn" aria-label="Close Sanctuary Accord">&times;</button>
        </header>

        <div class="accord-body" id="accordBody" data-lenis-prevent>
          ${pointsHTML}
        </div>

        <footer class="accord-footer">
          <label class="accord-check-label" for="accordConsentCheck">
            <input type="checkbox" id="accordConsentCheck" class="accord-checkbox" checked>
            <span>I have read, understood, and accept these 7 sanctuary commitments.</span>
          </label>
          <div class="accord-actions">
            <div class="accord-links">
              <a href="terms.html" target="_blank" rel="noopener" class="accord-link">Full Terms of Service</a>
              <span>&bull;</span>
              <a href="guidelines.html" target="_blank" rel="noopener" class="accord-link">Sanctuary Guidelines</a>
            </div>
            <button type="button" class="accord-proceed-btn" id="accordProceedBtn">
              I Agree &bull; Proceed to Booking &rarr;
            </button>
          </div>
        </footer>
      </div>
    `;

    document.body.appendChild(overlay);

    // Event listeners
    const closeBtn = overlay.querySelector('#accordCloseBtn');
    const proceedBtn = overlay.querySelector('#accordProceedBtn');
    const checkbox = overlay.querySelector('#accordConsentCheck');

    closeBtn.addEventListener('click', closeSanctuaryAccord);

    checkbox.addEventListener('change', function () {
      proceedBtn.disabled = !this.checked;
    });

    proceedBtn.addEventListener('click', function () {
      if (!checkbox.checked) return;
      try {
        sessionStorage.setItem('trc_accord_accepted', 'true');
      } catch (e) {
        // Fallback if sessionStorage is restricted
      }
      const action = pendingAction;
      closeSanctuaryAccord();

      if (typeof action === 'function') {
        action();
      } else if (typeof action === 'string' && action.length > 0 && action !== '#sanctuary-accord') {
        if (action.startsWith('http://') || action.startsWith('https://')) {
          window.open(action, '_blank', 'noopener');
        } else {
          window.location.href = action;
        }
      } else {
        // Default: scroll or redirect to reservation form
        const isHome = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/');
        if (isHome) {
          const contactSec = document.getElementById('contact');
          if (contactSec) {
            if (window.lenis) {
              window.lenis.scrollTo(contactSec, { offset: -40, duration: 1.2 });
            } else {
              contactSec.scrollIntoView({ behavior: 'smooth' });
            }
          } else {
            window.location.hash = '#contact';
          }
        } else {
          window.location.href = 'index.html#contact';
        }
      }
    });

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) {
        closeSanctuaryAccord();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('active')) {
        closeSanctuaryAccord();
      }
      if (e.key === 'Tab' && overlay.classList.contains('active')) {
        trapFocus(e, overlay);
      }
    });

    return overlay;
  }

  function trapFocus(e, container) {
    const focusable = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  function openSanctuaryAccord(actionOrUrl) {
    lastFocusedElement = document.activeElement;
    pendingAction = actionOrUrl || null;

    if (!modalOverlay) {
      modalOverlay = buildModalDOM();
    }

    modalOverlay.classList.add('active');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (window.lenis) window.lenis.stop();

    // Focus proceed button or close button
    const proceedBtn = modalOverlay.querySelector('#accordProceedBtn');
    if (proceedBtn) {
      setTimeout(() => proceedBtn.focus(), 60);
    }
  }

  function closeSanctuaryAccord() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (window.lenis && !document.documentElement.classList.contains('is-welcome-locked')) {
      window.lenis.start();
    }

    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  }

  // Expose to window
  window.openSanctuaryAccord = openSanctuaryAccord;
  window.closeSanctuaryAccord = closeSanctuaryAccord;

  // Auto-bind on DOM ready
  document.addEventListener('DOMContentLoaded', function () {
    // Check elements with data-accord-trigger
    document.querySelectorAll('[data-accord-trigger]').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const targetUrl = this.getAttribute('href') || this.getAttribute('data-target-url');
        openSanctuaryAccord(targetUrl);
      });
    });

    // Intercept .book-now-btn on programme pages if accord not already accepted in session
    document.querySelectorAll('.book-now-btn').forEach(btn => {
      btn.addEventListener('click', function (e) {
        const hasAccepted = sessionStorage.getItem('trc_accord_accepted') === 'true';
        if (!hasAccepted) {
          e.preventDefault();
          const targetUrl = this.getAttribute('href');
          openSanctuaryAccord(targetUrl);
        }
      });
    });
  });
})();
