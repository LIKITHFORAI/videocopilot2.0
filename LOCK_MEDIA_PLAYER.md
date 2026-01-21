# 🔒 LOCKED: MEDIA PLAYER & UPLOAD logic
# This file serves as a lock to prevent further modifications to the core media playback system.
# DO NOT EDIT the following files without explicit user overrides:
# - src/components/media/VideoPlayer.tsx
# - src/app/api/media/[mediaId]/stream/route.ts
# - src/app/api/upload/route.ts

# STATUS:
# - Upload: Works (Stream pipeline)
# - Playback: Works (Unique key prop forces re-render on 'COMPLETED' status)
# - Storage: Optimized (360p re-encode + audio)
