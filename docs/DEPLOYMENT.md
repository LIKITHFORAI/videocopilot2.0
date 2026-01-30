# DrCloudEHR FocusNotes - Deployment Guide

## Project Overview

**DrCloudEHR FocusNotes** is a video analysis and transcription tool designed for healthcare/EHR implementation teams. It processes meeting recordings, generates AI-powered summaries, extracts action items, and provides interactive chat functionality.

---

## Technology Stack

### Frontend
- **Framework**: Next.js 16.1.4 (React 19.2.3)
- **Language**: TypeScript 5
- **Styling**: Vanilla CSS (no framework dependencies)
- **Authentication**: Azure AD via MSAL Browser (v5.0.2)
- **State Management**: React hooks (useState, useRef)

### Backend (API Routes)
- **Runtime**: Next.js API Routes (Node.js)
- **Media Processing**: FFmpeg (fluent-ffmpeg v2.1.3)
- **AI Services**:
  - Azure OpenAI Whisper (transcription)
  - Azure OpenAI GPT-4 (summaries, chat, action items)
- **File Storage**: Local filesystem (`data/` directory)

### External Dependencies
- **FFmpeg**: Required system dependency for video/audio processing
- **Node.js**: v20+ recommended
- **npm**: Package manager

---

## Architecture & Data Flow

### 1. **Upload & Processing Pipeline**

```
User Upload → Video Storage → FFmpeg Processing → Transcription → AI Analysis → Results
```

#### Detailed Steps:
1. **Upload** (5-10 seconds)
   - User uploads video file or selects from SharePoint
   - File saved to `data/uploads/{mediaId}/`
   - Original filename preserved

2. **Video Encoding** (15-20% of processing time)
   - FFmpeg re-encodes to 360p (640x360)
   - Reduces file size by 85-95%
   - Output: `video_360p.mp4` (~10MB for 30min video)

3. **Audio Extraction** (5-10% of processing time)
   - Extract audio as MP3 at 128kbps
   - Output: `audio_master.mp3`

4. **Audio Chunking** (5% of processing time)
   - Split audio into ~21-minute chunks (20MB each)
   - Stored in `data/uploads/{mediaId}/chunks/`
   - **Chunks are deleted after transcription**

5. **Transcription** (50-60% of processing time)
   - Azure OpenAI Whisper API
   - Processes each chunk sequentially
   - Returns timestamped segments

6. **AI Generation** (10-15% of processing time)
   - Summary generation (parallel)
   - Action items extraction (parallel)
   - Both use Azure OpenAI GPT-4

7. **Cleanup**
   - Delete audio chunks
   - Keep: original video, `video_360p.mp4`, `audio_master.mp3`
   - Save: `transcript.json`, action items cache

---

## Data Storage Details

### What is Stored Permanently

| Data Type | Location | Size (approx.) | Purpose |
|-----------|----------|----------------|---------|
| Original video | `data/uploads/{mediaId}/` | Variable | User upload |
| 360p video | `data/uploads/{mediaId}/video_360p.mp4` | ~10MB/30min | Playback |
| Master audio | `data/uploads/{mediaId}/audio_master.mp3` | ~30MB/30min | Backup |
| Transcript | `data/transcripts/{mediaId}.json` | ~100KB | Full transcript + metadata |
| Action items | `data/action-items/{mediaId}.json` | ~2KB | Cached action items |
| Job metadata | `data/jobs/{jobId}.json` | ~1KB | Processing status |

### What is NOT Stored (Temporary)

| Data Type | Lifecycle | Reason |
|-----------|-----------|--------|
| Audio chunks | Deleted after transcription | No longer needed |
| Upload progress | Memory only | Real-time status |
| Chat history | Memory only (per session) | Privacy |
| SharePoint tokens | Memory only | Security |

### Disk Space Estimates

**Per 30-minute video:**
- Upload: ~50-200MB (original)
- After processing: ~40-50MB (360p + audio + transcript)
- **Total saved per video:** ~40-50MB

**For 100 videos:**
- Approximate storage: **4-5GB**

**For 1000 videos:**
- Approximate storage: **40-50GB**

---

## Environment Variables (.env.local)

### Required for Production

```bash
# Azure OpenAI - Whisper (Transcription)
AZURE_OPENAI_WHISPER_ENDPOINT=https://your-resource.openai.azure.com
AZURE_OPENAI_WHISPER_API_KEY=your-whisper-key
AZURE_WHISPER_DEPLOYMENT=whisper-deployment-name
AZURE_OPENAI_WHISPER_API_VERSION=2024-06-01

# Azure OpenAI - GPT (Chat/Summaries)
AZURE_OPENAI_CHAT_ENDPOINT=https://your-resource.openai.azure.com
AZURE_OPENAI_CHAT_API_KEY=your-gpt-key
AZURE_CHAT_DEPLOYMENT=gpt-deployment-name
AZURE_OPENAI_CHAT_API_VERSION=2025-01-01-preview

# Azure AD (Authentication)
AZURE_AD_CLIENT_ID=your-client-id
AZURE_AD_CLIENT_SECRET=your-client-secret
AZURE_AD_TENANT_ID=your-tenant-id

# Public (Browser-accessible)
NEXT_PUBLIC_AZURE_AD_CLIENT_ID=your-client-id
NEXT_PUBLIC_AZURE_AD_TENANT_ID=your-tenant-id

# Optional: Bypass auth for testing
NEXT_PUBLIC_BYPASS_AUTH=false
```

---

## System Requirements

### Development Environment
- **Node.js**: v20 or higher
- **FFmpeg**: Must be installed and in PATH
- **RAM**: 4GB minimum (8GB recommended)
- **Disk**: 10GB free space minimum

### Production Environment
- **Node.js**: v20 or higher
- **FFmpeg**: System-wide installation
- **RAM**: 8GB minimum (16GB recommended for concurrent processing)
- **CPU**: Multi-core recommended (video encoding is CPU-intensive)
- **Disk**: 50GB+ depending on video volume
- **Network**: High bandwidth for Azure OpenAI API calls

### FFmpeg Installation

**Windows:**
```bash
# Using Chocolatey
choco install ffmpeg

# Or download from ffmpeg.org
```

**Linux:**
```bash
sudo apt-get install ffmpeg
```

**macOS:**
```bash
brew install ffmpeg
```

---

## Build & Deployment

### Build for Production

```bash
npm run build
```

**Build output:** `.next/` directory (static + server files)

### Start Production Server

```bash
npm start
```

**Port:** 3000 (configurable via environment)

### Deployment Platforms

This is a **Next.js application** and can be deployed to:

1. **Vercel** (Recommended for Next.js)
   - Zero-config deployment
   - Automatic scaling
   - Edge functions support

2. **Docker** (Self-hosted)
   - Requires FFmpeg in container
   - Volume mounts for `data/` directory
   - Environment variables via secrets

3. **Azure App Service**
   - Node.js runtime
   - Custom startup script for FFmpeg
   - Azure Key Vault for secrets

4. **AWS EC2 / ECS**
   - Manual setup
   - Install FFmpeg separately
   - EFS for shared storage (if multi-instance)

---

## API Rate Limits & Costs

### Azure OpenAI Whisper
- **File size limit:** 25MB per request
- **Rate limit:** Varies by deployment (typically 60 RPM)
- **Cost:** ~$0.006 per minute of audio

### Azure OpenAI GPT-4
- **Token limit:** 128k context window
- **Rate limit:** Varies by deployment (typically 60 RPM)
- **Cost:** Input ~$0.01/1k tokens, Output ~$0.03/1k tokens

### Estimated Cost per Video (30 minutes)
- Transcription: ~$0.18
- Summary + Action Items: ~$0.05-0.10
- **Total per video:** ~$0.23-0.28

---

## Security Considerations

### Data Privacy
- **No data leaves your tenant** (Azure OpenAI uses your resources)
- **User data:** Email stored in localStorage for history tracking
- **Video files:** Stored locally, not transmitted to third parties
- **Transcripts:** Cached locally, not shared externally

### Authentication
- **Azure AD integration** via MSAL
- **OAuth 2.0** flow
- **No credentials stored** in localStorage (only tokens, auto-refreshed)

### Secrets Management
- **.env.local** should NEVER be committed to Git
- Use **Azure Key Vault** or **environment variables** in production

---

## Monitoring & Logging

### Current Logging
- **Console logs** for all processing steps
- **Job status** persisted in `data/jobs/{jobId}.json`
- **Error handling** with fallback to dummy data (if API fails)

### Recommended for Production
- **Application Insights** (Azure)
- **Structured logging** (Winston, Pino)
- **Error tracking** (Sentry)
- **Performance monitoring** (FFmpeg processing time, API latency)

---

## Known Limitations

1. **Single-server processing** (no queue system)
   - Concurrent uploads will process sequentially
   - Recommend job queue (BullMQ, Azure Queue Storage) for scale

2. **Local file storage**
   - Not suitable for multi-instance deployments
   - Recommend Azure Blob Storage or S3 for production

3. **No database**
   - All data in JSON files
   - Recommend PostgreSQL/MongoDB for production

4. **No CDN for videos**
   - Videos streamed directly from server
   - Recommend Azure CDN or CloudFront for production

---

## Scaling Recommendations

### For 10-50 users
- Single Node.js instance
- Local storage
- Current architecture is sufficient

### For 50-200 users
- Add Redis for job queue
- Azure Blob Storage for files
- Load balancer with sticky sessions

### For 200+ users
- Microservices architecture
- Separate transcription service
- Database (PostgreSQL)
- CDN for video delivery
- Kubernetes for orchestration

---

## Backup & Disaster Recovery

### Critical Data
- `data/uploads/` - All processed videos
- `data/transcripts/` - All transcripts
- `data/action-items/` - All action items
- `.env.local` - Environment variables (store securely)

### Backup Strategy
1. **Daily backups** of `data/` directory
2. **Database dumps** (if migrated from JSON)
3. **Offsite storage** (Azure Blob, AWS S3)
4. **Retention:** 30-90 days

---

## Support & Maintenance

### Regular Maintenance
- **Update dependencies** monthly (security patches)
- **Monitor disk space** (videos accumulate)
- **Review API usage** (Azure OpenAI costs)
- **Clean up old jobs** (optional cleanup script)

### Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| "FFmpeg not found" | FFmpeg not in PATH | Install FFmpeg system-wide |
| "Module not found" | Missing dependencies | Run `npm install` |
| "401 API Error" | Invalid Azure keys | Check `.env.local` |
| "Video won't play" | Encoding failed | Check FFmpeg logs |
| "Slow transcription" | API throttling | Upgrade Azure tier |

---

## Contact & Questions

For deployment questions:
1. Review this guide first
2. Check `.env.local.example` for required variables
3. Verify FFmpeg installation: `ffmpeg -version`
4. Check Next.js build: `npm run build`

**Technical Stack Summary:**
- **Frontend:** Next.js 16 + React 19 + TypeScript
- **Backend:** Next.js API Routes + FFmpeg
- **AI:** Azure OpenAI (Whisper + GPT-4)
- **Auth:** Azure AD (MSAL)
- **Storage:** Local filesystem (recommend Azure Blob for production)
