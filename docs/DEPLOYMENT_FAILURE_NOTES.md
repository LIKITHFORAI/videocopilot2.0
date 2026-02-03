# Deployment Upload Failure Notes

## Issue Verified
Uploads fail when accessing the application via the deployed URL (Cloudflare Tunnel), particularly for larger video files.

## Root Cause Analysis
1.  **Cloudflare Tunnel Limit**: `trycloudflare.com` (Quick Tunnels) and Free/Pro Cloudflare plans have a strict **100MB upload limit** per HTTP request.
2.  **Current Implementation**: 
    - `src/components/Upload/FileUploader.tsx` uses `xhr.send(file)` to send the entire file in a single request.
    - `src/app/api/upload/route.ts` expects the full file in the request body.
3.  **Logs**: `tunnel.log` shows `stream canceled by remote` errors, which is characteristic of the tunnel terminating a connection that exceeds the size limit.

## Fix Recommendations

### Option A: Chunked Uploads (Recommended)
Refactor the upload pipeline to split files into smaller chunks (e.g., 50MB) on the client side and reassemble them on the server. This bypasses the 100MB request limit because each chunk is a separate, smaller HTTP request.

**Required Changes:**
1.  **Frontend (`FileUploader.tsx`)**: 
    - Split `File` into blobs using `file.slice()`.
    - Upload sequentially or in parallel.
    - Add retry logic for reliability.
2.  **Backend (`api/upload/route.ts`)**: 
    - Accept `Content-Range` or custom headers (chunk index, total chunks).
    - Append chunks to a temporary file.
    - Finalize/Rename file upon receiving the last chunk.

### Option B: Direct-to-Storage (Alternative)
Upload directly to Azure Blob Storage or AWS S3 using signed URLs, bypassing the application server (and thus the tunnel) for the data transfer. This is more complex to set up as it requires external cloud storage configuration.

## Next Steps
Proceed with **Option A** as it keeps the architecture self-contained (local storage) and solves the immediate deployment issue without requiring new cloud subscriptions.
