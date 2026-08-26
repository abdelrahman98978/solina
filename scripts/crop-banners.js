import sharp from 'sharp';
import fs from 'fs';

async function cropBanners() {
  const inputPath = 'public/solina-app-hero-banners.png';
  const metadata = await sharp(inputPath).metadata();
  const width = metadata.width;
  const height = metadata.height;

  console.log(`Original dimensions: ${width}x${height}`);

  // 1. Top Hero Card: roughly from y = 0 to y = 69% of height
  const heroHeight = Math.floor(height * 0.69);
  await sharp(inputPath)
    .extract({ left: 0, top: 0, width: width, height: heroHeight })
    .toFile('public/solina-app-hero-card.png');
  console.log('Created public/solina-app-hero-card.png');

  // 2. Bottom Guarantee Banner: from y = 71% to bottom
  const guaranteeTop = Math.floor(height * 0.71);
  const guaranteeHeight = height - guaranteeTop;
  await sharp(inputPath)
    .extract({ left: 0, top: guaranteeTop, width: width, height: guaranteeHeight })
    .toFile('public/solina-app-guarantee-card.png');
  console.log('Created public/solina-app-guarantee-card.png');
}

cropBanners().catch(console.error);
