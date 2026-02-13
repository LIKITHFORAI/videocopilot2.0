'use client';

import FileUploader, { FileUploaderRef } from '@/features/upload/components/FileUploader';
import VideoPlayer, { VideoPlayerRef } from '@/features/player/components/VideoPlayer';
import IntelligencePanel from '@/features/intelligence/components/IntelligencePanel';
import TranscriptPanel from '@/features/transcript/components/TranscriptPanel';
import ActionItemsPanel from '@/features/action-items/components/ActionItemsPanel';
import AuthGate from '@/features/auth/components/AuthGate';
import { useState, useRef, useEffect } from 'react';
import { useMsal, useIsAuthenticated } from '@azure/msal-react';
import { InteractionStatus } from '@azure/msal-browser';

import PersonalityChooser, { Personality } from '@/features/personality/components/PersonalityChooser';

import { saveVideoToLocal, getVideoFromLocal, downloadVideoFromServer } from '@/lib/browserStorage';

export default function Home() {
  const { inProgress, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const [activeMediaId, setActiveMediaId] = useState<string | null>(null);
  const [activeJobId, setActiveJobId] = useState<string | null>(null);
  const [jobStatus, setJobStatus] = useState<string>('');
  const [jobProgress, setJobProgress] = useState<number>(0);
  const [personality, setPersonality] = useState<Personality>('meetings');
  const [highlightTimestamp, setHighlightTimestamp] = useState<number | null>(null);

  // Load personality from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('videocopilot_personality') as Personality;
      if (saved && ['meetings', 'training', 'support'].includes(saved)) {
        setPersonality(saved);
      }
    }
  }, []);

  // Save personality to localStorage
  const handlePersonalityChange = (newPersonality: Personality) => {
    setPersonality(newPersonality);
    if (typeof window !== 'undefined') {
      localStorage.setItem('videocopilot_personality', newPersonality);
    }
    // Reset session state when switching modes
    setActiveMediaId(null);
    setActiveJobId(null);
    setJobStatus('');
    setJobProgress(0);
  };

  // Auto-download video to local storage upon completion (for SharePoint imports)
  useEffect(() => {
    async function checkAndDownload() {
      if (jobStatus === 'COMPLETED' && activeMediaId && accounts[0]?.username) {
        const userEmail = accounts[0].username;
        // Check if we have it locally
        const existing = await getVideoFromLocal(activeMediaId, userEmail);
        if (!existing) {
          console.log(`[Page] Job completed but video missing locally (likely SharePoint import). Downloading...`);
          await downloadVideoFromServer(activeMediaId, userEmail);
        }
      }
    }
    checkAndDownload();
  }, [jobStatus, activeMediaId, accounts]);

  const videoPlayerRef = useRef<VideoPlayerRef>(null);
  const fileUploaderRef = useRef<FileUploaderRef>(null);

  // Gate entire app behind authentication (unless bypass is enabled)
  const isAuthBypassed = process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true';
  const isDevBypassed = typeof window !== 'undefined' && localStorage.getItem('devBypassAuth') === 'true';

  // If MSAL is currently processing (login, logout, or handling redirect), show nothing
  if (inProgress !== InteractionStatus.None) {
    return null;
  }

  // If not authenticated and not bypassed, show login page
  if (!isAuthBypassed && !isDevBypassed && !isAuthenticated) {
    return <AuthGate />;
  }

  const handleUploadComplete = (mediaId: string, jobId: string) => {
    setActiveMediaId(mediaId);
    setActiveJobId(jobId);
    setJobStatus('QUEUED');
    setJobProgress(0);
    console.log('Upload complete, mediaId:', mediaId, 'jobId:', jobId);
  };

  const handleLoadExisting = (mediaId: string) => {
    setActiveMediaId(mediaId);
    setActiveJobId(null);       // No job to poll — content already exists
    setJobStatus('COMPLETED');
    setJobProgress(100);
    console.log('Loading existing media:', mediaId);
  };

  const handleSeek = (time: number) => {
    videoPlayerRef.current?.seekTo(time);
    setHighlightTimestamp(time);
  };

  const handleFileDrop = (file: File) => {
    fileUploaderRef.current?.uploadFile(file);
  };

  const handleCancel = () => {
    setActiveMediaId(null);
    setActiveJobId(null);
    setJobStatus('');
    setJobProgress(0);
    console.log('Job cancelled and state reset');
  };

  return (
    <div className="container">
      <FileUploader
        ref={fileUploaderRef}
        onUploadComplete={handleUploadComplete}
        onLoadExisting={handleLoadExisting}
        currentJobStatus={jobStatus}
        currentJobProgress={jobProgress}
        onCancel={handleCancel}
        personality={personality}
        onPersonalityChange={handlePersonalityChange}
      />

      <main className="main-layout">
        <div className="left-column">
          <VideoPlayer
            ref={videoPlayerRef}
            mediaId={activeMediaId}
            jobStatus={jobStatus}
            onFileDrop={handleFileDrop}
          />
          <TranscriptPanel
            mediaId={activeMediaId}
            jobId={activeJobId}
            jobStatus={jobStatus}
            onSeek={handleSeek}
            highlightTimestamp={highlightTimestamp}
            onHighlightDone={() => setHighlightTimestamp(null)}
          />
        </div>

        <div className="middle-column">
          <IntelligencePanel
            mediaId={activeMediaId}
            jobId={activeJobId}
            onSeek={handleSeek}
            onStatusChange={setJobStatus}
            onProgressChange={setJobProgress}
            personality={personality}
          />
        </div>

        <div className="right-column">
          <ActionItemsPanel
            mediaId={activeMediaId}
            jobId={activeJobId}
            jobStatus={jobStatus}
            onSeek={handleSeek}
          />
        </div>
      </main>
    </div>
  );
}
