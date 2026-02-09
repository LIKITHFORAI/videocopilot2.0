'use client';

import { useState, useRef, useEffect } from 'react';
import { theme } from '@/lib/theme';

export type Personality = 'meetings' | 'training' | 'support';

interface PersonalityChooserProps {
    onPersonalityChange: (personality: Personality) => void;
    currentPersonality: Personality;
}

const PERSONALITIES = [
    { id: 'meetings' as Personality, label: 'Meetings', icon: '📊', description: 'Focus on action items and decisions' },
    { id: 'training' as Personality, label: 'Training', icon: '🎓', description: 'Focus on learning and instructions' },
    { id: 'support' as Personality, label: 'Support', icon: '🛠️', description: 'Focus on troubleshooting and Q&A' },
];

export default function PersonalityChooser({ onPersonalityChange, currentPersonality }: PersonalityChooserProps) {
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const currentPersonalityData = PERSONALITIES.find(p => p.id === currentPersonality) || PERSONALITIES[0];

    return (
        <div style={{ position: 'relative' }} ref={dropdownRef}>
            <button
                onClick={() => setShowDropdown(!showDropdown)}
                style={{
                    height: '36px',
                    padding: '0 1rem',
                    background: theme.colors.progressBar.fill,
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'background 0.2s',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = theme.colors.primaryHover}
                onMouseLeave={(e) => e.currentTarget.style.background = theme.colors.progressBar.fill}
            >
                <span>{currentPersonalityData.icon}</span>
                <span>{currentPersonalityData.label}</span>
                <span style={{ fontSize: '0.7rem' }}>▼</span>
            </button>

            {showDropdown && (
                <div style={{
                    position: 'absolute',
                    top: '110%',
                    left: 0,
                    minWidth: '250px',
                    background: 'white',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    padding: '0.5rem',
                    zIndex: 200,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.25rem'
                }}>
                    {PERSONALITIES.map(personality => (
                        <button
                            key={personality.id}
                            onClick={() => {
                                onPersonalityChange(personality.id);
                                setShowDropdown(false);
                            }}
                            style={{
                                padding: '0.75rem 1rem',
                                border: 'none',
                                background: currentPersonality === personality.id ? theme.colors.upload.hoverBg : 'transparent',
                                textAlign: 'left',
                                cursor: 'pointer',
                                borderRadius: '4px',
                                fontSize: '0.9rem',
                                color: theme.colors.text.primary,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                fontWeight: currentPersonality === personality.id ? '600' : '500',
                                transition: 'background 0.2s'
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = theme.colors.upload.hoverBg}
                            onMouseLeave={e => {
                                if (currentPersonality !== personality.id) {
                                    e.currentTarget.style.background = 'transparent';
                                }
                            }}
                        >
                            <span style={{ fontSize: '1.5rem' }}>{personality.icon}</span>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: '600', marginBottom: '0.15rem' }}>
                                    {personality.label}
                                </div>
                                <div style={{ fontSize: '0.75rem', color: '#666' }}>
                                    {personality.description}
                                </div>
                            </div>
                            {currentPersonality === personality.id && (
                                <span style={{ color: theme.colors.progressBar.fill, fontSize: '1.2rem' }}>✓</span>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
