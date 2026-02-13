'use client';

import * as XLSX from 'xlsx';
import { getCategoryColor } from '@/shared/design/theme';
import { formatTime } from '@/shared/utils/formatTime';
import { formatDate } from '@/shared/utils/formatDate';
import { useActionItems, ActionItem } from '../hooks/useActionItems';

interface ActionItemsPanelProps {
    mediaId: string | null;
    jobId: string | null;
    jobStatus: string;
    onSeek: (time: number) => void;
}

export default function ActionItemsPanel({ mediaId, jobId, jobStatus, onSeek }: ActionItemsPanelProps) {
    const {
        actionItems,
        loading,
        error,
        videoTitle,
        videoSummary,
        regenerating,
        regenerateActionItems,
        setActionItems
    } = useActionItems(mediaId, jobStatus);

    const handleEmailDraft = (item: ActionItem) => {
        const cleanActionItem = item.action_item.replace(new RegExp(`^${item.category}\\s*-\\s*`, 'i'), '');
        const subject = `Action Required: ${item.category} - ${cleanActionItem}`;
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

        const outlookWebUrl = `https://outlook.office.com/mail/deeplink/compose?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.open(outlookWebUrl, '_blank');
    };

    const handleExportToExcel = () => {
        if (actionItems.length === 0) {
            alert('No action items to export');
            return;
        }

        const wb = XLSX.utils.book_new();
        const headers = [
            'Action Items Category',
            'Action Item',
            'Action Notes',
            'Responsible Party',
            'Due Date',
            'My Notes'
        ];

        const data = actionItems.map(item => {
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
                ''
            ];
        });

        const wsData = [headers, ...data];
        const ws = XLSX.utils.aoa_to_sheet(wsData);
        ws['!cols'] = [
            { wch: 25 }, { wch: 40 }, { wch: 30 }, { wch: 25 }, { wch: 15 }, { wch: 30 }
        ];

        XLSX.utils.book_append_sheet(wb, ws, 'Action Items');
        const timestamp = new Date().toISOString().split('T')[0];
        const sanitizedTitle = videoTitle.replace(/[^a-zA-Z0-9]/g, '_');
        const filename = `${sanitizedTitle}_${timestamp}.xlsx`;
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
                    borderBottom: `1px solid var(--border-default)`,
                    background: 'var(--action-header-bg)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <h2 style={{ fontSize: '1.3rem', fontWeight: '700', margin: 0, color: 'var(--action-task-text)' }}>
                            Action Items {actionItems.length > 0 && `(${actionItems.length})`}
                        </h2>
                        {mediaId && (
                            <button
                                onClick={regenerateActionItems}
                                disabled={regenerating || loading}
                                title="Regenerate Action Items"
                                style={{
                                    background: regenerating ? 'var(--border-default)' : 'transparent',
                                    color: 'var(--text-secondary)',
                                    border: `1px solid var(--border-default)`,
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
                                        e.currentTarget.style.background = 'var(--upload-hover-bg)';
                                        e.currentTarget.style.borderColor = 'var(--primary)';
                                        e.currentTarget.style.color = 'var(--primary)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!regenerating && !loading) {
                                        e.currentTarget.style.background = 'transparent';
                                        e.currentTarget.style.borderColor = 'var(--border-default)';
                                        e.currentTarget.style.color = 'var(--text-secondary)';
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

                    {actionItems.length > 0 && (
                        <button
                            onClick={handleExportToExcel}
                            title="Export to Excel"
                            style={{
                                background: 'var(--action-export-btn-bg)',
                                color: 'var(--btn-success-text)',
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
                            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                        >
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
                        <div style={{ textAlign: 'center', opacity: 0.6, marginTop: '3rem', color: 'var(--text-secondary)' }}>
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
                        <div style={{ textAlign: 'center', color: 'var(--status-error)', marginTop: '3rem' }}>
                            <p>{error}</p>
                        </div>
                    )}

                    {mediaId && !loading && !error && actionItems.length === 0 && (
                        <div style={{ textAlign: 'center', opacity: 0.6, marginTop: '3rem', color: 'var(--text-secondary)' }}>
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
                                        background: 'var(--action-card-bg)',
                                        border: `1px solid var(--action-card-border)`,
                                        borderRadius: '12px',
                                        boxShadow: 'var(--action-card-shadow)',
                                        transition: 'all 0.2s',
                                        cursor: 'pointer',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.boxShadow = '0 4px 12px var(--modal-overlay)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.boxShadow = 'var(--action-card-shadow)';
                                    }}
                                >
                                    <div style={{
                                        display: 'inline-block',
                                        padding: '0.25rem 0.75rem',
                                        background: getCategoryColor(item.category),
                                        borderRadius: '6px',
                                        fontSize: '0.75rem',
                                        fontWeight: '600',
                                        marginBottom: '0.75rem',
                                        color: 'var(--action-badge-text)',
                                        border: `1px solid var(--action-card-border)`,
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                    }}>
                                        {item.category}
                                    </div>

                                    <p style={{
                                        fontSize: '0.95rem',
                                        margin: '0 0 0.75rem 0',
                                        fontWeight: '500',
                                        lineHeight: '1.5',
                                        color: 'var(--action-task-text)'
                                    }}>
                                        {item.action_item.replace(new RegExp(`^${item.category}\\s*-\\s*`, 'i'), '')}
                                    </p>

                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        fontSize: '0.85rem',
                                        color: 'var(--action-meta-text)',
                                        marginBottom: '0.5rem'
                                    }}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                            <circle cx="12" cy="7" r="4"></circle>
                                        </svg>
                                        <span>{item.responsible_party}</span>
                                    </div>

                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        marginTop: '0.75rem',
                                        paddingTop: '0.75rem',
                                        borderTop: `1px solid var(--action-card-border)`
                                    }}>
                                        <span style={{ fontSize: '0.85rem', color: 'var(--action-meta-text)' }}>
                                            {formatDate(item.due_date)}
                                        </span>

                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onSeek(item.timestamp);
                                            }}
                                            style={{
                                                padding: '0.3rem 0.8rem',
                                                background: 'var(--action-jump-btn-bg)',
                                                color: 'var(--action-jump-btn-text)',
                                                border: `1px solid var(--action-jump-btn-text)`,
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
                                                e.currentTarget.style.background = 'var(--action-jump-btn-text)';
                                                e.currentTarget.style.color = 'white';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.background = 'var(--action-jump-btn-bg)';
                                                e.currentTarget.style.color = 'var(--action-jump-btn-text)';
                                            }}
                                        >
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M13 5l7 7-7 7M5 12h14" />
                                            </svg>
                                            Jump
                                        </button>
                                    </div>

                                    {item.notes && (
                                        <div style={{
                                            marginTop: '0.75rem',
                                            padding: '0.5rem',
                                            background: 'var(--action-note-bg)',
                                            borderRadius: '6px',
                                            fontSize: '0.8rem',
                                            color: 'var(--action-note-text)',
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
