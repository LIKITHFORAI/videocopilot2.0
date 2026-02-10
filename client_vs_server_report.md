# Storage Analysis: Client vs. Server Data Report

This breakdown clarifies exactly where data lives based on your definitions:
- **User's Local Computer:** The laptop/desktop of the employee accessing the tool via browser.
- **Server:** The company server (AWS/On-Prem) where the tool is deployed.

---

## 1. What is stored on the Server? (Deployment Machine)
**Everything resides here.** The application is built as a self-contained unit.

| Data Type | Specific Content | Location on Server Disk |
| :--- | :--- | :--- |
| **Media Files** | **360p Compressed Video** (for playback) | `[AppRoot]/data/uploads/{id}/video_360p.mp4` |
| **Database** | **Metadata & Search Index** (SQLite) | `[AppRoot]/data/transcripts.db` |
| **Text Data** | **Full Transcripts & Action Items** (JSON) | `[AppRoot]/data/transcripts/{id}.json` |
| **Vector Store** | **AI Embeddings** (for Semantic Search) | `[AppRoot]/data/vector_store/` |
| **Logs** | **Job Status & Progress** | `[AppRoot]/data/jobs/{jobId}.json` |

> **Note:** The "Original Video" and "Master Audio" are now **DELETED** immediately after processing to save space (per the new "Smart Storage" update).

---

## 2. What is stored on the User's Local Computer? (Client)
**Almost nothing.** The user's computer acts only as a viewer.

| Data Type | Specific Content | Storage Mechanism |
| :--- | :--- | :--- |
| **Preferences** | User's selected "Personality" (Meetings/Training) | Browser `localStorage` |
| **Auth Tokens** | Microsoft Login Tokens (Temporary) | Browser `sessionStorage` / Memory |
| **Cache** | Temporary images/scripts (Standard web cache) | Browser Cache |

**Crucial Point:** If a user uploads a video, it leaves their computer and moves to the Server. It does **not** stay on their specific machine in any permanent way accessible by the app. If they close the browser and switch computers, the data is still available because it is on the **Server**.

---

## 3. Storage Efficiency (Server Side)
With the new configuration, your Server storage usage is minimized:

| Item | Old Usage | New Usage |
| :--- | :--- | :--- |
| **1 Hour Video** | ~2.5 GB | **~150 MB** (94% Reduction) |
| **Transcript** | ~50 KB | **~50 KB** |
| **Database** | ~10 KB | **~10 KB** |

**Conclusion:** A 500GB drive on your company server can store approximately **3,000+ hours** of processed video content.
