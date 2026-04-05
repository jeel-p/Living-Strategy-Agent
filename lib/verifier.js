'use strict';

const fs = require('fs');
const path = require('path');
const paths = require('./paths');
const { pathExists, isDirectory } = paths;

/** Files required under each `.claude/skills/<name>/` directory */
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

function listSkillSubdirs(skillsRoot) {
  if (!pathExists(skillsRoot) || !isDirectory(skillsRoot)) return [];
  return fs
    .readdirSync(skillsRoot, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name);
}

function checkSkillDir(skillDir, labelPrefix) {
  const results = [];
  let allOk = true;
  for (const f of SKILL_FILES) {
    const p = path.join(skillDir, f);
    const ok = pathExists(p) && fs.statSync(p).isFile();
    results.push({ file: path.join(labelPrefix, f), ok });
    if (!ok) allOk = false;
  }
  return { ok: allOk, checks: results };
}

function verifyPackageRoot(root) {
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

  const skillsRoot = path.join(root, '.claude', 'skills');
  const subdirs = listSkillSubdirs(skillsRoot);
  if (subdirs.length === 0) {
    out.ok = false;
    out.checks.push({ file: '.claude/skills/', ok: false });
  }
  for (const name of subdirs) {
    const dir = path.join(skillsRoot, name);
    const label = path.join('.claude', 'skills', name);
    const skill = checkSkillDir(dir, label);
    out.checks.push(...skill.checks);
    if (!skill.ok) out.ok = false;
  }

  return out;
}

function verifyTargetProject(targetRoot) {
  const out = { ok: true, label: 'target', root: path.resolve(targetRoot), checks: [] };

  if (!pathExists(targetRoot) || !isDirectory(targetRoot)) {
    return { ok: false, label: 'target', root: targetRoot, error: 'Target does not exist or is not a directory', checks: [] };
  }

  const skillsRoot = path.join(targetRoot, '.claude', 'skills');
  const subdirs = listSkillSubdirs(skillsRoot);
  if (subdirs.length === 0) {
    out.ok = false;
    out.checks.push({ file: path.join('.claude', 'skills'), ok: false });
    return out;
  }
  for (const name of subdirs) {
    const dir = path.join(skillsRoot, name);
    const label = path.join('.claude', 'skills', name);
    const skill = checkSkillDir(dir, label);
    out.checks.push(...skill.checks);
    if (!skill.ok) out.ok = false;
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
  listSkillSubdirs,
};
