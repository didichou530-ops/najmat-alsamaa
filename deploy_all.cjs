#!/usr/bin/env node
/**
 * نشر موحَّد — يبني مرة واحدة وينشر على الرابطين المجانيين معاً:
 *   1) Netlify  : https://najmatalsamaa.netlify.app/   (الرابط الرسمي)
 *   2) GitHub   : https://didichou530-ops.github.io/   (نسخة احتياطية دائمة)
 *
 * الاستعمال:  node deploy_all.cjs
 * يحتاج Netlify: تسجيل دخول سابق (`npx netlify login`) أو متغيّر NETLIFY_AUTH_TOKEN.
 */
const {execSync} = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = __dirname;

// تحميل .env المحلي إن وُجد (يحتوي NETLIFY_AUTH_TOKEN) — الملف مستثنى من git
try {
  const envFile = path.join(ROOT, '.env');
  if (fs.existsSync(envFile)) {
    for (const line of fs.readFileSync(envFile, 'utf8').split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  }
} catch {
  /* ignore */
}

const OUT = path.join(ROOT, 'dist-root');
const SITE = process.env.NETLIFY_SITE_ID || '46dc668d-9828-40ac-91b4-1987d9178bf2'; // najmatalsamaa
const REMOTE = 'https://github.com/didichou530-ops/didichou530-ops.github.io.git';

const run = (cmd, cwd = ROOT) => execSync(cmd, {cwd, stdio: 'inherit'});
const tryRun = (cmd, cwd = ROOT) => {
  try {
    execSync(cmd, {cwd, stdio: 'pipe'});
    return true;
  } catch {
    return false;
  }
};

console.log('▸ 1/3 بناء النسخة الجذرية (base = /) …');
run(`npx vite build --base=/ --outDir="${OUT}" --emptyOutDir`);

console.log('▸ 2/3 نشر Netlify …');
run(`npx netlify deploy --prod --dir="${OUT}" --site=${SITE}`);

console.log('▸ 3/3 نشر GitHub Pages (نسخة احتياطية) …');
if (!fs.existsSync(path.join(OUT, '.git'))) {
  run('git init -b main', OUT);
  run('git config user.name "didichou530-ops"', OUT);
  run('git config user.email "didichou530-ops@users.noreply.github.com"', OUT);
  run(`git remote add origin ${REMOTE}`, OUT);
}
run('git add -A', OUT);
const dirty = !tryRun('git diff --cached --quiet', OUT);
if (dirty) {
  const stamp = new Date().toISOString().slice(0, 16).replace('T', ' ');
  run(`git commit -m "deploy: sync ${stamp}"`, OUT);
  run('git push origin main', OUT);
} else {
  console.log('  (لا تغييرات — GitHub محدَّث أصلاً)');
}

console.log('\n✓ الرابطان محدَّثان:');
console.log('   https://najmatalsamaa.netlify.app/');
console.log('   https://didichou530-ops.github.io/');
