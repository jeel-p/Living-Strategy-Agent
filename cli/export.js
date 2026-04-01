'use strict';

const path = require('path');
const paths = require('../lib/paths');
const installer = require('../lib/installer');
const logger = require('../lib/logger');

function parseArgs(argv) {
  let out = path.join(process.cwd(), 'dist', 'living-strategy-agent');
  let dryRun = false;
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--out' && argv[i + 1]) {
      out = argv[++i];
      continue;
    }
    if (a === '--dry-run') {
      dryRun = true;
      continue;
    }
    if (a.startsWith('-')) {
      throw new Error(`Unknown flag: ${a}`);
    }
  }
  return { out, dryRun };
}

function run(argv) {
  const packageRoot = paths.getPackageRoot();
  try {
    const opts = parseArgs(argv);
    const resolved = path.resolve(opts.out);

    if (opts.dryRun) {
      logger.info(`Dry run: would write export bundle to: ${resolved}`);
    }

    const { copied, outDir } = installer.exportBundle({
      packageRoot,
      outDir: resolved,
      dryRun: opts.dryRun,
    });

    if (opts.dryRun) {
      logger.ok('Would include:');
      copied.forEach((c) => logger.line(`  ${c}`));
      return 0;
    }

    logger.ok(`Export written to: ${outDir}`);
    copied.forEach((c) => logger.line(`  ${c}`));
    return 0;
  } catch (e) {
    logger.error(e.message || String(e));
    return 1;
  }
}

module.exports = { run, parseArgs };
