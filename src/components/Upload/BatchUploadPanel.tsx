'use client';

import { useState, useEffect } from 'react';

export interface BatchFile {
    id: string;
    name: string;
    status: 'uploading' | 'processing' | 'completed' | 'error';
    progress: number; // 0-100
    error?: string;
}

interface BatchUploadPanelProps {
    files: BatchFile[];
    onRemove: (id: string) => void;
}

export default function BatchUploadPanel({ files, onRemove }: BatchUploadPanelProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Show panel when there are active files
    useEffect(() => {
        const hasActiveFiles = files.some(f => f.status !== 'completed' && f.status !== 'error');
        setIsVisible(files.length > 0 && hasActiveFiles);
    }, [files]);

    // Auto-remove completed files after 3 seconds
    useEffect(() => {
        const completedFiles = files.filter(f => f.status === 'completed');
        completedFiles.forEach(file => {
            setTimeout(() => {
                onRemove(file.id);
            }, 3000);
        });
    }, [files, onRemove]);

    if (!isVisible) return null;

    const activeFiles = files.filter(f => f.status !== 'completed');
    const activeCount = activeFiles.length;

    return (
        <>
            {/* Floating Icon Button */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                style={{
                    position: 'fixed',
                    bottom: '24px',
                    right: '24px',
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none',
                    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    zIndex: 1000,
                    transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(102, 126, 234, 0.5)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
                }}
                title={`${activeCount} file${activeCount > 1 ? 's' : ''} uploading`}
            >
                <div style={{ position: 'relative' }}>
                    {/* Upload Icon */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>

                    {/* Badge with count */}
                    {activeCount > 0 && (
                        <div style={{
                            position: 'absolute',
                            top: '-8px',
                            right: '-8px',
                            background: '#ef4444',
                            borderRadius: '50%',
                            width: '20px',
                            height: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '11px',
                            fontWeight: 'bold',
                        }}>
                            {activeCount}
                        </div>
                    )}
                </div>
            </button>

            {/* Expandable Panel */}
            {isExpanded && (
                <div style={{
                    position: 'fixed',
                    bottom: '90px',
                    right: '24px',
                    width: '380px',
                    maxHeight: '500px',
                    background: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
                    zIndex: 999,
                    overflow: 'hidden',
                    animation: 'slideUp 0.3s ease-out',
                }}>
                    {/* Header */}
                    <div style={{
                        padding: '16px',
                        borderBottom: '1px solid #e5e7eb',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                    }}>
                        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>
                            Uploading {activeCount} file{activeCount > 1 ? 's' : ''}
                        </h3>
                        <button
                            onClick={() => setIsExpanded(false)}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: 'white',
                                cursor: 'pointer',
                                padding: '4px',
                            }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>

                    {/* File List */}
                    <div style={{
                        maxHeight: '400px',
                        overflowY: 'auto',
                    }}>
                        {files.map((file) => (
                            <div
                                key={file.id}
                                style={{
                                    padding: '12px 16px',
                                    borderBottom: '1px solid #f3f4f6',
                                    transition: 'background 0.2s',
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                            >
                                {/* File Name and Status */}
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: '8px',
                                }}>
                                    <div style={{
                                        flex: 1,
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        marginRight: '12px',
                                    }}>
                                        <div style={{
                                            fontSize: '14px',
                                            fontWeight: '500',
                                            color: '#1f2937',
                                            marginBottom: '2px',
                                        }}>
                                            {file.name}
                                        </div>
                                        <div style={{
                                            fontSize: '12px',
                                            color: file.status === 'error' ? '#ef4444' : '#6b7280',
                                        }}>
                                            {file.status === 'uploading' && 'Uploading...'}
                                            {file.status === 'processing' && 'Processing...'}
                                            {file.status === 'completed' && '✓ Complete'}
                                            {file.status === 'error' && `Error: ${file.error || 'Failed'}`}
                                        </div>
                                    </div>

                                    {/* Status Icon */}
                                    <div>
                                        {file.status === 'uploading' && (
                                            <div style={{
                                                width: '24px',
                                                height: '24px',
                                                border: '3px solid #e5e7eb',
                                                borderTop: '3px solid #667eea',
                                                borderRadius: '50%',
                                                animation: 'spin 1s linear infinite',
                                            }} />
                                        )}
                                        {file.status === 'processing' && (
                                            <div style={{
                                                width: '24px',
                                                height: '24px',
                                                border: '3px solid #e5e7eb',
                                                borderTop: '3px solid #10b981',
                                                borderRadius: '50%',
                                                animation: 'spin 1s linear infinite',
                                            }} />
                                        )}
                                        {file.status === 'completed' && (
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        )}
                                        {file.status === 'error' && (
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
                                                <circle cx="12" cy="12" r="10" />
                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                <line x1="9" y1="9" x2="15" y2="15" />
                                            </svg>
                                        )}
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                {(file.status === 'uploading' || file.status === 'processing') && (
                                    <div style={{
                                        width: '100%',
                                        height: '4px',
                                        background: '#e5e7eb',
                                        borderRadius: '2px',
                                        overflow: 'hidden',
                                    }}>
                                        <div style={{
                                            width: `${file.progress}%`,
                                            height: '100%',
                                            background: file.status === 'uploading' ?
                                                'linear-gradient(90deg, #667eea 0%, #764ba2 100%)' :
                                                'linear-gradient(90deg, #10b981 0%, #059669 100%)',
                                            transition: 'width 0.3s ease',
                                        }} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* CSS Animations */}
            <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
        </>
    );
}
