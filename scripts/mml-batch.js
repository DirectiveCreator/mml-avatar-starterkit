#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = { in: null, urls: null, out: 'out', start: 1, dryRun: false };
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === '--in') { opts.in = args[++i]; }
    else if (a === '--urls') { opts.urls = args[++i]; }
    else if (a === '--out') { opts.out = args[++i]; }
    else if (a === '--start') { opts.start = parseInt(args[++i], 10) || 1; }
    else if (a === '--dry-run') { opts.dryRun = true; }
    else if (a === '--help' || a === '-h') {
      console.log(`\nMML Batch Generator\n\nUsage:\n  node scripts/mml-batch.js --in input.txt --out out\n  node scripts/mml-batch.js --in input.csv --out out\n  node scripts/mml-batch.js --urls "https://a.glb,https://b.glb" --out out\n\nOptions:\n  --in <path>     Input file (.txt line-delimited or .csv comma-separated)\n  --urls <list>   Comma-separated URLs inline\n  --out <dir>     Output directory (default: out)\n  --start <n>     Start index (default: 1, filenames: n.mml, n+1.mml, ...)\n  --dry-run       Print actions without writing files\n`);
      process.exit(0);
    }
  }
  return opts;
}

function readInputFile(p) {
  const raw = fs.readFileSync(p, 'utf8');
  const isCsv = p.toLowerCase().endsWith('.csv');
  if (isCsv) {
    const tokens = raw.split(/[\n,]+/);
    return tokens.map(s => s.trim()).filter(Boolean);
  }
  // default .txt: one URL per line
  return raw.split(/\n+/).map(s => s.trim()).filter(Boolean);
}

function parseInlineUrls(s) {
  return s.split(',').map(x => x.trim()).filter(Boolean);
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function mmlFor(url) {
  // Minimal block form with explicit closing tag for clarity
  return `<m-character src="${url}"></m-character>`;
}

function main() {
  const opts = parseArgs();
  let urls = [];
  if (opts.in) urls = readInputFile(opts.in);
  if (opts.urls) urls = urls.concat(parseInlineUrls(opts.urls));
  urls = urls.filter(Boolean);

  if (urls.length === 0) {
    console.error('No URLs provided. Use --in <file> or --urls "a,b".');
    process.exit(1);
  }

  if (!opts.dryRun) ensureDir(opts.out);

  let index = opts.start;
  let written = 0;
  for (const u of urls) {
    const name = `${index}.mml`;
    const dest = path.join(opts.out, name);
    const content = mmlFor(u);
    if (opts.dryRun) {
      console.log(`[dry-run] would write ${dest}`);
    } else {
      fs.writeFileSync(dest, content, 'utf8');
      console.log(`wrote ${dest}`);
    }
    index++;
    written++;
  }

  console.log(`Done. ${written} file(s) ${opts.dryRun ? 'planned' : 'created'} in ${opts.out}`);
}

main();

