import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdirSync, existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDir = join(__dirname, '..', 'public');

async function generateIcons() {
  const logoPath = join(publicDir, 'logo.png');
  
  console.log('🎨 Generating icons from logo.png...\n');

  // Generate favicon.ico (32x32)
  console.log('📍 Creating favicon.ico (32x32)...');
  await sharp(logoPath)
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(join(publicDir, 'favicon.ico'));
  
  // Generate icon.png (32x32 PNG)
  console.log('📍 Creating icon.png (32x32)...');
  await sharp(logoPath)
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(join(publicDir, 'icon.png'));

  // Generate apple-icon.png (180x180)
  console.log('📍 Creating apple-icon.png (180x180)...');
  await sharp(logoPath)
    .resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(join(publicDir, 'apple-icon.png'));

  // Generate OG image (1200x630) - Create a beautiful preview
  console.log('📍 Creating og-image.png (1200x630)...');
  
  // Create a gradient background with the portfolio theme
  const ogWidth = 1200;
  const ogHeight = 630;
  
  // Create gradient background (midnight blue to purple - matching the portfolio theme)
  const gradientSvg = `
    <svg width="${ogWidth}" height="${ogHeight}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#0f172a"/>
          <stop offset="50%" style="stop-color:#1e1b4b"/>
          <stop offset="100%" style="stop-color:#312e81"/>
        </linearGradient>
        <radialGradient id="moonGlow" cx="85%" cy="25%" r="20%">
          <stop offset="0%" style="stop-color:#fef9c3;stop-opacity:0.6"/>
          <stop offset="100%" style="stop-color:#fef9c3;stop-opacity:0"/>
        </radialGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <!-- Background gradient -->
      <rect width="100%" height="100%" fill="url(#skyGradient)"/>
      
      <!-- Moon glow -->
      <rect width="100%" height="100%" fill="url(#moonGlow)"/>
      
      <!-- Moon -->
      <circle cx="1020" cy="150" r="60" fill="#fef9c3" filter="url(#glow)"/>
      
      <!-- Stars -->
      <circle cx="100" cy="80" r="2" fill="#fff" opacity="0.8"/>
      <circle cx="250" cy="120" r="1.5" fill="#fff" opacity="0.6"/>
      <circle cx="400" cy="60" r="2" fill="#fff" opacity="0.7"/>
      <circle cx="550" cy="140" r="1" fill="#fff" opacity="0.5"/>
      <circle cx="700" cy="90" r="1.5" fill="#fff" opacity="0.6"/>
      <circle cx="850" cy="50" r="2" fill="#fff" opacity="0.8"/>
      <circle cx="150" cy="200" r="1" fill="#fff" opacity="0.4"/>
      <circle cx="300" cy="180" r="1.5" fill="#fff" opacity="0.5"/>
      <circle cx="500" cy="220" r="1" fill="#fff" opacity="0.6"/>
      <circle cx="650" cy="160" r="2" fill="#fff" opacity="0.7"/>
      
      <!-- Clouds -->
      <ellipse cx="200" cy="500" rx="120" ry="40" fill="#1e293b" opacity="0.5"/>
      <ellipse cx="280" cy="490" rx="80" ry="30" fill="#1e293b" opacity="0.4"/>
      <ellipse cx="900" cy="520" rx="150" ry="50" fill="#1e293b" opacity="0.5"/>
      <ellipse cx="1000" cy="510" rx="100" ry="35" fill="#1e293b" opacity="0.4"/>
      
      <!-- Title text -->
      <text x="600" y="280" font-family="system-ui, -apple-system, sans-serif" font-size="72" font-weight="bold" fill="#ffffff" text-anchor="middle" filter="url(#glow)">Bé Dương</text>
      
      <!-- Subtitle -->
      <text x="600" y="350" font-family="system-ui, -apple-system, sans-serif" font-size="32" fill="#c4b5fd" text-anchor="middle">2D Artist &amp; UI Designer</text>
      
      <!-- Tagline -->
      <text x="600" y="420" font-family="system-ui, -apple-system, sans-serif" font-size="24" fill="#a5b4fc" text-anchor="middle" opacity="0.8">Where dreams take shape under the moonlight</text>
      
      <!-- Decorative line -->
      <line x1="400" y1="380" x2="800" y2="380" stroke="#6366f1" stroke-width="2" opacity="0.5"/>
    </svg>
  `;

  await sharp(Buffer.from(gradientSvg))
    .png()
    .toFile(join(publicDir, 'og-image.png'));

  console.log('\n✅ All icons generated successfully!');
  console.log('   - favicon.ico (32x32)');
  console.log('   - icon.png (32x32)');
  console.log('   - apple-icon.png (180x180)');
  console.log('   - og-image.png (1200x630)');
}

generateIcons().catch(console.error);
