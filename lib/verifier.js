'use strict';

const fs = require('fs');
const path = require('path');
const paths = require('./paths');
const { getSkillSourceDir, pathExists, isDirectory } = paths;

/** Files required under .claude/skills/living-strategy-agent/ */
const SKILL_FILES = [
  'SKILL.md',
  'examples.md',
  'inputs.md',
  'outputs.md',
  'install.md',
  'troubleshooting.md',
];

/** Root-level files required for a full repo verification */
const ROOT_FILES = ['skill.json', 'CLAUDE.md', 'package.json'];

function checkSkillDir(skillDir) {
  const results = [];
  let allOk = true;
  for (const f of SKILL_FILES) {
    const p = path.join(skillDir, f);
    const ok = pathExists(p) && fs.statSync(p).isFile();
    results.push({ file: path.join('.claude/skills/living-strategy-agent', f), ok });
    if (!ok) allOk = false;
  }
  return { ok: allOk, checks: results };
}

function verifyPackageRoot(root) {
  const skillDir = getSkillSourceDir(root);
  const out = { ok: true, label: 'package', root, checks: [] };

  if (!pathExists(root) || !isDirectory(root)) {
    return { ok: false, label: 'package', root, error: 'Root path does not exist or is not a directory', checks: [] };
  }

  for (const f of ROOT_FILES) {
    const p = path.join(root, f);
    const ok = pathExists(p) && fs.statSync(p).isFile();
    out.checks.push({ file: f, ok });
    if (!ok) out.ok = false;
  }

  const skill = checkSkillDir(skillDir);
  out.checks.push(
    ...skill.checks.map((c) => ({
      file: c.file,
      ok: c.ok,
    })),
  );
  if (!skill.ok) out.ok = false;

  if (!pathExists(skillDir) || !isDirectory(skillDir)) {
    out.ok = false;
    out.checks.push({ file: '.claude/skills/living-strategy-agent/', ok: false });
  }

  return out;
}

function verifyTargetProject(targetRoot) {
  const skillDir = getSkillSourceDir(targetRoot);
  const out = { ok: true, label: 'target', root: path.resolve(targetRoot), checks: [] };

  if (!pathExists(targetRoot) || !isDirectory(targetRoot)) {
    return { ok: false, label: 'target', root: targetRoot, error: 'Target does not exist or is not a directory', checks: [] };
  }

  const skill = checkSkillDir(skillDir);
  out.checks.push(...skill.checks);
  if (!skill.ok) out.ok = false;

  if (!pathExists(skillDir) || !isDirectory(skillDir)) {
    out.ok = false;
  }

  return out;
}

function verifyThisPackage() {
  return verifyPackageRoot(paths.getPackageRoot());
}

module.exports = {
  SKILL_FILES,
  ROOT_FILES,
  verifyPackageRoot,
  verifyTargetProject,
  verifyThisPackage,
  checkSkillDir,
};
