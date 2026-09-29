# Video Downloader

A clean Next.js interface for preparing downloads of media you own or have permission to save.

## Current status

Version 0.1 includes:
- YouTube URL validation
- Responsive mobile/desktop interface
- MP4 choices: 360p, 720p, 1080p
- MP3 option
- Next.js API route with request validation

The media-processing backend is intentionally not enabled yet. The next step is to connect a server environment with `yt-dlp` and FFmpeg.

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Architecture

```
Browser -> Next.js UI -> /api/download -> media processing service -> file
```

For production, keep the web UI deployable separately from long-running media processing.

## Responsible use

Use this project only for media you own, have permission to download, or that is otherwise offered under terms that permit downloading. Do not use it to bypass DRM or access controls.
