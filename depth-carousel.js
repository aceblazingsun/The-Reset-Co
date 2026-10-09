/**
 * DepthCarousel - Vanilla JS implementation matching @react-bits/DepthCarousel
 * 3D Rail with depth, spread, tilt, perspective, visibleCards, falloff, blur, autoplay, loop
 */

(function(global) {
  'use strict';

  const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

  class DepthCarousel {
    constructor(container, options = {}) {
      if (typeof container === 'string') {
        this.container = document.querySelector(container);
      } else {
        this.container = container;
      }

      if (!this.container) {
        console.warn('DepthCarousel: Container element not found.');
        return;
      }

      this.options = Object.assign({
        items: [],
        cardWidth: 320,
        cardHeight: 420,
        radius: 6,
        tint: '#05060a',
        depth: 220,
        spread: 90,
        tilt: 22,
        tiltDirection: 'right',
        perspective: 1400,
        visibleCards: 4,
        falloff: 0.2,
        blur: 6,
        duration: 700,
        autoplay: true,
        autoplayDelay: 3200,
        loop: true,
        showControls: true,
        showIndicators: true,
        onChange: null
      }, options);

      this.items = this.options.items.map(it => typeof it === 'string' ? { image: it, alt: '' } : it);
      this.count = this.items.length;
      if (this.count === 0) return;

      this.pos = 0;
      this.targetPos = 0;
      this.focusIndex = 0;
      this.activeIndex = 0;
      this.scale = 1;
      this.animating = false;
      this.animStartTime = 0;
      this.animStartPos = 0;
      this.animTargetPos = 0;

      this.drag = null;
      this.wheelTimer = null;
      this.autoTimer = null;
      this.isHovered = false;
      this.isFocused = false;

      this.initDOM();
      this.bindEvents();
      this.layout(this.pos);
      this.startAutoplay();
    }

    initDOM() {
      this.container.classList.add('depth-carousel');
      this.container.style.setProperty('--dc-perspective', `${this.options.perspective}px`);
      this.container.setAttribute('tabindex', '0');
      this.container.setAttribute('role', 'region');
      this.container.setAttribute('aria-label', '3D Sanctuary Photo Gallery');

      this.stage = document.createElement('div');
      this.stage.className = 'depth-carousel__stage';
      this.container.appendChild(this.stage);

      this.cardEls = [];
      this.overlayEls = [];

      this.items.forEach((item, i) => {
        const card = document.createElement('div');
        card.className = 'depth-carousel__card';
        card.style.width = `${this.options.cardWidth}px`;
        card.style.height = `${this.options.cardHeight}px`;
        card.style.borderRadius = `${this.options.radius}px`;
        card.setAttribute('role', 'group');
        card.setAttribute('aria-label', `${i + 1} of ${this.count}`);

        const img = document.createElement('img');
        img.className = 'depth-carousel__img';
        img.src = item.image;
        img.alt = item.alt || item.title || '';
        img.loading = i < 3 ? 'eager' : 'lazy';
        img.draggable = false;
        card.appendChild(img);

        const tint = document.createElement('span');
        tint.className = 'depth-carousel__tint';
        tint.style.background = this.options.tint;
        card.appendChild(tint);

        // Optional title/caption overlay
        if (item.title || item.caption || item.tag) {
          const cap = document.createElement('div');
          cap.className = 'depth-carousel__caption-overlay';
          if (item.tag) {
            const tag = document.createElement('div');
            tag.className = 'depth-carousel__caption-tag';
            tag.textContent = item.tag;
            cap.appendChild(tag);
          }
          if (item.title) {
            const title = document.createElement('h4');
            title.className = 'depth-carousel__caption-title';
            title.textContent = item.title;
            cap.appendChild(title);
          }
          if (item.caption) {
            const desc = document.createElement('p');
            desc.className = 'depth-carousel__caption-desc';
            desc.textContent = item.caption;
            cap.appendChild(desc);
          }
          card.appendChild(cap);
        }

        card.addEventListener('click', () => {
          if (this.drag && this.drag.moved) return;
          this.setFocus(i, true);
        });

        this.stage.appendChild(card);
        this.cardEls.push(card);
        this.overlayEls.push(tint);
      });

      // Arrow Controls
      if (this.options.showControls && this.count > 1) {
        this.prevBtn = document.createElement('button');
        this.prevBtn.type = 'button';
        this.prevBtn.className = 'depth-carousel__arrow depth-carousel__arrow--prev';
        this.prevBtn.setAttribute('aria-label', 'Previous photo');
        this.prevBtn.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
        this.prevBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.navigateBy(-1);
        });

        this.nextBtn = document.createElement('button');
        this.nextBtn.type = 'button';
        this.nextBtn.className = 'depth-carousel__arrow depth-carousel__arrow--next';
        this.nextBtn.setAttribute('aria-label', 'Next photo');
        this.nextBtn.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
        this.nextBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.navigateBy(1);
        });

        this.container.appendChild(this.prevBtn);
        this.container.appendChild(this.nextBtn);
      }

      // Indicators
      if (this.options.showIndicators && this.count > 1) {
        this.dotsWrap = document.createElement('div');
        this.dotsWrap.className = 'depth-carousel__dots';
        this.dots = [];

        this.items.forEach((_, i) => {
          const dot = document.createElement('button');
          dot.type = 'button';
          dot.className = `depth-carousel__dot${i === 0 ? ' is-active' : ''}`;
          dot.setAttribute('aria-label', `Go to photo ${i + 1}`);
          dot.addEventListener('click', (e) => {
            e.stopPropagation();
            this.setFocus(i, true);
          });
          this.dotsWrap.appendChild(dot);
          this.dots.push(dot);
        });

        this.container.appendChild(this.dotsWrap);
      }
    }

    bindEvents() {
      // Resize Observer for dynamic scale
      if (typeof ResizeObserver !== 'undefined') {
        this.resizeObserver = new ResizeObserver(entries => {
          const w = entries[0].contentRect.width;
          const needed = this.options.cardWidth + Math.abs(this.options.spread) * 2 + 80;
          this.scale = clamp(w / needed, 0.45, 1);
          this.layout(this.pos);
        });
        this.resizeObserver.observe(this.container);
      }

      // Pointer / Mouse Drag
      this.container.addEventListener('pointerdown', (e) => {
        if (this.count < 2) return;
        this.stopAnimation();
        this.drag = {
          x: e.clientX,
          startPos: this.pos,
          lastX: e.clientX,
          lastT: performance.now(),
          v: 0,
          moved: false,
          id: e.pointerId
        };
      });

      window.addEventListener('pointermove', (e) => {
        if (!this.drag) return;
        const stepPx = Math.max(this.options.cardWidth * 0.55 * this.scale, 40);
        const dx = e.clientX - this.drag.x;
        if (!this.drag.moved && Math.abs(dx) > 4) {
          this.drag.moved = true;
          try { this.container.setPointerCapture(this.drag.id); } catch(err) {}
        }
        if (!this.drag.moved) return;

        const now = performance.now();
        const dt = Math.max(now - this.drag.lastT, 1);
        this.drag.v = (e.clientX - this.drag.lastX) / dt;
        this.drag.lastX = e.clientX;
        this.drag.lastT = now;

        this.pos = this.drag.startPos - dx / stepPx;
        this.layout(this.pos);
      });

      const onPointerEnd = () => {
        if (!this.drag) return;
        const drag = this.drag;
        this.drag = null;
        if (!drag.moved) return;

        const stepPx = Math.max(this.options.cardWidth * 0.55 * this.scale, 40);
        const projected = this.pos - (drag.v * 180) / stepPx;
        this.setFocus(Math.round(projected), true);
      };

      window.addEventListener('pointerup', onPointerEnd);
      window.addEventListener('pointercancel', onPointerEnd);

      // Wheel navigation
      this.container.addEventListener('wheel', (e) => {
        if (this.count < 2) return;
        e.preventDefault();
        this.stopAnimation();
        const raw = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
        const delta = e.deltaMode === 1 ? raw * 24 : raw;
        const step = clamp(delta / (this.options.cardWidth * 0.9), -0.6, 0.6);
        this.pos += step;
        this.layout(this.pos);

        if (this.wheelTimer) clearTimeout(this.wheelTimer);
        this.wheelTimer = setTimeout(() => {
          this.setFocus(Math.round(this.pos), true);
        }, 130);
      }, { passive: false });

      // Keyboard
      this.container.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          this.navigateBy(-1);
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          this.navigateBy(1);
        }
      });

      // Hover / Focus pause
      this.container.addEventListener('mouseenter', () => { this.isHovered = true; });
      this.container.addEventListener('mouseleave', () => { this.isHovered = false; });
      this.container.addEventListener('focusin', () => { this.isFocused = true; });
      this.container.addEventListener('focusout', () => { this.isFocused = false; });
    }

    layout(pos) {
      const n = this.count;
      if (!n) return;
      const dir = this.options.tiltDirection === 'left' ? -1 : 1;
      const sc = this.scale;

      for (let i = 0; i < n; i++) {
        const el = this.cardEls[i];
        if (!el) continue;

        let d = i - pos;
        if (this.options.loop && n > 1) {
          d = ((d % n) + n) % n;
          if (d > n / 2) d -= n;
        }

        const back = Math.max(0, d);
        const az = Math.abs(d);
        const shown = az <= this.options.visibleCards + 0.5;

        const tz = -this.options.depth * d;
        const tx = dir * this.options.spread * d;
        const ry = dir * this.options.tilt * clamp(d, 0, 1);

        let opacity = d < 0 ? Math.max(0, 1 + d) : 1;
        if (!shown) opacity = 0;

        const brightness = Math.max(0.18, 1 - back * this.options.falloff);
        const blurPx = this.options.blur > 0 ? Math.min(this.options.blur, (back / Math.max(1, this.options.visibleCards)) * this.options.blur) : 0;
        const zi = Math.round(2000 - d * 20);

        el.style.transform = `translate(-50%, -50%) scale(${sc}) translateX(${tx.toFixed(2)}px) translateZ(${tz.toFixed(2)}px) rotateY(${ry.toFixed(3)}deg)`;
        el.style.opacity = opacity.toFixed(3);
        el.style.filter = `brightness(${brightness.toFixed(3)}) blur(${blurPx.toFixed(2)}px)`;
        el.style.zIndex = String(zi);
        el.style.pointerEvents = shown && opacity > 0.05 ? 'auto' : 'none';

        // Border highlighting for active card
        if (Math.abs(d) < 0.3) {
          el.style.borderColor = 'var(--gold, #C9A84C)';
        } else {
          el.style.borderColor = 'rgba(201, 168, 76, 0.25)';
        }

        const ov = this.overlayEls[i];
        if (ov) {
          ov.style.opacity = clamp(back * this.options.falloff * 1.25, 0, 0.85).toFixed(3);
        }
      }
    }

    setFocus(rawIndex, animate = true) {
      const n = this.count;
      if (!n) return;
      const idx = this.options.loop ? ((rawIndex % n) + n) % n : clamp(rawIndex, 0, n - 1);
      let delta = idx - this.pos;
      if (this.options.loop && n > 1) {
        delta = ((delta % n) + n) % n;
        if (delta > n / 2) delta -= n;
      }
      this.animateTo(this.pos + delta, animate);

      if (idx !== this.focusIndex) {
        this.focusIndex = idx;
        this.notify(idx);
      }
    }

    notify(idx) {
      this.activeIndex = idx;
      if (this.dots) {
        this.dots.forEach((dot, i) => {
          dot.classList.toggle('is-active', i === idx);
        });
      }
      if (typeof this.options.onChange === 'function') {
        this.options.onChange(idx, this.items[idx]);
      }
    }

    navigateBy(step) {
      this.setFocus(this.focusIndex + step, true);
    }

    animateTo(target, animate = true) {
      this.stopAnimation();
      if (!animate) {
        this.pos = target;
        const n = this.count;
        if (n > 0) this.pos = ((this.pos % n) + n) % n;
        this.layout(this.pos);
        return;
      }

      this.animating = true;
      this.animStartTime = performance.now();
      this.animStartPos = this.pos;
      this.animTargetPos = target;

      const dur = this.options.duration;
      // Cubic-bezier(0.16, 1, 0.3, 1) easeOutExpo approximation
      const ease = (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

      const step = (now) => {
        if (!this.animating) return;
        const elapsed = now - this.animStartTime;
        const progress = clamp(elapsed / dur, 0, 1);
        const eased = ease(progress);

        this.pos = this.animStartPos + (this.animTargetPos - this.animStartPos) * eased;
        this.layout(this.pos);

        if (progress < 1) {
          this.rafId = requestAnimationFrame(step);
        } else {
          this.animating = false;
          const n = this.count;
          if (n > 0) this.pos = ((this.pos % n) + n) % n;
          this.layout(this.pos);
        }
      };

      this.rafId = requestAnimationFrame(step);
    }

    stopAnimation() {
      this.animating = false;
      if (this.rafId) cancelAnimationFrame(this.rafId);
    }

    startAutoplay() {
      if (!this.options.autoplay || this.count < 2) return;
      this.stopAutoplay();
      this.autoTimer = setInterval(() => {
        if (!this.isHovered && !this.isFocused && !this.animating && !this.drag) {
          this.navigateBy(1);
        }
      }, Math.max(this.options.autoplayDelay, 1200));
    }

    stopAutoplay() {
      if (this.autoTimer) clearInterval(this.autoTimer);
      this.autoTimer = null;
    }

    destroy() {
      this.stopAnimation();
      this.stopAutoplay();
      if (this.resizeObserver) this.resizeObserver.disconnect();
      if (this.wheelTimer) clearTimeout(this.wheelTimer);
    }
  }

  global.DepthCarousel = DepthCarousel;

})(typeof window !== 'undefined' ? window : this);
