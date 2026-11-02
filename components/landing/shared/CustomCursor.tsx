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

    // Wrapper — give it real size so children are never clipped
    // The hotspot offset is handled by margin-left/top on the wrapper itself
    const wrap = document.createElement('div');
    wrap.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 96px;
      height: 96px;
      pointer-events: none;
      z-index: 2147483647;
      overflow: visible;
      transform: translate(-300px, -300px);
    `;

    const palm = document.createElement('img');
    palm.src = '/images/cur-palm.png';
    palm.style.cssText = `
      position: absolute;
      width: 72px;
      height: 72px;
      top: 0;
      left: 0;
      image-rendering: pixelated;
      pointer-events: none;
      user-select: none;
      display: block;
    `;

    const ptr = document.createElement('img');
    ptr.src = '/images/cur-pointer.png';
    ptr.style.cssText = `
      position: absolute;
      width: 68px;
      height: 68px;
      top: 0;
      left: 0;
      image-rendering: pixelated;
      pointer-events: none;
      user-select: none;
      display: block;
      opacity: 0;
    `;

    wrap.appendChild(palm);
    wrap.appendChild(ptr);
    document.documentElement.appendChild(wrap); // append to <html>, not <body> — body has overflow-x:clip which traps fixed children

    let curX = -300, curY = -300;
    let rawX = -300, rawY = -300;
    let prevRawX = -300;
    // Spring physics for tilt: velocity, position, damping
    let tilt = 0;
    let tiltVel = 0;
    let hovering = false;
    let raf = 0;

    // Hotspot offsets — palm centre, pointer tip top-left
    const PALM_OX = 36, PALM_OY = 36;   // half of 72
    const PTR_OX  = 14, PTR_OY  = 8;

    const onMove = (e: MouseEvent) => {
      const vx = e.clientX - prevRawX;
      prevRawX = e.clientX;
      rawX = e.clientX;
      rawY = e.clientY;

      // Moving left (vx < 0) → hand trails → top leans RIGHT → positive tilt
      // Moving right (vx > 0) → hand trails → top leans LEFT → negative tilt
      // So tilt force = -vx (pendulum physics)
      tiltVel += -vx * 2.2;

      const t = e.target as Element | null;
      hovering = !!t?.closest(INTERACTIVE);
    };

    const tick = () => {
      // Lag position — 0.12 = heavy trailing delay
      curX += (rawX - curX) * 0.12;
      curY += (rawY - curY) * 0.12;

      // Spring: restore force pulls tilt back to 0, damping kills oscillation
      const stiffness = 0.18;  // how strongly it springs back
      const damping   = 0.72;  // 0 = no damping (endless swing), 1 = no swing
      tiltVel += -tilt * stiffness;  // restore force
      tiltVel *= damping;            // dampen
      tilt    += tiltVel;
      tilt     = Math.max(-28, Math.min(28, tilt)); // clamp

      const ox = hovering ? PTR_OX : PALM_OX;
      const oy = hovering ? PTR_OY : PALM_OY;

      wrap.style.transform = `translate(${curX - ox}px, ${curY - oy}px)`;

      palm.style.opacity         = hovering ? '0' : '1';
      palm.style.transform       = `rotate(${tilt}deg)`;
      palm.style.transformOrigin = `${PALM_OX}px ${PALM_OY + 10}px`; // rotate from wrist

      ptr.style.opacity          = hovering ? '1' : '0';
      ptr.style.transform        = `rotate(${tilt * 0.55}deg)`;
      ptr.style.transformOrigin  = `${PTR_OX}px ${PTR_OY + 20}px`;

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener('mousemove', onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      document.getElementById('custom-cursor-styles')?.remove();
      wrap.remove();
    };
  }, []);

  return null;
};
