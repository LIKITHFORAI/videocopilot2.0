# Decentralized Video Storage Implementation Plan

This plan outlines how to move video storage from the **Server** to the **User's Browser (IndexedDB)** while keeping transcripts centralized.

## 1. Core Architecture
- **Central Intelligence (Server):** Stores all text data (transcripts, summaries, action items) in the SQLite database.
- **Local Media (Client):** Stores the raw video file in the browser's IndexedDB.
- **Linkage:** The Server and Client both use the same `mediaId` (UUID) to connect the transcript to the video.

## 2. Technical Components

### Database Schema (Server)
No major schema changes needed, but `videos` table will now represent *metadata only*, not physical file presence on the server.
- `videos` table: `id`, `user_id`, `title`, `duration`, `upload_date`.

### Browser Storage (Client)
We will use **IndexedDB** to store large video files (BLOBs).
- **Database Name:** `video-copilot-media`
- **Store Name:** `videos`
- **Key:** `mediaId` (UUID)
- **Value:** `{ fileBlob, mimeType, fileName, timestamp }`

## 3. Implementation Steps

### Step 1: Client-Side Storage Logic
Create a utility `src/lib/browserStorage.ts` to manage IndexedDB.
- `saveVideoToLocal(mediaId, file)`
- `getVideoFromLocal(mediaId)`
- `deleteVideoFromLocal(mediaId)`
- **Quota Management:** Check available space before saving.

### Step 2: Modified Upload Flow (`FileUploader.tsx`)
1.  **User Selects File:**
    - Generate `mediaId` (UUID) on client immediately.
    - **Action:** Save file to `IndexedDB` immediately using `mediaId`.
2.  **Upload to Server:**
    - Send file to `/api/process` with `mediaId`.
3.  **Server Processing:**
    - Server receives file (temp storage).
    - Server extracts audio & transcribes.
    - Server saves Transcript to DB.
    - **Server DELETES video file.** (Crucial Step).
    - Server returns success.

### Step 3: Modified Playback Flow (`MediaPlayer.tsx`)
1.  **Fetch Metadata:** Client gets transcript & info from Server.
2.  **Check Local:** Client calls `getVideoFromLocal(mediaId)`.
3.  **Conditionals:**
    - **Found:** Generate `URL.createObjectURL(blob)` and set as `<video src>`.
    - **Not Found:** Display placeholder: *"Video file not found on this device. You can still read the transcript."*
    - **Option:** Allow user to "Re-Link" (select file from disk again) if they have it.

## 4. User Experience (UX)
- **Office PC (Uploader):** Seamless playback.
- **Home PC (Viewer):** "Video Missing" indicator, but full transcript access.
- **Clearing Cache:** If user clears browser data, video is lost. (We should add a warning).

## 5. Security & Privacy
- **Isolation:** Videos are sandboxed in the user's browser. Other users cannot access them.
- **Authentication:** Transcripts are protected by Server Auth. Videos are protected by physical device access.

## Next Steps
1.  Approve this plan.
2.  I will create the `browserStorage.ts` utility.
3.  I will update `FileUploader` to save to IDB.
4.  I will update `MediaPlayer` to read from IDB.
5.  I will update Server Cleanup to strictly delete videos.
