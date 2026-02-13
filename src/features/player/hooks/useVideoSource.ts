'use client';

import { useState, useEffect } from 'react';
import { useMsal } from '@azure/msal-react';
import { getVideoFromLocal } from '@/lib/browserStorage';
import { getApiPath } from '@/shared/utils/apiPath';

export type SourceType = 'local' | 'server' | 'none';

export function useVideoSource(mediaId: string | null, jobStatus?: string) {
    const { accounts } = useMsal();
    const userEmail = accounts[0]?.username || '';

    const [videoSrc, setVideoSrc] = useState<string | null>(null);
    const [sourceType, setSourceType] = useState<SourceType>('none');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!mediaId) {
            setVideoSrc(null);
            setSourceType('none');
            return;
        }

        let cancelled = false;
        const blobUrlRef: { current: string | null } = { current: null };

        async function resolveSource() {
            setLoading(true);

            // 1. Try IndexedDB (local blob)
            try {
                const local = await getVideoFromLocal(mediaId!, userEmail);
                if (local && !cancelled) {
                    const url = URL.createObjectURL(local.blob);
                    blobUrlRef.current = url;
                    setVideoSrc(url);
                    setSourceType('local');
                    setLoading(false);
                    return;
                }
            } catch (e) {
                console.warn('[useVideoSource] IndexedDB lookup failed:', e);
            }

            // 2. Try server stream (HEAD request to check if file exists)
            try {
                const resp = await fetch(getApiPath(`/api/media/${mediaId}/stream`), { method: 'HEAD' });
                if (resp.ok && !cancelled) {
                    setVideoSrc(getApiPath(`/api/media/${mediaId}/stream`));
                    setSourceType('server');
                    setLoading(false);
                    return;
                }
            } catch (e) {
                console.warn('[useVideoSource] Server stream check failed:', e);
            }

            // 3. Neither available
            if (!cancelled) {
                setVideoSrc(null);
                setSourceType('none');
                setLoading(false);
            }
        }

        resolveSource();

        return () => {
            cancelled = true;
            // Revoke blob URL to free memory
            if (blobUrlRef.current) {
                URL.revokeObjectURL(blobUrlRef.current);
            }
        };
    }, [mediaId, jobStatus, userEmail]);

    return { videoSrc, sourceType, loading };
}
