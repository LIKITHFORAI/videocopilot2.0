# 🔬 Gemini Vision Integration - Setup & Testing Guide

## 🎯 Overview

We've successfully integrated **Google Gemini 1.5 Flash Vision** into Video Copilot! This allows the system to analyze video frames and understand UI elements, creating detailed descriptions that users can search through.

---

## 🔑 Step 1: Get Your Gemini API Key

### Option A: Google AI Studio (Recommended - Free Tier)

1. **Visit Google AI Studio:**
   - Go to: https://aistudio.google.com/app/apikey

2. **Sign in:**
   - Use your Google account

3. **Create API Key:**
   - Click **"Get API Key"** or **"Create API Key"**
   - Select **"Create API key in new project"** (or use existing project)
   - Copy the API key (starts with `AIza...`)

4. **Add to .env.local:**
   ```bash
   GEMINI_API_KEY=AIzaSy...your_actual_key_here
   ```

### Free Tier Limits:
- ✅ **1,500 requests per day** (FREE)
- ✅ **15 requests per minute**
- ✅ No credit card required

---

## 📦 Step 2: Installation (Already Complete!)

We've already installed the required package:
```bash
npm install @google/generative-ai  ✅ DONE
```

---

## 🧪 Step 3: Test Gemini Vision

### A. Find Your Saved Video IDs

Your saved videos are in: `data/uploads/`

Current saved video IDs:
- `061f4e68-fe0d-4bdb-83e1-de1870840fe3`
- `16b97f7c-ae49-49c4-9168-9f91314a25e8`
- `4acb71f2-524a-46b9-8549-5bb19fb435f6`
- `756426aa-6769-4e61-8990-dc90c2ef81f9`
- `9821be76-e617-423c-a11a-f7a1eebcb5cd`
- `d92cdd8e-60fd-4ac2-84fd-496e8a410bdb`
- `f1c346b5-2b56-44dc-a80f-369fb0fa9cf3`

### B. Access the Vision Test Page

1. Make sure your dev server is running:
   ```bash
   npm run dev
   ```

2. Navigate to the test page:
   ```
   http://localhost:3001/vision-test
   ```

3. **Copy one of the Media IDs** from above

4. **Paste it** into the input field

5. Click **"Extract Frames"**
   - This will extract 10 frames (1 every 5 seconds)
   - Frames will appear in a grid

6. Click **"🚀 Analyze All Frames with Gemini"**
   - OR click individual "🔍 Analyze" buttons
   - Gemini will analyze each frame and provide detailed descriptions

---

## 🎨 What Gemini Vision Does

### Input: Video Frame (Screenshot)
For example, a frame showing Excel, Teams, Browser, etc.

### Output: Detailed Description
```
This video frame shows a Microsoft Excel spreadsheet interface. 
The active worksheet displays a data table with the following elements:

1. UI Elements:
   - Top toolbar with standard Excel menu items (File, Home, Insert, etc.)
   - Formula bar showing cell C5 with formula: =SUM(B2:B5)
   - Quick Access Toolbar with Save, Undo, Redo buttons

2. Content:
   - Column A: Date values (Q1 2024 - Q4 2024)
   - Column B: Revenue figures ($45,230 to $67,890)
   - Column C: Calculated totals
   - Active cell: B3 (highlighted in blue)

3. Context:
   - This appears to be a quarterly sales report
   - The user is demonstrating how to create sum formulas
   - The spreadsheet uses default Excel formatting

4. Notable States:
   - Cell C5 is selected (blue border)
   - Formula bar is active
   - No filters or sorting applied
```

---

## 🔍 How It Works (Architecture)

```
┌─────────────────┐
│  Video Upload   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐      ┌──────────────────┐
│  Extract Frames │ ───▶ │ Frame 1 @ 0:00   │
│  (Every 5 sec)  │      │ Frame 2 @ 0:05   │
└─────────────────┘      │ Frame 3 @ 0:10   │
                         └────────┬──────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │  Gemini Vision   │
                         │   API Analysis   │
                         └────────┬──────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │ Frame Database   │
                         │ ─────────────── │
                         │ timestamp: 0:05  │
                         │ description:     │
                         │ "This shows..."  │
                         └──────────────────┘
```

---

## 📊 API Endpoints Created

### 1. `/api/extract-frames` (POST)
Extracts frames from a saved video.

**Request:**
```json
{
  "mediaId": "061f4e68-fe0d-4bdb-83e1-de1870840fe3",
  "intervalSeconds": 5,
  "maxFrames": 10
}
```

**Response:**
```json
{
  "success": true,
  "mediaId": "061f4e68-fe0d-4bdb-83e1-de1870840fe3",
  "frameCount": 10,
  "intervalSeconds": 5,
  "frames": [
    {
      "filename": "frame-001.jpg",
      "timestamp": 0,
      "timestampFormatted": "0:00",
      "data": "data:image/jpeg;base64,/9j/4AAQ..."
    }
  ]
}
```

### 2. `/api/vision` (POST)
Analyzes a single frame with Gemini Vision.

**Request:**
```json
{
  "image": "data:image/jpeg;base64,/9j/4AAQ...",
  "prompt": "Describe this UI screen" // Optional
}
```

**Response:**
```json
{
  "success": true,
  "description": "This video frame shows...",
  "model": "gemini-1.5-flash"
}
```

---

## 🧪 Testing Checklist

### Phase 1: Frame Extraction
- [ ] Navigate to `/vision-test`
- [ ] Enter a valid media ID
- [ ] Click "Extract Frames"
- [ ] Verify frames appear with timestamps
- [ ] Check that images are clear and properly extracted

### Phase 2: Single Frame Analysis
- [ ] Click "🔍 Analyze" on ONE frame
- [ ] Wait for analysis (2-5 seconds)
- [ ] Read the description
- [ ] Verify it accurately describes the frame content

### Phase 3: Batch Analysis
- [ ] Click "🚀 Analyze All Frames with Gemini"
- [ ] Watch as all frames get analyzed sequentially
- [ ] Compare descriptions to actual frame content
- [ ] Assess accuracy and detail level

### Phase 4: Accuracy Verification
Compare Gemini's description to what you actually see:
- [ ] Does it identify UI elements correctly?
- [ ] Does it understand spatial relationships? (top-right, bottom-left)
- [ ] Does it recognize button states? (enabled/disabled, selected/unselected)
- [ ] Does it capture text content accurately?
- [ ] Does it understand the context? (what application, what action)

---

## 💡 Example Test Scenarios

### Scenario 1: Excel Training Video
**What to look for:**
- ✅ Identifies it as Excel/spreadsheet
- ✅ Describes cell references (A1, B2, etc.)
- ✅ Recognizes formulas
- ✅ Identifies selected cells
- ✅ Notes toolbar buttons

### Scenario 2: Software UI Tutorial
**What to look for:**
- ✅ Identifies the application
- ✅ Lists visible menu items
- ✅ Describes button locations
- ✅ Notes selected/active elements
- ✅ Understands the workflow step

### Scenario 3: Meeting Recording
**What to look for:**
- ✅ Identifies presentation software (PowerPoint, etc.)
- ✅ Reads slide titles and key points
- ✅ Describes diagrams or charts
- ✅ Notes presenter actions

---

## 🎯 Success Criteria

**Gemini Vision is working correctly if:**

1. ✅ **Frame Extraction:** Successfully extracts frames at regular intervals
2. ✅ **API Response:** Gemini API returns descriptions without errors
3. ✅ **Accuracy:** Descriptions match what's actually visible in the frame (>85% accuracy)
4. ✅ **UI Understanding:** Correctly identifies buttons, menus, forms, and their states
5. ✅ **Context Awareness:** Understands the broader context (e.g., "step 3 of tutorial")
6. ✅ **Searchability:** Descriptions contain enough detail to answer user queries

---

## 📈 Next Steps After Testing

Once testing is complete and accuracy is verified:

1. **Integrate into Main Upload Flow:**
   - Auto-extract frames during video processing
   - Store frame descriptions in database
   - Enable semantic search across frames

2. **Add Search Functionality:**
   - User searches: "How do I export?"
   - System searches frame descriptions
   - Returns relevant timestamps with screenshots

3. **Optimize Performance:**
   - Implement scene detection (only analyze when scene changes)
   - Add caching to avoid re-analyzing same frames
   - Batch process multiple frames in parallel

4. **UI Enhancements:**
   - Add frame thumbnails to chat responses
   - Click thumbnail to jump to that timestamp
   - Show "Related Frames" sidebar

---

## 🐛 Troubleshooting

### Error: "GEMINI_API_KEY not configured"
**Solution:** Add your API key to `.env.local`:
```bash
GEMINI_API_KEY=AIzaSy...your_key_here
```
Then restart the dev server.

### Error: "Video not found"
**Solution:** Make sure the media ID exists in `data/uploads/[mediaId]/video_360p.mp4`

### Error: "Failed to extract frames"
**Solution:** FFmpeg might not be installed or video file is corrupted. Check FFmpeg installation.

### Error: Rate limit exceeded
**Solution:** You've hit Gemini's free tier limit (1,500/day). Wait 24 hours or upgrade to paid tier.

### Slow Analysis
**Expected:** Each frame takes 2-5 seconds. This is normal for cloud API calls.

---

## 💰 Cost Tracking

### Free Tier (Current):
- **Daily Limit:** 1,500 requests
- **Per Video (10 frames):** 10 requests
- **Videos per day:** ~150 videos within free tier
- **Cost:** $0

### If You Exceed Free Tier:
- **Paid Rate:** $0.075 per 1,000 images
- **Example:** 54,000 frames/day = ~$4/day = $120/month

---

## 🎉 Ready to Test!

You're all set! Here's what to do:

1. **Get API Key:** https://aistudio.google.com/app/apikey
2. **Add to `.env.local`:** `GEMINI_API_KEY=...`
3. **Restart Dev Server:** `npm run dev`
4. **Visit:** http://localhost:3001/vision-test
5. **Test with Media ID:** `061f4e68-fe0d-4bdb-83e1-de1870840fe3`
6. **Analyze and Verify Accuracy!**

---

**Created:** January 21, 2026
**Integration:** Gemini 1.5 Flash Vision API
**Purpose:** UI Element Understanding & Semantic Video Search
