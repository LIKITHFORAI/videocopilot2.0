'use client';

import { useEffect, useState } from 'react';
import { theme } from '@/shared/design/theme';

interface MinimalProgressBarProps {
    currentStatus?: string;
    progress?: number;
}

export default function MinimalProgressBar({ currentStatus = '', progress = 0 }: MinimalProgressBarProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [stage, setStage] = useState('');

    useEffect(() => {
        // Determine stage based on status
        if (currentStatus === 'UPLOADING') {
            setStage('Uploading File');
            setIsVisible(true);
        } else if (
            currentStatus === 'QUEUED' ||
            currentStatus === 'PREPARING' ||
            currentStatus === 'EXTRACTING_AUDIO' ||
            currentStatus === 'COMPRESSING_VIDEO' ||
            currentStatus === 'CHUNKING' ||
            currentStatus === 'TRANSCRIBING' ||
            currentStatus === 'TRANSCRIBING_CHUNK'
        ) {
            setStage('Processing File');
            setIsVisible(true);
        } else if (
            currentStatus === 'SUMMARIZING' ||
            currentStatus === 'MERGING' ||
            currentStatus === 'CLEANUP'
        ) {
            setStage('Generating Content');
            setIsVisible(true);
        } else if (currentStatus === 'COMPLETED' || currentStatus === 'FAILED' || currentStatus === '') {
            setIsVisible(false);
        }
    }, [currentStatus]);

    if (!isVisible) return null;

    return (
        <>
            {/* Progress Bar Track - Attached directly to header */}
            <div style={{
                width: '100%',
                height: '2px',
                backgroundColor: theme.colors.progressBar.bg,
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Progress Fill */}
                <div style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    height: '100%',
                    width: `${Math.min(progress, 100)}%`,
                    backgroundColor: theme.colors.progressBar.fill,
                    transition: 'width 2s ease-in-out'
                }} />
            </div>

            {/* Helper Text - Centered below bar */}
            <div style={{
                width: '100%',
                backgroundColor: 'transparent',
                paddingTop: '0.5rem',
                paddingBottom: '0.5rem',
                fontSize: '12px',
                color: theme.colors.text.light,
                textAlign: 'center',
                fontWeight: '500'
            }}>
                {stage}
            </div>
        </>
    );
}
