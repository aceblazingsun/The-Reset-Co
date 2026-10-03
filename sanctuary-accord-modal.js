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

  function buildModalDOM() {
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

        <div class="accord-body" id="accordBody">
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
      } else if (typeof action === 'string' && action.length > 0) {
        if (action.startsWith('http://') || action.startsWith('https://')) {
          window.open(action, '_blank', 'noopener');
        } else {
          window.location.href = action;
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
