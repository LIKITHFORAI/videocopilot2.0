# Deployment Package - February 3, 2026

## What's Included in This Update

### Critical Fixes
1. **Auth Bypass Redirect Loop** - Fixed localStorage/sessionStorage mismatch
2. **Full Video Processing** - Increased limit from 30k to 100k characters (supports videos up to 90 minutes)
3. **Regenerate Action Items** - Added refresh button to retry failed extractions
4. **Next.js 15+ Compatibility** - Fixed async params handling

### New Features
- **3 New Action Item Categories**: Topics, Key Question, Reaction
- **Action Items Count Display**: Shows count in header (e.g., "Action Items (7)")

## Files to Deploy

Upload the entire contents of this package to your Linux server at:
`/var/www/html/videocopilot/`

### Required Files:
- `.next/` - Production build (entire directory)
- `src/` - Source code
- `public/` - Static assets
- `package.json` - Dependencies
- `package-lock.json` - Locked dependencies
- `next.config.mjs` - Next.js configuration
- `.env.local` - Environment variables (IMPORTANT!)

## Deployment Steps

### 1. Stop the Current Server
```bash
pm2 stop video-copilot
```

### 2. Backup Current Installation (Optional but Recommended)
```bash
cd /var/www/html
tar -czf videocopilot-backup-$(date +%Y%m%d).tar.gz videocopilot/
```

### 3. Extract New Files
```bash
# Upload the ZIP to the server, then:
cd /var/www/html
unzip video-copilot-production-update.zip -d videocopilot-new
```

### 4. Copy Critical Files from Old Installation
```bash
# Preserve your .env.local file
cp videocopilot/.env.local videocopilot-new/.env.local

# Preserve your data directory (if exists)
cp -r videocopilot/data videocopilot-new/data
```

### 5. Replace Old Installation
```bash
mv videocopilot videocopilot-old
mv videocopilot-new videocopilot
```

### 6. Install Dependencies
```bash
cd /var/www/html/videocopilot
npm ci --only=production
```

### 7. Start the Server
```bash
pm2 start npm --name "video-copilot" -- start
pm2 save
```

### 8. Verify Deployment
```bash
pm2 logs video-copilot
```

Visit: https://bck1.drcloudemr.com/videocopilot

### 9. Test the Fix
1. Click "Dev Mode: Bypass authentication for testing"
2. Page should reload ONCE and stay on the app
3. Upload a long video (>30 minutes) and verify highlights/action items cover the full duration
4. Click the refresh icon next to "Action Items" to test regeneration

## Rollback Instructions (If Needed)
```bash
pm2 stop video-copilot
cd /var/www/html
rm -rf videocopilot
mv videocopilot-old videocopilot
pm2 start video-copilot
```

## Support
If issues occur:
1. Check PM2 logs: `pm2 logs video-copilot`
2. Check browser console for errors
3. Verify `.env.local` variables are set correctly
4. Ensure Azure OpenAI credentials are valid
