'use strict';

const readline = require('readline');
const path = require('path');
const paths = require('../lib/paths');
const installer = require('../lib/installer');
const logger = require('../lib/logger');

function parseArgs(argv) {
  const out = {
    target: process.cwd(),
    force: false,
    dryRun: false,
    mode: 'project',
    out: null,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--target' && argv[i + 1]) {
      out.target = argv[++i];
      continue;
    }
    if (a === '--out' && argv[i + 1]) {
      out.out = argv[++i];
      continue;
    }
    if (a === '--force') {
      out.force = true;
      continue;
    }
    if (a === '--dry-run') {
      out.dryRun = true;
      continue;
    }
    if (a === '--mode' && argv[i + 1]) {
      const m = argv[++i];
      if (m !== 'project' && m !== 'export') {
        throw new Error(`Invalid --mode: ${m} (use project or export)`);
      }
      out.mode = m;
      continue;
    }
    if (a.startsWith('-')) {
      throw new Error(`Unknown flag: ${a}`);
    }
  }
  return out;
}

async function promptOverwrite(destSkillDir, files) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(
      `Files already exist in ${destSkillDir}: ${files.join(', ')}. Overwrite? [y/N] `,
      (answer) => {
        rl.close();
        resolve(/^y(es)?$/i.test((answer || '').trim()));
      },
    );
  });
}

async function run(argv) {
  const packageRoot = paths.getPackageRoot();
  const opts = parseArgs(argv);

  if (opts.mode === 'export') {
    const exportCli = require('./export.js');
    const outDir = opts.out || path.join(path.resolve(opts.target), 'dist', 'living-strategy-agent');
    return exportCli.run(['--out', outDir].concat(opts.dryRun ? ['--dry-run'] : []));
  }

  const destRoot = path.resolve(opts.target);

  try {
    if (opts.dryRun) {
      logger.info(`Dry run: would install skill into: ${path.join(destRoot, paths.SKILL_SUBDIR)}`);
    }

    let force = opts.force;
    const { copySkillTree } = installer;

    try {
      const result = copySkillTree({
        packageRoot,
        destRoot,
        dryRun: opts.dryRun,
        force,
      });

      if (opts.dryRun) {
        logger.ok('Would copy:');
        result.copied.forEach((c) => logger.line(`  ${c}`));
        return 0;
      }

      logger.ok(`Installed skill to: ${result.destSkillDir}`);
      result.copied.forEach((c) => logger.line(`  copied: ${c}`));
      return 0;
    } catch (e) {
      if (e.message === 'CONFLICT' && e.existingFiles && e.destSkillDir) {
        if (process.stdin.isTTY && !opts.force) {
          const yes = await promptOverwrite(e.destSkillDir, e.existingFiles);
          if (!yes) {
            logger.warn('Install aborted. Use --force to overwrite without prompting.');
            return 1;
          }
          const result = copySkillTree({
            packageRoot,
            destRoot,
            dryRun: false,
            force: true,
          });
          logger.ok(`Installed skill to: ${result.destSkillDir}`);
          result.copied.forEach((c) => logger.line(`  copied: ${c}`));
          return 0;
        }
        logger.error(`Refusing to overwrite existing files: ${e.existingFiles.join(', ')}`);
        logger.info(`Destination: ${e.destSkillDir}`);
        logger.info('Re-run with --force or remove/rename the existing skill folder.');
        return 1;
      }
      throw e;
    }
  } catch (e) {
    logger.error(e.message || String(e));
    return 1;
  }
}

module.exports = { run, parseArgs };
