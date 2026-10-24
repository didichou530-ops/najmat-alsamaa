#!/usr/bin/env node
/**
 * نشر واجهة نجمة السماء على "النطاق الأصلي" لحساب GitHub:
 *   https://didichou530-ops.github.io/
 *
 * يبني نسخة Vite بمسار جذري (base = "/") داخل مجلد dist-root،
 * ثم يدفعها إلى مستودع didichou530-ops.github.io (فرع main).
 *
 * الاستعمال:  node deploy_root.cjs
 *
 * ملاحظة: النسخة القديمة https://didichou530-ops.github.io/najmat-alsamaa/
 * تُنشر كما هو معتاد من dist/ إلى فرع gh-pages في مستودع najmat-alsamaa.
 */
const {execSync} = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = __dirname;
const OUT = path.join(ROOT, 'dist-root');
const REMOTE = 'https://github.com/didichou530-ops/didichou530-ops.github.io.git';

function run(cmd, cwd = ROOT) {
  return execSync(cmd, {cwd, stdio: 'inherit'});
}

console.log('▸ بناء النسخة الجذرية (base = /) …');
run(`npx vite build --base=/ --outDir="${OUT}" --emptyOutDir`);

if (!fs.existsSync(path.join(OUT, '.git'))) {
  console.log('▸ تهيئة مستودع النشر في dist-root …');
  run('git init -b main', OUT);
  run('git config user.name "didichou530-ops"', OUT);
  run('git config user.email "didichou530-ops@users.noreply.github.com"', OUT);
  run(`git remote add origin ${REMOTE}`, OUT);
}

run('git add -A', OUT);

let dirty = true;
try {
  execSync('git diff --cached --quiet', {cwd: OUT});
  dirty = false;
} catch {
  dirty = true;
}

if (!dirty) {
  console.log('✓ لا تغييرات جديدة — النطاق الأصلي محدَّث أصلاً.');
  process.exit(0);
}

const stamp = new Date().toISOString().slice(0, 16).replace('T', ' ');
run(`git commit -m "deploy: root domain build ${stamp}"`, OUT);
console.log('▸ رفع إلى GitHub Pages …');
run('git push origin main', OUT);
console.log('✓ تم النشر: https://didichou530-ops.github.io/');
