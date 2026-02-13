# Storage Analysis & Architecture Report

## 1. Current Storage Footprint
Based on system analysis of `data/uploads`, the application currently stores **three copies** of media data for each upload, plus temporary files that may not be fully cleaned up.

| File Type | Stored Location | Example Size (Prop.) | Notes |
| :--- | :--- | :--- | :--- |
| **Original Video** | `data/uploads/{id}/{filename}` | 100% (e.g. 500MB) | **High Impact.** Currently kept forever. |
| **Audio Master** | `data/uploads/{id}/audio_master.mp3` | ~10-15% (e.g. 50MB) | Extracted redundancy. |
| **360p Video** | `data/uploads/{id}/video_360p.mp4` | ~5-10% (e.g. 25MB) | Optimized for streaming. |
| **Audio Chunks** | `data/uploads/{id}/chunks/` | ~10-15% (Temporary) | Should be deleted, but some folders remain. |
| **Transcripts** | `data/transcripts/{id}.json` | < 1% (Text) | Negligible size. |
| **Search Index** | `data/transcripts.db` | < 1% (Text) | Efficient SQLite storage. |

**Total Impact:** A 500MB upload currently consumes **~600MB+** of server disk space.

### Cleanup Status
The code (`src/app/api/process/route.ts`) attempts to delete the `chunks` folder, but **Original Video** and **Audio Master** are explicitly preserved.

---

## 2. Architecture Proposal: Hybrid Model
You proposed a model where **Transcripts are stored centrally (Server DB)** but **Media Files are stored locally (User's Computer)**.

### Feasibility Analysis
| Approach | Pros | Cons / Blockers |
| :--- | :--- | :--- |
| **Option A: Full Local (Current)** | Simple, fast, no cloud costs. | **Server fills up fast.** Hard to backup. |
| **Option B: Hybrid (User's Device)** | Zero server storage cost. | **Impossible for Web Apps.** User B cannot watch a video stored on User A's C: drive. |
| **Option C: Hybrid (Local Server)** | Data stays on-premise. | Requires a dedicated server with large disk arrays. |
| **Option D: Cloud Offload** | Scalable (Azure Blob). | Ongoing storage costs. |

> **Recommendation:** Since this is a self-hosted tool, we should stick to **Local Server Storage** but optimize it aggressively. We should **DELETE the Original Video** after processing and keep only the **360p Payload**.

---

## 3. Recommended "Smart Storage" Strategy

We can reduce storage by **90%** without losing functionality by changing the pipeline:

1.  **Upload:** Receive Original Video (Temp).
2.  **Process:** Extract Audio -> Transcribe -> Summarize.
3.  **Optimize:** Generate 360p Video (for playback).
4.  **Cleanup:**
    *   **DELETE** Original Video (Save 100% space).
    *   **DELETE** Audio Master (Save 10% space).
    *   **DELETE** Chunks (Save 10% space).
    *   **KEEP** Only 360p Video + Transcript JSON + DB Entry.

**Result:** A 500MB upload becomes **~25MB** on disk.

### Implementation Plan
If approved, I can modify `cleanupMedia` in `src/lib/storage.ts` to implement this aggressive cleanup policy immediately.

### Database Question
> *Can we make the transcript data stored in the server database and value stored in the local?*

**Yes.**
*   **Transcripts:** Already stored in `transcripts.db` (SQLite). This mimics a "Server Database".
*   **Videos:** Specific file paths are stored in the DB.
*   **Action:** We can configure the application to store the bulky video files on a separate, large local drive (e.g., `D:/videocopilot_data`), while keeping the DB and app on `C:/`.

Let me know if you want to proceed with the **Smart Cleanup** (deleting originals) or the **Separate Drive** configuration.
