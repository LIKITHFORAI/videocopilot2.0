'use client';

import FileUploader, { FileUploaderRef } from '../components/Upload/FileUploader';
import VideoPlayer, { VideoPlayerRef } from '../components/media/VideoPlayer';
import IntelligencePanel from '../components/analysis/IntelligencePanel';
import TranscriptPanel from '../components/analysis/TranscriptPanel';
import ActionItemsPanel from '../components/analysis/ActionItemsPanel';
import AuthGate from '../components/Auth/AuthGate';
import { useState, useRef } from 'react';
import { useMsal } from '@azure/msal-react';

export default function Home() {
  const { accounts } = useMsal();
  const [activeMediaId, setActiveMediaId] = useState<string | null>(null);
  const [activeJobId, setActiveJobId] = useState<string | null>(null);
  const [jobStatus, setJobStatus] = useState<string>('');
  const [jobProgress, setJobProgress] = useState<number>(0);

  const videoPlayerRef = useRef<VideoPlayerRef>(null);
  const fileUploaderRef = useRef<FileUploaderRef>(null);

  // Gate entire app behind authentication (unless bypass is enabled)
  const isAuthBypassed = process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true';

  if (!isAuthBypassed && accounts.length === 0) {
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
