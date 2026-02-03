export const theme = {
    colors: {
        // Core Palette (matches globals.css)
        primary: '#0070f3',
        primaryHover: '#3291ff',
        background: '#4f629a',
        surface: '#ffffff',
        text: {
            primary: '#1e293b',   // slate-800
            secondary: '#64748b', // slate-500
            light: '#9ca3af',     // gray-400
            white: '#ffffff',
        },
        border: {
            default: '#e2e8f0', // slate-200
            dark: '#334155',    // slate-700
            light: '#f1f5f9',   // slate-100
        },
        status: {
            success: '#107C10',
            successBg: '#dcfce7', // green-100
            error: '#dc3545',
            active: '#6366f1',    // indigo-500
        },

        // Component Specific
        upload: {
            modalBg: '#f8fafc',    // slate-50
            hoverBg: '#f1f5f9',    // slate-100
            uploadBox: '#1e293b',  // slate-800
            uploadBoxBorder: '#334155',
        },

        progressBar: {
            bg: '#E5E7EB',      // gray-200
            fill: '#3b82f6',    // blue-500
        },

        actionItems: {
            'Decisions & Approvals': '#FDE68A', // Yellow/Gold
            'Follow-ups & Coordination': '#A7F3D0', // Green
            'Implementation / Execution': '#FED7AA', // Orange
            'Reviews & Validation': '#BFDBFE', // Blue
            'Client Portal': '#DDD6FE', // Purple
            'Reports': '#FBCFE8', // Pink
            'Requirements': '#FECACA', // Red/Pink
            'Appointment Types': '#A7F3D0',
            'Service Codes': '#FDE68A',
            'Payers': '#DDD6FE',
            'Users & Roles': '#BFDBFE',
            'DrFirst/EPCS': '#FED7AA',
            'Interface': '#FBCFE8',
            'Data Migration': '#FECACA',
            'Dependencies & Blockers': '#FECACA',
            'Topics': '#C7D2FE', // Indigo-200
            'Key Question': '#FEF08A', // Yellow-200  
            'Reaction': '#FCBFBD', // Rose-200
            // Fallback color
            default: '#F3F4F6',
        }
    }
};

// Helper for Action Items (kept for backward compatibility during refactor)
export const getCategoryColor = (category: string): string => {
    return theme.colors.actionItems[category as keyof typeof theme.colors.actionItems] || theme.colors.actionItems.default;
};
