'use client';

import { useEffect } from 'react';

const INTERACTIVE =
  'a, button, [role="button"], input, select, textarea, label, summary, [tabindex]:not([tabindex="-1"])';

export const CustomCursor = () => {
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    // Hide native cursor
    const style = document.createElement('style');
    style.id = 'custom-cursor-styles';
    style.textContent = `html, body, * { cursor: none !important; }`;
    document.head.appendChild(style);

    // ── Hand cursor wrapper ──────────────────────────────────────────────
    const wrap = document.createElement('div');
    wrap.style.cssText = `
      position: fixed;
      top: 0; left: 0;
      width: 96px; height: 96px;
      pointer-events: none;
      z-index: 2147483647;
      overflow: visible;
      transform: translate(-300px, -300px);
    `;

    const palm = document.createElement('img');
    palm.src = '/images/cur-palm.png';
    palm.style.cssText = `
      position: absolute;
      width: 72px; height: 72px;
      top: 0; left: 0;
      image-rendering: pixelated;
      pointer-events: none;
      user-select: none;
      display: block;
    `;

    const ptr = document.createElement('img');
    ptr.src = '/images/cur-pointer.png';
    ptr.style.cssText = `
      position: absolute;
      width: 68px; height: 68px;
      top: 0; left: 0;
      image-rendering: pixelated;
      pointer-events: none;
      user-select: none;
      display: block;
      opacity: 0;
    `;

    wrap.appendChild(palm);
    wrap.appendChild(ptr);
    document.documentElement.appendChild(wrap);

    // ── Green dot cursor (instant, no lag) ──────────────────────────────
    const dot = document.createElement('div');
    dot.style.cssText = `
      position: fixed;
      top: 0; left: 0;
      width: 14px; height: 14px;
      border-radius: 50%;
      background: #C8FF3D;
      border: 2px solid #14100F;
      pointer-events: none;
      z-index: 2147483647;
      margin-top: -7px;
      margin-left: -7px;
      transform: translate(-300px, -300px);
      opacity: 0;
      transition: opacity 0.12s ease, transform 0.06s ease, width 0.12s ease, height 0.12s ease;
      box-shadow: 0 0 0 3px rgba(200,255,61,0.25);
    `;
    document.documentElement.appendChild(dot);

    // ── State ────────────────────────────────────────────────────────────
    let curX = -300, curY = -300;   // lerped hand pos
    let rawX = -300, rawY = -300;   // raw mouse
    let prevRawX = -300;
    let tilt = 0, tiltVel = 0;
    let hovering = false;
    let dotMode = false;            // true when over data-cursor="dot" element
    let raf = 0;

    const PALM_OX = 36, PALM_OY = 36;
    const PTR_OX  = 14, PTR_OY  = 8;

    const onMove = (e: MouseEvent) => {
      const vx = e.clientX - prevRawX;
      prevRawX = e.clientX;
      rawX = e.clientX;
      rawY = e.clientY;

      tiltVel += -vx * 2.2;

      const t = e.target as Element | null;
      hovering = !!t?.closest(INTERACTIVE);

      // Check if we're inside a data-cursor="dot" zone
      dotMode = !!t?.closest('[data-cursor="dot"]');
    };

    const tick = () => {
      if (dotMode) {
        // ── Dot mode: instant position, hide hand ────────────────────
        dot.style.transform  = `translate(${rawX}px, ${rawY}px)`;
        dot.style.opacity    = '1';
        wrap.style.opacity   = '0';
      } else {
        // ── Hand mode: lerp + swing ──────────────────────────────────
        curX += (rawX - curX) * 0.12;
        curY += (rawY - curY) * 0.12;

        const stiffness = 0.18;
        const damping   = 0.72;
        tiltVel += -tilt * stiffness;
        tiltVel *= damping;
        tilt    += tiltVel;
        tilt     = Math.max(-28, Math.min(28, tilt));

        const ox = hovering ? PTR_OX : PALM_OX;
        const oy = hovering ? PTR_OY : PALM_OY;

        wrap.style.transform       = `translate(${curX - ox}px, ${curY - oy}px)`;
        wrap.style.opacity         = '1';
        dot.style.opacity          = '0';

        palm.style.opacity         = hovering ? '0' : '1';
        palm.style.transform       = `rotate(${tilt}deg)`;
        palm.style.transformOrigin = `${PALM_OX}px ${PALM_OY + 10}px`;

        ptr.style.opacity          = hovering ? '1' : '0';
        ptr.style.transform        = `rotate(${tilt * 0.55}deg)`;
        ptr.style.transformOrigin  = `${PTR_OX}px ${PTR_OY + 20}px`;
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener('mousemove', onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      document.getElementById('custom-cursor-styles')?.remove();
      wrap.remove();
      dot.remove();
    };
  }, []);

  return null;
};
