import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import archiver from 'archiver';
import stream from 'stream';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname, 'public')));

function parseRawList(raw) {
  if (!raw) return [];
  const tokens = raw.split(/[\n,]+/).map(s => s.trim()).filter(Boolean);
  return tokens;
}

function mmlFor(url) {
  return `<m-character src="${url}"></m-character>`;
}

app.post('/api/generate', async (req, res) => {
  try {
    const { raw } = req.body || {};
    const urls = parseRawList(raw);
    if (!urls.length) {
      return res.status(400).json({ error: 'No URLs provided' });
    }

    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename="mml-batch.zip"');

    const archive = archiver('zip', { zlib: { level: 9 } });
    archive.on('error', (err) => { throw err; });
    archive.pipe(res);

    let index = 1;
    for (const u of urls) {
      const content = mmlFor(u);
      archive.append(content, { name: `${index}.mml` });
      index++;
    }

    await archive.finalize();
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to generate zip' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`MML web tool listening on http://localhost:${port}`);
});

