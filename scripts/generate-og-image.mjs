/**
 * @fileoverview Generates the default OG image for CreditBuddy.
 *
 * Creates a 1200×630 PNG with:
 *   - Cream background (#FBF7EF)
 *   - Brand name "CreditBuddy" centred
 *   - Tagline "India's Student-First Financial Ecosystem" below
 *
 * Uses the `sharp` package (bundled with Next.js 15).
 *
 * Run: node scripts/generate-og-image.mjs
 */

import sharp from 'sharp';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputPath = path.resolve(__dirname, '../public/images/og-default.png');

// Ensure output directory exists
fs.mkdirSync(path.dirname(outputPath), { recursive: true });

const WIDTH = 1200;
const HEIGHT = 630;

// Build an SVG that sharp will rasterise to PNG
const svg = `
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="#FBF7EF"/>

  <!-- Accent lime bar (top) -->
  <rect x="0" y="0" width="${WIDTH}" height="8" fill="#C8FF3D"/>

  <!-- Decorative circle blob (top-right) -->
  <circle cx="1050" cy="120" r="180" fill="#C8FF3D" opacity="0.18"/>

  <!-- Decorative circle blob (bottom-left) -->
  <circle cx="150" cy="520" r="140" fill="#7B5CFF" opacity="0.12"/>

  <!-- Brand name -->
  <text
    x="${WIDTH / 2}"
    y="280"
    font-family="Arial, Helvetica, sans-serif"
    font-size="96"
    font-weight="800"
    fill="#14100F"
    text-anchor="middle"
    dominant-baseline="middle"
    letter-spacing="-3"
  >CreditBuddy</text>

  <!-- Tagline -->
  <text
    x="${WIDTH / 2}"
    y="370"
    font-family="Arial, Helvetica, sans-serif"
    font-size="32"
    font-weight="400"
    fill="#14100F"
    opacity="0.65"
    text-anchor="middle"
    dominant-baseline="middle"
  >India's Student-First Financial Ecosystem</text>

  <!-- URL badge -->
  <rect x="${WIDTH / 2 - 140}" y="430" width="280" height="48" rx="24" fill="#14100F"/>
  <text
    x="${WIDTH / 2}"
    y="454"
    font-family="monospace, Courier New"
    font-size="18"
    font-weight="600"
    fill="#C8FF3D"
    text-anchor="middle"
    dominant-baseline="middle"
  >creditbuddy.org.in</text>

  <!-- Accent lime bar (bottom) -->
  <rect x="0" y="${HEIGHT - 8}" width="${WIDTH}" height="8" fill="#C8FF3D"/>
</svg>
`.trim();

await sharp(Buffer.from(svg))
  .png({ quality: 90 })
  .toFile(outputPath);

console.log(`✅ OG image created: ${outputPath}`);
