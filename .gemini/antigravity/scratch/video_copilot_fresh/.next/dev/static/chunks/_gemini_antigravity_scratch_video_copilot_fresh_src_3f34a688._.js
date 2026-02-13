(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/hooks/useDragDrop.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useDragDrop",
    ()=>useDragDrop
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
const useDragDrop = (onFileDrop)=>{
    _s();
    const [isDragging, setIsDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const onDragOver = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useDragDrop.useCallback[onDragOver]": (e)=>{
            e.preventDefault();
            e.stopPropagation();
        }
    }["useDragDrop.useCallback[onDragOver]"], []);
    const onDragEnter = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useDragDrop.useCallback[onDragEnter]": (e)=>{
            e.preventDefault();
            e.stopPropagation();
            setIsDragging(true);
        }
    }["useDragDrop.useCallback[onDragEnter]"], []);
    const onDragLeave = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useDragDrop.useCallback[onDragLeave]": (e)=>{
            e.preventDefault();
            e.stopPropagation();
            // Only set to false if we're leaving the drop zone itself, not entering a child
            if (e.currentTarget.contains(e.relatedTarget)) return;
            setIsDragging(false);
        }
    }["useDragDrop.useCallback[onDragLeave]"], []);
    const onDrop = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useDragDrop.useCallback[onDrop]": (e)=>{
            e.preventDefault();
            e.stopPropagation();
            setIsDragging(false);
            const files = e.dataTransfer.files;
            if (files && files.length > 0) {
                const file = files[0];
                if (onFileDrop) {
                    onFileDrop(file);
                }
                return file;
            }
            return null;
        }
    }["useDragDrop.useCallback[onDrop]"], [
        onFileDrop
    ]);
    return {
        isDragging,
        dragHandlers: {
            onDragOver,
            onDragEnter,
            onDragLeave,
            onDrop
        }
    };
};
_s(useDragDrop, "NENa04s6eDE6YuXU8trsnba/tiw=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/auth/components/AuthButton.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AuthButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-react/dist/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$hooks$2f$useMsal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-react/dist/hooks/useMsal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$lib$2f$msalConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/lib/msalConfig.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function AuthButton() {
    _s();
    const { instance, accounts, inProgress } = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$hooks$2f$useMsal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMsal"])();
    const [isLoggingIn, setIsLoggingIn] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const account = accounts[0];
    const handleLogin = ()=>{
        setIsLoggingIn(true);
        // Use redirect flow - page will redirect to Microsoft and back
        instance.loginRedirect(__TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$lib$2f$msalConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loginRequest"]);
    };
    const handleLogout = ()=>{
        // Clear all accounts from cache (local-only logout)
        instance.clearCache();
        // Redirect to login page (include basePath for production)
        const basePath = ("TURBOPACK compile-time value", "") || '';
        window.location.href = `${window.location.origin}${basePath}/`;
    };
    const [isHovered, setIsHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Show loading state while MSAL is processing or logging in
    if (inProgress !== "none" || isLoggingIn) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            disabled: true,
            style: {
                height: '36px',
                padding: '0 1rem',
                background: 'var(--border-default)',
                color: 'var(--text-secondary)',
                border: 'none',
                borderRadius: '5px',
                cursor: 'not-allowed',
                fontSize: '0.8rem',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                display: 'flex',
                alignItems: 'center'
            },
            children: "..."
        }, void 0, false, {
            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/auth/components/AuthButton.tsx",
            lineNumber: 31,
            columnNumber: 13
        }, this);
    }
    if (account) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: handleLogout,
            onMouseEnter: ()=>setIsHovered(true),
            onMouseLeave: ()=>setIsHovered(false),
            style: {
                height: '36px',
                padding: '0 1.25rem',
                background: isHovered ? 'var(--status-error)' : 'var(--header-btn-auth-bg)',
                color: 'var(--header-btn-auth-text)',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: '600',
                transition: 'all 0.2s ease',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                display: 'flex',
                alignItems: 'center',
                minWidth: '100px',
                justifyContent: 'center'
            },
            title: `Signed in as ${account.username}`,
            children: isHovered ? 'LOGOUT' : account.name?.split(' ')[0]?.toUpperCase() || 'USER'
        }, void 0, false, {
            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/auth/components/AuthButton.tsx",
            lineNumber: 56,
            columnNumber: 13
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: handleLogin,
        style: {
            height: '36px',
            padding: '0 1.25rem',
            background: 'var(--header-btn-auth-bg)',
            color: 'var(--header-btn-auth-text)',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '0.8rem',
            fontWeight: '600',
            transition: 'background 0.2s',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            display: 'flex',
            alignItems: 'center'
        },
        onMouseEnter: (e)=>e.currentTarget.style.background = 'var(--primary-hover)',
        onMouseLeave: (e)=>e.currentTarget.style.background = 'var(--header-btn-auth-bg)',
        children: "LOGIN"
    }, void 0, false, {
        fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/auth/components/AuthButton.tsx",
        lineNumber: 86,
        columnNumber: 9
    }, this);
}
_s(AuthButton, "NdvZ9CS/dMHNZso3ZIQbr7lIQtM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$hooks$2f$useMsal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMsal"]
    ];
});
_c = AuthButton;
var _c;
__turbopack_context__.k.register(_c, "AuthButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/shared/utils/apiPath.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Get the API base path for the current environment.
 * In production, this includes the basePath from next.config.ts.
 * In development, it's just the root path.
 */ __turbopack_context__.s([
    "getApiPath",
    ()=>getApiPath
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
function getApiPath(endpoint) {
    const basePath = ("TURBOPACK compile-time value", "") || '';
    const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    return `${basePath}${normalizedEndpoint}`;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/shared/utils/formatDate.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Format an ISO date string into a human-readable display string.
 * Handles 'N/A' and invalid dates gracefully.
 * Single source of truth — replaces 2 duplicate implementations.
 */ __turbopack_context__.s([
    "formatDate",
    ()=>formatDate
]);
function formatDate(dateStr) {
    if (!dateStr || dateStr === 'N/A') return 'No due date';
    try {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    } catch  {
        return dateStr;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/shared/utils/formatSize.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Format a byte count into a human-readable size string (B, KB, MB, GB).
 */ __turbopack_context__.s([
    "formatSize",
    ()=>formatSize
]);
function formatSize(bytes) {
    if (!bytes) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SharePointPicker
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-react/dist/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$hooks$2f$useMsal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-react/dist/hooks/useMsal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$shared$2f$utils$2f$apiPath$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/shared/utils/apiPath.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$shared$2f$utils$2f$formatDate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/shared/utils/formatDate.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$shared$2f$utils$2f$formatSize$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/shared/utils/formatSize.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
const GRAPH_BASE = "https://graph.microsoft.com/v1.0";
const VIDEO_EXTENSIONS = [
    '.mp4',
    '.avi',
    '.mov',
    '.mkv',
    '.webm',
    '.m4v',
    '.wmv'
];
function SharePointPicker({ onFileSelected, isOpen, onClose }) {
    _s();
    const { instance, accounts } = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$hooks$2f$useMsal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMsal"])();
    const [items, setItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [sites, setSites] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [drives, setDrives] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [downloading, setDownloading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [breadcrumbs, setBreadcrumbs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedItem, setSelectedItem] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [browseSource, setBrowseSource] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('home');
    const [currentDriveId, setCurrentDriveId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [currentSiteId, setCurrentSiteId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [currentSiteName, setCurrentSiteName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isSearchMode, setIsSearchMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [originalSites, setOriginalSites] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [originalDrives, setOriginalDrives] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // Get a Graph API token
    const getToken = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharePointPicker.useCallback[getToken]": async ()=>{
            const scopes = [
                "Files.Read.All",
                "Sites.Read.All"
            ];
            try {
                const resp = await instance.acquireTokenSilent({
                    scopes,
                    account: accounts[0]
                });
                return resp.accessToken;
            } catch  {
                const resp = await instance.acquireTokenPopup({
                    scopes,
                    account: accounts[0]
                });
                return resp.accessToken;
            }
        }
    }["SharePointPicker.useCallback[getToken]"], [
        instance,
        accounts
    ]);
    // Generic Graph API fetch
    const graphFetch = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharePointPicker.useCallback[graphFetch]": async (url)=>{
            const token = await getToken();
            const resp = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (!resp.ok) {
                const errBody = await resp.text();
                console.error('Graph API error:', resp.status, errBody);
                throw new Error(`Graph API error (${resp.status})`);
            }
            return resp.json();
        }
    }["SharePointPicker.useCallback[graphFetch]"], [
        getToken
    ]);
    // Filter and sort items (folders + video files)
    const processItems = (allItems)=>{
        const filtered = allItems.filter((item)=>{
            if (item.folder) return true;
            // For shared items, check remoteItem
            if (item.remoteItem?.folder) return true;
            if (item.file || item.remoteItem?.file) {
                const ext = '.' + item.name.split('.').pop()?.toLowerCase();
                return VIDEO_EXTENSIONS.includes(ext);
            }
            return false;
        });
        filtered.sort((a, b)=>{
            const aIsFolder = !!(a.folder || a.remoteItem?.folder);
            const bIsFolder = !!(b.folder || b.remoteItem?.folder);
            if (aIsFolder && !bIsFolder) return -1;
            if (!aIsFolder && bIsFolder) return 1;
            return a.name.localeCompare(b.name);
        });
        return filtered;
    };
    // Fetch items from personal OneDrive
    const fetchMyFiles = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharePointPicker.useCallback[fetchMyFiles]": async (folderId)=>{
            setLoading(true);
            setError(null);
            setSelectedItem(null);
            try {
                const url = folderId ? `${GRAPH_BASE}/me/drive/items/${folderId}/children?$top=200&$orderby=name` : `${GRAPH_BASE}/me/drive/root/children?$top=200&$orderby=name`;
                const data = await graphFetch(url);
                setItems(processItems(data.value || []));
            } catch (err) {
                setError(err.message || 'Failed to load files');
            } finally{
                setLoading(false);
            }
        }
    }["SharePointPicker.useCallback[fetchMyFiles]"], [
        graphFetch
    ]);
    // Fetch "Shared with Me" items
    const fetchSharedWithMe = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharePointPicker.useCallback[fetchSharedWithMe]": async ()=>{
            setLoading(true);
            setError(null);
            setSelectedItem(null);
            try {
                const data = await graphFetch(`${GRAPH_BASE}/me/drive/sharedWithMe?$top=200`);
                setItems(processItems(data.value || []));
            } catch (err) {
                setError(err.message || 'Failed to load shared files');
            } finally{
                setLoading(false);
            }
        }
    }["SharePointPicker.useCallback[fetchSharedWithMe]"], [
        graphFetch
    ]);
    // Fetch SharePoint sites
    const fetchSites = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharePointPicker.useCallback[fetchSites]": async ()=>{
            setLoading(true);
            setError(null);
            setSelectedItem(null);
            try {
                const data = await graphFetch(`${GRAPH_BASE}/sites?search=*&$top=100`);
                const sitesList = data.value || [];
                setSites(sitesList);
                setOriginalSites(sitesList);
            } catch (err) {
                setError(err.message || 'Failed to load sites');
            } finally{
                setLoading(false);
            }
        }
    }["SharePointPicker.useCallback[fetchSites]"], [
        graphFetch
    ]);
    // Fetch drives within a SharePoint site
    const fetchSiteDrives = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharePointPicker.useCallback[fetchSiteDrives]": async (siteId)=>{
            setLoading(true);
            setError(null);
            setSelectedItem(null);
            try {
                const data = await graphFetch(`${GRAPH_BASE}/sites/${siteId}/drives`);
                const drivesList = data.value || [];
                setDrives(drivesList);
                setOriginalDrives(drivesList);
            } catch (err) {
                setError(err.message || 'Failed to load document libraries');
            } finally{
                setLoading(false);
            }
        }
    }["SharePointPicker.useCallback[fetchSiteDrives]"], [
        graphFetch
    ]);
    // Fetch items from a specific drive (SharePoint library or shared drive)
    const fetchDriveItems = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharePointPicker.useCallback[fetchDriveItems]": async (driveId, folderId)=>{
            setLoading(true);
            setError(null);
            setSelectedItem(null);
            setIsSearchMode(false);
            try {
                const url = folderId ? `${GRAPH_BASE}/drives/${driveId}/items/${folderId}/children?$top=200&$orderby=name` : `${GRAPH_BASE}/drives/${driveId}/root/children?$top=200&$orderby=name`;
                const data = await graphFetch(url);
                setItems(processItems(data.value || []));
            } catch (err) {
                setError(err.message || 'Failed to load files');
            } finally{
                setLoading(false);
            }
        }
    }["SharePointPicker.useCallback[fetchDriveItems]"], [
        graphFetch
    ]);
    // Search for items across the current context
    const performSearch = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharePointPicker.useCallback[performSearch]": async (query)=>{
            if (!query.trim()) {
                setIsSearchMode(false);
                setSearchQuery('');
                // Restore original lists or reload current view
                if (browseSource === 'sites') {
                    setSites(originalSites);
                } else if (browseSource === 'site-drives') {
                    setDrives(originalDrives);
                } else if (browseSource === 'myfiles') {
                    if (breadcrumbs.length > 0) {
                        await fetchMyFiles(breadcrumbs[breadcrumbs.length - 1].id);
                    } else {
                        await fetchMyFiles();
                    }
                } else if (browseSource === 'shared') {
                    await fetchSharedWithMe();
                } else if (browseSource === 'drive-browse' && currentDriveId) {
                    if (breadcrumbs.length > 0) {
                        await fetchDriveItems(currentDriveId, breadcrumbs[breadcrumbs.length - 1].id);
                    } else {
                        await fetchDriveItems(currentDriveId);
                    }
                }
                return;
            }
            setSelectedItem(null);
            setIsSearchMode(true);
            // Client-side filter for sites and drives
            if (browseSource === 'sites') {
                const filtered = originalSites.filter({
                    "SharePointPicker.useCallback[performSearch].filtered": (site)=>site.displayName.toLowerCase().includes(query.toLowerCase())
                }["SharePointPicker.useCallback[performSearch].filtered"]);
                setSites(filtered);
                return;
            }
            if (browseSource === 'site-drives') {
                const filtered = originalDrives.filter({
                    "SharePointPicker.useCallback[performSearch].filtered": (drive)=>drive.name.toLowerCase().includes(query.toLowerCase())
                }["SharePointPicker.useCallback[performSearch].filtered"]);
                setDrives(filtered);
                return;
            }
            // Graph API search for files
            setLoading(true);
            setError(null);
            try {
                let url;
                if (currentDriveId) {
                    url = `${GRAPH_BASE}/drives/${currentDriveId}/root/search(q='${encodeURIComponent(query)}')?$top=200`;
                } else {
                    url = `${GRAPH_BASE}/me/drive/root/search(q='${encodeURIComponent(query)}')?$top=200`;
                }
                const data = await graphFetch(url);
                setItems(processItems(data.value || []));
            } catch (err) {
                setError(err.message || 'Search failed');
            } finally{
                setLoading(false);
            }
        }
    }["SharePointPicker.useCallback[performSearch]"], [
        graphFetch,
        browseSource,
        breadcrumbs,
        currentDriveId,
        fetchMyFiles,
        fetchDriveItems
    ]);
    // Auto-load home when opened
    (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SharePointPicker.useEffect": ()=>{
            if (isOpen && accounts[0]) {
                goHome();
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["SharePointPicker.useEffect"], [
        isOpen,
        accounts
    ]);
    // Go to the home/source picker view
    const goHome = ()=>{
        setBrowseSource('home');
        setBreadcrumbs([]);
        setItems([]);
        setSites([]);
        setDrives([]);
        setSelectedItem(null);
        setError(null);
        setCurrentDriveId(null);
        setCurrentSiteId(null);
        setCurrentSiteName('');
    };
    // Navigate into "My Files"
    const openMyFiles = async ()=>{
        setBrowseSource('myfiles');
        setBreadcrumbs([]);
        setCurrentDriveId(null);
        await fetchMyFiles();
    };
    // Navigate into "Shared with Me"
    const openSharedWithMe = async ()=>{
        setBrowseSource('shared');
        setBreadcrumbs([]);
        setCurrentDriveId(null);
        await fetchSharedWithMe();
    };
    // Navigate into "SharePoint Sites"
    const openSites = async ()=>{
        setBrowseSource('sites');
        setBreadcrumbs([]);
        setCurrentDriveId(null);
        await fetchSites();
    };
    // Open a specific SharePoint site's document libraries
    const openSiteDrives = async (site)=>{
        setBrowseSource('site-drives');
        setCurrentSiteId(site.id);
        setCurrentSiteName(site.displayName);
        setBreadcrumbs([]);
        await fetchSiteDrives(site.id);
    };
    // Open a specific drive (document library)
    const openDrive = async (drive)=>{
        setBrowseSource('drive-browse');
        setCurrentDriveId(drive.id);
        setBreadcrumbs([
            {
                id: 'root',
                name: drive.name,
                driveId: drive.id
            }
        ]);
        await fetchDriveItems(drive.id);
    };
    // Navigate into a folder
    const navigateToFolder = async (item)=>{
        // For shared items with remoteItem, we need to switch to that drive
        if (item.remoteItem?.folder && item.remoteItem.parentReference?.driveId) {
            const remoteDriveId = item.remoteItem.parentReference.driveId;
            const remoteItemId = item.remoteItem.id;
            setBrowseSource('drive-browse');
            setCurrentDriveId(remoteDriveId);
            setBreadcrumbs((prev)=>[
                    ...prev,
                    {
                        id: remoteItemId,
                        name: item.name,
                        driveId: remoteDriveId
                    }
                ]);
            await fetchDriveItems(remoteDriveId, remoteItemId);
            return;
        }
        const driveId = currentDriveId;
        setBreadcrumbs((prev)=>[
                ...prev,
                {
                    id: item.id,
                    name: item.name,
                    driveId: driveId || undefined
                }
            ]);
        if (driveId) {
            await fetchDriveItems(driveId, item.id);
        } else {
            await fetchMyFiles(item.id);
        }
    };
    // Navigate via breadcrumb
    const navigateToBreadcrumb = async (index)=>{
        if (index < 0) {
            // Go back to root of current source
            if (browseSource === 'myfiles') {
                setBreadcrumbs([]);
                await fetchMyFiles();
            } else if (browseSource === 'shared') {
                setBreadcrumbs([]);
                await fetchSharedWithMe();
            } else if (browseSource === 'drive-browse' && currentDriveId) {
                const rootBc = breadcrumbs[0]; // Keep the drive name
                setBreadcrumbs(rootBc ? [
                    rootBc
                ] : []);
                await fetchDriveItems(currentDriveId);
            }
        } else {
            const target = breadcrumbs[index];
            setBreadcrumbs((prev)=>prev.slice(0, index + 1));
            const driveId = target.driveId || currentDriveId;
            if (target.id === 'root' && driveId) {
                await fetchDriveItems(driveId);
            } else if (driveId) {
                await fetchDriveItems(driveId, target.id);
            } else {
                await fetchMyFiles(target.id);
            }
        }
    };
    // Import file via server-side download (On-Behalf-Of flow)
    const selectFile = async (item)=>{
        setDownloading(true);
        setError(null);
        try {
            const token = await getToken();
            // Determine the effective driveId and itemId for the Graph API call
            let effectiveDriveId;
            let effectiveItemId;
            if (item.remoteItem?.parentReference?.driveId) {
                // Shared items have a remote reference with the source drive
                effectiveDriveId = item.remoteItem.parentReference.driveId;
                effectiveItemId = item.remoteItem.id;
            } else if (currentDriveId) {
                // Browsing a specific drive (SharePoint site or selected drive)
                effectiveDriveId = currentDriveId;
                effectiveItemId = item.id;
            } else {
                // My Files — resolve the user's default drive ID
                const meResp = await fetch(`${GRAPH_BASE}/me/drive`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (!meResp.ok) throw new Error('Failed to get user drive info');
                const meDrive = await meResp.json();
                effectiveDriveId = meDrive.id;
                effectiveItemId = item.id;
            }
            // Send metadata to server for direct download
            const importResp = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$shared$2f$utils$2f$apiPath$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiPath"])('/api/sharepoint/import'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    driveId: effectiveDriveId,
                    itemId: effectiveItemId,
                    fileName: item.name,
                    accessToken: token
                })
            });
            if (!importResp.ok) {
                const errData = await importResp.json().catch(()=>({}));
                throw new Error(errData.error || `Server import failed (${importResp.status})`);
            }
            const result = await importResp.json();
            onFileSelected({
                mediaId: result.mediaId,
                fileName: result.fileName || item.name,
                fileSize: result.fileSize,
                isServerImport: true
            });
            onClose();
        } catch (err) {
            console.error('Server import error:', err);
            setError(err.message || 'Failed to import file from SharePoint');
        } finally{
            setDownloading(false);
        }
    };
    // formatSize imported from @/shared/utils/formatSize
    // formatDate imported from @/shared/utils/formatDate
    // Get the breadcrumb label for the current source
    const getSourceLabel = ()=>{
        switch(browseSource){
            case 'myfiles':
                return 'My Files';
            case 'shared':
                return 'Shared with Me';
            case 'sites':
                return 'SharePoint Sites';
            case 'site-drives':
                return currentSiteName || 'Document Libraries';
            case 'drive-browse':
                return breadcrumbs[0]?.name || 'Files';
            default:
                return 'Home';
        }
    };
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'var(--modal-overlay)',
                    zIndex: 10000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                },
                onClick: onClose,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        background: 'var(--sharepoint-bg)',
                        borderRadius: '12px',
                        width: '720px',
                        maxWidth: '95vw',
                        maxHeight: '80vh',
                        display: 'flex',
                        flexDirection: 'column',
                        boxShadow: 'var(--modal-overlay)',
                        overflow: 'hidden'
                    },
                    onClick: (e)=>e.stopPropagation(),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                padding: '1rem 1.25rem',
                                borderBottom: '1px solid var(--modal-border)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                background: 'var(--modal-header-bg)'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            width: "22",
                                            height: "22",
                                            viewBox: "0 0 24 24",
                                            fill: "none",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M12.5 2H8.5C7.57 2 6.67 2.37 6 3L3 6C2.37 6.67 2 7.57 2 8.5V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V8C22 6.9 21.1 6 20 6H13L12.5 2Z",
                                                fill: "var(--sharepoint-icon-folder)"
                                            }, void 0, false, {
                                                fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                                lineNumber: 515,
                                                columnNumber: 33
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                            lineNumber: 514,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: 'var(--text-primary)',
                                                fontWeight: '700',
                                                fontSize: '1.05rem'
                                            },
                                            children: "OneDrive & SharePoint Browser"
                                        }, void 0, false, {
                                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                            lineNumber: 517,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                    lineNumber: 513,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: onClose,
                                    style: {
                                        background: 'none',
                                        border: 'none',
                                        color: 'var(--modal-text-secondary)',
                                        fontSize: '1.5rem',
                                        cursor: 'pointer',
                                        lineHeight: 1,
                                        padding: '0 4px'
                                    },
                                    children: "×"
                                }, void 0, false, {
                                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                    lineNumber: 521,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                            lineNumber: 505,
                            columnNumber: 21
                        }, this),
                        browseSource !== 'home' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                padding: '0.6rem 1.25rem',
                                borderBottom: '1px solid var(--modal-border)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.25rem',
                                flexWrap: 'wrap',
                                fontSize: '0.85rem'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: goHome,
                                    style: {
                                        background: 'none',
                                        border: 'none',
                                        color: 'var(--sharepoint-breadcrumb-text)',
                                        cursor: 'pointer',
                                        padding: '2px 4px',
                                        borderRadius: '3px',
                                        fontWeight: '600',
                                        fontSize: '0.85rem'
                                    },
                                    children: "⌂ Home"
                                }, void 0, false, {
                                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                    lineNumber: 540,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        color: 'var(--modal-border)'
                                    },
                                    children: "›"
                                }, void 0, false, {
                                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                    lineNumber: 547,
                                    columnNumber: 29
                                }, this),
                                browseSource === 'site-drives' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: openSites,
                                            style: {
                                                background: 'none',
                                                border: 'none',
                                                color: 'var(--sharepoint-breadcrumb-text)',
                                                cursor: 'pointer',
                                                padding: '2px 4px',
                                                borderRadius: '3px',
                                                fontWeight: '400',
                                                fontSize: '0.85rem'
                                            },
                                            children: "SharePoint Sites"
                                        }, void 0, false, {
                                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                            lineNumber: 552,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: 'var(--modal-border)'
                                            },
                                            children: "›"
                                        }, void 0, false, {
                                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                            lineNumber: 559,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: 'var(--sharepoint-breadcrumb-text)',
                                                padding: '2px 4px',
                                                fontWeight: '600',
                                                fontSize: '0.85rem'
                                            },
                                            children: currentSiteName
                                        }, void 0, false, {
                                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                            lineNumber: 560,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true) : browseSource === 'drive-browse' && currentSiteId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: openSites,
                                            style: {
                                                background: 'none',
                                                border: 'none',
                                                color: 'var(--sharepoint-breadcrumb-text)',
                                                cursor: 'pointer',
                                                padding: '2px 4px',
                                                borderRadius: '3px',
                                                fontWeight: '400',
                                                fontSize: '0.85rem'
                                            },
                                            children: "SharePoint Sites"
                                        }, void 0, false, {
                                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                            lineNumber: 566,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: 'var(--modal-border)'
                                            },
                                            children: "›"
                                        }, void 0, false, {
                                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                            lineNumber: 573,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>currentSiteId && openSiteDrives({
                                                    id: currentSiteId,
                                                    displayName: currentSiteName
                                                }),
                                            style: {
                                                background: 'none',
                                                border: 'none',
                                                color: 'var(--sharepoint-breadcrumb-text)',
                                                cursor: 'pointer',
                                                padding: '2px 4px',
                                                borderRadius: '3px',
                                                fontWeight: '400',
                                                fontSize: '0.85rem'
                                            },
                                            children: currentSiteName
                                        }, void 0, false, {
                                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                            lineNumber: 574,
                                            columnNumber: 37
                                        }, this),
                                        breadcrumbs.map((bc, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.25rem'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            color: 'var(--modal-border)'
                                                        },
                                                        children: "›"
                                                    }, void 0, false, {
                                                        fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                                        lineNumber: 583,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>navigateToBreadcrumb(i),
                                                        style: {
                                                            background: 'none',
                                                            border: 'none',
                                                            color: i === breadcrumbs.length - 1 ? 'var(--modal-text-secondary)' : 'var(--sharepoint-breadcrumb-text)',
                                                            cursor: 'pointer',
                                                            padding: '2px 4px',
                                                            borderRadius: '3px',
                                                            fontWeight: i === breadcrumbs.length - 1 ? '600' : '400',
                                                            fontSize: '0.85rem'
                                                        },
                                                        children: bc.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                                        lineNumber: 584,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, bc.id + i, true, {
                                                fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                                lineNumber: 582,
                                                columnNumber: 41
                                            }, this))
                                    ]
                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                if (browseSource === 'myfiles') {
                                                    setBreadcrumbs([]);
                                                    fetchMyFiles();
                                                } else if (browseSource === 'shared') {
                                                    setBreadcrumbs([]);
                                                    fetchSharedWithMe();
                                                } else if (browseSource === 'sites') {
                                                    fetchSites();
                                                }
                                            },
                                            style: {
                                                background: 'none',
                                                border: 'none',
                                                color: breadcrumbs.length > 0 ? 'var(--sharepoint-breadcrumb-text)' : 'var(--modal-text-secondary)',
                                                cursor: 'pointer',
                                                padding: '2px 4px',
                                                borderRadius: '3px',
                                                fontWeight: breadcrumbs.length > 0 ? '400' : '600',
                                                fontSize: '0.85rem'
                                            },
                                            children: getSourceLabel()
                                        }, void 0, false, {
                                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                            lineNumber: 598,
                                            columnNumber: 37
                                        }, this),
                                        breadcrumbs.map((bc, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.25rem'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            color: 'var(--modal-border)'
                                                        },
                                                        children: "›"
                                                    }, void 0, false, {
                                                        fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                                        lineNumber: 619,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>navigateToBreadcrumb(i),
                                                        style: {
                                                            background: 'none',
                                                            border: 'none',
                                                            color: i === breadcrumbs.length - 1 ? 'var(--modal-text-secondary)' : 'var(--sharepoint-breadcrumb-text)',
                                                            cursor: 'pointer',
                                                            padding: '2px 4px',
                                                            borderRadius: '3px',
                                                            fontWeight: i === breadcrumbs.length - 1 ? '600' : '400',
                                                            fontSize: '0.85rem'
                                                        },
                                                        children: bc.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                                        lineNumber: 620,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, bc.id + i, true, {
                                                fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                                lineNumber: 618,
                                                columnNumber: 41
                                            }, this))
                                    ]
                                }, void 0, true)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                            lineNumber: 530,
                            columnNumber: 25
                        }, this),
                        browseSource !== 'home' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                padding: '0.75rem 1.25rem',
                                borderBottom: '1px solid var(--modal-border)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    width: "18",
                                    height: "18",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    style: {
                                        flexShrink: 0
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                            cx: "11",
                                            cy: "11",
                                            r: "8",
                                            stroke: "var(--modal-text-secondary)",
                                            strokeWidth: "2"
                                        }, void 0, false, {
                                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                            lineNumber: 647,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M21 21l-4.35-4.35",
                                            stroke: "var(--modal-text-secondary)",
                                            strokeWidth: "2",
                                            strokeLinecap: "round"
                                        }, void 0, false, {
                                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                            lineNumber: 648,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                    lineNumber: 646,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    placeholder: isSearchMode ? "Search results..." : "Search files and folders...",
                                    value: searchQuery,
                                    onChange: (e)=>setSearchQuery(e.target.value),
                                    onKeyDown: (e)=>{
                                        if (e.key === 'Enter') {
                                            performSearch(searchQuery);
                                        }
                                    },
                                    style: {
                                        flex: 1,
                                        background: 'var(--sharepoint-search-input-bg)',
                                        border: '1px solid var(--modal-border)',
                                        borderRadius: '6px',
                                        padding: '0.5rem 0.75rem',
                                        color: 'var(--text-primary)',
                                        fontSize: '0.85rem',
                                        outline: 'none'
                                    },
                                    onFocus: (e)=>e.currentTarget.style.borderColor = 'var(--primary)',
                                    onBlur: (e)=>e.currentTarget.style.borderColor = 'var(--modal-border)'
                                }, void 0, false, {
                                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                    lineNumber: 652,
                                    columnNumber: 29
                                }, this),
                                searchQuery && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        if (isSearchMode) {
                                            performSearch(''); // Clear search
                                        } else {
                                            performSearch(searchQuery); // Execute search
                                        }
                                    },
                                    style: {
                                        padding: '0.5rem 1rem',
                                        background: isSearchMode ? 'var(--modal-border)' : 'var(--sharepoint-btn-search-bg)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        fontSize: '0.8rem',
                                        fontWeight: '600',
                                        flexShrink: 0
                                    },
                                    children: isSearchMode ? '✕ Clear' : 'Search'
                                }, void 0, false, {
                                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                    lineNumber: 678,
                                    columnNumber: 33
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                            lineNumber: 638,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                flex: 1,
                                overflowY: 'auto',
                                padding: '0.5rem 0',
                                minHeight: '300px'
                            },
                            children: [
                                browseSource === 'home' && !loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        padding: '1.5rem 1.25rem',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '0.75rem'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                color: 'var(--modal-text-secondary)',
                                                fontSize: '0.8rem',
                                                textTransform: 'uppercase',
                                                letterSpacing: '1px',
                                                marginBottom: '0.25rem'
                                            },
                                            children: "Choose a location"
                                        }, void 0, false, {
                                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                            lineNumber: 714,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: openMyFiles,
                                            style: {
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '1rem',
                                                padding: '1rem 1.25rem',
                                                background: 'var(--sharepoint-header-bg)',
                                                border: '1px solid var(--modal-border)',
                                                borderRadius: '10px',
                                                cursor: 'pointer',
                                                textAlign: 'left',
                                                width: '100%',
                                                transition: 'all 0.15s'
                                            },
                                            onMouseEnter: (e)=>{
                                                e.currentTarget.style.background = 'var(--sharepoint-item-selected)';
                                                e.currentTarget.style.borderColor = 'var(--sharepoint-breadcrumb-text)';
                                            },
                                            onMouseLeave: (e)=>{
                                                e.currentTarget.style.background = 'var(--sharepoint-header-bg)';
                                                e.currentTarget.style.borderColor = 'var(--modal-border)';
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        width: '40px',
                                                        height: '40px',
                                                        borderRadius: '8px',
                                                        background: 'var(--ms-blue)',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        flexShrink: 0
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        width: "22",
                                                        height: "22",
                                                        viewBox: "0 0 24 24",
                                                        fill: "white",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            d: "M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"
                                                        }, void 0, false, {
                                                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                                            lineNumber: 730,
                                                            columnNumber: 102
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                                        lineNumber: 730,
                                                        columnNumber: 41
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                                    lineNumber: 729,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                color: 'var(--modal-text-primary)',
                                                                fontWeight: '600',
                                                                fontSize: '0.95rem'
                                                            },
                                                            children: "My Files"
                                                        }, void 0, false, {
                                                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                                            lineNumber: 733,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                color: 'var(--modal-text-secondary)',
                                                                fontSize: '0.8rem'
                                                            },
                                                            children: "Your personal OneDrive"
                                                        }, void 0, false, {
                                                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                                            lineNumber: 734,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                                    lineNumber: 732,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        marginLeft: 'auto',
                                                        color: 'var(--modal-border)',
                                                        fontSize: '1.2rem'
                                                    },
                                                    children: "›"
                                                }, void 0, false, {
                                                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                                    lineNumber: 736,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                            lineNumber: 719,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: openSharedWithMe,
                                            style: {
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '1rem',
                                                padding: '1rem 1.25rem',
                                                background: 'var(--sharepoint-header-bg)',
                                                border: '1px solid var(--modal-border)',
                                                borderRadius: '10px',
                                                cursor: 'pointer',
                                                textAlign: 'left',
                                                width: '100%',
                                                transition: 'all 0.15s'
                                            },
                                            onMouseEnter: (e)=>{
                                                e.currentTarget.style.background = 'var(--sharepoint-item-selected)';
                                                e.currentTarget.style.borderColor = 'var(--sharepoint-breadcrumb-text)';
                                            },
                                            onMouseLeave: (e)=>{
                                                e.currentTarget.style.background = 'var(--sharepoint-header-bg)';
                                                e.currentTarget.style.borderColor = 'var(--modal-border)';
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        width: '40px',
                                                        height: '40px',
                                                        borderRadius: '8px',
                                                        background: 'var(--ms-purple)',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        flexShrink: 0
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        width: "22",
                                                        height: "22",
                                                        viewBox: "0 0 24 24",
                                                        fill: "white",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            d: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"
                                                        }, void 0, false, {
                                                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                                            lineNumber: 751,
                                                            columnNumber: 102
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                                        lineNumber: 751,
                                                        columnNumber: 41
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                                    lineNumber: 750,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                color: 'var(--modal-text-primary)',
                                                                fontWeight: '600',
                                                                fontSize: '0.95rem'
                                                            },
                                                            children: "Shared with Me"
                                                        }, void 0, false, {
                                                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                                            lineNumber: 754,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                color: 'var(--modal-text-secondary)',
                                                                fontSize: '0.8rem'
                                                            },
                                                            children: "Files others have shared with you"
                                                        }, void 0, false, {
                                                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                                            lineNumber: 755,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                                    lineNumber: 753,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        marginLeft: 'auto',
                                                        color: 'var(--modal-border)',
                                                        fontSize: '1.2rem'
                                                    },
                                                    children: "›"
                                                }, void 0, false, {
                                                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                                    lineNumber: 757,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                            lineNumber: 740,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: openSites,
                                            style: {
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '1rem',
                                                padding: '1rem 1.25rem',
                                                background: 'var(--sharepoint-header-bg)',
                                                border: '1px solid var(--modal-border)',
                                                borderRadius: '10px',
                                                cursor: 'pointer',
                                                textAlign: 'left',
                                                width: '100%',
                                                transition: 'all 0.15s'
                                            },
                                            onMouseEnter: (e)=>{
                                                e.currentTarget.style.background = 'var(--sharepoint-item-selected)';
                                                e.currentTarget.style.borderColor = 'var(--sharepoint-breadcrumb-text)';
                                            },
                                            onMouseLeave: (e)=>{
                                                e.currentTarget.style.background = 'var(--sharepoint-header-bg)';
                                                e.currentTarget.style.borderColor = 'var(--modal-border)';
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        width: '40px',
                                                        height: '40px',
                                                        borderRadius: '8px',
                                                        background: 'var(--ms-teal)',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        flexShrink: 0
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        width: "22",
                                                        height: "22",
                                                        viewBox: "0 0 24 24",
                                                        fill: "white",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
                                                        }, void 0, false, {
                                                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                                            lineNumber: 772,
                                                            columnNumber: 102
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                                        lineNumber: 772,
                                                        columnNumber: 41
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                                    lineNumber: 771,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                color: 'var(--modal-text-primary)',
                                                                fontWeight: '600',
                                                                fontSize: '0.95rem'
                                                            },
                                                            children: "SharePoint Sites"
                                                        }, void 0, false, {
                                                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                                            lineNumber: 775,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                color: 'var(--modal-text-secondary)',
                                                                fontSize: '0.8rem'
                                                            },
                                                            children: "Browse team sites and document libraries"
                                                        }, void 0, false, {
                                                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                                            lineNumber: 776,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                                    lineNumber: 774,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        marginLeft: 'auto',
                                                        color: 'var(--modal-border)',
                                                        fontSize: '1.2rem'
                                                    },
                                                    children: "›"
                                                }, void 0, false, {
                                                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                                    lineNumber: 778,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                            lineNumber: 761,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                    lineNumber: 713,
                                    columnNumber: 29
                                }, this),
                                loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: '200px',
                                        color: 'var(--modal-text-secondary)'
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Loading..."
                                    }, void 0, false, {
                                        fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                        lineNumber: 789,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                    lineNumber: 785,
                                    columnNumber: 29
                                }, this),
                                browseSource === 'sites' && !loading && sites.map((site)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        onClick: ()=>openSiteDrives(site),
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            padding: '0.7rem 1.25rem',
                                            cursor: 'pointer',
                                            background: 'transparent',
                                            gap: '0.75rem',
                                            transition: 'background 0.1s',
                                            borderLeft: '3px solid transparent'
                                        },
                                        onMouseEnter: (e)=>e.currentTarget.style.background = 'var(--modal-item-hover)',
                                        onMouseLeave: (e)=>e.currentTarget.style.background = 'transparent',
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    width: '28px',
                                                    textAlign: 'center',
                                                    flexShrink: 0
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    width: "24",
                                                    height: "24",
                                                    viewBox: "0 0 24 24",
                                                    fill: "none",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z",
                                                            fill: "var(--ms-teal)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                                            lineNumber: 810,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                                            x: "12",
                                                            y: "16",
                                                            textAnchor: "middle",
                                                            fill: "white",
                                                            fontSize: "12",
                                                            fontWeight: "bold",
                                                            children: "S"
                                                        }, void 0, false, {
                                                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                                            lineNumber: 811,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                                    lineNumber: 809,
                                                    columnNumber: 37
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                                lineNumber: 808,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    flex: 1,
                                                    minWidth: 0
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            color: 'var(--modal-text-primary)',
                                                            fontSize: '0.9rem',
                                                            whiteSpace: 'nowrap',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis'
                                                        },
                                                        children: site.displayName
                                                    }, void 0, false, {
                                                        fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                                        lineNumber: 815,
                                                        columnNumber: 37
                                                    }, this),
                                                    site.webUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            color: 'var(--modal-text-secondary)',
                                                            fontSize: '0.75rem',
                                                            whiteSpace: 'nowrap',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis'
                                                        },
                                                        children: site.webUrl
                                                    }, void 0, false, {
                                                        fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                                        lineNumber: 819,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                                lineNumber: 814,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: 'var(--modal-border)',
                                                    fontSize: '1.1rem'
                                                },
                                                children: "›"
                                            }, void 0, false, {
                                                fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                                lineNumber: 824,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, site.id, true, {
                                        fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                        lineNumber: 795,
                                        columnNumber: 29
                                    }, this)),
                                browseSource === 'site-drives' && !loading && drives.map((drive)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        onClick: ()=>openDrive(drive),
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            padding: '0.7rem 1.25rem',
                                            cursor: 'pointer',
                                            background: 'transparent',
                                            gap: '0.75rem',
                                            transition: 'background 0.1s',
                                            borderLeft: '3px solid transparent'
                                        },
                                        onMouseEnter: (e)=>e.currentTarget.style.background = 'var(--modal-item-hover)',
                                        onMouseLeave: (e)=>e.currentTarget.style.background = 'transparent',
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    width: '28px',
                                                    textAlign: 'center',
                                                    flexShrink: 0
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    width: "24",
                                                    height: "24",
                                                    viewBox: "0 0 24 24",
                                                    fill: "none",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M10 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V8C22 6.9 21.1 6 20 6H12L10 4Z",
                                                        fill: "var(--ms-blue)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                                        lineNumber: 845,
                                                        columnNumber: 41
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                                    lineNumber: 844,
                                                    columnNumber: 37
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                                lineNumber: 843,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    flex: 1,
                                                    minWidth: 0
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            color: 'var(--modal-text-primary)',
                                                            fontSize: '0.9rem',
                                                            whiteSpace: 'nowrap',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis'
                                                        },
                                                        children: drive.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                                        lineNumber: 849,
                                                        columnNumber: 37
                                                    }, this),
                                                    drive.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            color: 'var(--modal-text-secondary)',
                                                            fontSize: '0.75rem',
                                                            whiteSpace: 'nowrap',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis'
                                                        },
                                                        children: drive.description
                                                    }, void 0, false, {
                                                        fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                                        lineNumber: 853,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                                lineNumber: 848,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: 'var(--modal-border)',
                                                    fontSize: '1.1rem'
                                                },
                                                children: "›"
                                            }, void 0, false, {
                                                fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                                lineNumber: 858,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, drive.id, true, {
                                        fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                        lineNumber: 830,
                                        columnNumber: 29
                                    }, this)),
                                (browseSource === 'myfiles' || browseSource === 'shared' || browseSource === 'drive-browse') && !loading && items.length === 0 && !error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: '200px',
                                        color: 'var(--modal-text-secondary)',
                                        fontSize: '0.9rem'
                                    },
                                    children: "No video files or folders found here."
                                }, void 0, false, {
                                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                    lineNumber: 864,
                                    columnNumber: 29
                                }, this),
                                (browseSource === 'myfiles' || browseSource === 'shared' || browseSource === 'drive-browse') && !loading && items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        onClick: ()=>{
                                            if (item.folder || item.remoteItem?.folder) {
                                                navigateToFolder(item);
                                            } else {
                                                setSelectedItem(selectedItem?.id === item.id ? null : item);
                                            }
                                        },
                                        onDoubleClick: ()=>{
                                            if (!item.folder && !item.remoteItem?.folder) selectFile(item);
                                        },
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            padding: '0.6rem 1.25rem',
                                            cursor: 'pointer',
                                            background: selectedItem?.id === item.id ? 'var(--modal-item-selected)' : 'transparent',
                                            borderLeft: selectedItem?.id === item.id ? '3px solid var(--primary)' : '3px solid transparent',
                                            transition: 'background 0.1s',
                                            gap: '0.75rem'
                                        },
                                        onMouseEnter: (e)=>{
                                            if (selectedItem?.id !== item.id) e.currentTarget.style.background = 'var(--modal-item-hover)';
                                        },
                                        onMouseLeave: (e)=>{
                                            if (selectedItem?.id !== item.id) e.currentTarget.style.background = 'transparent';
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    width: '28px',
                                                    textAlign: 'center',
                                                    flexShrink: 0
                                                },
                                                children: item.folder || item.remoteItem?.folder ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    width: "24",
                                                    height: "24",
                                                    viewBox: "0 0 24 24",
                                                    fill: "none",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M10 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V8C22 6.9 21.1 6 20 6H12L10 4Z",
                                                        fill: "var(--folder-yellow)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                                        lineNumber: 906,
                                                        columnNumber: 45
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                                    lineNumber: 905,
                                                    columnNumber: 41
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    width: "24",
                                                    height: "24",
                                                    viewBox: "0 0 24 24",
                                                    fill: "none",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                            x: "3",
                                                            y: "4",
                                                            width: "18",
                                                            height: "16",
                                                            rx: "2",
                                                            fill: "var(--video-red)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                                            lineNumber: 910,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                                                            points: "10,8 10,16 16,12",
                                                            fill: "white"
                                                        }, void 0, false, {
                                                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                                            lineNumber: 911,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                                    lineNumber: 909,
                                                    columnNumber: 41
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                                lineNumber: 903,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    flex: 1,
                                                    minWidth: 0
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        color: 'var(--modal-text-primary)',
                                                        fontSize: '0.9rem',
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis'
                                                    },
                                                    children: item.name
                                                }, void 0, false, {
                                                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                                    lineNumber: 918,
                                                    columnNumber: 37
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                                lineNumber: 917,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    color: 'var(--modal-text-secondary)',
                                                    fontSize: '0.8rem',
                                                    minWidth: '70px',
                                                    textAlign: 'right'
                                                },
                                                children: item.folder || item.remoteItem?.folder ? `${item.folder?.childCount ?? item.remoteItem?.folder?.childCount ?? 0} items` : (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$shared$2f$utils$2f$formatSize$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatSize"])(item.size)
                                            }, void 0, false, {
                                                fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                                lineNumber: 927,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    color: 'var(--modal-text-secondary)',
                                                    fontSize: '0.8rem',
                                                    minWidth: '90px',
                                                    textAlign: 'right'
                                                },
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$shared$2f$utils$2f$formatDate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(item.lastModifiedDateTime)
                                            }, void 0, false, {
                                                fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                                lineNumber: 932,
                                                columnNumber: 33
                                            }, this),
                                            (item.folder || item.remoteItem?.folder) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: 'var(--modal-border)',
                                                    fontSize: '1.1rem'
                                                },
                                                children: "›"
                                            }, void 0, false, {
                                                fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                                lineNumber: 936,
                                                columnNumber: 78
                                            }, this)
                                        ]
                                    }, item.id, true, {
                                        fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                        lineNumber: 873,
                                        columnNumber: 29
                                    }, this)),
                                browseSource === 'sites' && !loading && sites.length === 0 && !error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: '200px',
                                        color: 'var(--modal-text-secondary)',
                                        fontSize: '0.9rem'
                                    },
                                    children: "No SharePoint sites found."
                                }, void 0, false, {
                                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                    lineNumber: 942,
                                    columnNumber: 29
                                }, this),
                                browseSource === 'site-drives' && !loading && drives.length === 0 && !error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: '200px',
                                        color: 'var(--modal-text-secondary)',
                                        fontSize: '0.9rem'
                                    },
                                    children: "No document libraries found in this site."
                                }, void 0, false, {
                                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                    lineNumber: 947,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                            lineNumber: 705,
                            columnNumber: 21
                        }, this),
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                padding: '0.5rem 1.25rem',
                                color: 'var(--status-error)',
                                fontSize: '0.85rem',
                                background: 'var(--btn-error-bg)',
                                opacity: 0.1
                            },
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                            lineNumber: 955,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                padding: '0.75rem 1.25rem',
                                borderTop: '1px solid var(--modal-border)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                background: 'var(--modal-footer-bg)'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        color: 'var(--modal-text-secondary)',
                                        fontSize: '0.8rem'
                                    },
                                    children: selectedItem ? `Selected: ${selectedItem.name} (${(0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$shared$2f$utils$2f$formatSize$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatSize"])(selectedItem.size)})` : browseSource === 'home' ? 'Choose a file location to browse' : 'Click a video to select, double-click to open immediately'
                                }, void 0, false, {
                                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                    lineNumber: 972,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        gap: '0.5rem'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: onClose,
                                            style: {
                                                padding: '0.5rem 1.25rem',
                                                background: 'var(--modal-border)',
                                                color: 'var(--modal-text-secondary)',
                                                border: 'none',
                                                borderRadius: '6px',
                                                cursor: 'pointer',
                                                fontSize: '0.9rem',
                                                fontWeight: '500'
                                            },
                                            children: "Cancel"
                                        }, void 0, false, {
                                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                            lineNumber: 981,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>selectedItem && selectFile(selectedItem),
                                            disabled: !selectedItem || downloading,
                                            style: {
                                                padding: '0.5rem 1.5rem',
                                                background: selectedItem && !downloading ? 'var(--ms-blue)' : 'var(--modal-border)',
                                                color: selectedItem && !downloading ? 'white' : 'var(--modal-text-secondary)',
                                                border: 'none',
                                                borderRadius: '6px',
                                                cursor: selectedItem && !downloading ? 'pointer' : 'not-allowed',
                                                fontSize: '0.9rem',
                                                fontWeight: '700'
                                            },
                                            children: downloading ? 'Importing...' : 'Select'
                                        }, void 0, false, {
                                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                            lineNumber: 986,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                    lineNumber: 980,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                            lineNumber: 964,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                    lineNumber: 492,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                lineNumber: 486,
                columnNumber: 13
            }, this),
            downloading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'var(--modal-overlay)',
                    zIndex: 10001,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    gap: '1rem'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: 'var(--modal-bg)',
                            padding: '2rem 3rem',
                            borderRadius: '12px',
                            textAlign: 'center',
                            boxShadow: 'var(--modal-overlay)'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: '40px',
                                    height: '40px',
                                    margin: '0 auto 1rem',
                                    border: '3px solid var(--modal-border)',
                                    borderTopColor: 'var(--ms-blue)',
                                    borderRadius: '50%',
                                    animation: 'spin 1s linear infinite'
                                }
                            }, void 0, false, {
                                fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                lineNumber: 1019,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    color: 'var(--modal-text-primary)',
                                    fontWeight: '600'
                                },
                                children: "Importing from SharePoint..."
                            }, void 0, false, {
                                fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                lineNumber: 1025,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    color: 'var(--modal-text-secondary)',
                                    fontSize: '0.85rem',
                                    marginTop: '0.25rem'
                                },
                                children: "Server is downloading the file directly — no bandwidth used on your end"
                            }, void 0, false, {
                                fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                lineNumber: 1028,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    color: 'var(--modal-text-secondary)',
                                    fontSize: '0.85rem',
                                    marginTop: '0.5rem'
                                },
                                children: selectedItem?.name
                            }, void 0, false, {
                                fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                                lineNumber: 1031,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                        lineNumber: 1014,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                        children: `@keyframes spin { to { transform: rotate(360deg); } }`
                    }, void 0, false, {
                        fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                        lineNumber: 1035,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx",
                lineNumber: 1007,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true);
}
_s(SharePointPicker, "60c9jY4r1a120yEkOWNr9XQFjUI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$hooks$2f$useMsal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMsal"]
    ];
});
_c = SharePointPicker;
var _c;
__turbopack_context__.k.register(_c, "SharePointPicker");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/personality/components/PersonalityChooser.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PersonalityChooser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
const PERSONALITIES = [
    {
        id: 'meetings',
        label: 'Meetings',
        icon: '📊',
        description: 'Focus on action items and decisions'
    },
    {
        id: 'training',
        label: 'Training',
        icon: '🎓',
        description: 'Focus on learning and instructions'
    },
    {
        id: 'support',
        label: 'Support',
        icon: '🛠️',
        description: 'Focus on troubleshooting and Q&A'
    }
];
function PersonalityChooser({ onPersonalityChange, currentPersonality }) {
    _s();
    const [showDropdown, setShowDropdown] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const dropdownRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Close dropdown when clicking outside
    (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PersonalityChooser.useEffect": ()=>{
            const handleClickOutside = {
                "PersonalityChooser.useEffect.handleClickOutside": (event)=>{
                    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                        setShowDropdown(false);
                    }
                }
            }["PersonalityChooser.useEffect.handleClickOutside"];
            document.addEventListener('mousedown', handleClickOutside);
            return ({
                "PersonalityChooser.useEffect": ()=>document.removeEventListener('mousedown', handleClickOutside)
            })["PersonalityChooser.useEffect"];
        }
    }["PersonalityChooser.useEffect"], []);
    const currentPersonalityData = PERSONALITIES.find((p)=>p.id === currentPersonality) || PERSONALITIES[0];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: 'relative'
        },
        ref: dropdownRef,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setShowDropdown(!showDropdown),
                style: {
                    height: '36px',
                    padding: '0 1rem',
                    background: 'var(--header-btn-personality-bg)',
                    color: 'var(--header-btn-personality-text)',
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
                    letterSpacing: '0.5px'
                },
                onMouseEnter: (e)=>e.currentTarget.style.background = 'var(--primary-hover)',
                onMouseLeave: (e)=>e.currentTarget.style.background = 'var(--header-btn-personality-bg)',
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: currentPersonalityData.icon
                    }, void 0, false, {
                        fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/personality/components/PersonalityChooser.tsx",
                        lineNumber: 61,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: currentPersonalityData.label
                    }, void 0, false, {
                        fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/personality/components/PersonalityChooser.tsx",
                        lineNumber: 62,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: '0.7rem'
                        },
                        children: "▼"
                    }, void 0, false, {
                        fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/personality/components/PersonalityChooser.tsx",
                        lineNumber: 63,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/personality/components/PersonalityChooser.tsx",
                lineNumber: 39,
                columnNumber: 13
            }, this),
            showDropdown && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    top: '110%',
                    left: 0,
                    minWidth: '250px',
                    background: 'var(--header-dropdown-bg)',
                    border: '1px solid var(--header-dropdown-border)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    padding: '0.5rem',
                    zIndex: 200,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.25rem'
                },
                children: PERSONALITIES.map((personality)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            onPersonalityChange(personality.id);
                            setShowDropdown(false);
                        },
                        style: {
                            padding: '0.75rem 1rem',
                            border: 'none',
                            background: currentPersonality === personality.id ? 'var(--upload-hover-bg)' : 'transparent',
                            textAlign: 'left',
                            cursor: 'pointer',
                            borderRadius: '4px',
                            fontSize: '0.9rem',
                            color: 'var(--text-primary)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            fontWeight: currentPersonality === personality.id ? '600' : '500',
                            transition: 'background 0.2s'
                        },
                        onMouseEnter: (e)=>e.currentTarget.style.background = 'var(--header-dropdown-item-hover)',
                        onMouseLeave: (e)=>{
                            if (currentPersonality !== personality.id) {
                                e.currentTarget.style.background = 'transparent';
                            } else {
                                e.currentTarget.style.background = 'var(--header-dropdown-item-hover)';
                            }
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: '1.5rem'
                                },
                                children: personality.icon
                            }, void 0, false, {
                                fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/personality/components/PersonalityChooser.tsx",
                                lineNumber: 113,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    flex: 1
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontWeight: '600',
                                            marginBottom: '0.15rem'
                                        },
                                        children: personality.label
                                    }, void 0, false, {
                                        fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/personality/components/PersonalityChooser.tsx",
                                        lineNumber: 115,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: '0.75rem',
                                            color: 'var(--text-secondary)'
                                        },
                                        children: personality.description
                                    }, void 0, false, {
                                        fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/personality/components/PersonalityChooser.tsx",
                                        lineNumber: 118,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/personality/components/PersonalityChooser.tsx",
                                lineNumber: 114,
                                columnNumber: 29
                            }, this),
                            currentPersonality === personality.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    color: 'var(--progress-fill)',
                                    fontSize: '1.2rem'
                                },
                                children: "✓"
                            }, void 0, false, {
                                fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/personality/components/PersonalityChooser.tsx",
                                lineNumber: 123,
                                columnNumber: 33
                            }, this)
                        ]
                    }, personality.id, true, {
                        fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/personality/components/PersonalityChooser.tsx",
                        lineNumber: 83,
                        columnNumber: 25
                    }, this))
            }, void 0, false, {
                fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/personality/components/PersonalityChooser.tsx",
                lineNumber: 67,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/personality/components/PersonalityChooser.tsx",
        lineNumber: 38,
        columnNumber: 9
    }, this);
}
_s(PersonalityChooser, "zWWPGzKPXgH9k/Pf/TULf0SJBKU=");
_c = PersonalityChooser;
var _c;
__turbopack_context__.k.register(_c, "PersonalityChooser");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/lib/browserStorage.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "deleteVideoFromLocal",
    ()=>deleteVideoFromLocal,
    "downloadVideoFromServer",
    ()=>downloadVideoFromServer,
    "getVideoFromLocal",
    ()=>getVideoFromLocal,
    "saveVideoToLocal",
    ()=>saveVideoToLocal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$shared$2f$utils$2f$apiPath$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/shared/utils/apiPath.ts [app-client] (ecmascript)");
'use client';
;
/**
 * Browser-side IndexedDB storage for video files.
 *
 * Each user gets their own IndexedDB database, named by email.
 * This ensures two users on the same browser never see each other's data.
 *
 * DB:   videoCopilot_{userEmail}   (e.g.  videoCopilot_john@contoso.com)
 * Store: videos
 * Key:   mediaId  (string – UUID)
 * Value: { blob: Blob, mimeType: string, fileName: string, savedAt: string }
 */ const DB_VERSION = 1;
const STORE_NAME = 'videos';
function getDBName(userEmail) {
    // Sanitise email for IDB name (replace chars that could cause issues)
    const safe = userEmail.toLowerCase().replace(/[^a-z0-9@._-]/g, '_');
    return `videoCopilot_${safe}`;
}
function openDB(userEmail) {
    return new Promise((resolve, reject)=>{
        const dbName = getDBName(userEmail);
        const request = indexedDB.open(dbName, DB_VERSION);
        request.onupgradeneeded = ()=>{
            const db = request.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, {
                    keyPath: 'mediaId'
                });
            }
        };
        request.onsuccess = ()=>resolve(request.result);
        request.onerror = ()=>reject(request.error);
    });
}
async function saveVideoToLocal(mediaId, file, userEmail) {
    if (!userEmail) {
        console.warn('[BrowserStorage] No userEmail provided, skipping save.');
        return;
    }
    try {
        const db = await openDB(userEmail);
        return new Promise((resolve, reject)=>{
            const tx = db.transaction(STORE_NAME, 'readwrite');
            const store = tx.objectStore(STORE_NAME);
            store.put({
                mediaId,
                blob: file,
                mimeType: file.type || 'video/mp4',
                fileName: file.name,
                savedAt: new Date().toISOString()
            });
            tx.oncomplete = ()=>{
                db.close();
                resolve();
            };
            tx.onerror = ()=>{
                db.close();
                reject(tx.error);
            };
        });
    } catch (err) {
        console.warn('[BrowserStorage] Failed to save video locally:', err);
    }
}
async function getVideoFromLocal(mediaId, userEmail) {
    if (!userEmail) {
        console.warn('[BrowserStorage] No userEmail provided, skipping read.');
        return null;
    }
    try {
        const db = await openDB(userEmail);
        return new Promise((resolve, reject)=>{
            const tx = db.transaction(STORE_NAME, 'readonly');
            const store = tx.objectStore(STORE_NAME);
            const req = store.get(mediaId);
            req.onsuccess = ()=>{
                db.close();
                if (req.result) {
                    resolve({
                        blob: req.result.blob,
                        mimeType: req.result.mimeType,
                        fileName: req.result.fileName
                    });
                } else {
                    resolve(null);
                }
            };
            req.onerror = ()=>{
                db.close();
                reject(req.error);
            };
        });
    } catch (err) {
        console.warn('[BrowserStorage] Failed to read video from local storage:', err);
        return null;
    }
}
async function deleteVideoFromLocal(mediaId, userEmail) {
    if (!userEmail) {
        console.warn('[BrowserStorage] No userEmail provided, skipping delete.');
        return;
    }
    try {
        const db = await openDB(userEmail);
        return new Promise((resolve, reject)=>{
            const tx = db.transaction(STORE_NAME, 'readwrite');
            const store = tx.objectStore(STORE_NAME);
            store.delete(mediaId);
            tx.oncomplete = ()=>{
                db.close();
                resolve();
            };
            tx.onerror = ()=>{
                db.close();
                reject(tx.error);
            };
        });
    } catch (err) {
        console.warn('[BrowserStorage] Failed to delete video from local storage:', err);
    }
}
async function downloadVideoFromServer(mediaId, userEmail, onProgress) {
    try {
        console.log(`[BrowserStorage] Downloading video ${mediaId} from server...`);
        // Use getApiPath to ensure correct base path in production
        const url = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$shared$2f$utils$2f$apiPath$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiPath"])(`/api/media/${mediaId}/stream`);
        const response = await fetch(url);
        if (!response.ok) {
            console.error(`[BrowserStorage] Download failed: ${response.status} ${response.statusText}`);
            return false;
        }
        const blob = await response.blob();
        if (blob.size < 100) {
            console.error('[BrowserStorage] Downloaded blob is too small, likely an error page');
            return false;
        }
        // Create a File object from the blob (optional, but good for metadata)
        const fileName = `imported_${mediaId}.mp4`; // We might not know the original name here easily without another API call, but that's fine
        const file = new File([
            blob
        ], fileName, {
            type: blob.type || 'video/mp4'
        });
        await saveVideoToLocal(mediaId, file, userEmail);
        console.log(`[BrowserStorage] Successfully downloaded and saved video ${mediaId} to IndexedDB`);
        return true;
    } catch (error) {
        console.error('[BrowserStorage] Error in downloadVideoFromServer:', error);
        return false;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/FileUploader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$hooks$2f$useDragDrop$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/hooks/useDragDrop.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$features$2f$auth$2f$components$2f$AuthButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/auth/components/AuthButton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$features$2f$upload$2f$components$2f$SharePoint$2f$SharePointPicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/SharePoint/SharePointPicker.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$features$2f$personality$2f$components$2f$PersonalityChooser$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/personality/components/PersonalityChooser.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$shared$2f$utils$2f$apiPath$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/shared/utils/apiPath.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$lib$2f$browserStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/lib/browserStorage.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-react/dist/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$hooks$2f$useMsal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-react/dist/hooks/useMsal.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
const FileUploader = /*#__PURE__*/ _s((0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = _s(({ onUploadComplete, onLoadExisting, currentJobStatus, currentJobProgress = 0, onCancel, personality = 'meetings', onPersonalityChange }, ref)=>{
    _s();
    const { instance, accounts } = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$hooks$2f$useMsal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMsal"])();
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('idle');
    const [uploadProgress, setUploadProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [loadingFromHistory, setLoadingFromHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [activeJobId, setActiveJobId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const xhrRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // History State
    const [history, setHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [showHistory, setShowHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Upload State
    const [showUploadModal, setShowUploadModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false); // Used for Dropdown now
    const [showOneDriveBrowser, setShowOneDriveBrowser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [sharePointLoading, setSharePointLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const uploadContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Popup UX State
    const [isClosing, setIsClosing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const popupRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const buttonRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const closePopup = ()=>{
        setIsClosing(true);
        setTimeout(()=>{
            setShowHistory(false);
            setIsClosing(false);
        }, 1000);
    };
    // Click Outside Listener
    (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FileUploader.useEffect": ()=>{
            const handleClickOutside = {
                "FileUploader.useEffect.handleClickOutside": (event)=>{
                    // Close History Popup
                    if (showHistory && !isClosing && popupRef.current && !popupRef.current.contains(event.target) && buttonRef.current && !buttonRef.current.contains(event.target)) {
                        closePopup();
                    }
                    // Close Upload Dropdown
                    if (showUploadModal && uploadContainerRef.current && !uploadContainerRef.current.contains(event.target)) {
                        setShowUploadModal(false);
                    }
                }
            }["FileUploader.useEffect.handleClickOutside"];
            document.addEventListener('mousedown', handleClickOutside);
            return ({
                "FileUploader.useEffect": ()=>{
                    document.removeEventListener('mousedown', handleClickOutside);
                }
            })["FileUploader.useEffect"];
        }
    }["FileUploader.useEffect"], [
        showHistory,
        isClosing,
        showUploadModal
    ]);
    // Load history on mount and sync with server
    (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FileUploader.useEffect": ()=>{
            // 1. Initial load from localStorage for instant UI
            const storageKey = `vc_history_${personality}`;
            const saved = localStorage.getItem(storageKey);
            if (saved) {
                try {
                    setHistory(JSON.parse(saved));
                } catch (e) {
                    console.error("Failed to parse history", e);
                }
            } else {
                // Clear history if nothing saved for this personality to prevent stale data
                setHistory([]);
            }
            // 2. ALWAYS fetch fresh list/status from server to fix stuck "Processing" states
            // Use the current user's email to filter the list
            const userEmail = accounts[0]?.username;
            const queryParams = new URLSearchParams({
                personality
            });
            if (userEmail) queryParams.append('userEmail', userEmail);
            fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$shared$2f$utils$2f$apiPath$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiPath"])(`/api/media/list?${queryParams.toString()}`)).then({
                "FileUploader.useEffect": (res)=>res.json()
            }["FileUploader.useEffect"]).then({
                "FileUploader.useEffect": (data)=>{
                    if (data.videos && Array.isArray(data.videos)) {
                        // Map server videos to history items
                        const serverItems = data.videos.map({
                            "FileUploader.useEffect.serverItems": (v)=>({
                                    mediaId: v.id,
                                    jobId: v.id,
                                    fileName: v.title || v.filename || 'Untitled',
                                    status: v.status || 'completed',
                                    date: new Date(v.upload_date).toLocaleDateString(),
                                    progress: 100
                                })
                        }["FileUploader.useEffect.serverItems"]);
                        // Update history, keeping local items if needed, but prioritizing server status
                        setHistory({
                            "FileUploader.useEffect": (current)=>{
                                // Trusting server is safer. Server knows what is really done.
                                const newHistory = serverItems;
                                localStorage.setItem(storageKey, JSON.stringify(newHistory));
                                return newHistory;
                            }
                        }["FileUploader.useEffect"]);
                    }
                }
            }["FileUploader.useEffect"]).catch({
                "FileUploader.useEffect": (err)=>console.error("Failed to sync history", err)
            }["FileUploader.useEffect"]);
        }
    }["FileUploader.useEffect"], [
        personality,
        accounts
    ]);
    // Save history helper
    const addToHistory = (item)=>{
        setHistory((prevHistory)=>{
            const newHistory = [
                item,
                ...prevHistory.filter((h)=>h.mediaId !== item.mediaId)
            ]; // No limit - show all
            const storageKey = `vc_history_${personality}`;
            localStorage.setItem(storageKey, JSON.stringify(newHistory));
            return newHistory;
        });
    };
    // reset internal state when job completes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FileUploader.useEffect": ()=>{
            if (currentJobStatus === 'COMPLETED') {
                // eslint-disable-next-line
                setStatus('idle');
                setMessage('Ready');
            }
        }
    }["FileUploader.useEffect"], [
        currentJobStatus
    ]);
    const handleCancel = async ()=>{
        // 1. Cancel Upload
        if (status === 'uploading') {
            if (xhrRef.current) {
                xhrRef.current.abort();
                xhrRef.current = null;
            }
            setStatus('idle');
            setMessage('Cancelled');
            setUploadProgress(0);
            if (onCancel) onCancel();
            return;
        }
        // 2. Cancel Processing
        if (activeJobId || currentJobStatus && currentJobStatus !== 'COMPLETED' && currentJobStatus !== 'FAILED') {
            // Prefer internal activeJobId, fallback to what might be passed (though we don't get ID from props usually)
            const jId = activeJobId;
            if (jId) {
                try {
                    await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$shared$2f$utils$2f$apiPath$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiPath"])(`/api/job/${jId}`), {
                        method: 'DELETE'
                    });
                    // Remove from History using the jobId
                    const newHistory = history.filter((h)=>h.jobId !== jId);
                    setHistory(newHistory);
                    localStorage.setItem(`vc_history_${personality}`, JSON.stringify(newHistory));
                } catch (e) {
                    console.error("Failed to delete job", e);
                }
            }
            // Reset State
            setStatus('idle');
            setMessage('Cancelled');
            setActiveJobId(null);
            if (onCancel) onCancel();
        }
    };
    const startProcessing = async (mediaId, fileName, fileId = null)=>{
        try {
            const userEmail = accounts[0]?.username || 'anonymous';
            const res = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$shared$2f$utils$2f$apiPath$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiPath"])('/api/process'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    mediaId,
                    personality,
                    userEmail
                })
            });
            const data = await res.json();
            if (res.ok) {
                // Save to history with user tracking
                addToHistory({
                    mediaId,
                    jobId: data.jobId,
                    fileName,
                    date: new Date().toISOString(),
                    userEmail
                });
                setActiveJobId(data.jobId);
                onUploadComplete(mediaId, data.jobId);
            } else {
                setStatus('error');
                setMessage('Failed to start processing.');
            }
        } catch (_err) {
            setStatus('error');
            setMessage('Failed to connect to processing API.');
        }
    };
    const processFile = async (file, fileId = null)=>{
        if (!file) return;
        // Duplicate Check
        const existing = history.find((h)=>h.fileName === file.name);
        if (existing) {
            const useExisting = window.confirm(`You analyzed "${file.name}" on ${new Date(existing.date).toLocaleDateString()}.\n\nLoad the existing analysis instead of re-uploading?`);
            if (useExisting) {
                setLoadingFromHistory(true);
                if (onLoadExisting) {
                    onLoadExisting(existing.mediaId);
                } else {
                    onUploadComplete(existing.mediaId, existing.jobId);
                }
                // Reset flag after a brief delay
                setTimeout(()=>setLoadingFromHistory(false), 500);
                return;
            }
        }
        setStatus('uploading');
        setMessage(`Saving locally & uploading ${file.name}...`);
        setUploadProgress(0);
        try {
            const xhr = new XMLHttpRequest();
            xhrRef.current = xhr;
            xhr.open('POST', (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$shared$2f$utils$2f$apiPath$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiPath"])('/api/upload'), true);
            xhr.setRequestHeader('X-Original-Filename', file.name);
            xhr.upload.onprogress = (event)=>{
                if (event.lengthComputable) {
                    const percentComplete = event.loaded / event.total * 100;
                    setUploadProgress(percentComplete);
                }
            };
            xhr.onload = async ()=>{
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    setStatus('queued');
                    setMessage('Queuing for processing...');
                    // Save video blob to IndexedDB with the real mediaId
                    try {
                        await (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$lib$2f$browserStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveVideoToLocal"])(response.mediaId, file, accounts[0]?.username || 'anonymous');
                        console.log(`[FileUploader] Saved ${file.name} to IndexedDB for ${accounts[0]?.username} (${response.mediaId})`);
                    } catch (idbErr) {
                        console.warn('[FileUploader] Failed to save video locally:', idbErr);
                    }
                    // Start the job
                    await startProcessing(response.mediaId, file.name, fileId);
                } else {
                    setStatus('error');
                    setMessage('Upload failed.');
                }
            };
            xhr.onerror = ()=>{
                setStatus('error');
                setMessage('Network error during upload.');
            };
            xhr.send(file);
        } catch (err) {
            console.error(err);
            setStatus('error');
            setMessage('Upload failed.');
        }
    };
    // OneDrive file browser - opens the Graph API modal
    const openSharePointPicker = ()=>{
        if (!accounts[0]) {
            alert('Please sign in with Microsoft first');
            return;
        }
        setShowOneDriveBrowser(true);
    };
    // Expose uploadFile method via Ref
    (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useImperativeHandle"])(ref, {
        "FileUploader.useImperativeHandle": ()=>({
                uploadFile: ({
                    "FileUploader.useImperativeHandle": (file)=>{
                        processFile(file);
                    }
                })["FileUploader.useImperativeHandle"]
            })
    }["FileUploader.useImperativeHandle"]);
    const handleFileChange = async (e)=>{
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;
        console.log(`📦 Batch upload: ${files.length} file(s) selected`);
        // Process files sequentially
        for(let i = 0; i < files.length; i++){
            const file = files[i];
            console.log(`Processing file ${i + 1}/${files.length}: ${file.name}`);
            // Update message to show batch progress with time estimate
            if (files.length > 1) {
                const avgTimePerVideo = 15; // minutes per video
                const remainingFiles = files.length - i;
                const estimatedMinutes = Math.round(remainingFiles * avgTimePerVideo);
                setMessage(`Batch: ${i + 1}/${files.length} - ${file.name} (~${estimatedMinutes} min remaining)`);
            }
            await processFile(file);
            // Small delay between files to prevent overwhelming the system
            if (i < files.length - 1) {
                await new Promise((resolve)=>setTimeout(resolve, 1000));
            }
        }
        // Reset input value
        e.target.value = '';
        if (files.length > 1) {
            setMessage(`✅ All ${files.length} files queued! Check Recent Media.`);
            console.log(`✅ All ${files.length} files queued successfully`);
            setTimeout(()=>{
                setMessage('');
                setStatus('idle');
            }, 3000);
        }
    };
    // Drag and Drop Hook
    const { isDragging, dragHandlers } = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$hooks$2f$useDragDrop$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDragDrop"])(processFile);
    // Determine what to display
    const isUploading = status === 'uploading';
    const isProcessing = !loadingFromHistory && (status === 'queued' || !!currentJobStatus && currentJobStatus !== 'COMPLETED' && currentJobStatus !== 'FAILED' && currentJobStatus !== '');
    // Calculate continuous progress across both stages
    // Upload: 0-20%, Processing: 20-100%
    const displayProgress = isUploading ? uploadProgress * 0.20 : 20 + currentJobProgress * 0.80; // Map processing 0-100% to 20-100%
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: 'relative',
            zIndex: 10
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "header",
                style: {
                    background: 'var(--upload-box)',
                    color: 'white',
                    borderBottom: `1px solid var(--upload-box-border)`,
                    padding: '0.4rem 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    height: '60px',
                    position: 'relative'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            minWidth: '250px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$shared$2f$utils$2f$apiPath$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiPath"])('/GetITDoneLogo.png'),
                                alt: "Get IT Done",
                                style: {
                                    height: '38px',
                                    width: 'auto',
                                    display: 'block'
                                }
                            }, void 0, false, {
                                fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/FileUploader.tsx",
                                lineNumber: 415,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'baseline',
                                    gap: '0.4rem'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: '1.5rem',
                                            fontWeight: '600',
                                            fontFamily: '"Noto Sans", sans-serif',
                                            color: 'var(--header-logo-text)',
                                            letterSpacing: '0.5px'
                                        },
                                        children: "DrCloudEHR"
                                    }, void 0, false, {
                                        fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/FileUploader.tsx",
                                        lineNumber: 426,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: '2.2rem',
                                            fontWeight: '700',
                                            fontFamily: '"Bebas Neue", sans-serif',
                                            color: 'var(--header-brand-text)',
                                            fontStyle: 'normal'
                                        },
                                        children: "GetThingsDone"
                                    }, void 0, false, {
                                        fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/FileUploader.tsx",
                                        lineNumber: 435,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/FileUploader.tsx",
                                lineNumber: 425,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/FileUploader.tsx",
                        lineNumber: 412,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.4rem',
                            justifyContent: 'center'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                opacity: 0.7,
                                fontSize: '0.85rem',
                                textAlign: 'center'
                            },
                            children: message || (isUploading || isProcessing ? 'Processing...' : 'Ready for new media')
                        }, void 0, false, {
                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/FileUploader.tsx",
                            lineNumber: 449,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/FileUploader.tsx",
                        lineNumber: 448,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            gap: '1rem',
                            alignItems: 'center'
                        },
                        children: [
                            onPersonalityChange && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$features$2f$personality$2f$components$2f$PersonalityChooser$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                onPersonalityChange: onPersonalityChange,
                                currentPersonality: personality
                            }, void 0, false, {
                                fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/FileUploader.tsx",
                                lineNumber: 458,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    position: 'relative'
                                },
                                ref: uploadContainerRef,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        ...dragHandlers,
                                        onClick: ()=>{
                                            if (isUploading || isProcessing) {
                                                handleCancel();
                                            } else {
                                                setShowUploadModal(!showUploadModal);
                                            }
                                        },
                                        disabled: sharePointLoading,
                                        style: {
                                            height: '36px',
                                            padding: '0 1.25rem',
                                            background: isUploading || isProcessing ? 'var(--btn-error-bg)' : sharePointLoading ? 'var(--text-light)' : 'var(--header-btn-upload-bg)',
                                            color: 'var(--header-btn-upload-text)',
                                            border: 'none',
                                            borderRadius: '8px',
                                            cursor: sharePointLoading ? 'not-allowed' : 'pointer',
                                            fontSize: '0.8rem',
                                            fontWeight: '600',
                                            transition: 'all 0.2s',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.5px',
                                            display: 'flex',
                                            alignItems: 'center'
                                        },
                                        onMouseEnter: (e)=>{
                                            if (isUploading || isProcessing) {
                                                e.currentTarget.style.background = 'var(--btn-error-hover)';
                                            } else if (!sharePointLoading) {
                                                e.currentTarget.style.background = 'var(--primary-hover)';
                                            }
                                        },
                                        onMouseLeave: (e)=>{
                                            if (isUploading || isProcessing) {
                                                e.currentTarget.style.background = 'var(--btn-error-bg)';
                                            } else if (!sharePointLoading) {
                                                e.currentTarget.style.background = 'var(--header-btn-upload-bg)';
                                            }
                                        },
                                        children: isUploading || isProcessing ? 'CANCEL' : sharePointLoading ? 'Opening...' : 'UPLOAD'
                                    }, void 0, false, {
                                        fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/FileUploader.tsx",
                                        lineNumber: 466,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    showUploadModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            position: 'absolute',
                                            top: '110%',
                                            left: 0,
                                            width: '200px',
                                            background: 'var(--header-dropdown-bg)',
                                            border: '1px solid var(--header-dropdown-border)',
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                            padding: '0.5rem',
                                            zIndex: 200,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '0.25rem'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    fileInputRef.current?.click();
                                                    setShowUploadModal(false);
                                                },
                                                style: {
                                                    padding: '0.75rem 1rem',
                                                    border: 'none',
                                                    background: 'transparent',
                                                    textAlign: 'left',
                                                    cursor: 'pointer',
                                                    borderRadius: '4px',
                                                    fontSize: '0.9rem',
                                                    color: 'var(--text-primary)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.75rem',
                                                    fontWeight: '500'
                                                },
                                                onMouseEnter: (e)=>e.currentTarget.style.background = 'var(--header-dropdown-item-hover)',
                                                onMouseLeave: (e)=>e.currentTarget.style.background = 'transparent',
                                                children: "💻 Computer"
                                            }, void 0, false, {
                                                fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/FileUploader.tsx",
                                                lineNumber: 527,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    setShowUploadModal(false);
                                                    openSharePointPicker();
                                                },
                                                style: {
                                                    padding: '0.75rem 1rem',
                                                    border: 'none',
                                                    background: 'transparent',
                                                    textAlign: 'left',
                                                    cursor: 'pointer',
                                                    borderRadius: '4px',
                                                    fontSize: '0.9rem',
                                                    color: 'var(--text-primary)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.75rem',
                                                    fontWeight: '500'
                                                },
                                                onMouseEnter: (e)=>e.currentTarget.style.background = 'var(--header-dropdown-item-hover)',
                                                onMouseLeave: (e)=>e.currentTarget.style.background = 'transparent',
                                                children: "☁️ SharePoint"
                                            }, void 0, false, {
                                                fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/FileUploader.tsx",
                                                lineNumber: 551,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/FileUploader.tsx",
                                        lineNumber: 512,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/FileUploader.tsx",
                                lineNumber: 465,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    position: 'relative'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        ref: buttonRef,
                                        onClick: ()=>{
                                            if (showHistory && !isClosing) {
                                                closePopup();
                                            } else if (!showHistory) {
                                                setShowHistory(true);
                                            }
                                        },
                                        style: {
                                            height: '36px',
                                            padding: '0 1rem',
                                            background: 'var(--header-btn-history-bg)',
                                            color: 'var(--header-btn-history-text)',
                                            border: 'none',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            transition: 'background 0.2s'
                                        },
                                        onMouseEnter: (e)=>{
                                            e.currentTarget.style.background = 'var(--primary-hover)';
                                        },
                                        onMouseLeave: (e)=>{
                                            e.currentTarget.style.background = 'var(--header-btn-history-bg)';
                                        },
                                        title: "Recent Media",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            width: "20",
                                            height: "20",
                                            viewBox: "0 0 24 24",
                                            fill: "none",
                                            stroke: "currentColor",
                                            strokeWidth: "2",
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"
                                                }, void 0, false, {
                                                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/FileUploader.tsx",
                                                    lineNumber: 613,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                    cx: "12",
                                                    cy: "13",
                                                    r: "3"
                                                }, void 0, false, {
                                                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/FileUploader.tsx",
                                                    lineNumber: 614,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M12 10v3l1.5 1.5"
                                                }, void 0, false, {
                                                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/FileUploader.tsx",
                                                    lineNumber: 615,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/FileUploader.tsx",
                                            lineNumber: 612,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/FileUploader.tsx",
                                        lineNumber: 581,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    (showHistory || isClosing) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        ref: popupRef,
                                        style: {
                                            position: 'absolute',
                                            top: '110%',
                                            right: 0,
                                            width: '300px',
                                            background: 'var(--header-dropdown-bg)',
                                            border: '1px solid var(--header-dropdown-border)',
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                            padding: '1rem',
                                            zIndex: 200,
                                            opacity: isClosing ? 0 : 1,
                                            color: 'var(--text-primary)',
                                            transition: 'opacity .5s ease-out',
                                            pointerEvents: isClosing ? 'none' : 'auto'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    marginBottom: '1rem'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        style: {
                                                            margin: 0,
                                                            fontSize: '1rem'
                                                        },
                                                        children: "Recent Media"
                                                    }, void 0, false, {
                                                        fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/FileUploader.tsx",
                                                        lineNumber: 640,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    history.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: (e)=>{
                                                            e.stopPropagation();
                                                            if (window.confirm('Clear all saved media history?')) {
                                                                setHistory([]);
                                                                localStorage.removeItem(`vc_history_${personality}`);
                                                            }
                                                        },
                                                        style: {
                                                            padding: '0.3rem 0.6rem',
                                                            fontSize: '0.75rem',
                                                            background: 'var(--btn-error-bg)',
                                                            color: 'white',
                                                            border: 'none',
                                                            borderRadius: '4px',
                                                            cursor: 'pointer',
                                                            fontWeight: '600'
                                                        },
                                                        children: "Clear All"
                                                    }, void 0, false, {
                                                        fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/FileUploader.tsx",
                                                        lineNumber: 642,
                                                        columnNumber: 41
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/FileUploader.tsx",
                                                lineNumber: 639,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            history.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: '0.9rem',
                                                    color: 'var(--text-secondary)'
                                                },
                                                children: "No saved media yet."
                                            }, void 0, false, {
                                                fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/FileUploader.tsx",
                                                lineNumber: 666,
                                                columnNumber: 37
                                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: '0.5rem',
                                                    maxHeight: '400px',
                                                    overflowY: 'auto',
                                                    paddingRight: '0.5rem'
                                                },
                                                children: history.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            padding: '0.5rem',
                                                            border: '1px solid var(--header-dropdown-border)',
                                                            borderRadius: '4px',
                                                            fontSize: '0.9rem',
                                                            transition: 'background 0.2s',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between',
                                                            gap: '0.5rem'
                                                        },
                                                        onMouseEnter: (e)=>e.currentTarget.style.background = 'var(--header-dropdown-item-hover)',
                                                        onMouseLeave: (e)=>e.currentTarget.style.background = 'var(--header-dropdown-bg)',
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                onClick: ()=>{
                                                                    setLoadingFromHistory(true);
                                                                    setStatus('idle');
                                                                    if (onLoadExisting) {
                                                                        onLoadExisting(item.mediaId);
                                                                    } else {
                                                                        onUploadComplete(item.mediaId, item.jobId);
                                                                    }
                                                                    setShowHistory(false);
                                                                    setTimeout(()=>setLoadingFromHistory(false), 500);
                                                                },
                                                                style: {
                                                                    flex: 1,
                                                                    cursor: 'pointer',
                                                                    overflow: 'hidden'
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            fontWeight: 600,
                                                                            overflow: 'hidden',
                                                                            textOverflow: 'ellipsis',
                                                                            whiteSpace: 'nowrap',
                                                                            color: 'var(--text-primary)'
                                                                        },
                                                                        children: item.fileName
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/FileUploader.tsx",
                                                                        lineNumber: 700,
                                                                        columnNumber: 53
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            fontSize: '0.75rem',
                                                                            color: 'var(--text-secondary)'
                                                                        },
                                                                        children: new Date(item.date).toLocaleDateString()
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/FileUploader.tsx",
                                                                        lineNumber: 703,
                                                                        columnNumber: 53
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/FileUploader.tsx",
                                                                lineNumber: 686,
                                                                columnNumber: 49
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: (e)=>{
                                                                    e.stopPropagation();
                                                                    if (window.confirm(`Remove "${item.fileName}" from history?`)) {
                                                                        const newHistory = history.filter((_, index)=>index !== i);
                                                                        setHistory(newHistory);
                                                                        localStorage.setItem(`vc_history_${personality}`, JSON.stringify(newHistory));
                                                                    }
                                                                },
                                                                style: {
                                                                    background: 'none',
                                                                    border: 'none',
                                                                    cursor: 'pointer',
                                                                    color: 'var(--text-secondary)',
                                                                    padding: '4px',
                                                                    borderRadius: '4px',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center'
                                                                },
                                                                onMouseEnter: (e)=>{
                                                                    e.currentTarget.style.color = 'white';
                                                                    e.currentTarget.style.background = 'var(--status-error)';
                                                                },
                                                                onMouseLeave: (e)=>{
                                                                    e.currentTarget.style.color = 'var(--text-secondary)';
                                                                    e.currentTarget.style.background = 'none';
                                                                },
                                                                title: "Delete",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                    width: "14",
                                                                    height: "14",
                                                                    viewBox: "0 0 24 24",
                                                                    fill: "none",
                                                                    stroke: "currentColor",
                                                                    strokeWidth: "2",
                                                                    strokeLinecap: "round",
                                                                    strokeLinejoin: "round",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                            d: "M3 6h18"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/FileUploader.tsx",
                                                                            lineNumber: 739,
                                                                            columnNumber: 57
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                            d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/FileUploader.tsx",
                                                                            lineNumber: 740,
                                                                            columnNumber: 57
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                            d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/FileUploader.tsx",
                                                                            lineNumber: 741,
                                                                            columnNumber: 57
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/FileUploader.tsx",
                                                                    lineNumber: 738,
                                                                    columnNumber: 53
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/FileUploader.tsx",
                                                                lineNumber: 708,
                                                                columnNumber: 49
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, i, true, {
                                                        fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/FileUploader.tsx",
                                                        lineNumber: 670,
                                                        columnNumber: 45
                                                    }, ("TURBOPACK compile-time value", void 0)))
                                            }, void 0, false, {
                                                fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/FileUploader.tsx",
                                                lineNumber: 668,
                                                columnNumber: 37
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/FileUploader.tsx",
                                        lineNumber: 621,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/FileUploader.tsx",
                                lineNumber: 580,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "file",
                                accept: "video/*,audio/*,.mkv",
                                multiple: true,
                                ref: fileInputRef,
                                onChange: handleFileChange,
                                style: {
                                    display: 'none'
                                }
                            }, void 0, false, {
                                fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/FileUploader.tsx",
                                lineNumber: 752,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$features$2f$auth$2f$components$2f$AuthButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/FileUploader.tsx",
                                lineNumber: 762,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/FileUploader.tsx",
                        lineNumber: 455,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    (isUploading || isProcessing) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'absolute',
                            bottom: -1,
                            left: 0,
                            right: 0,
                            height: '6px',
                            backgroundColor: 'var(--progress-bg)',
                            overflow: 'hidden'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                height: '100%',
                                width: `${Math.min(displayProgress, 100)}%`,
                                backgroundColor: 'var(--progress-fill)',
                                transition: 'width 2s ease-in-out'
                            }
                        }, void 0, false, {
                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/FileUploader.tsx",
                            lineNumber: 776,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/FileUploader.tsx",
                        lineNumber: 767,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/FileUploader.tsx",
                lineNumber: 399,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            (isUploading || isProcessing) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: '100%',
                    backgroundColor: 'transparent',
                    paddingTop: '0.5rem',
                    paddingBottom: '0.5rem',
                    fontSize: '12px',
                    color: 'var(--text-light)',
                    textAlign: 'center',
                    fontWeight: '500'
                },
                children: message || (isUploading ? 'Uploading File' : currentJobStatus === 'QUEUED' || currentJobStatus === 'PREPARING' || currentJobStatus === 'EXTRACTING_AUDIO' || currentJobStatus === 'COMPRESSING_VIDEO' || currentJobStatus === 'CHUNKING' || currentJobStatus === 'TRANSCRIBING' || currentJobStatus === 'TRANSCRIBING_CHUNK' ? 'Processing File' : 'Generating Content')
            }, void 0, false, {
                fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/FileUploader.tsx",
                lineNumber: 791,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$features$2f$upload$2f$components$2f$SharePoint$2f$SharePointPicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                isOpen: showOneDriveBrowser,
                onClose: ()=>setShowOneDriveBrowser(false),
                onFileSelected: (fileOrImport)=>{
                    setShowOneDriveBrowser(false);
                    if ('isServerImport' in fileOrImport && fileOrImport.isServerImport) {
                        // Server-side import — file already on disk, skip upload
                        setStatus('queued');
                        setMessage(`Imported ${fileOrImport.fileName} from SharePoint`);
                        startProcessing(fileOrImport.mediaId, fileOrImport.fileName);
                    } else {
                        // Client-side file (fallback / local upload)
                        processFile(fileOrImport);
                    }
                }
            }, void 0, false, {
                fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/FileUploader.tsx",
                lineNumber: 812,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/FileUploader.tsx",
        lineNumber: 398,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
}, "B6oo+AHVRJnq17hOG9tdaxjeBpk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$hooks$2f$useMsal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMsal"],
        __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$hooks$2f$useDragDrop$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDragDrop"]
    ];
})), "B6oo+AHVRJnq17hOG9tdaxjeBpk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$hooks$2f$useMsal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMsal"],
        __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$hooks$2f$useDragDrop$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDragDrop"]
    ];
});
_c1 = FileUploader;
FileUploader.displayName = 'FileUploader';
const __TURBOPACK__default__export__ = FileUploader;
var _c, _c1;
__turbopack_context__.k.register(_c, "FileUploader$forwardRef");
__turbopack_context__.k.register(_c1, "FileUploader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/player/hooks/useVideoSource.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useVideoSource",
    ()=>useVideoSource
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-react/dist/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$hooks$2f$useMsal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-react/dist/hooks/useMsal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$lib$2f$browserStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/lib/browserStorage.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$shared$2f$utils$2f$apiPath$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/shared/utils/apiPath.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function useVideoSource(mediaId, jobStatus) {
    _s();
    const { accounts } = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$hooks$2f$useMsal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMsal"])();
    const userEmail = accounts[0]?.username || '';
    const [videoSrc, setVideoSrc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [sourceType, setSourceType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('none');
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useVideoSource.useEffect": ()=>{
            if (!mediaId) {
                setVideoSrc(null);
                setSourceType('none');
                return;
            }
            let cancelled = false;
            const blobUrlRef = {
                current: null
            };
            async function resolveSource() {
                setLoading(true);
                // 1. Try IndexedDB (local blob)
                try {
                    const local = await (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$lib$2f$browserStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getVideoFromLocal"])(mediaId, userEmail);
                    if (local && !cancelled) {
                        const url = URL.createObjectURL(local.blob);
                        blobUrlRef.current = url;
                        setVideoSrc(url);
                        setSourceType('local');
                        setLoading(false);
                        return;
                    }
                } catch (e) {
                    console.warn('[useVideoSource] IndexedDB lookup failed:', e);
                }
                // 2. Try server stream (HEAD request to check if file exists)
                try {
                    const resp = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$shared$2f$utils$2f$apiPath$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiPath"])(`/api/media/${mediaId}/stream`), {
                        method: 'HEAD'
                    });
                    if (resp.ok && !cancelled) {
                        setVideoSrc((0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$shared$2f$utils$2f$apiPath$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiPath"])(`/api/media/${mediaId}/stream`));
                        setSourceType('server');
                        setLoading(false);
                        return;
                    }
                } catch (e) {
                    console.warn('[useVideoSource] Server stream check failed:', e);
                }
                // 3. Neither available
                if (!cancelled) {
                    setVideoSrc(null);
                    setSourceType('none');
                    setLoading(false);
                }
            }
            resolveSource();
            return ({
                "useVideoSource.useEffect": ()=>{
                    cancelled = true;
                    // Revoke blob URL to free memory
                    if (blobUrlRef.current) {
                        URL.revokeObjectURL(blobUrlRef.current);
                    }
                }
            })["useVideoSource.useEffect"];
        }
    }["useVideoSource.useEffect"], [
        mediaId,
        jobStatus,
        userEmail
    ]);
    return {
        videoSrc,
        sourceType,
        loading
    };
}
_s(useVideoSource, "ez7vHmaeevp/91+TuAumyKthyU0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$hooks$2f$useMsal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMsal"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/player/components/VideoPlayer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$hooks$2f$useDragDrop$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/hooks/useDragDrop.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$features$2f$player$2f$hooks$2f$useVideoSource$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/player/hooks/useVideoSource.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const VideoPlayer = /*#__PURE__*/ _s((0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = _s(({ mediaId, jobStatus, onFileDrop }, ref)=>{
    _s();
    const videoRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { isDragging, dragHandlers } = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$hooks$2f$useDragDrop$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDragDrop"])(onFileDrop);
    const { videoSrc, sourceType, loading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$features$2f$player$2f$hooks$2f$useVideoSource$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVideoSource"])(mediaId, jobStatus);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useImperativeHandle"])(ref, {
        "VideoPlayer.useImperativeHandle": ()=>({
                seekTo: ({
                    "VideoPlayer.useImperativeHandle": (time)=>{
                        if (videoRef.current) {
                            videoRef.current.currentTime = time;
                            videoRef.current.play().catch({
                                "VideoPlayer.useImperativeHandle": ()=>{}
                            }["VideoPlayer.useImperativeHandle"]);
                        }
                    }
                })["VideoPlayer.useImperativeHandle"]
            })
    }["VideoPlayer.useImperativeHandle"]);
    // ── No media selected ──
    if (!mediaId) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "video-section",
            ...dragHandlers,
            style: {
                ...isDragging ? {
                    border: '2px dashed var(--video-badge-local-bg)',
                    background: 'var(--video-container-bg)',
                    opacity: 0.8
                } : {}
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    textAlign: 'center',
                    opacity: 0.6,
                    pointerEvents: 'none'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontSize: '1.2rem',
                            fontWeight: 600
                        },
                        children: isDragging ? 'Drop to Upload' : 'Video Player Placeholder'
                    }, void 0, false, {
                        fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/player/components/VideoPlayer.tsx",
                        lineNumber: 46,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontSize: '0.9rem'
                        },
                        children: isDragging ? 'Release to start analysis' : 'Upload or Drop media to start playback'
                    }, void 0, false, {
                        fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/player/components/VideoPlayer.tsx",
                        lineNumber: 49,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/player/components/VideoPlayer.tsx",
                lineNumber: 45,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/player/components/VideoPlayer.tsx",
            lineNumber: 34,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0));
    }
    // ── Loading state ──
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "video-section",
            style: {
                background: 'var(--video-loading-overlay)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '0.5rem'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        width: '32px',
                        height: '32px',
                        border: '3px solid var(--border-light)',
                        borderTopColor: 'var(--video-badge-local-bg)',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                    }
                }, void 0, false, {
                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/player/components/VideoPlayer.tsx",
                    lineNumber: 65,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    style: {
                        color: 'var(--text-white)',
                        fontSize: '0.85rem'
                    },
                    children: "Loading video..."
                }, void 0, false, {
                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/player/components/VideoPlayer.tsx",
                    lineNumber: 71,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                    children: `@keyframes spin { to { transform: rotate(360deg); } }`
                }, void 0, false, {
                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/player/components/VideoPlayer.tsx",
                    lineNumber: 72,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/player/components/VideoPlayer.tsx",
            lineNumber: 60,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0));
    }
    // ── Video not found (no local blob, no server file) ──
    if (!videoSrc) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "video-section",
            style: {
                background: 'var(--video-container-bg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '0.75rem',
                padding: '2rem',
                textAlign: 'center'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        fontSize: '2rem'
                    },
                    children: "📄"
                }, void 0, false, {
                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/player/components/VideoPlayer.tsx",
                    lineNumber: 86,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        color: 'var(--video-error-text)',
                        fontWeight: 600
                    },
                    children: "Video not available on this device"
                }, void 0, false, {
                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/player/components/VideoPlayer.tsx",
                    lineNumber: 87,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        color: 'var(--text-secondary)',
                        fontSize: '0.85rem',
                        maxWidth: '300px'
                    },
                    children: "The transcript and analysis are still available below. To watch the video, open this page on the device where it was originally uploaded."
                }, void 0, false, {
                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/player/components/VideoPlayer.tsx",
                    lineNumber: 90,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/player/components/VideoPlayer.tsx",
            lineNumber: 80,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0));
    }
    // ── Playback ──
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "video-section",
        style: {
            background: 'black'
        },
        children: [
            sourceType === 'local' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    background: 'var(--video-badge-local-bg)',
                    opacity: 0.8,
                    color: '#fff',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    zIndex: 10
                },
                children: "LOCAL"
            }, void 0, false, {
                fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/player/components/VideoPlayer.tsx",
                lineNumber: 102,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                ref: videoRef,
                src: videoSrc,
                controls: true,
                style: {
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain'
                },
                children: "Your browser does not support the video tag."
            }, `${mediaId}-${jobStatus === 'COMPLETED' ? 'ready' : 'processing'}-${sourceType}`, false, {
                fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/player/components/VideoPlayer.tsx",
                lineNumber: 111,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/player/components/VideoPlayer.tsx",
        lineNumber: 100,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
}, "Mk7fWVu9fUCeOTw7vgQT+uK3RQo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$hooks$2f$useDragDrop$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDragDrop"],
        __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$features$2f$player$2f$hooks$2f$useVideoSource$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVideoSource"]
    ];
})), "Mk7fWVu9fUCeOTw7vgQT+uK3RQo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$hooks$2f$useDragDrop$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDragDrop"],
        __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$features$2f$player$2f$hooks$2f$useVideoSource$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVideoSource"]
    ];
});
_c1 = VideoPlayer;
VideoPlayer.displayName = 'VideoPlayer';
const __TURBOPACK__default__export__ = VideoPlayer;
var _c, _c1;
__turbopack_context__.k.register(_c, "VideoPlayer$forwardRef");
__turbopack_context__.k.register(_c1, "VideoPlayer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/shared/utils/formatTime.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Format seconds into MM:SS display string.
 * Single source of truth — replaces 4 duplicate implementations.
 */ __turbopack_context__.s([
    "formatTime",
    ()=>formatTime
]);
function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/intelligence/utils/trainingFormatters.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "formatTrainingResponse",
    ()=>formatTrainingResponse
]);
function formatTrainingResponse(tab, data) {
    if (!data) return "No data available.";
    // If data is string, try to parse it
    if (typeof data === 'string') {
        try {
            data = JSON.parse(data);
        } catch  {
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
            md += `**Included:**\n${data.scope_guardrails?.included?.map((i)=>`- ${i}`).join('\n') || 'None'}\n\n`;
            md += `**Excluded:**\n${data.scope_guardrails?.excluded?.map((i)=>`- ${i}`).join('\n') || 'None'}\n\n`;
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
        data.steps.forEach((step)=>{
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
        data.step_walkthrough?.forEach((step)=>{
            md += `- "${step}"\n`;
        });
        md += '\n';
        if (data.single_example) {
            md += `**Example (${data.single_example.example_name}):**\n"${data.single_example.example_script}"\n\n`;
        }
        if (data.common_mistakes?.length) {
            md += `**Common Mistakes:**\n${data.common_mistakes.map((m)=>`- ${m}`).join('\n')}\n\n`;
        }
        md += `**Wrap Up:**\n"${data.wrap_up}"\n`;
        return md;
    }
    return JSON.stringify(data, null, 2);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/intelligence/hooks/useIntelligence.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useIntelligence",
    ()=>useIntelligence
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$shared$2f$utils$2f$apiPath$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/shared/utils/apiPath.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$features$2f$intelligence$2f$utils$2f$trainingFormatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/intelligence/utils/trainingFormatters.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function useIntelligence(mediaId, jobId, personality, onStatusChange, onProgressChange) {
    _s();
    const [jobStatus, setJobStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [transcriptData, setTranscriptData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [polling, setPolling] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Chat state
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isChatting, setIsChatting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Training mode state
    const [activeTrainingTab, setActiveTrainingTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('chat');
    const [trainingMessages, setTrainingMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        chat: [],
        scribe: [],
        voiceover: []
    });
    const generatedTabs = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Set());
    const currentMediaRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Job Polling (or direct load when jobId is null but mediaId exists)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useIntelligence.useEffect": ()=>{
            if (!jobId) {
                if (mediaId) {
                    // Direct load — content already exists on server, no polling needed
                    setMessages([]);
                    setTrainingMessages({
                        chat: [],
                        scribe: [],
                        voiceover: []
                    });
                    generatedTabs.current.clear();
                    setPolling(false);
                    setJobStatus('COMPLETED');
                    if (onStatusChange) onStatusChange('COMPLETED');
                    if (onProgressChange) onProgressChange(100);
                    fetchTranscript(mediaId);
                } else {
                    setTranscriptData(null);
                    setMessages([]);
                    setTrainingMessages({
                        chat: [],
                        scribe: [],
                        voiceover: []
                    });
                    setJobStatus('');
                    generatedTabs.current.clear();
                }
                return;
            }
            setTranscriptData(null);
            setMessages([]);
            let intervalId;
            const checkStatus = {
                "useIntelligence.useEffect.checkStatus": async ()=>{
                    try {
                        const res = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$shared$2f$utils$2f$apiPath$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiPath"])(`/api/job/${jobId}`));
                        if (res.ok) {
                            const data = await res.json();
                            setJobStatus(data.status);
                            if (onStatusChange) onStatusChange(data.status);
                            if (onProgressChange) onProgressChange(data.progress || 0);
                            if (data.status === 'COMPLETED') {
                                setPolling(false);
                                fetchTranscript(data.mediaId);
                                clearInterval(intervalId);
                            } else if (data.status === 'FAILED') {
                                setPolling(false);
                                clearInterval(intervalId);
                            }
                        }
                    } catch (e) {
                        console.error('Polling error', e);
                    }
                }
            }["useIntelligence.useEffect.checkStatus"];
            setPolling(true);
            checkStatus();
            intervalId = setInterval(checkStatus, 2000);
            return ({
                "useIntelligence.useEffect": ()=>clearInterval(intervalId)
            })["useIntelligence.useEffect"];
        }
    }["useIntelligence.useEffect"], [
        jobId,
        mediaId
    ]);
    const fetchTranscript = async (mid)=>{
        try {
            const res = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$shared$2f$utils$2f$apiPath$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiPath"])(`/api/transcript/${mid}`));
            if (res.ok) {
                const data = await res.json();
                setTranscriptData(data);
            }
        } catch (e) {
            console.error("Failed to fetch transcript", e);
        }
    };
    // Auto-generate content for Training mode
    (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useIntelligence.useEffect": ()=>{
            if (personality !== 'training' || !transcriptData || !mediaId) return;
            if (currentMediaRef.current !== mediaId) {
                currentMediaRef.current = mediaId;
                generatedTabs.current.clear();
            }
            const cacheKey = `${mediaId}-${activeTrainingTab}`;
            if (generatedTabs.current.has(cacheKey)) return;
            generatedTabs.current.add(cacheKey);
            const autoGenerate = {
                "useIntelligence.useEffect.autoGenerate": async ()=>{
                    setIsChatting(true);
                    const currentTab = activeTrainingTab;
                    const defaultQuestions = {
                        chat: 'Analyze this training video and provide a comprehensive overview.',
                        scribe: 'Extract all build steps from this training video.',
                        voiceover: 'Generate a voice-over script for this training video.'
                    };
                    try {
                        const res = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$shared$2f$utils$2f$apiPath$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiPath"])('/api/training-chat'), {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                question: defaultQuestions[currentTab],
                                activeTab: currentTab,
                                transcriptSegments: transcriptData.segments
                            })
                        });
                        if (res.ok) {
                            const data = await res.json();
                            const formattedContent = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$features$2f$intelligence$2f$utils$2f$trainingFormatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatTrainingResponse"])(currentTab, data.trainingData || data.answer);
                            const newMsg = {
                                role: 'assistant',
                                content: formattedContent,
                                citations: data.citations,
                                followUps: data.followUps
                            };
                            setTrainingMessages({
                                "useIntelligence.useEffect.autoGenerate": (prev)=>({
                                        ...prev,
                                        [currentTab]: [
                                            newMsg
                                        ]
                                    })
                            }["useIntelligence.useEffect.autoGenerate"]);
                        } else {
                            setTrainingMessages({
                                "useIntelligence.useEffect.autoGenerate": (prev)=>({
                                        ...prev,
                                        [currentTab]: [
                                            {
                                                role: 'assistant',
                                                content: "Sorry, I had trouble generating content."
                                            }
                                        ]
                                    })
                            }["useIntelligence.useEffect.autoGenerate"]);
                            generatedTabs.current.delete(cacheKey);
                        }
                    } catch (e) {
                        generatedTabs.current.delete(cacheKey);
                    } finally{
                        setIsChatting(false);
                    }
                }
            }["useIntelligence.useEffect.autoGenerate"];
            autoGenerate();
        }
    }["useIntelligence.useEffect"], [
        activeTrainingTab,
        personality,
        transcriptData,
        mediaId
    ]);
    const sendMessage = async (text)=>{
        if (!text.trim() || !mediaId || isChatting) return;
        const userMsg = {
            role: 'user',
            content: text
        };
        if (personality === 'training') {
            setTrainingMessages((prev)=>({
                    ...prev,
                    [activeTrainingTab]: [
                        ...prev[activeTrainingTab],
                        userMsg
                    ]
                }));
        } else {
            setMessages((prev)=>[
                    ...prev,
                    userMsg
                ]);
        }
        setIsChatting(true);
        const currentTab = activeTrainingTab;
        try {
            const apiRoute = personality === 'training' ? '/api/training-chat' : '/api/chat';
            const historyMsgs = personality === 'training' ? trainingMessages[currentTab] : messages;
            const res = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$shared$2f$utils$2f$apiPath$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiPath"])(apiRoute), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    mediaId,
                    question: text,
                    history: historyMsgs.map((m)=>({
                            role: m.role,
                            content: m.content
                        })),
                    personality,
                    activeTab: personality === 'training' ? currentTab : undefined,
                    transcriptSegments: transcriptData?.segments
                })
            });
            if (res.ok) {
                const data = await res.json();
                const content = personality === 'training' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$features$2f$intelligence$2f$utils$2f$trainingFormatters$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatTrainingResponse"])(currentTab, data.trainingData || data.answer) : data.answer;
                const newMsg = {
                    role: 'assistant',
                    content: content,
                    citations: data.citations,
                    followUps: data.followUps || data.suggested_questions,
                    crossVideoSources: data.crossVideoSources
                };
                if (personality === 'training') {
                    setTrainingMessages((prev)=>({
                            ...prev,
                            [currentTab]: [
                                ...prev[currentTab],
                                newMsg
                            ]
                        }));
                } else {
                    setMessages((prev)=>[
                            ...prev,
                            newMsg
                        ]);
                }
            }
        } catch (e) {
            console.error('Chat error', e);
        } finally{
            setIsChatting(false);
        }
    };
    return {
        jobStatus,
        transcriptData,
        polling,
        messages,
        isChatting,
        activeTrainingTab,
        setActiveTrainingTab,
        trainingMessages,
        sendMessage
    };
}
_s(useIntelligence, "iVu+tgi9V8TQvz3+G6yP2etL+OQ=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/intelligence/components/IntelligencePanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>IntelligencePanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$react$2d$markdown$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Markdown__as__default$3e$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/react-markdown/lib/index.js [app-client] (ecmascript) <export Markdown as default>");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$shared$2f$utils$2f$formatTime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/shared/utils/formatTime.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$features$2f$intelligence$2f$hooks$2f$useIntelligence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/intelligence/hooks/useIntelligence.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function IntelligencePanel({ mediaId, jobId, onSeek, onStatusChange, onProgressChange, personality = 'meetings' }) {
    _s();
    const { jobStatus, transcriptData, polling, messages, isChatting, activeTrainingTab, setActiveTrainingTab, trainingMessages, sendMessage } = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$features$2f$intelligence$2f$hooks$2f$useIntelligence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIntelligence"])(mediaId, jobId, personality, onStatusChange, onProgressChange);
    const [input, setInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const chatEndRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "IntelligencePanel.useEffect": ()=>{
            if (chatEndRef.current) {
                chatEndRef.current.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    }["IntelligencePanel.useEffect"], [
        messages,
        trainingMessages,
        activeTrainingTab
    ]);
    const handleSendMessage = async (textOverride)=>{
        const textToSend = textOverride || input;
        if (!textToSend.trim()) return;
        if (!textOverride) setInput('');
        await sendMessage(textToSend);
    };
    const handleHighlightClick = (point)=>{
        if (point.timestamp !== undefined) onSeek(point.timestamp);
        handleSendMessage(`Check the video at ${(0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$shared$2f$utils$2f$formatTime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatTime"])(point.timestamp || 0)} and tell me more about: "${point.text}"`);
    };
    const getKeyPoints = ()=>{
        if (!transcriptData?.keyPoints) return [];
        return transcriptData.keyPoints.map((kp)=>{
            if (typeof kp === 'string') return {
                text: kp,
                timestamp: 0
            };
            return kp;
        });
    };
    const keyPoints = getKeyPoints();
    const processContent = (text)=>{
        return text.replace(/\[((?:\d{1,2}:)?\d{1,2}:\d{2})\]/g, (match, timeStr)=>{
            const parts = timeStr.split(':').map(Number);
            let seconds = 0;
            if (parts.length === 3) seconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
            else seconds = parts[0] * 60 + parts[1];
            return `[${match}](#seek:${seconds})`;
        });
    };
    const currentMessages = personality === 'training' ? trainingMessages[activeTrainingTab] : messages;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "intelligence-panel",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "panel-card",
                style: {
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            borderBottom: '1px solid var(--border-default)',
                            background: 'var(--chat-header-bg)'
                        },
                        children: [
                            personality !== 'training' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: '1.3rem',
                                    fontWeight: '700',
                                    padding: '1.5rem',
                                    margin: 0,
                                    color: 'var(--text-primary)'
                                },
                                children: "Chat"
                            }, void 0, false, {
                                fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/intelligence/components/IntelligencePanel.tsx",
                                lineNumber: 94,
                                columnNumber: 25
                            }, this),
                            personality === 'training' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    gap: '0.25rem',
                                    padding: '1rem 1rem 0 1rem',
                                    borderBottom: '1px solid var(--border-default)',
                                    justifyContent: 'space-between'
                                },
                                children: [
                                    'chat',
                                    'scribe',
                                    'voiceover'
                                ].map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setActiveTrainingTab(tab),
                                        style: {
                                            flex: 1,
                                            padding: '0.75rem 0.5rem',
                                            border: 'none',
                                            background: activeTrainingTab === tab ? 'var(--upload-hover-bg)' : 'transparent',
                                            borderBottom: activeTrainingTab === tab ? '3px solid var(--primary)' : '3px solid transparent',
                                            cursor: 'pointer',
                                            fontWeight: activeTrainingTab === tab ? '700' : '500',
                                            color: activeTrainingTab === tab ? 'var(--primary)' : 'var(--text-secondary)',
                                            fontSize: '0.95rem',
                                            borderRadius: '8px 8px 0 0',
                                            transition: 'all 0.2s',
                                            textAlign: 'center'
                                        },
                                        children: tab === 'chat' ? 'Chat' : tab === 'scribe' ? 'Scribe Steps' : 'VoiceOver Tips'
                                    }, tab, false, {
                                        fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/intelligence/components/IntelligencePanel.tsx",
                                        lineNumber: 103,
                                        columnNumber: 33
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/intelligence/components/IntelligencePanel.tsx",
                                lineNumber: 98,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/intelligence/components/IntelligencePanel.tsx",
                        lineNumber: 89,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "content-area",
                        style: {
                            flex: 1,
                            overflow: 'hidden',
                            background: 'var(--chat-messages-bg)'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "chat-container",
                            style: {
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "messages",
                                    style: {
                                        flex: 1,
                                        padding: '1.5rem',
                                        overflowY: 'auto'
                                    },
                                    children: [
                                        mediaId && polling && !transcriptData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "skeleton-summary",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "skeleton",
                                                    style: {
                                                        width: '30%',
                                                        height: '24px',
                                                        marginBottom: '1rem'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/intelligence/components/IntelligencePanel.tsx",
                                                    lineNumber: 127,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "skeleton",
                                                    style: {
                                                        width: '100%',
                                                        height: '16px',
                                                        marginBottom: '0.6rem'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/intelligence/components/IntelligencePanel.tsx",
                                                    lineNumber: 128,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "skeleton",
                                                    style: {
                                                        width: '92%',
                                                        height: '16px',
                                                        marginBottom: '0.6rem'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/intelligence/components/IntelligencePanel.tsx",
                                                    lineNumber: 129,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "skeleton",
                                                    style: {
                                                        width: '96%',
                                                        height: '16px',
                                                        marginBottom: '2rem'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/intelligence/components/IntelligencePanel.tsx",
                                                    lineNumber: 130,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "skeleton",
                                                    style: {
                                                        width: '40%',
                                                        height: '22px',
                                                        marginBottom: '1.2rem'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/intelligence/components/IntelligencePanel.tsx",
                                                    lineNumber: 131,
                                                    columnNumber: 37
                                                }, this),
                                                [
                                                    ...Array(3)
                                                ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "skeleton",
                                                        style: {
                                                            width: '100%',
                                                            height: '70px',
                                                            marginBottom: '1rem',
                                                            borderRadius: '12px'
                                                        }
                                                    }, i, false, {
                                                        fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/intelligence/components/IntelligencePanel.tsx",
                                                        lineNumber: 133,
                                                        columnNumber: 41
                                                    }, this)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        textAlign: 'center',
                                                        marginTop: '2rem',
                                                        color: 'var(--text-secondary)',
                                                        fontSize: '0.9rem'
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: "AI is analyzing your video..."
                                                    }, void 0, false, {
                                                        fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/intelligence/components/IntelligencePanel.tsx",
                                                        lineNumber: 136,
                                                        columnNumber: 41
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/intelligence/components/IntelligencePanel.tsx",
                                                    lineNumber: 135,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/intelligence/components/IntelligencePanel.tsx",
                                            lineNumber: 126,
                                            columnNumber: 33
                                        }, this),
                                        transcriptData && personality === 'meetings' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "summary-section",
                                            style: {
                                                marginBottom: '2rem',
                                                padding: '1.5rem',
                                                background: 'var(--chat-recap-bg)',
                                                borderRadius: '12px',
                                                border: '1px solid var(--border-default)'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    style: {
                                                        fontSize: '1.2rem',
                                                        marginBottom: '0.5rem',
                                                        fontWeight: '700',
                                                        color: 'var(--chat-recap-title)'
                                                    },
                                                    children: transcriptData.title || "Video Recap"
                                                }, void 0, false, {
                                                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/intelligence/components/IntelligencePanel.tsx",
                                                    lineNumber: 149,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    style: {
                                                        fontSize: '0.95rem',
                                                        lineHeight: '1.6',
                                                        marginBottom: '1.5rem',
                                                        color: 'var(--chat-recap-summary)'
                                                    },
                                                    children: transcriptData.summary
                                                }, void 0, false, {
                                                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/intelligence/components/IntelligencePanel.tsx",
                                                    lineNumber: 150,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    style: {
                                                        fontSize: '1.1rem',
                                                        marginBottom: '0.8rem',
                                                        fontWeight: '700',
                                                        color: 'var(--chat-recap-title)'
                                                    },
                                                    children: "Key Highlights"
                                                }, void 0, false, {
                                                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/intelligence/components/IntelligencePanel.tsx",
                                                    lineNumber: 151,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        gap: '0.8rem'
                                                    },
                                                    children: keyPoints.map((point, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            onClick: ()=>handleHighlightClick(point),
                                                            className: "highlight-bubble",
                                                            style: {
                                                                padding: '1rem',
                                                                background: 'var(--highlight-card-bg)',
                                                                border: '1px solid var(--highlight-card-border)',
                                                                borderRadius: '12px',
                                                                boxShadow: 'var(--shadow-small)',
                                                                cursor: 'pointer',
                                                                transition: 'all 0.2s',
                                                                display: 'flex',
                                                                alignItems: 'flex-start',
                                                                gap: '0.8rem'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        background: 'var(--highlight-number-bg)',
                                                                        color: 'var(--highlight-number-text)',
                                                                        borderRadius: '50%',
                                                                        width: '24px',
                                                                        height: '24px',
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center',
                                                                        fontSize: '0.8rem',
                                                                        fontWeight: 'bold',
                                                                        flexShrink: 0,
                                                                        marginTop: '2px'
                                                                    },
                                                                    children: idx + 1
                                                                }, void 0, false, {
                                                                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/intelligence/components/IntelligencePanel.tsx",
                                                                    lineNumber: 165,
                                                                    columnNumber: 49
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            style: {
                                                                                fontSize: '0.95rem',
                                                                                margin: 0,
                                                                                fontWeight: '500',
                                                                                color: 'var(--highlight-title-text)'
                                                                            },
                                                                            children: point.text
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/intelligence/components/IntelligencePanel.tsx",
                                                                            lineNumber: 171,
                                                                            columnNumber: 53
                                                                        }, this),
                                                                        point.timestamp !== undefined && point.timestamp > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            style: {
                                                                                fontSize: '0.8rem',
                                                                                color: 'var(--highlight-jump-link)',
                                                                                marginTop: '0.3rem',
                                                                                display: 'block'
                                                                            },
                                                                            children: [
                                                                                "Jump to ",
                                                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$shared$2f$utils$2f$formatTime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatTime"])(point.timestamp)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/intelligence/components/IntelligencePanel.tsx",
                                                                            lineNumber: 173,
                                                                            columnNumber: 57
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/intelligence/components/IntelligencePanel.tsx",
                                                                    lineNumber: 170,
                                                                    columnNumber: 49
                                                                }, this)
                                                            ]
                                                        }, idx, true, {
                                                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/intelligence/components/IntelligencePanel.tsx",
                                                            lineNumber: 154,
                                                            columnNumber: 45
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/intelligence/components/IntelligencePanel.tsx",
                                                    lineNumber: 152,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/intelligence/components/IntelligencePanel.tsx",
                                            lineNumber: 142,
                                            columnNumber: 33
                                        }, this),
                                        currentMessages.map((m, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `message-row ${m.role}`,
                                                style: {
                                                    alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start'
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "message-content",
                                                    style: {
                                                        background: m.role === 'user' ? 'var(--chat-bubble-user-bg)' : 'var(--chat-bubble-ai-bg)',
                                                        color: m.role === 'user' ? 'white' : 'var(--text-primary)',
                                                        border: m.role === 'user' ? 'none' : '1px solid var(--chat-input-border)',
                                                        boxShadow: m.role === 'user' ? 'none' : 'var(--shadow-small)'
                                                    },
                                                    children: [
                                                        m.role === 'assistant' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "prose",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$react$2d$markdown$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Markdown__as__default$3e$__["default"], {
                                                                components: {
                                                                    a: ({ node, href, children, ...props })=>{
                                                                        if (href?.startsWith('#seek:')) {
                                                                            const seconds = parseFloat(href.split(':')[1]);
                                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                onClick: (e)=>{
                                                                                    e.preventDefault();
                                                                                    onSeek(seconds);
                                                                                },
                                                                                style: {
                                                                                    background: 'var(--upload-hover-bg)',
                                                                                    color: 'var(--primary)',
                                                                                    border: '1px solid var(--border-default)',
                                                                                    borderRadius: '12px',
                                                                                    padding: '2px 8px',
                                                                                    fontSize: '0.85em',
                                                                                    fontWeight: '600',
                                                                                    cursor: 'pointer',
                                                                                    display: 'inline-block',
                                                                                    verticalAlign: 'middle',
                                                                                    margin: '0 2px',
                                                                                    textDecoration: 'none'
                                                                                },
                                                                                children: children
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/intelligence/components/IntelligencePanel.tsx",
                                                                                lineNumber: 202,
                                                                                columnNumber: 69
                                                                            }, void 0);
                                                                        }
                                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                            href: href,
                                                                            ...props,
                                                                            children: children
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/intelligence/components/IntelligencePanel.tsx",
                                                                            lineNumber: 213,
                                                                            columnNumber: 68
                                                                        }, void 0);
                                                                    }
                                                                },
                                                                children: processContent(m.content)
                                                            }, void 0, false, {
                                                                fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/intelligence/components/IntelligencePanel.tsx",
                                                                lineNumber: 196,
                                                                columnNumber: 49
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/intelligence/components/IntelligencePanel.tsx",
                                                            lineNumber: 195,
                                                            columnNumber: 45
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            children: m.content
                                                        }, void 0, false, {
                                                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/intelligence/components/IntelligencePanel.tsx",
                                                            lineNumber: 221,
                                                            columnNumber: 45
                                                        }, this),
                                                        m.role === 'assistant' && m.followUps && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                marginTop: '1rem',
                                                                display: 'flex',
                                                                flexWrap: 'wrap',
                                                                gap: '0.5rem'
                                                            },
                                                            children: m.followUps.map((q, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>handleSendMessage(q),
                                                                    className: "followup-btn",
                                                                    children: q
                                                                }, idx, false, {
                                                                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/intelligence/components/IntelligencePanel.tsx",
                                                                    lineNumber: 226,
                                                                    columnNumber: 53
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/intelligence/components/IntelligencePanel.tsx",
                                                            lineNumber: 224,
                                                            columnNumber: 45
                                                        }, this),
                                                        m.role === 'assistant' && m.crossVideoSources && m.crossVideoSources.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                marginTop: '0.75rem',
                                                                padding: '0.75rem',
                                                                background: 'var(--upload-hover-bg)',
                                                                borderRadius: '8px',
                                                                border: '1px solid var(--border-default)',
                                                                fontSize: '0.85rem'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        fontWeight: 600,
                                                                        marginBottom: '0.4rem',
                                                                        color: 'var(--text-secondary)'
                                                                    },
                                                                    children: "Referenced from other videos:"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/intelligence/components/IntelligencePanel.tsx",
                                                                    lineNumber: 243,
                                                                    columnNumber: 49
                                                                }, this),
                                                                m.crossVideoSources.map((src, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            padding: '0.3rem 0',
                                                                            color: 'var(--highlight-jump-link)'
                                                                        },
                                                                        children: [
                                                                            src.videoTitle,
                                                                            " at ",
                                                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$shared$2f$utils$2f$formatTime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatTime"])(src.timestamp)
                                                                        ]
                                                                    }, idx, true, {
                                                                        fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/intelligence/components/IntelligencePanel.tsx",
                                                                        lineNumber: 247,
                                                                        columnNumber: 53
                                                                    }, this))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/intelligence/components/IntelligencePanel.tsx",
                                                            lineNumber: 235,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/intelligence/components/IntelligencePanel.tsx",
                                                    lineNumber: 188,
                                                    columnNumber: 37
                                                }, this)
                                            }, i, false, {
                                                fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/intelligence/components/IntelligencePanel.tsx",
                                                lineNumber: 185,
                                                columnNumber: 33
                                            }, this)),
                                        isChatting && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "typing-indicator",
                                            style: {
                                                color: 'var(--ai-typing-indicator)'
                                            },
                                            children: "Thinking..."
                                        }, void 0, false, {
                                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/intelligence/components/IntelligencePanel.tsx",
                                            lineNumber: 259,
                                            columnNumber: 44
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            ref: chatEndRef
                                        }, void 0, false, {
                                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/intelligence/components/IntelligencePanel.tsx",
                                            lineNumber: 260,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/intelligence/components/IntelligencePanel.tsx",
                                    lineNumber: 124,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "chat-input-area",
                                    style: {
                                        background: 'var(--chat-input-area-bg)'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: input,
                                            onChange: (e)=>setInput(e.target.value),
                                            onKeyDown: (e)=>e.key === 'Enter' && handleSendMessage(),
                                            placeholder: "Type a question...",
                                            disabled: !mediaId || polling || isChatting
                                        }, void 0, false, {
                                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/intelligence/components/IntelligencePanel.tsx",
                                            lineNumber: 264,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>handleSendMessage(),
                                            disabled: !mediaId || polling || isChatting || !input.trim(),
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                viewBox: "0 0 24 24",
                                                fill: "none",
                                                stroke: "currentColor",
                                                strokeWidth: "2",
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                style: {
                                                    width: '18px',
                                                    height: '18px'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                        x1: "22",
                                                        y1: "2",
                                                        x2: "11",
                                                        y2: "13"
                                                    }, void 0, false, {
                                                        fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/intelligence/components/IntelligencePanel.tsx",
                                                        lineNumber: 277,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                                                        points: "22 2 15 22 11 13 2 9 22 2"
                                                    }, void 0, false, {
                                                        fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/intelligence/components/IntelligencePanel.tsx",
                                                        lineNumber: 278,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/intelligence/components/IntelligencePanel.tsx",
                                                lineNumber: 276,
                                                columnNumber: 33
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/intelligence/components/IntelligencePanel.tsx",
                                            lineNumber: 272,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/intelligence/components/IntelligencePanel.tsx",
                                    lineNumber: 263,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/intelligence/components/IntelligencePanel.tsx",
                            lineNumber: 123,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/intelligence/components/IntelligencePanel.tsx",
                        lineNumber: 122,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/intelligence/components/IntelligencePanel.tsx",
                lineNumber: 88,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
                .highlight-bubble:hover {
                    transform: translateY(-2px);
                    border-color: var(--highlight-jump-link) !important;
                }
                .followup-btn {
                    background: var(--chat-bubble-ai-bg); border: 1px solid var(--chat-input-border); border-radius: 20px;
                    padding: 0.5rem 1rem; fontSize: 0.85rem; color: var(--chat-recap-summary); cursor: pointer;
                    transition: all 0.2s; text-align: left;
                }
                .followup-btn:hover {
                    background: var(--transcript-segment-hover); border-color: var(--highlight-jump-link); color: var(--chat-recap-title);
                }
            `
            }, void 0, false, {
                fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/intelligence/components/IntelligencePanel.tsx",
                lineNumber: 285,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/intelligence/components/IntelligencePanel.tsx",
        lineNumber: 87,
        columnNumber: 9
    }, this);
}
_s(IntelligencePanel, "Wp47KKQnU1cevG1+2FDmfVIHnGw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$features$2f$intelligence$2f$hooks$2f$useIntelligence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIntelligence"]
    ];
});
_c = IntelligencePanel;
var _c;
__turbopack_context__.k.register(_c, "IntelligencePanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/transcript/components/TranscriptPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TranscriptPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$shared$2f$utils$2f$apiPath$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/shared/utils/apiPath.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$shared$2f$utils$2f$formatTime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/shared/utils/formatTime.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function TranscriptPanel({ mediaId, jobId, jobStatus, onSeek, highlightTimestamp, onHighlightDone }) {
    _s();
    const [transcriptData, setTranscriptData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [polling, setPolling] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [highlightedIndices, setHighlightedIndices] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const segmentRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Map());
    const scrollContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TranscriptPanel.useEffect": ()=>{
            if (!jobId) {
                if (mediaId && jobStatus === 'COMPLETED') {
                    // Direct load — content already exists, no polling needed
                    setPolling(false);
                    fetchTranscript(mediaId);
                } else {
                    setTranscriptData(null);
                }
                return;
            }
            // Reset for new job
            setTranscriptData(null);
            let intervalId;
            const checkStatus = {
                "TranscriptPanel.useEffect.checkStatus": async ()=>{
                    try {
                        const res = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$shared$2f$utils$2f$apiPath$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiPath"])(`/api/job/${jobId}`));
                        if (res.ok) {
                            const data = await res.json();
                            if (data.status === 'COMPLETED') {
                                setPolling(false);
                                fetchTranscript(data.mediaId);
                                clearInterval(intervalId);
                            } else if (data.status === 'FAILED') {
                                setPolling(false);
                                clearInterval(intervalId);
                            }
                        }
                    } catch (e) {
                        console.error('Polling error', e);
                    }
                }
            }["TranscriptPanel.useEffect.checkStatus"];
            setPolling(true);
            checkStatus();
            intervalId = setInterval(checkStatus, 2000);
            return ({
                "TranscriptPanel.useEffect": ()=>clearInterval(intervalId)
            })["TranscriptPanel.useEffect"];
        }
    }["TranscriptPanel.useEffect"], [
        jobId,
        mediaId,
        jobStatus
    ]);
    const fetchTranscript = async (mid)=>{
        try {
            const res = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$shared$2f$utils$2f$apiPath$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiPath"])(`/api/transcript/${mid}`));
            if (res.ok) {
                const data = await res.json();
                setTranscriptData(data);
            }
        } catch (e) {
            console.error("Failed to fetch transcript", e);
        }
    };
    // Handle highlight when Jump is pressed on action items
    (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TranscriptPanel.useEffect": ()=>{
            if (highlightTimestamp == null || !transcriptData?.segments?.length) return;
            const segments = transcriptData.segments;
            const HIGHLIGHT_WINDOW = 15; // seconds — highlight segments within this range
            // Find the segment closest to the target timestamp
            let closestIdx = 0;
            let closestDiff = Infinity;
            for(let i = 0; i < segments.length; i++){
                const diff = Math.abs(segments[i].start - highlightTimestamp);
                if (diff < closestDiff) {
                    closestDiff = diff;
                    closestIdx = i;
                }
            }
            // Collect indices of segments within the highlight window
            const indices = new Set();
            for(let i = 0; i < segments.length; i++){
                const segStart = segments[i].start;
                if (segStart >= highlightTimestamp && segStart <= highlightTimestamp + HIGHLIGHT_WINDOW) {
                    indices.add(i);
                }
            }
            // Always include the closest segment
            indices.add(closestIdx);
            setHighlightedIndices(indices);
            // Scroll the closest segment into view
            const el = segmentRefs.current.get(closestIdx);
            if (el && scrollContainerRef.current) {
                el.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
            // Remove highlight after 6 seconds
            const timer = setTimeout({
                "TranscriptPanel.useEffect.timer": ()=>{
                    setHighlightedIndices(new Set());
                    if (onHighlightDone) onHighlightDone();
                }
            }["TranscriptPanel.useEffect.timer"], 6000);
            return ({
                "TranscriptPanel.useEffect": ()=>clearTimeout(timer)
            })["TranscriptPanel.useEffect"];
        }
    }["TranscriptPanel.useEffect"], [
        highlightTimestamp,
        transcriptData
    ]);
    const setSegmentRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TranscriptPanel.useCallback[setSegmentRef]": (index, el)=>{
            if (el) {
                segmentRefs.current.set(index, el);
            } else {
                segmentRefs.current.delete(index);
            }
        }
    }["TranscriptPanel.useCallback[setSegmentRef]"], []);
    const transcript = transcriptData?.segments || [];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "transcript-panel",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "panel-card",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        backgroundColor: 'var(--surface)',
                        fontSize: '1.3rem',
                        fontWeight: '700',
                        padding: '1.2rem',
                        borderBottom: '1px solid var(--border-default)',
                        margin: 0,
                        color: 'var(--text-primary)'
                    },
                    children: "Transcript"
                }, void 0, false, {
                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/transcript/components/TranscriptPanel.tsx",
                    lineNumber: 138,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "content-area",
                    style: {
                        flex: 1,
                        overflow: 'hidden'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: scrollContainerRef,
                        className: "transcript-content",
                        style: {
                            padding: '1rem',
                            height: '100%',
                            overflowY: 'auto'
                        },
                        children: [
                            !mediaId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    opacity: 0.6
                                },
                                children: "Upload a video to see the transcript."
                            }, void 0, false, {
                                fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/transcript/components/TranscriptPanel.tsx",
                                lineNumber: 156,
                                columnNumber: 38
                            }, this),
                            mediaId && polling && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1rem',
                                    padding: '0.5rem'
                                },
                                children: [
                                    ...Array(12)
                                ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            gap: '1rem',
                                            alignItems: 'center'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "skeleton",
                                                style: {
                                                    width: '45px',
                                                    height: '16px'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/transcript/components/TranscriptPanel.tsx",
                                                lineNumber: 163,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "skeleton",
                                                style: {
                                                    flex: 1,
                                                    height: '16px',
                                                    maxWidth: `${Math.random() * 30 + 60}%`
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/transcript/components/TranscriptPanel.tsx",
                                                lineNumber: 164,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/transcript/components/TranscriptPanel.tsx",
                                        lineNumber: 162,
                                        columnNumber: 37
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/transcript/components/TranscriptPanel.tsx",
                                lineNumber: 160,
                                columnNumber: 29
                            }, this),
                            mediaId && !polling && transcript.length === 0 && jobStatus === 'COMPLETED' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "No speech detected."
                            }, void 0, false, {
                                fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/transcript/components/TranscriptPanel.tsx",
                                lineNumber: 170,
                                columnNumber: 105
                            }, this),
                            mediaId && !polling && transcript.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: transcript.map((seg, i)=>{
                                    const isHighlighted = highlightedIndices.has(i);
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        ref: (el)=>setSegmentRef(i, el),
                                        className: "transcript-segment",
                                        onClick: ()=>onSeek(seg.start),
                                        style: {
                                            background: isHighlighted ? 'var(--transcript-segment-highlight-bg)' : 'transparent',
                                            borderLeft: isHighlighted ? '3px solid var(--transcript-segment-highlight-border)' : '3px solid transparent',
                                            borderRadius: isHighlighted ? '4px' : '0',
                                            transition: 'background 0.3s ease, border-left 0.3s ease',
                                            paddingLeft: '0.5rem',
                                            marginLeft: '-0.5rem'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "timestamp",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$shared$2f$utils$2f$formatTime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatTime"])(seg.start)
                                            }, void 0, false, {
                                                fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/transcript/components/TranscriptPanel.tsx",
                                                lineNumber: 190,
                                                columnNumber: 45
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text",
                                                children: seg.text
                                            }, void 0, false, {
                                                fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/transcript/components/TranscriptPanel.tsx",
                                                lineNumber: 191,
                                                columnNumber: 45
                                            }, this)
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/transcript/components/TranscriptPanel.tsx",
                                        lineNumber: 176,
                                        columnNumber: 41
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/transcript/components/TranscriptPanel.tsx",
                                lineNumber: 172,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/transcript/components/TranscriptPanel.tsx",
                        lineNumber: 151,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/transcript/components/TranscriptPanel.tsx",
                    lineNumber: 150,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/transcript/components/TranscriptPanel.tsx",
            lineNumber: 137,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/transcript/components/TranscriptPanel.tsx",
        lineNumber: 136,
        columnNumber: 9
    }, this);
}
_s(TranscriptPanel, "nT64cKmQdpmpVWkRDCtTbTeVj/Y=");
_c = TranscriptPanel;
var _c;
__turbopack_context__.k.register(_c, "TranscriptPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/shared/design/theme.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCategoryColor",
    ()=>getCategoryColor,
    "theme",
    ()=>theme
]);
const theme = {
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
            white: 'var(--text-white)'
        },
        border: {
            default: 'var(--border-default)',
            dark: 'var(--border-dark)',
            light: 'var(--border-light)'
        },
        status: {
            success: 'var(--status-success)',
            successBg: 'var(--status-success-bg)',
            error: 'var(--status-error)',
            active: 'var(--status-active)'
        },
        // Component Specific
        upload: {
            modalBg: 'var(--upload-modal-bg)',
            hoverBg: 'var(--upload-hover-bg)',
            uploadBox: 'var(--upload-box)',
            uploadBoxBorder: 'var(--upload-box-border)'
        },
        progressBar: {
            bg: 'var(--progress-bg)',
            fill: 'var(--progress-fill)'
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
            default: 'var(--action-badge-default-bg)'
        }
    }
};
const getCategoryColor = (category)=>{
    return theme.colors.actionItems[category] || theme.colors.actionItems.default;
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/action-items/hooks/useActionItems.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useActionItems",
    ()=>useActionItems
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$shared$2f$utils$2f$apiPath$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/shared/utils/apiPath.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function useActionItems(mediaId, jobStatus) {
    _s();
    const [actionItems, setActionItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [videoTitle, setVideoTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [videoSummary, setVideoSummary] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [regenerating, setRegenerating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useActionItems.useEffect": ()=>{
            if (!mediaId) {
                setActionItems([]);
                setLoading(false);
                setError(null);
                return;
            }
            if (jobStatus !== 'COMPLETED') {
                setActionItems([]);
                setError(null);
                setLoading(jobStatus !== '' && jobStatus !== 'FAILED');
                return;
            }
            setActionItems([]);
            setError(null);
            const fetchActionItems = {
                "useActionItems.useEffect.fetchActionItems": async ()=>{
                    setLoading(true);
                    try {
                        const res = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$shared$2f$utils$2f$apiPath$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiPath"])(`/api/action-items/${mediaId}`));
                        if (res.ok) {
                            const data = await res.json();
                            setActionItems(data);
                            setError(null);
                        } else {
                            setError('Failed to load action items');
                        }
                        try {
                            const transcriptRes = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$shared$2f$utils$2f$apiPath$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiPath"])(`/api/transcript/${mediaId}`));
                            if (transcriptRes.ok) {
                                const transcriptData = await transcriptRes.json();
                                setVideoTitle(transcriptData.title || 'Meeting Recording');
                                setVideoSummary(transcriptData.summary || '');
                            }
                        } catch (err) {
                            setVideoTitle('Meeting Recording');
                            setVideoSummary('');
                        }
                    } catch (err) {
                        setError('Network error');
                    } finally{
                        setLoading(false);
                    }
                }
            }["useActionItems.useEffect.fetchActionItems"];
            fetchActionItems();
        }
    }["useActionItems.useEffect"], [
        mediaId,
        jobStatus
    ]);
    const regenerateActionItems = async ()=>{
        if (!mediaId) return;
        setRegenerating(true);
        setError(null);
        try {
            const res = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$shared$2f$utils$2f$apiPath$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiPath"])(`/api/action-items/${mediaId}/regenerate`), {
                method: 'POST'
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
            setError('Failed to regenerate action items');
        } finally{
            setRegenerating(false);
        }
    };
    return {
        actionItems,
        loading,
        error,
        videoTitle,
        videoSummary,
        regenerating,
        regenerateActionItems,
        setActionItems
    };
}
_s(useActionItems, "rSLIKgbf6rBVMA5A4r7gvqFvKV4=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/action-items/components/ActionItemsPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ActionItemsPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/xlsx/xlsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$shared$2f$design$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/shared/design/theme.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$shared$2f$utils$2f$formatTime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/shared/utils/formatTime.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$shared$2f$utils$2f$formatDate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/shared/utils/formatDate.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$features$2f$action$2d$items$2f$hooks$2f$useActionItems$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/action-items/hooks/useActionItems.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function ActionItemsPanel({ mediaId, jobId, jobStatus, onSeek }) {
    _s();
    const { actionItems, loading, error, videoTitle, videoSummary, regenerating, regenerateActionItems, setActionItems } = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$features$2f$action$2d$items$2f$hooks$2f$useActionItems$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useActionItems"])(mediaId, jobStatus);
    const handleEmailDraft = (item)=>{
        const cleanActionItem = item.action_item.replace(new RegExp(`^${item.category}\\s*-\\s*`, 'i'), '');
        const subject = `Action Required: ${item.category} - ${cleanActionItem}`;
        const summarySnippet = videoSummary ? videoSummary.substring(0, 300) + (videoSummary.length > 300 ? '...' : '') : 'See video for full context.';
        const body = `Hi ${item.responsible_party},

Action Item from Meeting: ${videoTitle}

TASK:
${cleanActionItem}

CATEGORY: ${item.category}
DUE DATE: ${item.due_date}
VIDEO TIMESTAMP: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$shared$2f$utils$2f$formatTime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatTime"])(item.timestamp)}

MEETING CONTEXT:
${summarySnippet}${item.notes ? `

ADDITIONAL NOTES:
${item.notes}` : ''}

---
This email was generated from Video Copilot. Please review and add any additional details before sending.`;
        const outlookWebUrl = `https://outlook.office.com/mail/deeplink/compose?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.open(outlookWebUrl, '_blank');
    };
    const handleExportToExcel = ()=>{
        if (actionItems.length === 0) {
            alert('No action items to export');
            return;
        }
        const wb = __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["utils"].book_new();
        const headers = [
            'Action Items Category',
            'Action Item',
            'Action Notes',
            'Responsible Party',
            'Due Date',
            'My Notes'
        ];
        const data = actionItems.map((item)=>{
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
        const wsData = [
            headers,
            ...data
        ];
        const ws = __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["utils"].aoa_to_sheet(wsData);
        ws['!cols'] = [
            {
                wch: 25
            },
            {
                wch: 40
            },
            {
                wch: 30
            },
            {
                wch: 25
            },
            {
                wch: 15
            },
            {
                wch: 30
            }
        ];
        __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["utils"].book_append_sheet(wb, ws, 'Action Items');
        const timestamp = new Date().toISOString().split('T')[0];
        const sanitizedTitle = videoTitle.replace(/[^a-zA-Z0-9]/g, '_');
        const filename = `${sanitizedTitle}_${timestamp}.xlsx`;
        __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["writeFile"](wb, filename);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "action-items-panel",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "panel-card",
            style: {
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "action-items-header",
                    style: {
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '1.5rem',
                        borderBottom: `1px solid var(--border-default)`
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    style: {
                                        fontSize: '1.3rem',
                                        fontWeight: '700',
                                        margin: 0,
                                        color: 'var(--action-task-text)'
                                    },
                                    children: [
                                        "Action Items ",
                                        actionItems.length > 0 && `(${actionItems.length})`
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/action-items/components/ActionItemsPanel.tsx",
                                    lineNumber: 116,
                                    columnNumber: 25
                                }, this),
                                mediaId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: regenerateActionItems,
                                    disabled: regenerating || loading,
                                    title: "Regenerate Action Items",
                                    style: {
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
                                    },
                                    onMouseEnter: (e)=>{
                                        if (!regenerating && !loading) {
                                            e.currentTarget.style.background = 'var(--upload-hover-bg)';
                                            e.currentTarget.style.borderColor = 'var(--primary)';
                                            e.currentTarget.style.color = 'var(--primary)';
                                        }
                                    },
                                    onMouseLeave: (e)=>{
                                        if (!regenerating && !loading) {
                                            e.currentTarget.style.background = 'transparent';
                                            e.currentTarget.style.borderColor = 'var(--border-default)';
                                            e.currentTarget.style.color = 'var(--text-secondary)';
                                        }
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        width: "16",
                                        height: "16",
                                        viewBox: "0 0 24 24",
                                        fill: "none",
                                        stroke: "currentColor",
                                        strokeWidth: "2",
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        style: {
                                            animation: regenerating ? 'spin 1s linear infinite' : 'none'
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"
                                        }, void 0, false, {
                                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/action-items/components/ActionItemsPanel.tsx",
                                            lineNumber: 166,
                                            columnNumber: 37
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/action-items/components/ActionItemsPanel.tsx",
                                        lineNumber: 153,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/action-items/components/ActionItemsPanel.tsx",
                                    lineNumber: 120,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/action-items/components/ActionItemsPanel.tsx",
                            lineNumber: 115,
                            columnNumber: 21
                        }, this),
                        actionItems.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleExportToExcel,
                            title: "Export to Excel",
                            style: {
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
                            },
                            onMouseEnter: (e)=>e.currentTarget.style.opacity = '0.9',
                            onMouseLeave: (e)=>e.currentTarget.style.opacity = '1',
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    width: "16",
                                    height: "16",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    stroke: "currentColor",
                                    strokeWidth: "2",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                                        }, void 0, false, {
                                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/action-items/components/ActionItemsPanel.tsx",
                                            lineNumber: 194,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                                            points: "14 2 14 8 20 8"
                                        }, void 0, false, {
                                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/action-items/components/ActionItemsPanel.tsx",
                                            lineNumber: 195,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                            x1: "16",
                                            y1: "13",
                                            x2: "8",
                                            y2: "13"
                                        }, void 0, false, {
                                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/action-items/components/ActionItemsPanel.tsx",
                                            lineNumber: 196,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                            x1: "16",
                                            y1: "17",
                                            x2: "8",
                                            y2: "17"
                                        }, void 0, false, {
                                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/action-items/components/ActionItemsPanel.tsx",
                                            lineNumber: 197,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                                            points: "10 9 9 9 8 9"
                                        }, void 0, false, {
                                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/action-items/components/ActionItemsPanel.tsx",
                                            lineNumber: 198,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/action-items/components/ActionItemsPanel.tsx",
                                    lineNumber: 193,
                                    columnNumber: 29
                                }, this),
                                "Export to Excel"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/action-items/components/ActionItemsPanel.tsx",
                            lineNumber: 173,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/action-items/components/ActionItemsPanel.tsx",
                    lineNumber: 108,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "action-items-content",
                    style: {
                        flex: 1,
                        padding: '1.5rem',
                        overflowY: 'auto'
                    },
                    children: [
                        !mediaId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                textAlign: 'center',
                                opacity: 0.6,
                                marginTop: '3rem',
                                color: 'var(--text-secondary)'
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Upload a video to extract action items."
                            }, void 0, false, {
                                fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/action-items/components/ActionItemsPanel.tsx",
                                lineNumber: 208,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/action-items/components/ActionItemsPanel.tsx",
                            lineNumber: 207,
                            columnNumber: 25
                        }, this),
                        mediaId && loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem'
                            },
                            children: [
                                ...Array(5)
                            ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "skeleton",
                                    style: {
                                        height: '80px',
                                        borderRadius: '12px'
                                    }
                                }, i, false, {
                                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/action-items/components/ActionItemsPanel.tsx",
                                    lineNumber: 215,
                                    columnNumber: 33
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/action-items/components/ActionItemsPanel.tsx",
                            lineNumber: 213,
                            columnNumber: 25
                        }, this),
                        mediaId && error && actionItems.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                textAlign: 'center',
                                color: 'var(--status-error)',
                                marginTop: '3rem'
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: error
                            }, void 0, false, {
                                fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/action-items/components/ActionItemsPanel.tsx",
                                lineNumber: 222,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/action-items/components/ActionItemsPanel.tsx",
                            lineNumber: 221,
                            columnNumber: 25
                        }, this),
                        mediaId && !loading && !error && actionItems.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                textAlign: 'center',
                                opacity: 0.6,
                                marginTop: '3rem',
                                color: 'var(--text-secondary)'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: "No action items detected in this video."
                                }, void 0, false, {
                                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/action-items/components/ActionItemsPanel.tsx",
                                    lineNumber: 228,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: '0.85rem',
                                        marginTop: '0.5rem'
                                    },
                                    children: "Action items will appear here automatically."
                                }, void 0, false, {
                                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/action-items/components/ActionItemsPanel.tsx",
                                    lineNumber: 229,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/action-items/components/ActionItemsPanel.tsx",
                            lineNumber: 227,
                            columnNumber: 25
                        }, this),
                        actionItems.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem'
                            },
                            children: actionItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    onClick: ()=>handleEmailDraft(item),
                                    style: {
                                        padding: '1rem',
                                        background: 'var(--action-card-bg)',
                                        border: `1px solid var(--action-card-border)`,
                                        borderRadius: '12px',
                                        boxShadow: 'var(--action-card-shadow)',
                                        transition: 'all 0.2s',
                                        cursor: 'pointer'
                                    },
                                    onMouseEnter: (e)=>{
                                        e.currentTarget.style.boxShadow = '0 4px 12px var(--modal-overlay)';
                                    },
                                    onMouseLeave: (e)=>{
                                        e.currentTarget.style.boxShadow = 'var(--action-card-shadow)';
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'inline-block',
                                                padding: '0.25rem 0.75rem',
                                                background: (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$shared$2f$design$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCategoryColor"])(item.category),
                                                borderRadius: '6px',
                                                fontSize: '0.75rem',
                                                fontWeight: '600',
                                                marginBottom: '0.75rem',
                                                color: 'var(--action-badge-text)',
                                                border: `1px solid var(--action-card-border)`,
                                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                            },
                                            children: item.category
                                        }, void 0, false, {
                                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/action-items/components/ActionItemsPanel.tsx",
                                            lineNumber: 257,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: '0.95rem',
                                                margin: '0 0 0.75rem 0',
                                                fontWeight: '500',
                                                lineHeight: '1.5',
                                                color: 'var(--action-task-text)'
                                            },
                                            children: item.action_item.replace(new RegExp(`^${item.category}\\s*-\\s*`, 'i'), '')
                                        }, void 0, false, {
                                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/action-items/components/ActionItemsPanel.tsx",
                                            lineNumber: 272,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                                fontSize: '0.85rem',
                                                color: 'var(--action-meta-text)',
                                                marginBottom: '0.5rem'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    width: "14",
                                                    height: "14",
                                                    viewBox: "0 0 24 24",
                                                    fill: "none",
                                                    stroke: "currentColor",
                                                    strokeWidth: "2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                                                        }, void 0, false, {
                                                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/action-items/components/ActionItemsPanel.tsx",
                                                            lineNumber: 291,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                            cx: "12",
                                                            cy: "7",
                                                            r: "4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/action-items/components/ActionItemsPanel.tsx",
                                                            lineNumber: 292,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/action-items/components/ActionItemsPanel.tsx",
                                                    lineNumber: 290,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: item.responsible_party
                                                }, void 0, false, {
                                                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/action-items/components/ActionItemsPanel.tsx",
                                                    lineNumber: 294,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/action-items/components/ActionItemsPanel.tsx",
                                            lineNumber: 282,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                marginTop: '0.75rem',
                                                paddingTop: '0.75rem',
                                                borderTop: `1px solid var(--action-card-border)`
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: '0.85rem',
                                                        color: 'var(--action-meta-text)'
                                                    },
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$shared$2f$utils$2f$formatDate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(item.due_date)
                                                }, void 0, false, {
                                                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/action-items/components/ActionItemsPanel.tsx",
                                                    lineNumber: 305,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: (e)=>{
                                                        e.stopPropagation();
                                                        onSeek(item.timestamp);
                                                    },
                                                    style: {
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
                                                    },
                                                    onMouseEnter: (e)=>{
                                                        e.currentTarget.style.background = 'var(--action-jump-btn-text)';
                                                        e.currentTarget.style.color = 'white';
                                                    },
                                                    onMouseLeave: (e)=>{
                                                        e.currentTarget.style.background = 'var(--action-jump-btn-bg)';
                                                        e.currentTarget.style.color = 'var(--action-jump-btn-text)';
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            width: "12",
                                                            height: "12",
                                                            viewBox: "0 0 24 24",
                                                            fill: "none",
                                                            stroke: "currentColor",
                                                            strokeWidth: "2",
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                d: "M13 5l7 7-7 7M5 12h14"
                                                            }, void 0, false, {
                                                                fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/action-items/components/ActionItemsPanel.tsx",
                                                                lineNumber: 338,
                                                                columnNumber: 49
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/action-items/components/ActionItemsPanel.tsx",
                                                            lineNumber: 337,
                                                            columnNumber: 45
                                                        }, this),
                                                        "Jump"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/action-items/components/ActionItemsPanel.tsx",
                                                    lineNumber: 309,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/action-items/components/ActionItemsPanel.tsx",
                                            lineNumber: 297,
                                            columnNumber: 37
                                        }, this),
                                        item.notes && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                marginTop: '0.75rem',
                                                padding: '0.5rem',
                                                background: 'var(--action-note-bg)',
                                                borderRadius: '6px',
                                                fontSize: '0.8rem',
                                                color: 'var(--action-note-text)',
                                                fontStyle: 'italic'
                                            },
                                            children: [
                                                "Note: ",
                                                item.notes
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/action-items/components/ActionItemsPanel.tsx",
                                            lineNumber: 345,
                                            columnNumber: 41
                                        }, this)
                                    ]
                                }, item.id, true, {
                                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/action-items/components/ActionItemsPanel.tsx",
                                    lineNumber: 238,
                                    columnNumber: 33
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/action-items/components/ActionItemsPanel.tsx",
                            lineNumber: 236,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/action-items/components/ActionItemsPanel.tsx",
                    lineNumber: 205,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/action-items/components/ActionItemsPanel.tsx",
            lineNumber: 107,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/action-items/components/ActionItemsPanel.tsx",
        lineNumber: 106,
        columnNumber: 9
    }, this);
}
_s(ActionItemsPanel, "Hf7wrflQUVdj/htvt9yKJGn2oSc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$features$2f$action$2d$items$2f$hooks$2f$useActionItems$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useActionItems"]
    ];
});
_c = ActionItemsPanel;
var _c;
__turbopack_context__.k.register(_c, "ActionItemsPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/auth/components/AuthGate.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AuthGate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-react/dist/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$hooks$2f$useMsal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-react/dist/hooks/useMsal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$lib$2f$msalConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/lib/msalConfig.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$shared$2f$utils$2f$apiPath$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/shared/utils/apiPath.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$browser$2f$dist$2f$utils$2f$BrowserConstants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-browser/dist/utils/BrowserConstants.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function AuthGate() {
    _s();
    const { instance, inProgress } = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$hooks$2f$useMsal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMsal"])();
    const handleLogin = ()=>{
        // Don't start a new login if one is already in progress
        if (inProgress !== __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$browser$2f$dist$2f$utils$2f$BrowserConstants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InteractionStatus"].None) {
            console.log('Login already in progress, please wait...');
            return;
        }
        // Use redirect flow - simpler and more reliable than popup
        instance.loginRedirect(__TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$lib$2f$msalConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loginRequest"]);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #96a9ffff 0%, #4b74a2ff 100%)',
            padding: '2rem'
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                background: 'var(--surface)',
                borderRadius: '16px',
                padding: '3rem 2rem',
                maxWidth: '450px',
                width: '100%',
                textAlign: 'center',
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                color: 'var(--text-primary)'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '1.25rem',
                        marginBottom: '2.5rem'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$shared$2f$utils$2f$apiPath$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiPath"])('/EnSoftek - DrCloudEHR Logo.png'),
                            alt: "DrCloudEHR GTD",
                            style: {
                                height: '100px',
                                width: 'auto'
                            }
                        }, void 0, false, {
                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/auth/components/AuthGate.tsx",
                            lineNumber: 52,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '0.25rem'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: '1.8rem',
                                        fontWeight: '600',
                                        fontFamily: '"Noto Sans", sans-serif',
                                        color: 'var(--text-primary)',
                                        letterSpacing: '0.5px'
                                    },
                                    children: "DrCloudEHR"
                                }, void 0, false, {
                                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/auth/components/AuthGate.tsx",
                                    lineNumber: 68,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: '2.6rem',
                                        fontWeight: '600',
                                        fontFamily: '"Bebas Neue", sans-serif',
                                        color: '#667eea',
                                        lineHeight: '1'
                                    },
                                    children: "GetThingsDone"
                                }, void 0, false, {
                                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/auth/components/AuthGate.tsx",
                                    lineNumber: 77,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/auth/components/AuthGate.tsx",
                            lineNumber: 62,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/auth/components/AuthGate.tsx",
                    lineNumber: 43,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: handleLogin,
                    disabled: inProgress !== __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$browser$2f$dist$2f$utils$2f$BrowserConstants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InteractionStatus"].None,
                    style: {
                        width: '100%',
                        padding: '1rem 1.5rem',
                        background: '#0078d4',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.75rem',
                        transition: 'all 0.2s'
                    },
                    onMouseEnter: (e)=>e.currentTarget.style.background = '#006cbe',
                    onMouseLeave: (e)=>e.currentTarget.style.background = '#0078d4',
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            width: "24",
                            height: "24",
                            viewBox: "0 0 23 23",
                            fill: "none",
                            xmlns: "http://www.w3.org/2000/svg",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                    width: "11",
                                    height: "11",
                                    fill: "white"
                                }, void 0, false, {
                                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/auth/components/AuthGate.tsx",
                                    lineNumber: 114,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                    y: "12",
                                    width: "11",
                                    height: "11",
                                    fill: "white"
                                }, void 0, false, {
                                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/auth/components/AuthGate.tsx",
                                    lineNumber: 115,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                    x: "12",
                                    width: "11",
                                    height: "11",
                                    fill: "white"
                                }, void 0, false, {
                                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/auth/components/AuthGate.tsx",
                                    lineNumber: 116,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                    x: "12",
                                    y: "12",
                                    width: "11",
                                    height: "11",
                                    fill: "white"
                                }, void 0, false, {
                                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/auth/components/AuthGate.tsx",
                                    lineNumber: 117,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/auth/components/AuthGate.tsx",
                            lineNumber: 113,
                            columnNumber: 21
                        }, this),
                        "Sign in with Microsoft"
                    ]
                }, void 0, true, {
                    fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/auth/components/AuthGate.tsx",
                    lineNumber: 90,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/auth/components/AuthGate.tsx",
            lineNumber: 32,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/auth/components/AuthGate.tsx",
        lineNumber: 24,
        columnNumber: 9
    }, this);
}
_s(AuthGate, "s2xY4tkeXbvFh8Jvsgu8dn8ULgU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$hooks$2f$useMsal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMsal"]
    ];
});
_c = AuthGate;
var _c;
__turbopack_context__.k.register(_c, "AuthGate");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$features$2f$upload$2f$components$2f$FileUploader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/upload/components/FileUploader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$features$2f$player$2f$components$2f$VideoPlayer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/player/components/VideoPlayer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$features$2f$intelligence$2f$components$2f$IntelligencePanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/intelligence/components/IntelligencePanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$features$2f$transcript$2f$components$2f$TranscriptPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/transcript/components/TranscriptPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$features$2f$action$2d$items$2f$components$2f$ActionItemsPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/action-items/components/ActionItemsPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$features$2f$auth$2f$components$2f$AuthGate$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/features/auth/components/AuthGate.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-react/dist/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$hooks$2f$useMsal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-react/dist/hooks/useMsal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$hooks$2f$useIsAuthenticated$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-react/dist/hooks/useIsAuthenticated.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$browser$2f$dist$2f$utils$2f$BrowserConstants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-browser/dist/utils/BrowserConstants.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$lib$2f$browserStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/lib/browserStorage.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
function Home() {
    _s();
    const { inProgress, accounts } = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$hooks$2f$useMsal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMsal"])();
    const isAuthenticated = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$hooks$2f$useIsAuthenticated$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsAuthenticated"])();
    const [activeMediaId, setActiveMediaId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [activeJobId, setActiveJobId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [jobStatus, setJobStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [jobProgress, setJobProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [personality, setPersonality] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('meetings');
    const [highlightTimestamp, setHighlightTimestamp] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Load personality from localStorage
    (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            if ("TURBOPACK compile-time truthy", 1) {
                const saved = localStorage.getItem('videocopilot_personality');
                if (saved && [
                    'meetings',
                    'training',
                    'support'
                ].includes(saved)) {
                    setPersonality(saved);
                }
            }
        }
    }["Home.useEffect"], []);
    // Save personality to localStorage
    const handlePersonalityChange = (newPersonality)=>{
        setPersonality(newPersonality);
        if ("TURBOPACK compile-time truthy", 1) {
            localStorage.setItem('videocopilot_personality', newPersonality);
        }
        // Reset session state when switching modes
        setActiveMediaId(null);
        setActiveJobId(null);
        setJobStatus('');
        setJobProgress(0);
    };
    // Auto-download video to local storage upon completion (for SharePoint imports)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            async function checkAndDownload() {
                if (jobStatus === 'COMPLETED' && activeMediaId && accounts[0]?.username) {
                    const userEmail = accounts[0].username;
                    // Check if we have it locally
                    const existing = await (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$lib$2f$browserStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getVideoFromLocal"])(activeMediaId, userEmail);
                    if (!existing) {
                        console.log(`[Page] Job completed but video missing locally (likely SharePoint import). Downloading...`);
                        await (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$lib$2f$browserStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["downloadVideoFromServer"])(activeMediaId, userEmail);
                    }
                }
            }
            checkAndDownload();
        }
    }["Home.useEffect"], [
        jobStatus,
        activeMediaId,
        accounts
    ]);
    const videoPlayerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const fileUploaderRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Gate entire app behind authentication (unless bypass is enabled)
    const isAuthBypassed = ("TURBOPACK compile-time value", "false") === 'true';
    const isDevBypassed = ("TURBOPACK compile-time value", "object") !== 'undefined' && localStorage.getItem('devBypassAuth') === 'true';
    // If MSAL is currently processing (login, logout, or handling redirect), show nothing
    if (inProgress !== __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$browser$2f$dist$2f$utils$2f$BrowserConstants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InteractionStatus"].None) {
        return null;
    }
    // If not authenticated and not bypassed, show login page
    if (!isAuthBypassed && !isDevBypassed && !isAuthenticated) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$features$2f$auth$2f$components$2f$AuthGate$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/app/page.tsx",
            lineNumber: 80,
            columnNumber: 12
        }, this);
    }
    const handleUploadComplete = (mediaId, jobId)=>{
        setActiveMediaId(mediaId);
        setActiveJobId(jobId);
        setJobStatus('QUEUED');
        setJobProgress(0);
        console.log('Upload complete, mediaId:', mediaId, 'jobId:', jobId);
    };
    const handleLoadExisting = (mediaId)=>{
        setActiveMediaId(mediaId);
        setActiveJobId(null); // No job to poll — content already exists
        setJobStatus('COMPLETED');
        setJobProgress(100);
        console.log('Loading existing media:', mediaId);
    };
    const handleSeek = (time)=>{
        videoPlayerRef.current?.seekTo(time);
        setHighlightTimestamp(time);
    };
    const handleFileDrop = (file)=>{
        fileUploaderRef.current?.uploadFile(file);
    };
    const handleCancel = ()=>{
        setActiveMediaId(null);
        setActiveJobId(null);
        setJobStatus('');
        setJobProgress(0);
        console.log('Job cancelled and state reset');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "container",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$features$2f$upload$2f$components$2f$FileUploader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                ref: fileUploaderRef,
                onUploadComplete: handleUploadComplete,
                onLoadExisting: handleLoadExisting,
                currentJobStatus: jobStatus,
                currentJobProgress: jobProgress,
                onCancel: handleCancel,
                personality: personality,
                onPersonalityChange: handlePersonalityChange
            }, void 0, false, {
                fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/app/page.tsx",
                lineNumber: 118,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "main-layout",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "left-column",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$features$2f$player$2f$components$2f$VideoPlayer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                ref: videoPlayerRef,
                                mediaId: activeMediaId,
                                jobStatus: jobStatus,
                                onFileDrop: handleFileDrop
                            }, void 0, false, {
                                fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/app/page.tsx",
                                lineNumber: 131,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$features$2f$transcript$2f$components$2f$TranscriptPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                mediaId: activeMediaId,
                                jobId: activeJobId,
                                jobStatus: jobStatus,
                                onSeek: handleSeek,
                                highlightTimestamp: highlightTimestamp,
                                onHighlightDone: ()=>setHighlightTimestamp(null)
                            }, void 0, false, {
                                fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/app/page.tsx",
                                lineNumber: 137,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/app/page.tsx",
                        lineNumber: 130,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "middle-column",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$features$2f$intelligence$2f$components$2f$IntelligencePanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            mediaId: activeMediaId,
                            jobId: activeJobId,
                            onSeek: handleSeek,
                            onStatusChange: setJobStatus,
                            onProgressChange: setJobProgress,
                            personality: personality
                        }, void 0, false, {
                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/app/page.tsx",
                            lineNumber: 148,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/app/page.tsx",
                        lineNumber: 147,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "right-column",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$features$2f$action$2d$items$2f$components$2f$ActionItemsPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            mediaId: activeMediaId,
                            jobId: activeJobId,
                            jobStatus: jobStatus,
                            onSeek: handleSeek
                        }, void 0, false, {
                            fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/app/page.tsx",
                            lineNumber: 159,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/app/page.tsx",
                        lineNumber: 158,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/app/page.tsx",
                lineNumber: 129,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/app/page.tsx",
        lineNumber: 117,
        columnNumber: 5
    }, this);
}
_s(Home, "Ymg87H/cTJX/g1ZBmAuBoKoMf1o=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$hooks$2f$useMsal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMsal"],
        __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$hooks$2f$useIsAuthenticated$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsAuthenticated"]
    ];
});
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_gemini_antigravity_scratch_video_copilot_fresh_src_3f34a688._.js.map