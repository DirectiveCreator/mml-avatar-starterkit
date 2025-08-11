# 🧰 MML Avatar Starterkit

Quick small vibe-coded tool to help with large avatar drops, just make sure each GLB is rigged to the UE5 Epic Skeleton specifications.

[![Open Web Tool](https://img.shields.io/badge/Web%20Tool-Generate%20MML%20ZIP-22d3ee?style=for-the-badge)](https://mml-avatar-starterkit.onrender.com/) [![MML Docs](https://img.shields.io/badge/MML-Docs-4b5563?style=for-the-badge)](https://mml.io/docs)



## 📚 Avatar Prep: Useful Links
- [MML Documentation](https://mml.io/docs)
- [M-Character Reference](https://mml.io/docs/reference/elements/m-character)
- [MML Editor](https://mmleditor.com/)
- [Awesome MML (curated list)](https://github.com/DirectiveCreator/awesome-mml)
- [Avatar Tools (open-source)](https://github.com/mml-io/avatar-tools)
- [Avatar Tools (online tool)](https://directivecreator.com/avatar)
- [Further MML avatar creation resources](https://directivecreator.com/mml/avatar-tutorial)
- [Blender workflow docs](https://docs.msquared.io/tutorials-and-features/avatars/creating-mml-avatars-with-blender-and-free-rigging-tools)
- [Video tutorial](https://www.youtube.com/watch?v=0m5xAzhoGkQ)


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
- Enable public access as needed, and add a CORS policy in accordance with your own security requirements.
Other hosts: AWS S3 + CloudFront, Cloudflare R2, static hosts (Netlify/Vercel) for MML files.


## 🧪 What the generator outputs
For each provided GLB URL, a minimal MML file:

```xml
<m-character src="https://example.com/path/to/avatar.glb"></m-character>
```



## 📄 License
Public domain under The Unlicense. See `LICENSE`.
