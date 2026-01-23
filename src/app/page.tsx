'use client';

import FileUploader, { FileUploaderRef } from '../components/Upload/FileUploader';
import VideoPlayer, { VideoPlayerRef } from '../components/media/VideoPlayer';
import IntelligencePanel from '../components/analysis/IntelligencePanel';
import { useState, useRef } from 'react';

export default function Home() {
  const [activeMediaId, setActiveMediaId] = useState<string | null>(null);
  const [activeJobId, setActiveJobId] = useState<string | null>(null);
  const [jobStatus, setJobStatus] = useState<string>('');
  const [jobProgress, setJobProgress] = useState<number>(0);

  const videoPlayerRef = useRef<VideoPlayerRef>(null);
  const fileUploaderRef = useRef<FileUploaderRef>(null);

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

  return (
    <div className="container">
      <FileUploader
        ref={fileUploaderRef}
        onUploadComplete={handleUploadComplete}
        currentJobStatus={jobStatus}
        currentJobProgress={jobProgress}
      />

      <main className="main-layout">
        <VideoPlayer
          ref={videoPlayerRef}
          mediaId={activeMediaId}
          jobStatus={jobStatus}
          onFileDrop={handleFileDrop}
        />
        <IntelligencePanel
          mediaId={activeMediaId}
          jobId={activeJobId}
          onSeek={handleSeek}
          onStatusChange={setJobStatus}
          onProgressChange={setJobProgress}
        />
      </main>
    </div>
  );
}
