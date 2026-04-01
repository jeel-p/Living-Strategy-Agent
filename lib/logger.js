'use strict';

const { EOL } = require('os');

function write(stream, label, msg) {
  stream.write(`[${label}] ${msg}${EOL}`);
}

module.exports = {
  info: (msg) => write(process.stdout, 'living-strategy-agent', msg),
  ok: (msg) => write(process.stdout, 'ok', msg),
  warn: (msg) => write(process.stderr, 'warn', msg),
  error: (msg) => write(process.stderr, 'error', msg),
  line: (msg = '') => process.stdout.write(`${msg}${EOL}`),
  raw: (msg) => process.stdout.write(msg),
};
