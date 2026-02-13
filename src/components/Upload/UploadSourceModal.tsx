'use client';

import { useState } from 'react';
import SharePointPicker from '../SharePoint/SharePointPicker';
import type { ServerImportResult } from '../SharePoint/SharePointPicker';
import { theme } from '@/shared/design/theme';

interface UploadSourceModalProps {
    onClose: () => void;
    onLocalUpload: () => void;
    onFileSelected: (file: File | ServerImportResult) => void;
}

export default function UploadSourceModal({ onClose, onLocalUpload, onFileSelected }: UploadSourceModalProps) {
    const [showSharePointPicker, setShowSharePointPicker] = useState(false);

    const handleLocalClick = () => {
        onLocalUpload();
        onClose();
    };

    const handleSharePointSelect = (file: File | ServerImportResult) => {
        onFileSelected(file);
        onClose();
    };

    if (showSharePointPicker) {
        return (
            <SharePointPicker
                isOpen={showSharePointPicker}
                onClose={() => setShowSharePointPicker(false)}
                onFileSelected={handleSharePointSelect}
            />
        );
    }

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000
            }}
            onClick={onClose}
        >
            <div
                style={{
                    background: 'white',
                    borderRadius: '12px',
                    padding: '2rem',
                    maxWidth: '500px',
                    width: '90%',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: theme.colors.text.primary, margin: 0 }}>
                        Choose Upload Source
                    </h2>
                    <p style={{ fontSize: '0.9rem', color: theme.colors.text.secondary, marginTop: '0.5rem' }}>
                        Select where you want to upload your video from
                    </p>
                </div>

                {/* Upload Options */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {/* Local Upload */}
                    <button
                        onClick={handleLocalClick}
                        style={{
                            padding: '1.5rem',
                            background: theme.colors.upload.modalBg,
                            border: `2px solid ${theme.colors.border.default}`,
                            borderRadius: '8px',
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'all 0.2s',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = theme.colors.primary;
                            e.currentTarget.style.background = theme.colors.upload.hoverBg;
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = theme.colors.border.default;
                            e.currentTarget.style.background = theme.colors.upload.modalBg;
                        }}
                    >
                        <div style={{
                            fontSize: '2.5rem',
                            width: '60px',
                            height: '60px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: theme.colors.primary,
                            borderRadius: '8px',
                            color: 'white'
                        }}>
                            💻
                        </div>
                        <div style={{ flex: 1 }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: theme.colors.text.primary, margin: 0 }}>
                                Upload from Computer
                            </h3>
                            <p style={{ fontSize: '0.85rem', color: theme.colors.text.secondary, margin: '0.25rem 0 0 0' }}>
                                Browse and select a video file from your local device
                            </p>
                        </div>
                    </button>

                    {/* SharePoint Upload */}
                    <button
                        onClick={() => setShowSharePointPicker(true)}
                        style={{
                            padding: '1.5rem',
                            background: theme.colors.upload.modalBg,
                            border: `2px solid ${theme.colors.border.default}`,
                            borderRadius: '8px',
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'all 0.2s',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = theme.colors.status.success;
                            e.currentTarget.style.background = theme.colors.upload.hoverBg;
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = theme.colors.border.default;
                            e.currentTarget.style.background = theme.colors.upload.modalBg;
                        }}
                    >
                        <div style={{
                            fontSize: '2.5rem',
                            width: '60px',
                            height: '60px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: theme.colors.status.success,
                            borderRadius: '8px',
                            color: 'white'
                        }}>
                            ☁️
                        </div>
                        <div style={{ flex: 1 }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: theme.colors.text.primary, margin: 0 }}>
                                Import from SharePoint
                            </h3>
                            <p style={{ fontSize: '0.85rem', color: theme.colors.text.secondary, margin: '0.25rem 0 0 0' }}>
                                Access videos from your OneDrive or SharePoint sites
                            </p>
                        </div>
                    </button>
                </div>

                {/* Cancel Button */}
                <button
                    onClick={onClose}
                    style={{
                        marginTop: '1.5rem',
                        width: '100%',
                        padding: '0.75rem',
                        background: 'transparent',
                        border: `1px solid ${theme.colors.border.default}`,
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        color: theme.colors.text.secondary,
                        transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = theme.colors.upload.modalBg}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}
