'use strict';

/**
 * Refreshes `openclaw/<skill>/` from each folder under `.claude/skills/`.
 * For `living-strategy-agent`, overlays the repo-root `skill.json` (package metadata).
 * Copies `CLAUDE.md` and `LICENSE` into `openclaw/` once (shared).
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const skillsRoot = path.join(root, '.claude', 'skills');
const openclawRoot = path.join(root, 'openclaw');

function listSkillSubdirs() {
  if (!fs.existsSync(skillsRoot) || !fs.statSync(skillsRoot).isDirectory()) {
    return [];
  }
  return fs
    .readdirSync(skillsRoot, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name);
}

const subdirs = listSkillSubdirs();
if (subdirs.length === 0) {
  console.error('No skills under:', skillsRoot);
  process.exit(1);
}

fs.mkdirSync(openclawRoot, { recursive: true });

for (const name of subdirs) {
  const src = path.join(skillsRoot, name);
  const dest = path.join(openclawRoot, name);
  fs.mkdirSync(dest, { recursive: true });
  fs.cpSync(src, dest, { recursive: true, force: true });
  if (name === 'living-strategy-agent') {
    const pkgSkill = path.join(root, 'skill.json');
    if (fs.existsSync(pkgSkill)) {
      fs.copyFileSync(pkgSkill, path.join(dest, 'skill.json'));
    }
  }
}

for (const f of ['CLAUDE.md', 'LICENSE']) {
  const from = path.join(root, f);
  if (fs.existsSync(from)) {
    fs.copyFileSync(from, path.join(openclawRoot, f));
  }
}

console.log('sync:openclaw ok —', subdirs.map((n) => path.join('openclaw', n)).join(', '));
