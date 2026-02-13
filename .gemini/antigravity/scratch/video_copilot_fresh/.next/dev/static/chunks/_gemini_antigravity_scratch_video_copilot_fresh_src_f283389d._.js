(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/lib/msalConfig.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "loginRequest",
    ()=>loginRequest,
    "msalConfig",
    ()=>msalConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const msalConfig = {
    auth: {
        clientId: ("TURBOPACK compile-time value", "70e7d27a-bb68-4ff1-819d-3d0cddd4f5a2"),
        authority: `https://login.microsoftonline.com/${("TURBOPACK compile-time value", "caa18e62-2bed-40c2-9d65-8d78e846a0d1")}`,
        // For redirect flow, redirect back to homepage
        redirectUri: ("TURBOPACK compile-time truthy", 1) ? (()=>{
            // Only apply basePath for production (not localhost)
            const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
            const basePath = isLocalhost ? '' : ("TURBOPACK compile-time value", "") || '';
            return `${window.location.origin}${basePath}/`;
        })() : "TURBOPACK unreachable",
        postLogoutRedirectUri: ("TURBOPACK compile-time truthy", 1) ? (()=>{
            const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
            const basePath = isLocalhost ? '' : ("TURBOPACK compile-time value", "") || '';
            return `${window.location.origin}${basePath}/`;
        })() : "TURBOPACK unreachable"
    },
    cache: {
        cacheLocation: "sessionStorage"
    }
};
const loginRequest = {
    scopes: [
        "User.Read",
        "Files.Read.All",
        "Files.ReadWrite.All",
        "Sites.Read.All",
        "Sites.ReadWrite.All"
    ],
    prompt: "select_account"
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/contexts/AuthContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AuthContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$browser$2f$dist$2f$app$2f$PublicClientApplication$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-browser/dist/app/PublicClientApplication.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$browser$2f$dist$2f$event$2f$EventType$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-browser/dist/event/EventType.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-react/dist/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$MsalProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-react/dist/MsalProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$lib$2f$msalConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/lib/msalConfig.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function AuthContext({ children }) {
    _s();
    const [msalInstance, setMsalInstance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Create MSAL instance lazily on client side only
    (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthContext.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            const initializeMsal = {
                "AuthContext.useEffect.initializeMsal": async ()=>{
                    const instance = new __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$browser$2f$dist$2f$app$2f$PublicClientApplication$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PublicClientApplication"](__TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$src$2f$lib$2f$msalConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["msalConfig"]);
                    // Initialize MSAL
                    await instance.initialize();
                    // Handle redirect promise (important for redirect flow)
                    await instance.handleRedirectPromise();
                    // Set active account if accounts exist on initialization
                    const accounts = instance.getAllAccounts();
                    if (!instance.getActiveAccount() && accounts.length > 0) {
                        instance.setActiveAccount(accounts[0]);
                    }
                    // Listen for successful login events
                    instance.addEventCallback({
                        "AuthContext.useEffect.initializeMsal": (event)=>{
                            if (event.eventType === __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$browser$2f$dist$2f$event$2f$EventType$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventType"].LOGIN_SUCCESS && event.payload) {
                                const payload = event.payload;
                                if (payload.account) {
                                    instance.setActiveAccount(payload.account);
                                }
                            }
                        }
                    }["AuthContext.useEffect.initializeMsal"]);
                    setMsalInstance(instance);
                }
            }["AuthContext.useEffect.initializeMsal"];
            initializeMsal();
        }
    }["AuthContext.useEffect"], []);
    // Don't render MsalProvider during SSR or before initialization
    if (!msalInstance) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$MsalProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MsalProvider"], {
        instance: msalInstance,
        children: children
    }, void 0, false, {
        fileName: "[project]/.gemini/antigravity/scratch/video_copilot_fresh/src/contexts/AuthContext.tsx",
        lineNumber: 54,
        columnNumber: 9
    }, this);
}
_s(AuthContext, "QvWszZgHABK/dhvfFuueJX6qz7U=");
_c = AuthContext;
var _c;
__turbopack_context__.k.register(_c, "AuthContext");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_gemini_antigravity_scratch_video_copilot_fresh_src_f283389d._.js.map