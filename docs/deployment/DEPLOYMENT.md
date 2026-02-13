# GetThingsDone — Deployment Guide

> **Last Updated:** February 10, 2026
> **Server:** Linux (CentOS/RHEL)
> **App Path:** `/data1/wwwroot/html/videocopilot`
> **Process Manager:** PM2 (app name: `getthingsdone`)
> **Node Version:** v20.20.0 (via nvm)
> **Repo:** `https://github.com/LIKITHFORAI/videocopilot2.0`

---

## Prerequisites

| Requirement       | Details                                              |
|--------------------|------------------------------------------------------|
| **Node.js**        | v20.20.0 (installed via nvm at `/root/.nvm/...`)     |
| **PM2**            | Global process manager (`npm i -g pm2`)              |
| **FFmpeg**         | Required for video compression & audio extraction    |
| **SQLite**         | `better-sqlite3` (bundled, no separate install)      |
| **Git**            | For pulling code updates                             |
| **Apache/Nginx**   | Reverse proxy serving `/getthingsdone/` → port 3000  |

---

## Environment Variables

These must exist in `.env.local` (or `.env.production`) in the app directory **before** building:

```env
# Azure AD Authentication
NEXT_PUBLIC_AZURE_AD_CLIENT_ID=<your-client-id>
NEXT_PUBLIC_AZURE_AD_TENANT_ID=<your-tenant-id>

# Base Path (must match Apache/Nginx proxy path)
NEXT_PUBLIC_BASEPATH=/getthingsdone

# Azure OpenAI (Whisper transcription & GPT summarization)
AZURE_OPENAI_API_KEY=<your-key>
AZURE_OPENAI_ENDPOINT=<your-endpoint>
AZURE_OPENAI_DEPLOYMENT=<deployment-name>
AZURE_WHISPER_ENDPOINT=<whisper-endpoint>
AZURE_WHISPER_API_KEY=<whisper-key>
AZURE_WHISPER_DEPLOYMENT=<whisper-deployment>

# Google Gemini (optional, for vision features)
GEMINI_API_KEY=<your-key>
```

> [!CAUTION]
> `NEXT_PUBLIC_BASEPATH` is **baked into the JavaScript bundle at build time**.
> If you change it, you **must rebuild** (`npm run build`).

---

## Standard Deployment (Code Update)

Use this when pulling new code changes from GitHub.

### Step 1 — Pull Latest Code

```bash
sudo bash -c 'cd /data1/wwwroot/html/videocopilot && git pull'
```

### Step 2 — Build & Restart

```bash
sudo -H bash -lc 'export PATH=/root/.nvm/versions/node/v20.20.0/bin:$PATH && cd /data1/wwwroot/html/videocopilot && npm run build && pm2 restart getthingsdone'
```

### Step 3 — Verify

```bash
sudo -H bash -lc 'export PATH=/root/.nvm/versions/node/v20.20.0/bin:$PATH && pm2 status getthingsdone'
```

Expected output: `online` status, `0` restarts.

---

## First-Time Setup (Fresh Server)

### 1. Clone the Repository

```bash
cd /data1/wwwroot/html
sudo git clone https://github.com/LIKITHFORAI/videocopilot2.0 videocopilot
cd videocopilot
```

### 2. Install Dependencies

```bash
sudo -H bash -lc 'export PATH=/root/.nvm/versions/node/v20.20.0/bin:$PATH && cd /data1/wwwroot/html/videocopilot && npm install'
```

### 3. Create Environment File

```bash
sudo cp .env.example .env.local
sudo nano .env.local
# Fill in all values listed in the Environment Variables section above
```

### 4. Build the Application

```bash
sudo -H bash -lc 'export PATH=/root/.nvm/versions/node/v20.20.0/bin:$PATH && cd /data1/wwwroot/html/videocopilot && npm run build'
```

### 5. Start with PM2

```bash
sudo -H bash -lc 'export PATH=/root/.nvm/versions/node/v20.20.0/bin:$PATH && cd /data1/wwwroot/html/videocopilot && pm2 start npm --name getthingsdone -- start && pm2 save'
```

### 6. Configure Apache Reverse Proxy

Add this to your Apache virtual host config:

```apache
ProxyPass /getthingsdone/ http://localhost:3000/getthingsdone/
ProxyPassReverse /getthingsdone/ http://localhost:3000/getthingsdone/
```

Then reload Apache:

```bash
sudo systemctl reload httpd
```

---

## Troubleshooting

### Build Fails with SQLITE_ERROR

This was fixed in commit `f1e832a` (lazy DB initialization). If you see this error, ensure you have the latest code (`git pull`).

### Videos Not Playing (SharePoint Imports)

Fixed in commit `7499cd7`. SharePoint imports now auto-download the 360p video to the client's local storage (IndexedDB) upon job completion. Ensure you have this commit deployed.

### Login Redirects to "Forbidden" Page

Ensure `NEXT_PUBLIC_BASEPATH=/getthingsdone` is set in `.env.local` and the app was rebuilt after setting it.

### PM2 Process Not Found

```bash
# List all processes
sudo -H bash -lc 'export PATH=/root/.nvm/versions/node/v20.20.0/bin:$PATH && pm2 list'

# If 'getthingsdone' is missing, start it:
sudo -H bash -lc 'export PATH=/root/.nvm/versions/node/v20.20.0/bin:$PATH && cd /data1/wwwroot/html/videocopilot && pm2 start npm --name getthingsdone -- start && pm2 save'
```

### View Application Logs

```bash
sudo -H bash -lc 'export PATH=/root/.nvm/versions/node/v20.20.0/bin:$PATH && pm2 logs getthingsdone --lines 50'
```

---

## Architecture Summary

```
┌─────────────────────────────────────────────────────┐
│                    Client (Browser)                 │
│  ┌───────────┐  ┌──────────┐  ┌──────────────────┐ │
│  │ IndexedDB │  │  React   │  │  MSAL (Azure AD) │ │
│  │ (Videos)  │  │   UI     │  │  Authentication  │ │
│  └───────────┘  └──────────┘  └──────────────────┘ │
└────────────────────────┬────────────────────────────┘
                         │ HTTPS
┌────────────────────────┴────────────────────────────┐
│                 Server (Next.js API)                │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────┐  │
│  │  SQLite  │  │  FFmpeg  │  │  Azure OpenAI    │  │
│  │ (Metadata│  │ (Video   │  │  (Transcription  │  │
│  │  only)   │  │  Process)│  │   & Summary)     │  │
│  └──────────┘  └──────────┘  └──────────────────┘  │
└─────────────────────────────────────────────────────┘
```

**Key Design Principle:** Videos are stored **only on the client device** that uploaded/imported them. The server stores metadata (transcripts, summaries, action items) only. This means a video uploaded on PC-A will **not** play on PC-B.
