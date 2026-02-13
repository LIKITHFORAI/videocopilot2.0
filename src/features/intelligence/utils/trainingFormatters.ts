export function formatTrainingResponse(tab: string, data: any): string {
    if (!data) return "No data available.";

    // If data is string, try to parse it
    if (typeof data === 'string') {
        try {
            data = JSON.parse(data);
        } catch {
            return data; // Return as is if not JSON
        }
    }

    if (tab === 'chat') {
        let md = `### ${data.topic_identification?.topic_name || 'Analysis'}\n\n`;
        md += `**Goal:** ${data.training_goal}\n\n`;
        md += `**Target Audience:** ${data.topic_identification?.audience_type}\n`;
        if (data.topic_identification?.target_video_length_seconds) {
            md += `**Target Length:** ${data.topic_identification.target_video_length_seconds}s\n\n`;
        }

        if (data.scope_guardrails) {
            md += `### Scope & Guardrails\n`;
            md += `**Included:**\n${data.scope_guardrails?.included?.map((i: string) => `- ${i}`).join('\n') || 'None'}\n\n`;
            md += `**Excluded:**\n${data.scope_guardrails?.excluded?.map((i: string) => `- ${i}`).join('\n') || 'None'}\n\n`;
        }

        if (data.content_readiness) {
            md += `### Readiness\n`;
            md += `**Status:** ${data.content_readiness?.reusability_status}\n`;
            md += `**Reason:** ${data.content_readiness?.reason}\n\n`;
        }

        if (data.next_recording_action) {
            md += `### Next Steps\n${data.next_recording_action.what_to_record_next}\n`;
        }

        if (data.sanitization_report) {
            md += `### Sanitization Report\n`;
            md += `**PHI Risk:** ${data.sanitization_report.phi_risk}\n`;
            if (data.sanitization_report.detected_terms?.length) {
                md += `**Detected Terms:** ${data.sanitization_report.detected_terms.join(', ')}\n`;
            }
        }

        return md;
    }

    if (tab === 'scribe') {
        if (!data.steps || !Array.isArray(data.steps)) return JSON.stringify(data, null, 2);

        let md = `### Build Steps\n\n`;
        data.steps.forEach((step: any) => {
            md += `**${step.n}. ${step.action}**\n`;
            if (step.ui_path && step.ui_path.length) {
                md += `   *Path: ${step.ui_path.join(' > ')}*\n`;
            }
            if (step.fields_edited && step.fields_edited.length) {
                md += `   *Fields:* ${step.fields_edited.join(', ')}\n`;
            }
            md += '\n';
        });
        return md;
    }

    if (tab === 'voiceover') {
        let md = `### Voice-Over Script\n\n`;
        md += `**Opening:**\n"${data.opening}"\n\n`;

        md += `**Walkthrough:**\n`;
        data.step_walkthrough?.forEach((step: string) => {
            md += `- "${step}"\n`;
        });
        md += '\n';

        if (data.single_example) {
            md += `**Example (${data.single_example.example_name}):**\n"${data.single_example.example_script}"\n\n`;
        }

        if (data.common_mistakes?.length) {
            md += `**Common Mistakes:**\n${data.common_mistakes.map((m: string) => `- ${m}`).join('\n')}\n\n`;
        }

        md += `**Wrap Up:**\n"${data.wrap_up}"\n`;

        return md;
    }

    return JSON.stringify(data, null, 2);
}
