import React from 'react';

// GrainOverlay — hidden on mobile (md:block) to avoid a full-screen
// GPU repaint every frame on low-end phones.
export const GrainOverlay = () => {
  return (
    <div className="grain-overlay fixed hidden md:block" />
  );
};
