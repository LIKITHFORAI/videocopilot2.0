# User Segregation Implementation Plan

**Status:** ❌ Not Started. The system currently hardcodes all uploads to a generic user (`mountmontgomery`) and lists all videos to everyone.

**Goal:** Ensure User A only sees User A's videos.

## implementation Steps

### 1. Update Upload Flow (Client)
- **File:** `src/components/Upload/FileUploader.tsx`
- **Action:** Modify `startProcessing` to include the logged-in user's email (from MSAL) in the API request body.

### 2. Update Processing API (Server)
- **File:** `src/app/api/process/route.ts`
- **Action:**
  - Read `userEmail` from the request body.
  - Pass `userEmail` to `processMedia` and `indexVideoChunks`.
  - **Result:** Video is saved in DB with the correct `client_id`.

### 3. Update List API (Server)
- **File:** `src/app/api/media/list/route.ts`
- **Action:**
  - Read `userId` (email) from the request query parameters.
  - Update SQL query to: `SELECT * FROM videos WHERE client_id = ?`.
  - **Result:** API only returns videos belonging to the requester.

### 4. Update List Component (Client)
- **File:** `src/components/Upload/FileUploader.tsx` (or where list is fetched)
- **Action:** Pass the current user's email when fetching the video list.

## Security Note
For this MVP, we are trusting the client to send the correct email. In a production environment, this should be extracted from a validated JWT token on the server.
