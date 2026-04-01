'use strict';

const path = require('path');
const fs = require('fs');

/** Skill files live under this relative path inside the npm package / git repo. */
const SKILL_SUBDIR = path.join('.claude', 'skills', 'living-strategy-agent');

/**
 * Directory containing package.json (repository / package root).
 * Resolved from this file: lib/ -> parent is package root.
 */
function getPackageRoot() {
  return path.resolve(__dirname, '..');
}

function getSkillSourceDir(packageRoot) {
  return path.join(packageRoot, SKILL_SUBDIR);
}

/**
 * Default install destination for project mode: <target>/.claude/skills/living-strategy-agent
 */
function getSkillDestDir(targetRoot) {
  return path.join(path.resolve(targetRoot), SKILL_SUBDIR);
}

function pathExists(p) {
  try {
    fs.accessSync(p);
    return true;
  } catch {
    return false;
  }
}

function isDirectory(p) {
  try {
    return fs.statSync(p).isDirectory();
  } catch {
    return false;
  }
}

module.exports = {
  SKILL_SUBDIR,
  getPackageRoot,
  getSkillSourceDir,
  getSkillDestDir,
  pathExists,
  isDirectory,
};
