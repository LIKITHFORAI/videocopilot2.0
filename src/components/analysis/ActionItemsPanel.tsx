'use client';

import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { getCategoryColor, theme } from '@/lib/theme';
import { getApiPath } from '@/lib/apiPath';

interface ActionItemsPanelProps {
    mediaId: string | null;
    jobId: string | null;
    jobStatus: string;
    onSeek: (time: number) => void;
}

interface ActionItem {
    id: string;
    category: string;
    action_item: string;
    responsible_party: string;
    due_date: string;
    notes?: string;
    timestamp: number;
}

export default function ActionItemsPanel({ mediaId, jobId, jobStatus, onSeek }: ActionItemsPanelProps) {
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

        // CRITICAL: Only fetch action items once transcription is complete
        if (jobStatus !== 'COMPLETED') {
            // Show "processing" state while job is running
            setActionItems([]);
            setError(null);
            setLoading(jobStatus !== '' && jobStatus !== 'FAILED');
            return;
        }

        // Clear old data when switching to a new completed video
        setActionItems([]);
        setError(null);

        const fetchActionItems = async () => {
            setLoading(true);
            try {
                // Fetch action items
                const res = await fetch(getApiPath(`/api/action-items/${mediaId}`));
                if (res.ok) {
                    const data = await res.json();
                    setActionItems(data);
                    setError(null);
                } else {
                    const errorMsg = 'Failed to load action items';
                    setError(errorMsg);
                    console.error('Action items API error:', res.status, res.statusText);
                }

                // Fetch transcript to get video title and summary
                try {
                    const transcriptRes = await fetch(getApiPath(`/api/transcript/${mediaId}`));
                    if (transcriptRes.ok) {
                        const transcriptData = await transcriptRes.json();
                        setVideoTitle(transcriptData.title || 'Meeting Recording');
                        setVideoSummary(transcriptData.summary || '');
                    }
                } catch (err) {
                    console.error('Error fetching transcript:', err);
                    setVideoTitle('Meeting Recording');
                    setVideoSummary('');
                }
            } catch (err) {
                console.error('Error fetching action items:', err);
                setError('Network error');
            } finally {
                setLoading(false);
            }
        };

        fetchActionItems();
    }, [mediaId, jobStatus]);

    const formatDate = (dateStr: string) => {
        if (dateStr === 'N/A') return 'No due date';
        try {
            const date = new Date(dateStr);
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        } catch {
            return dateStr;
        }
    };

    const formatTime = (seconds: number) => {
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    };

    const handleEmailDraft = (item: ActionItem) => {
        // Remove category prefix from action item
        const cleanActionItem = item.action_item.replace(new RegExp(`^${item.category}\\s*-\\s*`, 'i'), '');

        // Build email subject
        const subject = `Action Required: ${item.category} - ${cleanActionItem}`;

        // Build email body with meeting context
        const summarySnippet = videoSummary
            ? videoSummary.substring(0, 300) + (videoSummary.length > 300 ? '...' : '')
            : 'See video for full context.';

        const body = `Hi ${item.responsible_party},

Action Item from Meeting: ${videoTitle}

TASK:
${cleanActionItem}

CATEGORY: ${item.category}
DUE DATE: ${item.due_date}
VIDEO TIMESTAMP: ${formatTime(item.timestamp)}

MEETING CONTEXT:
${summarySnippet}${item.notes ? `

ADDITIONAL NOTES:
${item.notes}` : ''}

---
This email was generated from Video Copilot. Please review and add any additional details before sending.`;

        // Build Outlook Web compose URL with proper encoding
        const outlookWebUrl = `https://outlook.office.com/mail/deeplink/compose?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        // Open Outlook Web in new tab
        window.open(outlookWebUrl, '_blank');
    };

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
            console.error('Error regenerating action items:', err);
            setError('Failed to regenerate action items');
        } finally {
            setRegenerating(false);
        }
    };

    const handleExportToExcel = () => {
        if (actionItems.length === 0) {
            alert('No action items to export');
            return;
        }

        // Create workbook and worksheet
        const wb = XLSX.utils.book_new();

        // Define headers
        const headers = [
            'Action Items Category',
            'Action Item',
            'Action Notes',
            'Responsible Party',
            'Due Date',
            'My Notes'
        ];

        // Map action items data to rows
        const data = actionItems.map(item => {
            // Remove category prefix from action_item (e.g., "Reports - Task" becomes "Task")
            let cleanActionItem = item.action_item || '';
            const categoryPrefix = `${item.category} - `;
            if (cleanActionItem.startsWith(categoryPrefix)) {
                cleanActionItem = cleanActionItem.substring(categoryPrefix.length);
            }

            return [
                item.category || '',
                cleanActionItem,
                item.notes || '',
                item.responsible_party || '',
                item.due_date || '',
                '' // My Notes - empty for user to fill
            ];
        });

        // Combine headers and data
        const wsData = [headers, ...data];

        // Create worksheet
        const ws = XLSX.utils.aoa_to_sheet(wsData);

        // Set column widths for better readability
        ws['!cols'] = [
            { wch: 25 }, // Action Items Category
            { wch: 40 }, // Action Item
            { wch: 30 }, // Action Notes
            { wch: 25 }, // Responsible Party
            { wch: 15 }, // Due Date
            { wch: 30 }  // My Notes
        ];

        // Style the header row (row 1)
        const headerStyle = {
            font: { bold: true, color: { rgb: 'FFFFFF' } }, // White text, bold
            fill: { fgColor: { rgb: '4A90E2' } }, // Light blue background
            alignment: { horizontal: 'center', vertical: 'center' }
        };

        // Apply styles to header cells (A1 to F1)
        ['A1', 'B1', 'C1', 'D1', 'E1', 'F1'].forEach(cell => {
            if (ws[cell]) {
                ws[cell].s = headerStyle;
            }
        });

        // Add worksheet to workbook
        XLSX.utils.book_append_sheet(wb, ws, 'Action Items');

        // Generate filename using video title
        const timestamp = new Date().toISOString().split('T')[0];
        const sanitizedTitle = videoTitle.replace(/[^a-zA-Z0-9]/g, '_');
        const filename = `${sanitizedTitle}_${timestamp}.xlsx`;

        // Download file
        XLSX.writeFile(wb, filename);
    };

    return (
        <div className="action-items-panel">
            <div className="panel-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div className="action-items-header" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1.5rem',
                    borderBottom: `1px solid ${theme.colors.border.default}`
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <h2 style={{ fontSize: '1.3rem', fontWeight: '700', margin: 0, color: theme.colors.text.primary }}>
                            Action Items
                        </h2>
                        {mediaId && (
                            <button
                                onClick={regenerateActionItems}
                                disabled={regenerating || loading}
                                title="Regenerate Action Items"
                                style={{
                                    background: regenerating ? theme.colors.border.light : 'transparent',
                                    color: theme.colors.text.secondary,
                                    border: `1px solid ${theme.colors.border.default}`,
                                    borderRadius: '50%',
                                    width: '32px',
                                    height: '32px',
                                    cursor: regenerating || loading ? 'not-allowed' : 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.2s',
                                    opacity: regenerating || loading ? 0.5 : 1
                                }}
                                onMouseEnter={(e) => {
                                    if (!regenerating && !loading) {
                                        e.currentTarget.style.background = theme.colors.upload.hoverBg;
                                        e.currentTarget.style.borderColor = theme.colors.primary;
                                        e.currentTarget.style.color = theme.colors.primary;
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!regenerating && !loading) {
                                        e.currentTarget.style.background = 'transparent';
                                        e.currentTarget.style.borderColor = theme.colors.border.default;
                                        e.currentTarget.style.color = theme.colors.text.secondary;
                                    }
                                }}
                            >
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    style={{
                                        animation: regenerating ? 'spin 1s linear infinite' : 'none'
                                    }}
                                >
                                    <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
                                </svg>
                            </button>
                        )}
                    </div>

                    {/* Export Button - Only show when action items are available */}
                    {actionItems.length > 0 && (
                        <button
                            onClick={handleExportToExcel}
                            title="Export to Excel"
                            style={{
                                background: theme.colors.status.success,
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                padding: '0.5rem 1rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                fontSize: '0.875rem',
                                fontWeight: '600',
                                transition: 'background 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = '#059669'} // Keep darker shade for hover or add to theme
                            onMouseLeave={(e) => e.currentTarget.style.background = theme.colors.status.success}
                        >
                            {/* Excel Icon */}
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                                <line x1="16" y1="13" x2="8" y2="13"></line>
                                <line x1="16" y1="17" x2="8" y2="17"></line>
                                <polyline points="10 9 9 9 8 9"></polyline>
                            </svg>
                            Export to Excel
                        </button>
                    )}
                </div>

                <div className="action-items-content" style={{ flex: 1, padding: '1.5rem', overflowY: 'auto' }}>
                    {!mediaId && (
                        <div style={{ textAlign: 'center', opacity: 0.6, marginTop: '3rem', color: theme.colors.text.secondary }}>
                            <p>Upload a video to extract action items.</p>
                        </div>
                    )}

                    {mediaId && loading && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="skeleton" style={{ height: '80px', borderRadius: '12px' }}></div>
                            ))}
                        </div>
                    )}

                    {mediaId && error && actionItems.length === 0 && (
                        <div style={{ textAlign: 'center', color: theme.colors.status.error, marginTop: '3rem' }}>
                            <p>{error}</p>
                        </div>
                    )}

                    {mediaId && !loading && !error && actionItems.length === 0 && (
                        <div style={{ textAlign: 'center', opacity: 0.6, marginTop: '3rem', color: theme.colors.text.secondary }}>
                            <p>No action items detected in this video.</p>
                            <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>
                                Action items will appear here automatically.
                            </p>
                        </div>
                    )}

                    {actionItems.length > 0 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {actionItems.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => handleEmailDraft(item)}
                                    style={{
                                        padding: '1rem',
                                        background: 'white',
                                        border: `1px solid ${theme.colors.border.default}`,
                                        borderRadius: '12px',
                                        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                                        transition: 'all 0.2s',
                                        cursor: 'pointer',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
                                    }}
                                >
                                    {/* Category Badge */}
                                    <div style={{
                                        display: 'inline-block',
                                        padding: '0.25rem 0.75rem',
                                        background: getCategoryColor(item.category),
                                        borderRadius: '6px',
                                        fontSize: '0.75rem',
                                        fontWeight: '600',
                                        marginBottom: '0.75rem',
                                        color: theme.colors.text.primary
                                    }}>
                                        {item.category}
                                    </div>

                                    {/* Action Item Text */}
                                    <p style={{
                                        fontSize: '0.95rem',
                                        margin: '0 0 0.75rem 0',
                                        fontWeight: '500',
                                        lineHeight: '1.5',
                                        color: theme.colors.text.primary
                                    }}>
                                        {/* Remove category prefix from text if it exists (e.g., "Reports - Ensure..." -> "Ensure...") */}
                                        {item.action_item.replace(new RegExp(`^${item.category}\\s*-\\s*`, 'i'), '')}
                                    </p>

                                    {/* Responsible Party */}
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        fontSize: '0.85rem',
                                        color: theme.colors.text.secondary,
                                        marginBottom: '0.5rem'
                                    }}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                            <circle cx="12" cy="7" r="4"></circle>
                                        </svg>
                                        <span>{item.responsible_party}</span>
                                    </div>

                                    {/* Due Date */}
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        marginTop: '0.75rem',
                                        paddingTop: '0.75rem',
                                        borderTop: `1px solid ${theme.colors.border.light}`
                                    }}>
                                        <span style={{ fontSize: '0.85rem', color: theme.colors.text.secondary }}>
                                            {formatDate(item.due_date)}
                                        </span>

                                        {/* Jump Button - Outline Style */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onSeek(item.timestamp);
                                            }}
                                            style={{
                                                padding: '0.3rem 0.8rem',
                                                background: 'white',
                                                color: theme.colors.primary,
                                                border: `1px solid ${theme.colors.primary}`,
                                                borderRadius: '6px',
                                                fontSize: '0.8rem',
                                                fontWeight: '600',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.3rem',
                                                transition: 'all 0.2s'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.background = theme.colors.primary;
                                                e.currentTarget.style.color = 'white';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.background = 'white';
                                                e.currentTarget.style.color = theme.colors.primary;
                                            }}
                                        >
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M13 5l7 7-7 7M5 12h14" />
                                            </svg>
                                            Jump
                                        </button>
                                    </div>

                                    {/* Notes (if any) */}
                                    {item.notes && (
                                        <div style={{
                                            marginTop: '0.75rem',
                                            padding: '0.5rem',
                                            background: '#f9fafb', // Keep or replace with a theme subtle bg if available
                                            borderRadius: '6px',
                                            fontSize: '0.8rem',
                                            color: theme.colors.text.secondary,
                                            fontStyle: 'italic'
                                        }}>
                                            Note: {item.notes}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
