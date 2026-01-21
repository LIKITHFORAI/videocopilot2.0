# Video Copilot 🎥🤖

Video Copilot is an AI-powered tool that analyzes videos, creates transcripts, generates summaries, and allows you to chat with your video content. It features clickable highlights that jump directly to the relevant moment in the video.

## 🚀 Step-by-Step Installation Guide (Windows, Mac, Linux)

Follow these detailed steps carefully to ensure everything runs smoothly.

### 📌 Phase 1: Install Prerequisites

You need two main tools installed on your computer before the app can work.

#### 1. Install Node.js
Node.js allows you to run the application code (JavaScript).
1.  Go to the [official Node.js website](https://nodejs.org/).
2.  Download the **LTS Version** (Recommended).
3.  Run the installer and click "Next" through all the defaults.

#### 2. Install FFmpeg (CRITICAL STEP)
FFmpeg is the engine that processes video and audio. It must be installed correctly.

**👉 For Windows Users:**
1.  **Download**: Go to [gyan.dev/ffmpeg/builds](https://www.gyan.dev/ffmpeg/builds/) and download the file named `ffmpeg-git-full.7z`.
2.  **Extract**: 
    *   Use a tool like 7-Zip or WinRAR to extract the downloaded file.
    *   Rename the extracted folder to just `ffmpeg`.
3.  **Place the Folder**:
    *   Move this `ffmpeg` folder to your C: drive directly. 
    *   The path should look like this: `C:\ffmpeg`.
    *   Inside, you should see a `bin` folder at `C:\ffmpeg\bin`.
4.  **Add to System Path** (This lets your command prompt find FFmpeg):
    *   Press the **Windows Key** and type "Edit the system environment variables". Click the result.
    *   Click the **"Environment Variables..."** button at the bottom right.
    *   In the **System variables** section (bottom box), find the variable named **Path** and select it.
    *   Click **"Edit..."**.
    *   Click **"New"** on the right side.
    *   Type exactly: `C:\ffmpeg\bin`
    *   Click **OK** on all open windows to save.
5.  **Verify**: Open a **new** Command Prompt window and type `ffmpeg -version`. If you see version details, you did it correctly!

**👉 For Mac Users:**
1.  Open your Terminal (Command + Space, type "Terminal").
2.  Run this command (requires Homebrew): 
    ```bash
    brew install ffmpeg
    ```

---

### 📌 Phase 2: Set Up the Project

#### 1. Open the Project Folder
Ensure you are inside the `video-copilot` folder.
*   If you downloaded the code as a ZIP: Extract it, then right-click inside the `video-copilot` folder and select "Open with Code" or "Open in Terminal".
*   Or open your terminal and `cd` into the directory:
    ```bash
    cd path\to\your\video-copilot
    ```

#### 2. Install Dependencies
In your terminal, run:

```bash
npm install
```

*(This creates a `node_modules` folder. It might take a minute.)*

#### 3. Set Up Your API Key
1.  Inside the `video-copilot` folder, create a new file named `.env.local` (ensure it starts with a dot).
2.  Open this file in Notepad or VS Code.
3.  Paste the following line, replacing `sk-...` with your actual OpenAI API Key:

```env
OPENAI_API_KEY=sk-your-real-openai-key-goes-here
```

*(If you don't have a key, sign up at [platform.openai.com](https://platform.openai.com))*

---

### 📌 Phase 3: Run the Application

You are now ready to launch!

1.  In your terminal, run:
    ```bash
    npm run dev
    ```
2.  Wait until you see a message saying `Ready in ...` and `url: http://localhost:3000`.
3.  Open your web browser (Chrome, Edge, etc.).
4.  Type **`http://localhost:3000`** in the address bar and press Enter.

---

## 💡 How to Use Video Copilot

1.  **Upload**: Click the blue "Upload New" button. Select a video file.
2.  **Processing**: Watch the progress bar at the top. It handles:
    *   Uploading 📤
    *   Extracting Audio 🎵
    *   Transcribing (Speech to Text) 📝
    *   AI Suggesting Highlights 🤖
3.  **Interact**:
    *   **Bubble Highlights**: Click on the orange/white bubbles in the chat panel to jump specifically to that moment in the video.
    *   **Ask Questions**: Type "How do I fix X?" in the chat box. The AI will answer with clickable timestamps (e.g., `[04:20]`) that also jump the video.

## ❓ Troubleshooting

*   **"ffmpeg is not recognized..."**: You likely didn't add the `bin` folder to your Path correctly. Go back to Phase 1, Step 4. You must restart your terminal/VS Code after changing environment variables.
*   **Video stays black**: Refresh the page. If it persists, ensure your video file isn't corrupted.
*   **Chat says "Offline Mode"**: Check your `.env.local` file. Ensure the API key is correct and saved.
