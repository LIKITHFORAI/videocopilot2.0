# DrCloudEHR FocusNotes - Production Deployment Guide

Complete step-by-step guide for deploying FocusNotes on Linux with Apache reverse proxy.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [System Setup](#system-setup)
3. [Installation](#installation)
4. [Configuration](#configuration)
5. [Building for Production](#building-for-production)
6. [Apache Reverse Proxy Setup](#apache-reverse-proxy-setup)
7. [Process Management (PM2)](#process-management-pm2)
8. [Testing Deployment](#testing-deployment)
9. [Troubleshooting](#troubleshooting)
10. [Maintenance](#maintenance)

---

## Prerequisites

### Required Software

- **Operating System:** Ubuntu 20.04+ or similar Linux distribution
- **Node.js:** v20 or higher
- **npm:** v8 or higher
- **FFmpeg:** Latest version
- **Apache:** 2.4+
- **PM2:** For process management
- **Git:** For cloning repository

### Required Services

- Azure OpenAI account with:
  - Whisper deployment (for transcription)
  - GPT-4 deployment (for summaries/chat)
- Azure AD application (for authentication)

---

## System Setup

### Step 1: Update System

```bash
sudo apt update
sudo apt upgrade -y
```

### Step 2: Install Node.js 20

```bash
# Remove old Node.js if exists
sudo apt remove nodejs -y

# Install Node.js 20 via NodeSource
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version  # Should show v20.x.x
npm --version   # Should show v8.x.x or higher
```

### Step 3: Install FFmpeg

```bash
sudo apt install -y ffmpeg

# Verify installation
ffmpeg -version
```

### Step 4: Install Apache

```bash
sudo apt install -y apache2

# Enable required modules
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo a2enmod rewrite
sudo a2enmod headers

# Restart Apache
sudo systemctl restart apache2
sudo systemctl enable apache2

# Verify Apache is running
sudo systemctl status apache2
```

### Step 5: Install PM2 Globally

```bash
sudo npm install -g pm2

# Verify installation
pm2 --version

# Setup PM2 to start on boot
pm2 startup
# Follow the command it outputs (starts with 'sudo env PATH=...')
```

---

## Installation

### Step 1: Create Application Directory

```bash
# Create directory for the application
sudo mkdir -p /var/www/video-copilot
sudo chown -R $USER:$USER /var/www/video-copilot
cd /var/www/video-copilot
```

### Step 2: Clone Repository

```bash
git clone https://github.com/LIKITHFORAI/videocopilot2.0.git .

# Verify you have the latest code
git log -1 --oneline
# Should show: 2747361 fix: Remove infinite reload loop (or later)
```

### Step 3: Install Dependencies

```bash
npm install

# This may take 3-5 minutes
```

---

## Configuration

### Step 1: Create Environment File

```bash
# Copy example environment file
cp .env.local.example .env.local

# Edit the file
nano .env.local
```

### Step 2: Configure Environment Variables

Add the following to `.env.local`:

```bash
# CRITICAL: Set to production
NODE_ENV=production

# Azure OpenAI - Whisper (Transcription)
AZURE_OPENAI_WHISPER_ENDPOINT=https://your-resource.openai.azure.com
AZURE_OPENAI_WHISPER_API_KEY=your-whisper-api-key
AZURE_WHISPER_DEPLOYMENT=whisper-deployment-name
AZURE_OPENAI_WHISPER_API_VERSION=2024-06-01

# Azure OpenAI - GPT (Chat/Summaries)
AZURE_OPENAI_CHAT_ENDPOINT=https://your-resource.openai.azure.com
AZURE_OPENAI_CHAT_API_KEY=your-gpt-api-key
AZURE_CHAT_DEPLOYMENT=gpt-4-deployment-name
AZURE_OPENAI_CHAT_API_VERSION=2025-01-01-preview

# Azure AD (Authentication)
AZURE_AD_CLIENT_ID=your-client-id
AZURE_AD_CLIENT_SECRET=your-client-secret
AZURE_AD_TENANT_ID=your-tenant-id

# Public (Browser-accessible)
NEXT_PUBLIC_AZURE_AD_CLIENT_ID=your-client-id
NEXT_PUBLIC_AZURE_AD_TENANT_ID=your-tenant-id

# Optional: Bypass auth for testing (set to false for production)
NEXT_PUBLIC_BYPASS_AUTH=false
```

**Save and exit** (Ctrl+X, then Y, then Enter)

### Step 3: Verify Configuration

```bash
# Check that NODE_ENV is production
cat .env.local | grep NODE_ENV
# Should show: NODE_ENV=production

# Check file permissions
chmod 600 .env.local
```

---

## Building for Production

### Step 1: Clean Previous Builds

```bash
# Remove old build artifacts
rm -rf .next
rm -rf node_modules/.cache
```

### Step 2: Build Application

```bash
npm run build
```

**Expected output:**
```
✓ Creating an optimized production build
✓ Compiled successfully
✓ Collecting page data
✓ Generating static pages (X/X)
✓ Finalizing page optimization
```

**Build should complete in 1-3 minutes.**

### Step 3: Verify Build Output

```bash
# Check build directory exists
ls -la .next/

# Should see recent timestamps (within last few minutes)
ls -la .next/static/

# Check build size
du -sh .next/
# Should be ~50-100MB
```

---

## Apache Reverse Proxy Setup

### Step 1: Create Apache Configuration

```bash
sudo nano /etc/apache2/sites-available/video-copilot.conf
```

### Step 2: Add Configuration

Paste the following (adjust `ServerName` to your domain):

```apache
<VirtualHost *:80>
    ServerName bck1.drcloudemr.com
    ServerAlias www.bck1.drcloudemr.com

    # Enable reverse proxy
    ProxyPreserveHost On
    ProxyRequests Off

    # Forward /demo-tool to Next.js on port 3000
    ProxyPass /demo-tool http://localhost:3000/demo-tool
    ProxyPassReverse /demo-tool http://localhost:3000/demo-tool

    # WebSocket support (if needed for future features)
    RewriteEngine on
    RewriteCond %{HTTP:Upgrade} websocket [NC]
    RewriteCond %{HTTP:Connection} upgrade [NC]
    RewriteRule ^/demo-tool/(.*) "ws://localhost:3000/demo-tool/$1" [P,L]

    # Logging
    ErrorLog ${APACHE_LOG_DIR}/video-copilot-error.log
    CustomLog ${APACHE_LOG_DIR}/video-copilot-access.log combined
</VirtualHost>
```

**Save and exit** (Ctrl+X, then Y, then Enter)

### Step 3: Enable Site and Restart Apache

```bash
# Enable the site
sudo a2ensite video-copilot.conf

# Test configuration
sudo apache2ctl configtest
# Should show: "Syntax OK"

# Restart Apache
sudo systemctl restart apache2

# Verify Apache is running
sudo systemctl status apache2
```

---

## Process Management (PM2)

### Step 1: Start Application with PM2

```bash
cd /var/www/video-copilot

# Start the application
pm2 start npm --name "video-copilot" -- start

# Expected output:
# ┌─────┬────────────────┬─────────┬─────────┬──────────┬────────┐
# │ id  │ name           │ mode    │ status  │ cpu      │ memory │
# ├─────┼────────────────┼─────────┼─────────┼──────────┼────────┤
# │ 0   │ video-copilot  │ fork    │ online  │ 0%       │ 50.0mb │
# └─────┴────────────────┴─────────┴─────────┴──────────┴────────┘
```

### Step 2: Save PM2 Configuration

```bash
# Save PM2 process list
pm2 save

# This ensures the app restarts after server reboot
```

### Step 3: Verify Application is Running

```bash
# Check PM2 status
pm2 status

# View logs
pm2 logs video-copilot --lines 50

# Should see:
# ▲ Next.js 16.1.4
# - Local:        http://localhost:3000/demo-tool
# ✓ Ready in X.XXs
```

### Step 4: Test Local Access

```bash
# Test if Next.js is responding on port 3000
curl -I http://localhost:3000/demo-tool

# Should return: HTTP/1.1 200 OK
```

---

## Testing Deployment

### Test 1: Check Domain Access

```bash
# Test if Apache is forwarding correctly
curl -I http://bck1.drcloudemr.com/demo-tool

# Should return:
# HTTP/1.1 200 OK
# Server: Apache/2.4.x (Ubuntu)
```

### Test 2: Browser Testing

1. **Open browser** and navigate to:
   ```
   https://bck1.drcloudemr.com/demo-tool
   ```

2. **Check login page loads**
   - Logo should appear (no 404)
   - "Sign in with Microsoft" button visible
   - No console errors (F12 → Console tab)

3. **Test bypass authentication** (if enabled)
   - Check "Dev Mode: Bypass authentication"
   - Page should reload once and show upload interface
   - Should NOT reload infinitely

4. **Test upload (CRITICAL TEST)**

   a. Open DevTools (F12) → Network tab
   
   b. Click "UPLOAD" button → "Computer"
   
   c. Select a small video file (< 50MB for initial test)
   
   d. **Verify Network requests:**
   - ✅ `POST /demo-tool/api/upload` → **200 OK**
   - ✅ `POST /demo-tool/api/process` → **200 OK**
   - ✅ `GET /demo-tool/api/job/{id}` → **200 OK**
   
   **If you see:**
   - ❌ `POST /api/upload` → **404** = **REBUILD REQUIRED**

   e. Wait for processing to complete
   
   f. **Verify results:**
   - Transcript appears in left panel
   - Action items appear in right panel
   - Video player works

### Test 3: Static Assets Check

Open DevTools → Network tab, check for:

- ✅ `GET /demo-tool/drcloud-logo.png` → **200 OK**
- ✅ `GET /demo-tool/_next/static/...` → **200 OK**

**If you see:**
- ❌ `GET /drcloud-logo.png` → **404** = **REBUILD REQUIRED**

### Test 4: Process Management

```bash
# Restart the application
pm2 restart video-copilot

# Wait 10 seconds
sleep 10

# Check it's running
pm2 status

# Test access again
curl -I http://localhost:3000/demo-tool
# Should return: HTTP/1.1 200 OK
```

---

## Troubleshooting

### Issue: Upload Returns 404

**Symptoms:**
```
Browser Console:
POST /api/upload 404 (Not Found)
```

**Solution:**
```bash
cd /var/www/video-copilot

# 1. Verify latest commit
git log -1 --oneline
# Must show: 2747361 or later

# 2. Pull latest code if needed
git pull origin main

# 3. Delete old build
rm -rf .next

# 4. Rebuild
npm run build

# 5. Restart
pm2 restart video-copilot

# 6. Test
curl -I http://localhost:3000/demo-tool/api/upload
# Should NOT return 404
```

### Issue: Logo Not Loading (404)

**Symptoms:**
```
Browser Console:
GET /drcloud-logo.png 404 (Not Found)
```

**Solution:** Same as upload 404 - rebuild required.

### Issue: PM2 Process Not Starting

**Check logs:**
```bash
pm2 logs video-copilot --err --lines 100
```

**Common errors:**

1. **"FFmpeg not found"**
   ```bash
   sudo apt install ffmpeg
   pm2 restart video-copilot
   ```

2. **"Port 3000 already in use"**
   ```bash
   # Find process using port 3000
   sudo lsof -i :3000
   
   # Kill it
   sudo kill -9 <PID>
   
   # Restart PM2
   pm2 restart video-copilot
   ```

3. **"Module not found"**
   ```bash
   npm install
   pm2 restart video-copilot
   ```

### Issue: Apache Not Forwarding

**Check Apache logs:**
```bash
sudo tail -f /var/log/apache2/video-copilot-error.log
```

**Test proxy:**
```bash
# From server
curl -I http://localhost:3000/demo-tool
# Should return: 200 OK

# From browser
curl -I http://bck1.drcloudemr.com/demo-tool
# Should also return: 200 OK

# If localhost works but domain doesn't, check Apache config
sudo apache2ctl configtest
sudo systemctl restart apache2
```

### Issue: Infinite Reload Loop on Login

**Symptoms:** Page keeps reloading after clicking bypass checkbox

**Solution:** Verify latest code is deployed (commit 2747361+)
```bash
git log -1 --oneline
# Must show: 2747361 fix: Remove infinite reload loop

# If not, pull and rebuild
git pull origin main
rm -rf .next
npm run build
pm2 restart video-copilot
```

---

## Maintenance

### Updating the Application

```bash
cd /var/www/video-copilot

# 1. Stop application
pm2 stop video-copilot

# 2. Pull latest code
git pull origin main

# 3. Install any new dependencies
npm install

# 4. Clean old build
rm -rf .next

# 5. Rebuild
npm run build

# 6. Restart
pm2 restart video-copilot

# 7. Verify
pm2 logs video-copilot --lines 20
```

### Viewing Logs

```bash
# Application logs
pm2 logs video-copilot

# Apache logs
sudo tail -f /var/log/apache2/video-copilot-access.log
sudo tail -f /var/log/apache2/video-copilot-error.log

# System logs
journalctl -u apache2 -f
```

### Monitoring Resources

```bash
# Check PM2 status
pm2 status

# Monitor in real-time
pm2 monit

# Check disk space
df -h

# Check memory
free -h
```

### Restarting Services

```bash
# Restart application only
pm2 restart video-copilot

# Restart Apache only
sudo systemctl restart apache2

# Restart everything
pm2 restart video-copilot
sudo systemctl restart apache2
```

---

## Quick Reference Commands

### Daily Operations

```bash
# Check status
pm2 status

# View logs
pm2 logs video-copilot

# Restart app
pm2 restart video-copilot

# Reload app (zero-downtime)
pm2 reload video-copilot
```

### After Code Updates

```bash
git pull origin main
rm -rf .next
npm run build
pm2 restart video-copilot
```

### Emergency Restart

```bash
pm2 stop video-copilot
pm2 delete video-copilot
cd /var/www/video-copilot
pm2 start npm --name "video-copilot" -- start
pm2 save
```

---

## Support

For deployment issues:
1. Check logs: `pm2 logs video-copilot`
2. Verify build: `ls -la .next/`
3. Test locally: `curl http://localhost:3000/demo-tool`
4. Check Apache: `sudo systemctl status apache2`

**Common deployment checklist:**
- [ ] Latest code pulled from GitHub
- [ ] `.env.local` configured with `NODE_ENV=production`
- [ ] `npm run build` completed successfully
- [ ] PM2 process running (`pm2 status`)
- [ ] Apache forwarding to port 3000
- [ ] Upload test returns 200 OK (not 404)
- [ ] Logo loads without 404

---

## Technical Details

- **Port:** 3000 (Next.js)
- **Path:** `/demo-tool` (production basePath)
- **Process Manager:** PM2
- **Reverse Proxy:** Apache
- **Build Tool:** Next.js 16.1.4
- **Node:** v20+
- **Platform:** Linux (Ubuntu/Debian)
