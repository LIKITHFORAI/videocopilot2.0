# ✅ Deployer Guide: Upload 404 Fix Applied

## Issue Summary
**Problem:** Upload failed with 404 Not Found on production deployment  
**URL:** `https://bck1.drcloudemr.com/demo-tool`  
**Root Cause:** API routes were called as `/api/upload` instead of `/demo-tool/api/upload`

---

## ✅ Developer Fix (Already Completed)

The developer has fixed **6 hardcoded API calls** in the following files:

### Files Modified
1. ✅ `src/components/analysis/TranscriptPanel.tsx`
   - Line 29: `/api/job/${jobId}` → `getApiPath(/api/job/${jobId})`
   - Line 56: `/api/transcript/${mid}` → `getApiPath(/api/transcript/${mid})`

2. ✅ `src/components/analysis/ActionItemsPanel.tsx`
   - Line 56: `/api/action-items/${mediaId}` → `getApiPath(/api/action-items/${mediaId})`
   - Line 69: `/api/transcript/${mediaId}` → `getApiPath(/api/transcript/${mediaId})`

3. ✅ `src/app/vision-test/page.tsx`
   - Line 31: `/api/extract-frames` → `getApiPath(/api/extract-frames)`
   - Line 64: `/api/vision` → `getApiPath(/api/vision)`

### What `getApiPath()` Does
```typescript
// Development: /api/upload
// Production:  /demo-tool/api/upload
```

---

## 🚀 Deployer Steps (Action Required)

### Step 1: Pull Latest Code
```bash
cd /path/to/video_copilot_fresh
git pull origin main  # or your deployment branch
```

### Step 2: Install Dependencies (if package.json changed)
```bash
npm install
```

### Step 3: Build Production Bundle
```bash
npm run build
```

**Expected output:**
```
✓ Compiled successfully
✓ Creating an optimized production build
✓ Compiled successfully in X.XXs
```

### Step 4: Restart Node.js Server

**Option A: Using PM2**
```bash
pm2 restart video-copilot
# Or restart all
pm2 restart all
```

**Option B: Using systemd**
```bash
sudo systemctl restart video-copilot
```

**Option C: Manual Restart**
```bash
# Stop existing process (Ctrl+C or kill PID)
npm start
```

### Step 5: Verify Apache Reverse Proxy (Should Already Be Configured)

Ensure Apache is forwarding `/demo-tool` to Node.js on port 3000:

```apache
# In your Apache config or .htaccess
ProxyPass /demo-tool http://localhost:3000/demo-tool
ProxyPassReverse /demo-tool http://localhost:3000/demo-tool
```

---

## ✅ Testing & Verification

### 1. Test Upload Endpoint
Open browser DevTools (F12) → Network tab, then:

1. Navigate to: `https://bck1.drcloudemr.com/demo-tool`
2. Click **UPLOAD** button
3. Select a small test video
4. Monitor Network tab

**Expected Results:**
- ✅ `POST /demo-tool/api/upload` → **200 OK**
- ✅ Upload progress shows
- ✅ "Queuing for processing..." message appears

**Previously (broken):**
- ❌ `POST /api/upload` → **404 Not Found**

### 2. Test Transcript Loading
1. After upload completes, check:
   - ✅ Transcript panel loads
   - ✅ Action items panel loads
   - ✅ No 404 errors in DevTools console

### 3. Verify All API Calls Use Correct Path
Check DevTools Network tab - all API calls should show:
```
/demo-tool/api/upload
/demo-tool/api/process
/demo-tool/api/job/...
/demo-tool/api/transcript/...
/demo-tool/api/action-items/...
```

---

## 🔍 Troubleshooting

### Issue: Still getting 404 errors
**Solution:**
```bash
# 1. Verify build completed successfully
ls -la .next/

# 2. Check environment variable
cat .env.local | grep NODE_ENV
# Should show: NODE_ENV=production

# 3. Force rebuild
rm -rf .next
npm run build
pm2 restart video-copilot
```

### Issue: Apache shows 502 Bad Gateway
**Solution:**
```bash
# Verify Node.js is running on port 3000
netstat -tulpn | grep 3000
# Or
lsof -i :3000

# Start if not running
npm start
```

### Issue: Upload works locally but not on production
**Checklist:**
- [ ] Verify `NODE_ENV=production` in `.env.local`
- [ ] Check Apache proxy is running: `sudo systemctl status apache2`
- [ ] Verify basePath in `next.config.ts` is set for production
- [ ] Clear browser cache and test in incognito mode

---

## 📋 Quick Checklist

- [ ] Code pulled from repository
- [ ] `npm install` completed (if needed)
- [ ] `npm run build` successful
- [ ] Server restarted
- [ ] Upload test successful (200 OK)
- [ ] Transcript/Action items load correctly
- [ ] No 404 errors in browser console

---

## 🎯 Summary for Deployer

**What changed:** All API calls now respect the `/demo-tool` basePath  
**Your action:** Pull code, rebuild, restart server  
**Testing:** Upload a video and verify no 404 errors  
**Time estimate:** 5-10 minutes  

**If issues persist, provide:**
1. Screenshot of browser DevTools Network tab
2. Server logs: `pm2 logs video-copilot`
3. Output of: `npm run build`
