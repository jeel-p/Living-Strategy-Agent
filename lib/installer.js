'use strict';

const fs = require('fs');
const path = require('path');
const paths = require('./paths');

const SKILL_FILES = require('./verifier').SKILL_FILES;

function listSkillFiles(skillDir) {
  if (!paths.pathExists(skillDir) || !paths.isDirectory(skillDir)) return [];
  return fs.readdirSync(skillDir).filter((f) => {
    const p = path.join(skillDir, f);
    return fs.statSync(p).isFile();
  });
}

/**
 * Returns { conflict: boolean, existingFiles: string[] }
 */
function detectConflicts(destSkillDir) {
  const existing = [];
  if (!paths.pathExists(destSkillDir)) {
    return { conflict: false, existingFiles: existing };
  }
  for (const f of SKILL_FILES) {
    const p = path.join(destSkillDir, f);
    if (paths.pathExists(p) && fs.statSync(p).isFile()) {
      existing.push(f);
    }
  }
  return { conflict: existing.length > 0, existingFiles: existing };
}

/**
 * Copy skill directory from package to destination.
 * @returns {{ copied: string[], destSkillDir: string }}
 */
function copySkillTree({ packageRoot, destRoot, dryRun, force }) {
  const src = paths.getSkillSourceDir(packageRoot);
  const destSkillDir = paths.getSkillDestDir(destRoot);

  if (!paths.pathExists(src) || !paths.isDirectory(src)) {
    throw new Error(`Skill source missing: ${src}`);
  }

  const { conflict, existingFiles } = detectConflicts(destSkillDir);
  if (conflict && !force) {
    const e = new Error('CONFLICT');
    e.existingFiles = existingFiles;
    e.destSkillDir = destSkillDir;
    throw e;
  }

  const files = listSkillFiles(src);
  const copied = [];

  if (dryRun) {
    for (const f of files) {
      copied.push(path.join(paths.SKILL_SUBDIR.replace(/\//g, path.sep), f));
    }
    return { copied, destSkillDir };
  }

  fs.mkdirSync(path.dirname(destSkillDir), { recursive: true });
  if (!paths.pathExists(destSkillDir)) {
    fs.mkdirSync(destSkillDir, { recursive: true });
  }

  fs.cpSync(src, destSkillDir, { recursive: true, force: Boolean(force) });
  for (const f of listSkillFiles(destSkillDir)) {
    copied.push(path.join(paths.SKILL_SUBDIR.replace(/\//g, path.sep), f));
  }
  return { copied, destSkillDir };
}

/**
 * Export bundle: dist/living-strategy-agent/ with skill subtree + skill.json + CLAUDE.md
 */
function exportBundle({ packageRoot, outDir, dryRun, logger }) {
  const resolvedOut = path.resolve(outDir);
  const skillDest = path.join(resolvedOut, '.claude', 'skills', 'living-strategy-agent');
  const copied = [];

  if (dryRun) {
    const src = paths.getSkillSourceDir(packageRoot);
    const files = listSkillFiles(src);
    for (const f of files) {
      copied.push(path.join('.claude/skills/living-strategy-agent', f));
    }
    copied.push('skill.json');
    copied.push('CLAUDE.md');
    return { copied, outDir: resolvedOut };
  }

  fs.mkdirSync(skillDest, { recursive: true });
  fs.cpSync(paths.getSkillSourceDir(packageRoot), skillDest, { recursive: true, force: true });

  for (const f of ['skill.json', 'CLAUDE.md']) {
    const from = path.join(packageRoot, f);
    if (paths.pathExists(from)) {
      fs.copyFileSync(from, path.join(resolvedOut, f));
      copied.push(f);
    }
  }
  for (const f of listSkillFiles(skillDest)) {
    copied.push(path.join('.claude/skills/living-strategy-agent', f));
  }

  return { copied, outDir: resolvedOut };
}

module.exports = {
  copySkillTree,
  exportBundle,
  detectConflicts,
  listSkillFiles,
};
