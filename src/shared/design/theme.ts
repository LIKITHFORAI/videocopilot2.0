export const theme = {
    colors: {
        // Core Palette (matches globals.css)
        primary: 'var(--primary)',
        primaryHover: 'var(--primary-hover)',
        background: 'var(--background)',
        surface: 'var(--surface)',
        text: {
            primary: 'var(--text-primary)',
            secondary: 'var(--text-secondary)',
            light: 'var(--text-light)',
            white: 'var(--text-white)',
        },
        border: {
            default: 'var(--border-default)',
            dark: 'var(--border-dark)',
            light: 'var(--border-light)',
        },
        status: {
            success: 'var(--status-success)',
            successBg: 'var(--status-success-bg)',
            error: 'var(--status-error)',
            active: 'var(--status-active)',
        },

        // Component Specific
        upload: {
            modalBg: 'var(--upload-modal-bg)',
            hoverBg: 'var(--upload-hover-bg)',
            uploadBox: 'var(--upload-box)',
            uploadBoxBorder: 'var(--upload-box-border)',
        },

        progressBar: {
            bg: 'var(--progress-bg)',
            fill: 'var(--progress-fill)',
        },

        actionItems: {
            'Decisions & Approvals': 'var(--action-decision)',
            'Follow-ups & Coordination': 'var(--action-coord)',
            'Implementation / Execution': 'var(--action-exec)',
            'Reviews & Validation': 'var(--action-review)',
            'Client Portal': 'var(--action-portal)',
            'Reports': 'var(--action-badge-reports-bg)',
            'Requirements': 'var(--action-badge-req-bg)',
            'Appointment Types': 'var(--action-coord)',
            'Service Codes': 'var(--action-decision)',
            'Payers': 'var(--action-portal)',
            'Users & Roles': 'var(--action-review)',
            'DrFirst/EPCS': 'var(--action-exec)',
            'Interface': 'var(--action-badge-reports-bg)',
            'Data Migration': 'var(--action-badge-req-bg)',
            'Dependencies & Blockers': 'var(--action-badge-req-bg)',
            'Topics': 'var(--action-topic)',
            'Key Question': 'var(--action-question)',
            'Reaction': 'var(--action-reaction)',
            // Fallback color
            default: 'var(--action-badge-default-bg)',
        }
    }
};

/** Get the color for an action item category. Falls back to default gray. */
export const getCategoryColor = (category: string): string => {
    return theme.colors.actionItems[category as keyof typeof theme.colors.actionItems] || theme.colors.actionItems.default;
};
