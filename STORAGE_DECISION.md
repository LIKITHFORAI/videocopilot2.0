# Storage Decision: Storing Video on User's Computer

You asked if we can store the video in the **User's Local Database** (Client-side) to save server space.

## The Short Answer
**Technically Yes, but it breaks "sharing".**

## The Trade-off
If we store the video in the User's Browser (IndexedDB):

1.  **Isolation (Major Issue):**
    *   If **User A** uploads a video, it lives in User A's Chrome browser.
    *   When **User B** logs in to view the transcript, **they cannot watch the video**. Their browser cannot access User A's data.
    *   The tool becomes "Personal Use Only".

2.  **Data Persistence:**
    *   If the user clears "Browsing History/Data", **the video is deleted forever**.
    *   Browsers restrict storage limit (usually 500MB - a few GBs).

## Recommendation
**Do not use User Local Storage** if you want other team members to see the videos.

**Alternatives to Save Space:**
1.  **Azure Blob Storage:** Move videos to the cloud. Cost is extremely low (~$0.02 per GB). Endless space.
2.  **Server HDD:** Add a 1TB drive to your server for ~$50. That holds 6,000 hours of 360p video.
3.  **Delete Video Entirely:** Keep only the **Transcript** and **Chat** capabilities. The video is deleted after processing. Users read the text instead of watching.

**My Advice:** Stick to the current Server-side 360p storage. 10 videos (360p) is only **250MB**. A standard server has 500GB+, which fits **20,000+ videos**. Space isn't an issue yet.
