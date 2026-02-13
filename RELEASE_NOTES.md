# Release Notes - Video Copilot Refactoring

## Version 2.1.0 - Granular CSS Variable System

### Overview
This release introduces a major architectural refactor of the styling system, moving from broad, shared CSS variables to a highly granular, component-specific variable architecture. This change ensures complete style decoupling and provides precise control over the visual identity of every UI segment in both Light and Dark modes.

### Key Changes
- **Granular Variable Mapping**: Defined explicit CSS variables for all major UI components:
  - **Header (Topper)**: Individual background and text variables for logo, brand, and all navigation buttons (Upload, History, Personality, Auth).
  - **Video Player**: Specific variables for loading overlays, badges, and error states.
  - **Transcript Panel**: Dedicated variables for segment highlights, timestamps, and panel backgrounds.
  - **Chat & Intelligence**: Decoupled backgrounds for the panel header, message history, recap section, and input area.
  - **Action Items**: segmented variables for individual category badges (Requirements, Reports, Executions, etc.) and specific note styling.
  - **SharePoint Picker**: fully isolated theme variables for the MSAL-based file browser.

- **Component Refactoring**: Updated all React components to consume these granular variables, removing hardcoded values and shared dependencies that caused style "leaks."

- **Theming Precision**:
  - **Light Mode**: Refined medical blue and professional gray hierarchy.
  - **Dark Mode**: Optimized dark charcoal and serene blue palette for high readability and professional aesthetics.

### UI Enhancements
- Each functional area (Header, Chat, Action Items, Transcript) now has its own visual boundaries defined by independent color tokens.
- Improved "Jump" button and "Note" section aesthetics in the Action Items panel.
- Enhanced highlight states in the Transcript for better accessibility.
- **Dark Mode UX**: Reduced video brightness to 80% when dark mode is active for eye comfort.

---
*Date: February 12, 2026*
