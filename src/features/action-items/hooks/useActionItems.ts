'use client';

import { useState, useEffect } from 'react';
import { getApiPath } from '@/shared/utils/apiPath';

export interface ActionItem {
    id: string;
    category: string;
    action_item: string;
    responsible_party: string;
    due_date: string;
    notes?: string;
    timestamp: number;
}

export function useActionItems(mediaId: string | null, jobStatus: string) {
    const [actionItems, setActionItems] = useState<ActionItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [videoTitle, setVideoTitle] = useState<string>('');
    const [videoSummary, setVideoSummary] = useState<string>('');
    const [regenerating, setRegenerating] = useState(false);

    useEffect(() => {
        if (!mediaId) {
            setActionItems([]);
            setLoading(false);
            setError(null);
            return;
        }

        if (jobStatus !== 'COMPLETED') {
            setActionItems([]);
            setError(null);
            setLoading(jobStatus !== '' && jobStatus !== 'FAILED');
            return;
        }

        setActionItems([]);
        setError(null);

        const fetchActionItems = async () => {
            setLoading(true);
            try {
                const res = await fetch(getApiPath(`/api/action-items/${mediaId}`));
                if (res.ok) {
                    const data = await res.json();
                    setActionItems(data);
                    setError(null);
                } else {
                    setError('Failed to load action items');
                }

                try {
                    const transcriptRes = await fetch(getApiPath(`/api/transcript/${mediaId}`));
                    if (transcriptRes.ok) {
                        const transcriptData = await transcriptRes.json();
                        setVideoTitle(transcriptData.title || 'Meeting Recording');
                        setVideoSummary(transcriptData.summary || '');
                    }
                } catch (err) {
                    setVideoTitle('Meeting Recording');
                    setVideoSummary('');
                }
            } catch (err) {
                setError('Network error');
            } finally {
                setLoading(false);
            }
        };

        fetchActionItems();
    }, [mediaId, jobStatus]);

    const regenerateActionItems = async () => {
        if (!mediaId) return;

        setRegenerating(true);
        setError(null);

        try {
            const res = await fetch(getApiPath(`/api/action-items/${mediaId}/regenerate`), {
                method: 'POST',
            });

            if (res.ok) {
                const data = await res.json();
                setActionItems(data);
                setError(null);
            } else {
                const errorText = await res.text();
                setError(`Failed to regenerate: ${errorText}`);
            }
        } catch (err) {
            setError('Failed to regenerate action items');
        } finally {
            setRegenerating(false);
        }
    };

    return {
        actionItems,
        loading,
        error,
        videoTitle,
        videoSummary,
        regenerating,
        regenerateActionItems,
        setActionItems
    };
}
