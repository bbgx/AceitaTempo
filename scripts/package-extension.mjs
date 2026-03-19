import fs from 'fs';
import fsp from 'fs/promises';
import path from 'path';
import { spawnSync } from 'child_process';

const ROOT = process.cwd();
const DIST_DIR = path.join(ROOT, 'dist');
const STAGING_DIR = path.join(DIST_DIR, 'aceita-tempo');
const ZIP_PATH = path.join(DIST_DIR, 'aceita-tempo.zip');

const FILES = [
  'manifest.json',
  'background.js',
  'options.html',
  'options.css',
  'options.js',
  'popup.html',
  'popup.css',
  'popup.js',
  'src/price-utils.js',
  'src/site-config.js',
  'src/content.js',
  'icons',
  '_locales',
];

async function copyEntry(source, destination) {
  const stat = await fsp.stat(source);
  if (stat.isDirectory()) {
    await fsp.mkdir(destination, { recursive: true });
    for (const entry of await fsp.readdir(source)) {
      await copyEntry(path.join(source, entry), path.join(destination, entry));
    }
    return;
  }

  await fsp.mkdir(path.dirname(destination), { recursive: true });
  await fsp.copyFile(source, destination);
}

async function cleanDir(target) {
  await fsp.rm(target, { recursive: true, force: true });
  await fsp.mkdir(target, { recursive: true });
}

async function main() {
  await cleanDir(STAGING_DIR);
  await fsp.rm(ZIP_PATH, { force: true });

  for (const relative of FILES) {
    const source = path.join(ROOT, relative);
    const destination = path.join(STAGING_DIR, relative);
    await copyEntry(source, destination);
  }

  const result = spawnSync('powershell', [
    '-NoProfile',
    '-Command',
    `$ErrorActionPreference = 'Stop'; Compress-Archive -Path (Join-Path '${STAGING_DIR.replace(/'/g, "''")}' '*') -DestinationPath '${ZIP_PATH.replace(/'/g, "''")}' -Force`,
  ], {
    stdio: 'inherit',
    shell: false,
  });

  if (result.status !== 0) {
    throw new Error('Compress-Archive failed');
  }

  console.log(`created ${path.relative(ROOT, ZIP_PATH)}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
