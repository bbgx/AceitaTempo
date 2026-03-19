import fs from 'fs/promises';
import path from 'path';
import { chromium } from 'playwright';

const ROOT = process.cwd();
const ICON_SOURCE = path.join(ROOT, 'assets', 'icon.svg');
const OUTPUT_DIR = path.join(ROOT, 'icons');
const ICON_SIZES = [16, 32, 48, 128];

async function renderSvgToPng(page, svgMarkup, size, outputPath) {
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(`<!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <style>
          html, body {
            width: 100%;
            height: 100%;
            margin: 0;
            overflow: hidden;
            background: transparent;
          }

          body {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          svg {
            width: ${size}px;
            height: ${size}px;
            display: block;
          }
        </style>
      </head>
      <body>${svgMarkup}</body>
    </html>`);

  const svg = page.locator('svg');
  await svg.screenshot({ path: outputPath, omitBackground: true });
}

async function main() {
  const svgMarkup = await fs.readFile(ICON_SOURCE, 'utf8');
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 128, height: 128 }, deviceScaleFactor: 1 });

  try {
    for (const size of ICON_SIZES) {
      const outputPath = path.join(OUTPUT_DIR, `icon-${size}.png`);
      await renderSvgToPng(page, svgMarkup, size, outputPath);
      console.log(`generated ${path.relative(ROOT, outputPath)}`);
    }
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
