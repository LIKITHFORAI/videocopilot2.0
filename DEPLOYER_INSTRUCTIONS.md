# Deployment Instructions - Auth Bypass Fix

## Issue Fixed
The authentication bypass was causing an infinite redirect loop on the deployed site (https://bck1.drcloudemr.com/videocopilot). Users would click "Bypass authentication" but the page would keep redirecting back to the login screen.

## Root Cause
- The app is deployed at `/videocopilot/` subdirectory
- Auth redirect was hardcoded to `/auth-redirect.html` (root path)
- This caused a 404, triggering the redirect loop

## What Was Fixed
1. **Dynamic basePath detection** - Auth redirect now respects the deployment path
2. **Consolidated Azure AD credentials** - Using SharePoint app for both auth and file access
3. **Environment variable support** - Added `NEXT_PUBLIC_BASE_PATH` for production

## Deployment Steps

### Step 1: Pull Latest Code
```bash
cd /var/www/html/videocopilot
git pull origin main
```

### Step 2: Update Environment Variables
Add this line to `.env.local` on the server:
```bash
NEXT_PUBLIC_BASE_PATH=/videocopilot
```

**CRITICAL:** Also update the Azure AD credentials to use the new SharePoint app.

Contact the project owner for the updated credentials:
- New `AZURE_AD_CLIENT_ID` (SharePoint app)
- New `AZURE_AD_CLIENT_SECRET` (SharePoint app secret)
- New `NEXT_PUBLIC_AZURE_AD_CLIENT_ID` (same as above)
- New `SHAREPOINT_CLIENT_ID` (same as above)
- New `SHAREPOINT_CLIENT_SECRET` (same as above)

These values should be provided separately via secure channel (not in git).

### Step 3: Install Dependencies (if needed)
```bash
npm ci --only=production
```

### Step 4: Rebuild Production Bundle
```bash
npm run build
```

### Step 5: Restart the Application
```bash
pm2 restart video-copilot
pm2 save
```

### Step 6: Verify the Fix
1. Go to https://bck1.drcloudemr.com/videocopilot
2. Click "Dev Mode: Bypass authentication for testing"
3. Page should reload ONCE and stay on the app (no more redirect loop)

## Testing Checklist
- [ ] Login page loads at `/videocopilot/`
- [ ] Bypass checkbox works without redirect loop
- [ ] Auth redirect goes to `/videocopilot/auth-redirect.html` (not 404)
- [ ] Microsoft login works (if using real auth)
- [ ] Videos can be uploaded and processed

## Rollback (if needed)
```bash
git reset --hard 0f21ecf
npm run build
pm2 restart video-copilot
```

## Important Notes
- ⚠️ The `NEXT_PUBLIC_BASE_PATH` environment variable MUST be set to `/videocopilot` for production
- ⚠️ Do NOT set `NEXT_PUBLIC_BASE_PATH` on localhost (leave it empty or unset)
- ✅ All Azure AD credentials now use the same SharePoint app registration
- ✅ The `.env.local` file is NOT in git (you must update it manually on the server)

## Support
If issues occur after deployment:
1. Check PM2 logs: `pm2 logs video-copilot --lines 50`
2. Verify `.env.local` has `NEXT_PUBLIC_BASE_PATH=/videocopilot`
3. Clear browser cache and try again
4. Check browser console for errors (F12)
