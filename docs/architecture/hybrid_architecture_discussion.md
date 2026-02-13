# Hybrid Storage Design (Refined based on Login & Profile)

Your vision aligns with a **Client-Side Heavy Architecture** (Decoupled Storage).

## The Core Concept
1.  **Server (The Brain):**
    *   Stores ALL Transcripts, Summaries, and Action Items.
    *   Stores User Profile: `User A` uploaded `Video 123`.
    *   **Does NOT store the video file.** (Zero storage cost).
2.  **Client (The Body):**
    *   Stores `Video 123` file in the Browser Storage (IndexedDB).
    *   **Playback:** When User A views the transcript, the browser plays the local file.

---

## Scenario Walkthrough

### 1. Uploading (User A on Laptop)
*   **Action:** User A selects `Presentation.mp4`.
*   **Result:**
    *   Browser saves `Presentation.mp4` to Local IndexedDB.
    *   Browser sends audio to Server for processing.
    *   Server creates Transcript -> Saves to DB -> Links to User A.
    *   Server **deletes** any temporary video file immediately.

### 2. Viewing (User A on Laptop - Same Device)
*   **Action:** User A logs in and clicks "Presentation".
*   **Result:**
    *   Server sends Transcript.
    *   App checks Local IndexedDB for `Presentation.mp4`.
    *   **Success:** Video plays instantly from local storage.

### 3. Viewing (User B on Desktop - Different User/Device)
*   **Action:** User B logs in and clicks "Presentation" (if shared).
*   **Result:**
    *   Server sends Transcript (Text is always available).
    *   App checks Local IndexedDB for `Presentation.mp4`.
    *   **Fail:** "Video File Not Found Locally."
    *   **UX:** User B can read/search the text, but **cannot watch the video**.

---

## Is this feasible?
**Yes.** We can implement this today.

**Key Technical Requirements:**
*   **IndexedDB Wrapper:** Need a library (`idb` or similar) to manage large video blobs in the browser.
*   **Storage Limits:** Browsers limit storage per origin. If User A uploads 10GB of video, the browser might delete old ones automatically.
*   **Re-Upload Flow:** If User B *really* needs to watch, they must have the file and "re-link" it locally.

## The Superior Alternative: SharePoint Streaming
Since you mentioned pulling from SharePoint:
*   We can just **Stream directly from SharePoint**.
*   **Server:** Stores Transcript + Link to SharePoint File ID.
*   **Playback:** When User A (or B) clicks play, we fetch a temporary stream URL from Microsoft Graph.
*   **Result:** Everyone can watch. Zero storage on our server. Zero storage on user's laptop.
*   **Trade-off:** Requires internet connection to watch.

**Recommendation:** Proceed with the **Hybrid (IndexedDB)** approach if offline/local-only video storage is a hard requirement. Otherwise, SharePoint Streaming is cleaner.
