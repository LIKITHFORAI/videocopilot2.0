# Release Notes - DrCloudEHR GetThingsDone

## Version 2.2.0 - Stability & Style Isolation Release

### Overview
This release focuses on industrial-grade styling isolation and system stability. We've transitioned to a granular CSS variable architecture to prevent style leaks between components and implemented critical database migrations to ensure cross-device consistency and central knowledge search performance.

### Key Changes
- **Project Rebranding**: Officially transitioned project naming and references to **DrCloudEHR GetThingsDone**.
- **Granular CSS Variable System**:
  - Defined explicit CSS variables for all segments (Header, Video, Transcript, Chat, Action Items).
  - Isolated component headers to allow independent theming without affecting shared "surface" colors.
  - Implemented a theme-aware citation system with isolated tokens.
- **Database & Stability Fixes**:
  - **Schema Migration**: Added automatic `ALTER TABLE` logic in `src/lib/db.ts` to add the `indexed` column to existing local databases. This resolves `SqliteError` for legacy datasets.
  - **TypeScript Prop Sync**: Resolved prop mismatches for the `onLoadExisting` function in the `FileUploader` component.
  - **Environment Stability**: Fixed Next.js build issues related to workspace root inference.
- **AI & Knowledge Integration**:
  - Optimized the **Central Knowledge Search** in `src/app/api/chat/route.ts`. The system now correctly queries the central local database to provide context from past meetings, even when focused on a single video.

### UI & UX Enhancements
- **Dark Mode Optimization**: Reduced video brightness to 80% automatically when dark mode is enabled for superior eye comfort.
- **Visual Boundaries**: Each functional area now has clearly defined visual boundaries via isolated background and border tokens.
- **Improved Highlighting**: Enhanced the Transcript highlight system for better visibility during "Jump to" operations from action items.

---
*Date: February 13, 2026*
