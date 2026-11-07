'use client';

import { useEffect } from 'react';

export const CustomCursor = () => {
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    // Green arrow cursor as SVG data URL
    // Standard arrow shape, filled lime green with ink outline
    const svgCursor = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="M4 2L4 18L8.5 13.5L11.5 20L14 19L11 12.5L17 12.5Z"
          fill="#C8FF3D" stroke="#14100F" stroke-width="1.5"
          stroke-linejoin="round" stroke-linecap="round"/>
      </svg>
    `.trim();

    const encoded = `url("data:image/svg+xml,${encodeURIComponent(svgCursor)}") 4 2, auto`;

    const style = document.createElement('style');
    style.id = 'custom-cursor-styles';
    style.textContent = `html, body, * { cursor: ${encoded} !important; }`;
    document.head.appendChild(style);

    return () => {
      document.getElementById('custom-cursor-styles')?.remove();
    };
  }, []);

  return null;
};
