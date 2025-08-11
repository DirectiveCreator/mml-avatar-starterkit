# 🧰 MML Avatar Starterkit

Turn prepared avatar GLBs into minimal MML files at scale. Fast. Simple. Creator-friendly.

[![Open Web Tool](https://img.shields.io/badge/Web%20Tool-Generate%20MML%20ZIP-22d3ee?style=for-the-badge)](http://localhost:3000)
[![MML Docs](https://img.shields.io/badge/MML-Docs-4b5563?style=for-the-badge)](https://mml.io/docs)

- 🔹 Minimal per-file output: `<m-character src="..."></m-character>`
- 🧾 Batch generator: Node CLI (txt or csv input) + Simple Web UI (ZIP download)
- 🧭 Guidance: avatar prep links, rigging tools, hosting/CORS tips

This helps with large avatar drops (e.g., 5,555 items) and single creators alike. Make sure each GLB is rigged to the UE5 Epic Skeleton.


## 🚀 Quick Start
- Requirements: Node 18+
- Install dependencies: `npm i`

Run the CLI
- .txt (one URL/line): `node scripts/mml-batch.js --in examples/input-urls.txt --out out`
- .csv (comma-separated): `node scripts/mml-batch.js --in examples/input-urls.csv --out out`
- Inline list: `node scripts/mml-batch.js --urls "https://a.glb,https://b.glb" --out out`
- Options: `--start 1` to change numbering start, `--dry-run` to preview

Run the Web Tool (local)
- `npm run start:web`
- Open http://localhost:3000
- Paste URLs (comma or newline separated) and download a ZIP of 1.mml, 2.mml, ...


## 🌐 Hosting & CORS (GCS example)
To avoid CORS issues, host MML files on the same domain/bucket as the GLBs whenever possible.

Google Cloud Storage works well:
- Upload GLBs and MML files to the same bucket.
- Enable public access as needed, and add a CORS policy.

Permissive CORS for testing (tighten for production):
```json
[
  {
    "origin": ["*"],
    "method": ["*"],
    "responseHeader": ["Content-Type"],
    "maxAgeSeconds": 3600
  }
]
```
For production: restrict `origin` (e.g., ["https://your-site.com"]) and limit `method` to ["GET"].

Other hosts: AWS S3 + CloudFront, Cloudflare R2, static hosts (Netlify/Vercel) for MML files.


## 🧪 What the generator outputs
For each provided GLB URL, a minimal MML file:

```xml
<m-character src="https://example.com/path/to/avatar.glb"></m-character>
```

No validation or extra attributes are added. If you need animation or scaling later, extend the CLI or edit files.


## 🧩 Repository Layout
- `scripts/mml-batch.js` — CLI tool
- `web/server.js` — Express server for the Web UI
- `web/public/index.html` — Minimal web UI (dark mode)
- `examples/input-urls.txt`, `examples/input-urls.csv`
- `out/` — created at runtime (gitignored)
- `package.json`, `.gitignore`, `LICENSE` (The Unlicense)


## 📚 Avatar Prep: Essential Links
- MML docs: https://mml.io/docs
- m-character reference: https://mml.io/docs/reference/elements/m-character
- MML Editor: https://mmleditor.com/
- Avatar tools (open-source): https://github.com/mml-io/avatar-tools
- Directive Creator avatar tester: https://directivecreator.com/avatar
- Blender workflow docs: https://docs.msquared.io/tutorials-and-features/avatars/creating-mml-avatars-with-blender-and-free-rigging-tools
- Video tutorial: https://www.youtube.com/watch?v=0m5xAzhoGkQ


## 🧭 Best Practices
- Rigging: ensure UE5 Epic Skeleton compatibility (see tools above)
- Asset hygiene: combine geometry where needed, remove old skeletons, keep transforms clean
- Optimization (for large drops): DRACO/meshopt, sensible texture sizes, perf test in clients


## 🗺️ Roadmap
- Optional URL/MIME checks behind a flag
- Optional `anim` attribute support
- Publish CLI on npm and deploy the Web Tool to Render


## 📄 License
Public domain under The Unlicense. See `LICENSE`.
