'use client';

import FileUploader, { FileUploaderRef } from '../components/Upload/FileUploader';
import VideoPlayer, { VideoPlayerRef } from '../components/media/VideoPlayer';
import IntelligencePanel from '../components/analysis/IntelligencePanel';
import TranscriptPanel from '../components/analysis/TranscriptPanel';
import ActionItemsPanel from '../components/analysis/ActionItemsPanel';
import AuthGate from '../components/Auth/AuthGate';
import { useState, useRef, useEffect } from 'react';
import { useMsal, useIsAuthenticated } from '@azure/msal-react';
import { InteractionStatus } from '@azure/msal-browser';

import PersonalityChooser, { Personality } from '../components/Personality/PersonalityChooser';

export default function Home() {
  const { inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const [activeMediaId, setActiveMediaId] = useState<string | null>(null);
  const [activeJobId, setActiveJobId] = useState<string | null>(null);
  const [jobStatus, setJobStatus] = useState<string>('');
  const [jobProgress, setJobProgress] = useState<number>(0);
  const [personality, setPersonality] = useState<Personality>('meetings');

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

  const handleSeek = (time: number) => {
    videoPlayerRef.current?.seekTo(time);
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
