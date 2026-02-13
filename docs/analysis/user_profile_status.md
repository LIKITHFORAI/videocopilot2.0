# User Profile Status Check

**Current State:**
- **Video Files:** 🔒 **Private** (Stored on your local PC only).
- **Transcripts/List:** 📢 **Public** (Visible to everyone).

**Analysis:**
Currently, the server database stores the transcript and metadata, but the API (`/api/media/list`) returns **ALL videos** to **ALL users**. It does not filter by who uploaded it.

So if User A uploads a video:
- User B **sees the file** in their list.
- User B **can read the transcript**.
- User B **cannot watch the video** (shows "Not available on this device").

**To achieve true "User Profiles":**
We need to modify the API to filter the list based on the logged-in user's email.

**Implementation Plan (Quick Fix):**
1.  **API Update:** Modify `GET /api/media/list` to check the user's session (email).
2.  **Query Update:** Change SQL to `SELECT * FROM videos WHERE client_id = ?` (using email as client_id).
3.  **Result:** User A only sees their own uploads.

Do you want me to proceed with this update to enforce strict user profiles?
