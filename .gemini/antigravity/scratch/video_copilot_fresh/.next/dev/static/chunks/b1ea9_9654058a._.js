(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
"[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-react/dist/MsalContext.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MsalConsumer",
    ()=>MsalConsumer,
    "MsalContext",
    ()=>MsalContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$common$2f$dist$2d$browser$2f$logger$2f$Logger$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-common/dist-browser/logger/Logger.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$browser$2f$dist$2f$utils$2f$BrowserConstants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-browser/dist/utils/BrowserConstants.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$browser$2f$dist$2f$app$2f$IPublicClientApplication$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-browser/dist/app/IPublicClientApplication.mjs [app-client] (ecmascript)");
/*! @azure/msal-react v5.0.2 2026-01-17 */ 'use strict';
;
;
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */ /*
 * Stubbed context implementation
 * Only used when there is no provider, which is an unsupported scenario
 */ const defaultMsalContext = {
    instance: __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$browser$2f$dist$2f$app$2f$IPublicClientApplication$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stubbedPublicClientApplication"],
    inProgress: __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$browser$2f$dist$2f$utils$2f$BrowserConstants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InteractionStatus"].None,
    accounts: [],
    logger: new __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$common$2f$dist$2d$browser$2f$logger$2f$Logger$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Logger"]({})
};
const MsalContext = __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"](defaultMsalContext);
const MsalConsumer = MsalContext.Consumer;
;
 //# sourceMappingURL=MsalContext.js.map
}),
"[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-react/dist/utils/utilities.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "accountArraysAreEqual",
    ()=>accountArraysAreEqual,
    "getAccountByIdentifiers",
    ()=>getAccountByIdentifiers,
    "getChildrenOrFunction",
    ()=>getChildrenOrFunction
]);
/*! @azure/msal-react v5.0.2 2026-01-17 */ 'use strict';
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */ function getChildrenOrFunction(children, args) {
    if (typeof children === "function") {
        return children(args);
    }
    return children;
}
/**
 * Helper function to determine whether 2 arrays are equal
 * Used to avoid unnecessary state updates
 * @param arrayA
 * @param arrayB
 */ function accountArraysAreEqual(arrayA, arrayB) {
    if (arrayA.length !== arrayB.length) {
        return false;
    }
    const comparisonArray = [
        ...arrayB
    ];
    return arrayA.every((elementA)=>{
        const elementB = comparisonArray.shift();
        if (!elementA || !elementB) {
            return false;
        }
        return elementA.homeAccountId === elementB.homeAccountId && elementA.localAccountId === elementB.localAccountId && elementA.username === elementB.username;
    });
}
function getAccountByIdentifiers(allAccounts, accountIdentifiers) {
    if (allAccounts.length > 0 && (accountIdentifiers.homeAccountId || accountIdentifiers.localAccountId || accountIdentifiers.username)) {
        const matchedAccounts = allAccounts.filter((accountObj)=>{
            if (accountIdentifiers.username && accountIdentifiers.username.toLowerCase() !== accountObj.username.toLowerCase()) {
                return false;
            }
            if (accountIdentifiers.homeAccountId && accountIdentifiers.homeAccountId.toLowerCase() !== accountObj.homeAccountId.toLowerCase()) {
                return false;
            }
            if (accountIdentifiers.localAccountId && accountIdentifiers.localAccountId.toLowerCase() !== accountObj.localAccountId.toLowerCase()) {
                return false;
            }
            return true;
        });
        return matchedAccounts[0] || null;
    } else {
        return null;
    }
}
;
 //# sourceMappingURL=utilities.js.map
}),
"[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-react/dist/packageMetadata.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "name",
    ()=>name,
    "version",
    ()=>version
]);
/*! @azure/msal-react v5.0.2 2026-01-17 */ 'use strict';
/* eslint-disable header/header */ const name = "@azure/msal-react";
const version = "5.0.2";
;
 //# sourceMappingURL=packageMetadata.js.map
}),
"[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-react/dist/MsalProvider.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MsalProvider",
    ()=>MsalProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$browser$2f$dist$2f$utils$2f$BrowserConstants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-browser/dist/utils/BrowserConstants.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$browser$2f$dist$2f$event$2f$EventMessage$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-browser/dist/event/EventMessage.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$MsalContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-react/dist/MsalContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$utils$2f$utilities$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-react/dist/utils/utilities.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$packageMetadata$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-react/dist/packageMetadata.js [app-client] (ecmascript)");
/*! @azure/msal-react v5.0.2 2026-01-17 */ 'use strict';
;
;
;
;
;
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */ const MsalProviderActionType = {
    UNBLOCK_INPROGRESS: "UNBLOCK_INPROGRESS",
    EVENT: "EVENT"
};
/**
 * Returns the next inProgress and accounts state based on event message
 * @param previousState
 * @param action
 */ const reducer = (previousState, action)=>{
    const { type, payload } = action;
    let newInProgress = previousState.inProgress;
    switch(type){
        case MsalProviderActionType.UNBLOCK_INPROGRESS:
            if (previousState.inProgress === __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$browser$2f$dist$2f$utils$2f$BrowserConstants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InteractionStatus"].Startup) {
                newInProgress = __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$browser$2f$dist$2f$utils$2f$BrowserConstants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InteractionStatus"].None;
                payload.logger.info("MsalProvider - handleRedirectPromise resolved, setting inProgress to 'none'", "");
            }
            break;
        case MsalProviderActionType.EVENT:
            const message = payload.message;
            const status = __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$browser$2f$dist$2f$event$2f$EventMessage$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventMessageUtils"].getInteractionStatusFromEvent(message, previousState.inProgress);
            if (status) {
                payload.logger.info(`MsalProvider - '${message.eventType}' results in setting inProgress from '${previousState.inProgress}' to '${status}'`, "");
                newInProgress = status;
            }
            break;
        default:
            throw new Error(`Unknown action type: ${type}`);
    }
    if (newInProgress === __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$browser$2f$dist$2f$utils$2f$BrowserConstants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InteractionStatus"].Startup) {
        // Can't start checking accounts until initialization is complete
        return previousState;
    }
    const currentAccounts = payload.instance.getAllAccounts();
    if (newInProgress !== previousState.inProgress && !(0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$utils$2f$utilities$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["accountArraysAreEqual"])(currentAccounts, previousState.accounts)) {
        // Both inProgress and accounts changed
        return {
            ...previousState,
            inProgress: newInProgress,
            accounts: currentAccounts
        };
    } else if (newInProgress !== previousState.inProgress) {
        // Only only inProgress changed
        return {
            ...previousState,
            inProgress: newInProgress
        };
    } else if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$utils$2f$utilities$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["accountArraysAreEqual"])(currentAccounts, previousState.accounts)) {
        // Only accounts changed
        return {
            ...previousState,
            accounts: currentAccounts
        };
    } else {
        // Nothing changed
        return previousState;
    }
};
/**
 * MSAL context provider component. This must be rendered above any other components that use MSAL.
 */ function MsalProvider({ instance, children }) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MsalProvider.useEffect": ()=>{
            instance.initializeWrapperLibrary(__TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$browser$2f$dist$2f$utils$2f$BrowserConstants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WrapperSKU"].React, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$packageMetadata$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["version"]);
        }
    }["MsalProvider.useEffect"], [
        instance
    ]);
    // Create a logger instance for msal-react with the same options as PublicClientApplication
    const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MsalProvider.useMemo[logger]": ()=>{
            return instance.getLogger().clone(__TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$packageMetadata$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["name"], __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$packageMetadata$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["version"]);
        }
    }["MsalProvider.useMemo[logger]"], [
        instance
    ]);
    const [state, updateState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducer"])(reducer, undefined, {
        "MsalProvider.useReducer": ()=>{
            // Lazy initialization of the initial state
            return {
                inProgress: __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$browser$2f$dist$2f$utils$2f$BrowserConstants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InteractionStatus"].Startup,
                accounts: []
            };
        }
    }["MsalProvider.useReducer"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MsalProvider.useEffect": ()=>{
            const callbackId = instance.addEventCallback({
                "MsalProvider.useEffect.callbackId": (message)=>{
                    updateState({
                        payload: {
                            instance,
                            logger,
                            message
                        },
                        type: MsalProviderActionType.EVENT
                    });
                }
            }["MsalProvider.useEffect.callbackId"]);
            logger.verbose(`MsalProvider - Registered event callback with id: '${callbackId}'`, "");
            instance.initialize().then({
                "MsalProvider.useEffect": ()=>{
                    instance.handleRedirectPromise().catch({
                        "MsalProvider.useEffect": ()=>{
                            // Errors should be handled by listening to the LOGIN_FAILURE event
                            return;
                        }
                    }["MsalProvider.useEffect"]).finally({
                        "MsalProvider.useEffect": ()=>{
                            /*
                 * If handleRedirectPromise returns a cached promise the necessary events may not be fired
                 * This is a fallback to prevent inProgress from getting stuck in 'startup'
                 */ updateState({
                                payload: {
                                    instance,
                                    logger
                                },
                                type: MsalProviderActionType.UNBLOCK_INPROGRESS
                            });
                        }
                    }["MsalProvider.useEffect"]);
                }
            }["MsalProvider.useEffect"]).catch({
                "MsalProvider.useEffect": ()=>{
                    // Errors should be handled by listening to the LOGIN_FAILURE event
                    return;
                }
            }["MsalProvider.useEffect"]);
            return ({
                "MsalProvider.useEffect": ()=>{
                    // Remove callback when component unmounts or accounts change
                    if (callbackId) {
                        logger.verbose(`MsalProvider - Removing event callback '${callbackId}'`, "");
                        instance.removeEventCallback(callbackId);
                    }
                }
            })["MsalProvider.useEffect"];
        }
    }["MsalProvider.useEffect"], [
        instance,
        logger
    ]);
    const contextValue = {
        instance,
        inProgress: state.inProgress,
        accounts: state.accounts,
        logger
    };
    return __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(__TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$MsalContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MsalContext"].Provider, {
        value: contextValue
    }, children);
}
;
 //# sourceMappingURL=MsalProvider.js.map
}),
"[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-react/dist/hooks/useMsal.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useMsal",
    ()=>useMsal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$MsalContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-react/dist/MsalContext.js [app-client] (ecmascript)");
/*! @azure/msal-react v5.0.2 2026-01-17 */ 'use strict';
;
;
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */ /**
 * Returns Msal Context values
 */ const useMsal = ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$MsalContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MsalContext"]);
;
 //# sourceMappingURL=useMsal.js.map
}),
"[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-react/dist/hooks/useIsAuthenticated.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useIsAuthenticated",
    ()=>useIsAuthenticated
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$hooks$2f$useMsal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-react/dist/hooks/useMsal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$browser$2f$dist$2f$utils$2f$BrowserConstants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-browser/dist/utils/BrowserConstants.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$utils$2f$utilities$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-react/dist/utils/utilities.js [app-client] (ecmascript)");
/*! @azure/msal-react v5.0.2 2026-01-17 */ 'use strict';
;
;
;
;
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */ function isAuthenticated(allAccounts, matchAccount) {
    if (matchAccount && (matchAccount.username || matchAccount.homeAccountId || matchAccount.localAccountId)) {
        return !!(0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$utils$2f$utilities$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAccountByIdentifiers"])(allAccounts, matchAccount);
    }
    return allAccounts.length > 0;
}
/**
 * Returns whether or not a user is currently signed-in. Optionally provide 1 or more accountIdentifiers to determine if a specific user is signed-in
 * @param matchAccount
 */ function useIsAuthenticated(matchAccount) {
    const { accounts: allAccounts, inProgress } = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$hooks$2f$useMsal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMsal"])();
    const isUserAuthenticated = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useIsAuthenticated.useMemo[isUserAuthenticated]": ()=>{
            if (inProgress === __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$browser$2f$dist$2f$utils$2f$BrowserConstants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InteractionStatus"].Startup) {
                return false;
            }
            return isAuthenticated(allAccounts, matchAccount);
        }
    }["useIsAuthenticated.useMemo[isUserAuthenticated]"], [
        allAccounts,
        inProgress,
        matchAccount
    ]);
    return isUserAuthenticated;
}
;
 //# sourceMappingURL=useIsAuthenticated.js.map
}),
"[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-react/dist/components/AuthenticatedTemplate.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthenticatedTemplate",
    ()=>AuthenticatedTemplate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$utils$2f$utilities$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-react/dist/utils/utilities.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$hooks$2f$useMsal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-react/dist/hooks/useMsal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$hooks$2f$useIsAuthenticated$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-react/dist/hooks/useIsAuthenticated.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$browser$2f$dist$2f$utils$2f$BrowserConstants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-browser/dist/utils/BrowserConstants.mjs [app-client] (ecmascript)");
/*! @azure/msal-react v5.0.2 2026-01-17 */ 'use strict';
;
;
;
;
;
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */ /**
 * Renders child components if user is authenticated
 * @param props
 */ function AuthenticatedTemplate({ username, homeAccountId, localAccountId, children }) {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$hooks$2f$useMsal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMsal"])();
    const accountIdentifier = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AuthenticatedTemplate.useMemo[accountIdentifier]": ()=>{
            return {
                username,
                homeAccountId,
                localAccountId
            };
        }
    }["AuthenticatedTemplate.useMemo[accountIdentifier]"], [
        username,
        homeAccountId,
        localAccountId
    ]);
    const isAuthenticated = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$hooks$2f$useIsAuthenticated$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsAuthenticated"])(accountIdentifier);
    if (isAuthenticated && context.inProgress !== __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$browser$2f$dist$2f$utils$2f$BrowserConstants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InteractionStatus"].Startup) {
        return __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(__TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Fragment, null, (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$utils$2f$utilities$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getChildrenOrFunction"])(children, context));
    }
    return null;
}
;
 //# sourceMappingURL=AuthenticatedTemplate.js.map
}),
"[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-react/dist/components/UnauthenticatedTemplate.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UnauthenticatedTemplate",
    ()=>UnauthenticatedTemplate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$hooks$2f$useMsal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-react/dist/hooks/useMsal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$hooks$2f$useIsAuthenticated$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-react/dist/hooks/useIsAuthenticated.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$utils$2f$utilities$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-react/dist/utils/utilities.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$browser$2f$dist$2f$utils$2f$BrowserConstants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-browser/dist/utils/BrowserConstants.mjs [app-client] (ecmascript)");
/*! @azure/msal-react v5.0.2 2026-01-17 */ 'use strict';
;
;
;
;
;
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */ /**
 * Renders child components if user is unauthenticated
 * @param props
 */ function UnauthenticatedTemplate({ username, homeAccountId, localAccountId, children }) {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$hooks$2f$useMsal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMsal"])();
    const accountIdentifier = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "UnauthenticatedTemplate.useMemo[accountIdentifier]": ()=>{
            return {
                username,
                homeAccountId,
                localAccountId
            };
        }
    }["UnauthenticatedTemplate.useMemo[accountIdentifier]"], [
        username,
        homeAccountId,
        localAccountId
    ]);
    const isAuthenticated = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$hooks$2f$useIsAuthenticated$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsAuthenticated"])(accountIdentifier);
    if (!isAuthenticated && context.inProgress !== __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$browser$2f$dist$2f$utils$2f$BrowserConstants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InteractionStatus"].Startup && context.inProgress !== __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$browser$2f$dist$2f$utils$2f$BrowserConstants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InteractionStatus"].HandleRedirect) {
        return __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(__TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Fragment, null, (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$utils$2f$utilities$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getChildrenOrFunction"])(children, context));
    }
    return null;
}
;
 //# sourceMappingURL=UnauthenticatedTemplate.js.map
}),
"[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-react/dist/hooks/useAccount.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "accountInfoIsEqual",
    ()=>accountInfoIsEqual,
    "useAccount",
    ()=>useAccount
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$browser$2f$dist$2f$utils$2f$BrowserConstants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-browser/dist/utils/BrowserConstants.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$browser$2f$dist$2f$event$2f$EventType$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-browser/dist/event/EventType.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$hooks$2f$useMsal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-react/dist/hooks/useMsal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$utils$2f$utilities$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-react/dist/utils/utilities.js [app-client] (ecmascript)");
/*! @azure/msal-react v5.0.2 2026-01-17 */ 'use strict';
;
;
;
;
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */ function getAccount(instance, accountIdentifiers) {
    if (!accountIdentifiers || !accountIdentifiers.homeAccountId && !accountIdentifiers.localAccountId && !accountIdentifiers.username) {
        // If no account identifiers are provided, return active account
        return instance.getActiveAccount();
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$utils$2f$utilities$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAccountByIdentifiers"])(instance.getAllAccounts(), accountIdentifiers);
}
/**
 * Helper function to determine whether 2 accountInfo objects represent the same account
 * @param accountA
 * @param accountB
 */ function accountInfoIsEqual(accountA, accountB) {
    if (!accountA || !accountB) {
        return false;
    }
    const accountAClaims = accountA.idTokenClaims || {};
    const accountBClaims = accountB.idTokenClaims || {};
    // issued at timestamp and nonce are expected to change each time a new id token is acquired
    const claimsMatch = accountAClaims.iat === accountBClaims.iat && accountAClaims.nonce === accountBClaims.nonce;
    return accountA.homeAccountId === accountB.homeAccountId && accountA.localAccountId === accountB.localAccountId && accountA.username === accountB.username && accountA.tenantId === accountB.tenantId && accountA.environment === accountB.environment && accountA.nativeAccountId === accountB.nativeAccountId && claimsMatch;
}
/**
 * Given 1 or more accountIdentifiers, returns the Account object if the user is signed-in
 * @param accountIdentifiers
 */ function useAccount(accountIdentifiers) {
    const { instance, inProgress, logger } = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$hooks$2f$useMsal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMsal"])();
    const [account, setAccount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "useAccount.useState": ()=>{
            if (inProgress === __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$browser$2f$dist$2f$utils$2f$BrowserConstants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InteractionStatus"].Startup) {
                return null;
            } else {
                return getAccount(instance, accountIdentifiers);
            }
        }
    }["useAccount.useState"]);
    const updateAccount = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAccount.useCallback[updateAccount]": ()=>{
            const nextAccount = getAccount(instance, accountIdentifiers);
            setAccount({
                "useAccount.useCallback[updateAccount]": (currentAccount)=>{
                    if (!accountInfoIsEqual(currentAccount, nextAccount)) {
                        logger.info("useAccount - Updating account", "");
                        return nextAccount;
                    }
                    return currentAccount;
                }
            }["useAccount.useCallback[updateAccount]"]);
        }
    }["useAccount.useCallback[updateAccount]"], [
        accountIdentifiers,
        instance,
        logger
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useAccount.useEffect": ()=>{
            if (inProgress !== __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$browser$2f$dist$2f$utils$2f$BrowserConstants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InteractionStatus"].Startup) {
                updateAccount();
            }
            const callbackId = instance.addEventCallback({
                "useAccount.useEffect.callbackId": (message)=>{
                    if (message.eventType === __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$browser$2f$dist$2f$event$2f$EventType$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventType"].ACTIVE_ACCOUNT_CHANGED || message.eventType === __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$browser$2f$dist$2f$event$2f$EventType$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventType"].LOGIN_SUCCESS && message.interactionType === __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$browser$2f$dist$2f$utils$2f$BrowserConstants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InteractionType"].Silent) {
                        updateAccount();
                    }
                }
            }["useAccount.useEffect.callbackId"]);
            return ({
                "useAccount.useEffect": ()=>{
                    if (callbackId) {
                        instance.removeEventCallback(callbackId);
                    }
                }
            })["useAccount.useEffect"];
        }
    }["useAccount.useEffect"], [
        updateAccount,
        inProgress,
        instance
    ]);
    return account;
}
;
 //# sourceMappingURL=useAccount.js.map
}),
"[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-react/dist/error/ReactAuthError.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReactAuthError",
    ()=>ReactAuthError,
    "ReactAuthErrorMessage",
    ()=>ReactAuthErrorMessage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$common$2f$dist$2d$browser$2f$error$2f$AuthError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-common/dist-browser/error/AuthError.mjs [app-client] (ecmascript)");
/*! @azure/msal-react v5.0.2 2026-01-17 */ 'use strict';
;
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */ const ReactAuthErrorMessage = {
    invalidInteractionType: {
        code: "invalid_interaction_type",
        desc: "The provided interaction type is invalid."
    },
    unableToFallbackToInteraction: {
        code: "unable_to_fallback_to_interaction",
        desc: "Interaction is required but another interaction is already in progress. Please try again when the current interaction is complete."
    }
};
class ReactAuthError extends __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$common$2f$dist$2d$browser$2f$error$2f$AuthError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthError"] {
    constructor(errorCode, errorMessage){
        super(errorCode, errorMessage);
        Object.setPrototypeOf(this, ReactAuthError.prototype);
        this.name = "ReactAuthError";
    }
    static createInvalidInteractionTypeError() {
        return new ReactAuthError(ReactAuthErrorMessage.invalidInteractionType.code, ReactAuthErrorMessage.invalidInteractionType.desc);
    }
    static createUnableToFallbackToInteractionError() {
        return new ReactAuthError(ReactAuthErrorMessage.unableToFallbackToInteraction.code, ReactAuthErrorMessage.unableToFallbackToInteraction.desc);
    }
}
;
 //# sourceMappingURL=ReactAuthError.js.map
}),
"[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-react/dist/hooks/useMsalAuthentication.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useMsalAuthentication",
    ()=>useMsalAuthentication
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$browser$2f$dist$2f$utils$2f$BrowserConstants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-browser/dist/utils/BrowserConstants.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$browser$2f$dist$2f$utils$2f$BrowserUtils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__BrowserUtils$3e$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-browser/dist/utils/BrowserUtils.mjs [app-client] (ecmascript) <export * as BrowserUtils>");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$common$2f$dist$2d$browser$2f$error$2f$InteractionRequiredAuthError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-common/dist-browser/error/InteractionRequiredAuthError.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$browser$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-browser/dist/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$hooks$2f$useIsAuthenticated$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-react/dist/hooks/useIsAuthenticated.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$hooks$2f$useMsal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-react/dist/hooks/useMsal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-react/dist/hooks/useAccount.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$error$2f$ReactAuthError$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-react/dist/error/ReactAuthError.js [app-client] (ecmascript)");
/*! @azure/msal-react v5.0.2 2026-01-17 */ 'use strict';
;
;
;
;
;
;
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */ /**
 * If a user is not currently signed in this hook invokes a login. Failed logins can be retried using the login callback returned.
 * If a user is currently signed in this hook attempts to acquire a token. Subsequent token requests can use the acquireToken callback returned.
 * Optionally provide a request object to be used in the login/acquireToken call.
 * Optionally provide a specific user that should be logged in.
 * @param interactionType
 * @param authenticationRequest
 * @param accountIdentifiers
 */ function useMsalAuthentication(interactionType, authenticationRequest, accountIdentifiers) {
    const { instance, inProgress, logger } = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$hooks$2f$useMsal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMsal"])();
    const isAuthenticated = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$hooks$2f$useIsAuthenticated$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsAuthenticated"])(accountIdentifiers);
    const account = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAccount"])(accountIdentifiers);
    const [[result, error], setResponse] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        null,
        null
    ]);
    // Used to prevent state updates after unmount
    const mounted = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useMsalAuthentication.useEffect": ()=>{
            return ({
                "useMsalAuthentication.useEffect": ()=>{
                    mounted.current = false;
                }
            })["useMsalAuthentication.useEffect"];
        }
    }["useMsalAuthentication.useEffect"], []);
    // Boolean used to check if interaction is in progress in acquireTokenSilent fallback. Use Ref instead of state to prevent acquireToken function from being regenerated on each change to interactionInProgress value
    const interactionInProgress = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(inProgress !== __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$browser$2f$dist$2f$utils$2f$BrowserConstants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InteractionStatus"].None);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useMsalAuthentication.useEffect": ()=>{
            interactionInProgress.current = inProgress !== __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$browser$2f$dist$2f$utils$2f$BrowserConstants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InteractionStatus"].None;
        }
    }["useMsalAuthentication.useEffect"], [
        inProgress
    ]);
    // Flag used to control when the hook calls login/acquireToken
    const shouldAcquireToken = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useMsalAuthentication.useEffect": ()=>{
            if (!!error) {
                // Errors should be handled by consuming component
                shouldAcquireToken.current = false;
                return;
            }
            if (!!result) {
                // Token has already been acquired, consuming component/application is responsible for renewing
                shouldAcquireToken.current = false;
                return;
            }
        }
    }["useMsalAuthentication.useEffect"], [
        error,
        result
    ]);
    const login = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useMsalAuthentication.useCallback[login]": async (callbackInteractionType, callbackRequest)=>{
            const loginType = callbackInteractionType || interactionType;
            const loginRequest = callbackRequest || authenticationRequest;
            const getToken = {
                "useMsalAuthentication.useCallback[login].getToken": async ()=>{
                    logger.verbose("useMsalAuthentication - Calling getToken", callbackRequest?.correlationId || "");
                    switch(loginType){
                        case __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$browser$2f$dist$2f$utils$2f$BrowserConstants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InteractionType"].Popup:
                            logger.verbose("useMsalAuthentication - Calling loginPopup", callbackRequest?.correlationId || "");
                            return instance.loginPopup(loginRequest);
                        case __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$browser$2f$dist$2f$utils$2f$BrowserConstants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InteractionType"].Redirect:
                            // This promise is not expected to resolve due to full frame redirect
                            logger.verbose("useMsalAuthentication - Calling loginRedirect", callbackRequest?.correlationId || "");
                            await instance.handleRedirectPromise();
                            return instance.loginRedirect(loginRequest).then({
                                "useMsalAuthentication.useCallback[login].getToken": ()=>null
                            }["useMsalAuthentication.useCallback[login].getToken"]);
                        case __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$browser$2f$dist$2f$utils$2f$BrowserConstants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InteractionType"].Silent:
                            logger.verbose("useMsalAuthentication - Calling ssoSilent", callbackRequest?.correlationId || "");
                            return instance.ssoSilent(loginRequest);
                        default:
                            const invalidTypeError = __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$error$2f$ReactAuthError$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReactAuthError"].createInvalidInteractionTypeError();
                            if (mounted.current) {
                                setResponse([
                                    null,
                                    invalidTypeError
                                ]);
                            }
                            throw invalidTypeError;
                    }
                }
            }["useMsalAuthentication.useCallback[login].getToken"];
            return getToken().then({
                "useMsalAuthentication.useCallback[login]": (response)=>{
                    if (response && mounted.current) {
                        setResponse([
                            response,
                            null
                        ]);
                    }
                    return response;
                }
            }["useMsalAuthentication.useCallback[login]"]).catch({
                "useMsalAuthentication.useCallback[login]": (e)=>{
                    if (mounted.current) {
                        setResponse([
                            null,
                            e
                        ]);
                    }
                    throw e;
                }
            }["useMsalAuthentication.useCallback[login]"]);
        }
    }["useMsalAuthentication.useCallback[login]"], [
        instance,
        interactionType,
        authenticationRequest,
        logger
    ]);
    const acquireToken = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useMsalAuthentication.useCallback[acquireToken]": async (callbackInteractionType, callbackRequest)=>{
            const fallbackInteractionType = callbackInteractionType || interactionType;
            let tokenRequest;
            if (callbackRequest) {
                logger.trace("useMsalAuthentication - acquireToken - Using request provided in the callback", callbackRequest.correlationId || "");
                tokenRequest = {
                    ...callbackRequest
                };
            } else if (authenticationRequest) {
                logger.trace("useMsalAuthentication - acquireToken - Using request provided in the hook", authenticationRequest.correlationId || "");
                tokenRequest = {
                    ...authenticationRequest,
                    scopes: authenticationRequest.scopes || __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$browser$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["OIDC_DEFAULT_SCOPES"]
                };
            } else {
                logger.trace("useMsalAuthentication - acquireToken - No request object provided, using default request.", "");
                tokenRequest = {
                    scopes: __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$browser$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["OIDC_DEFAULT_SCOPES"]
                };
            }
            const correlationId = tokenRequest.correlationId || __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$browser$2f$dist$2f$utils$2f$BrowserUtils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__BrowserUtils$3e$__["BrowserUtils"].createGuid();
            tokenRequest.correlationId = correlationId;
            if (!tokenRequest.account && account) {
                logger.trace("useMsalAuthentication - acquireToken - Attaching account to request", correlationId);
                tokenRequest.account = account;
            }
            return instance.acquireTokenSilent(tokenRequest).then({
                "useMsalAuthentication.useCallback[acquireToken]": (response)=>{
                    if (mounted.current) {
                        setResponse([
                            response,
                            null
                        ]);
                    }
                    return response;
                }
            }["useMsalAuthentication.useCallback[acquireToken]"]).catch({
                "useMsalAuthentication.useCallback[acquireToken]": async (e)=>{
                    if (e instanceof __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$common$2f$dist$2d$browser$2f$error$2f$InteractionRequiredAuthError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["InteractionRequiredAuthError"]) {
                        if (!interactionInProgress.current) {
                            logger.error("useMsalAuthentication - Interaction required, falling back to interaction", correlationId);
                            return login(fallbackInteractionType, tokenRequest);
                        } else {
                            const fallbackError = __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$error$2f$ReactAuthError$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReactAuthError"].createUnableToFallbackToInteractionError();
                            logger.error("useMsalAuthentication - Interaction required but is already in progress. Please try again, if needed, after interaction completes.", correlationId);
                            if (mounted.current) {
                                setResponse([
                                    null,
                                    fallbackError
                                ]);
                            }
                            throw fallbackError;
                        }
                    }
                    // Handle other errors
                    if (mounted.current) {
                        setResponse([
                            null,
                            e
                        ]);
                    }
                    throw e;
                }
            }["useMsalAuthentication.useCallback[acquireToken]"]);
        }
    }["useMsalAuthentication.useCallback[acquireToken]"], [
        instance,
        interactionType,
        authenticationRequest,
        logger,
        account,
        login
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useMsalAuthentication.useEffect": ()=>{
            if (shouldAcquireToken.current && inProgress === __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$browser$2f$dist$2f$utils$2f$BrowserConstants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InteractionStatus"].None) {
                if (!isAuthenticated) {
                    shouldAcquireToken.current = false;
                    logger.info("useMsalAuthentication - No user is authenticated, attempting to login", "");
                    login().catch({
                        "useMsalAuthentication.useEffect": ()=>{
                            // Errors are saved in state above
                            return;
                        }
                    }["useMsalAuthentication.useEffect"]);
                } else if (account) {
                    shouldAcquireToken.current = false;
                    logger.info("useMsalAuthentication - User is authenticated, attempting to acquire token", "");
                    acquireToken().catch({
                        "useMsalAuthentication.useEffect": ()=>{
                            // Errors are saved in state above
                            return;
                        }
                    }["useMsalAuthentication.useEffect"]);
                }
            // If logging out, set the state to null so the component doesn't display authenticated content for a user that is logged out
            } else if (!account && result) {
                setResponse([
                    null,
                    null
                ]);
            }
        }
    }["useMsalAuthentication.useEffect"], [
        isAuthenticated,
        account,
        inProgress,
        login,
        acquireToken,
        logger
    ]);
    return {
        login,
        acquireToken,
        result,
        error
    };
}
;
 //# sourceMappingURL=useMsalAuthentication.js.map
}),
"[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-react/dist/components/MsalAuthenticationTemplate.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MsalAuthenticationTemplate",
    ()=>MsalAuthenticationTemplate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$utils$2f$utilities$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-react/dist/utils/utilities.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$hooks$2f$useMsal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-react/dist/hooks/useMsal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$hooks$2f$useMsalAuthentication$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-react/dist/hooks/useMsalAuthentication.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$hooks$2f$useIsAuthenticated$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-react/dist/hooks/useIsAuthenticated.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$browser$2f$dist$2f$utils$2f$BrowserConstants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-browser/dist/utils/BrowserConstants.mjs [app-client] (ecmascript)");
/*! @azure/msal-react v5.0.2 2026-01-17 */ 'use strict';
;
;
;
;
;
;
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */ /**
 * Attempts to authenticate user if not already authenticated, then renders child components
 * @param props
 */ function MsalAuthenticationTemplate({ interactionType, username, homeAccountId, localAccountId, authenticationRequest, loadingComponent: LoadingComponent, errorComponent: ErrorComponent, children }) {
    const accountIdentifier = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MsalAuthenticationTemplate.useMemo[accountIdentifier]": ()=>{
            return {
                username,
                homeAccountId,
                localAccountId
            };
        }
    }["MsalAuthenticationTemplate.useMemo[accountIdentifier]"], [
        username,
        homeAccountId,
        localAccountId
    ]);
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$hooks$2f$useMsal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMsal"])();
    const msalAuthResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$hooks$2f$useMsalAuthentication$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMsalAuthentication"])(interactionType, authenticationRequest, accountIdentifier);
    const isAuthenticated = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$hooks$2f$useIsAuthenticated$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsAuthenticated"])(accountIdentifier);
    if (msalAuthResult.error && context.inProgress === __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$browser$2f$dist$2f$utils$2f$BrowserConstants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InteractionStatus"].None) {
        if (!!ErrorComponent) {
            return __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(ErrorComponent, {
                ...msalAuthResult
            });
        }
        throw msalAuthResult.error;
    }
    if (isAuthenticated) {
        return __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(__TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Fragment, null, (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$utils$2f$utilities$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getChildrenOrFunction"])(children, msalAuthResult));
    }
    if (!!LoadingComponent && context.inProgress !== __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$browser$2f$dist$2f$utils$2f$BrowserConstants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InteractionStatus"].None) {
        return __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(LoadingComponent, {
            ...context
        });
    }
    return null;
}
;
 //# sourceMappingURL=MsalAuthenticationTemplate.js.map
}),
"[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-react/dist/components/withMsal.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "withMsal",
    ()=>withMsal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$hooks$2f$useMsal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-react/dist/hooks/useMsal.js [app-client] (ecmascript)");
/*! @azure/msal-react v5.0.2 2026-01-17 */ 'use strict';
;
;
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */ /**
 * Higher order component wraps provided component with msal by injecting msal context values into the component's props
 * @param Component
 */ const withMsal = (Component)=>{
    const ComponentWithMsal = (props)=>{
        const msal = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$hooks$2f$useMsal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMsal"])();
        return __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(Component, {
            ...props,
            msalContext: msal
        });
    };
    const componentName = Component.displayName || Component.name || "Component";
    ComponentWithMsal.displayName = `withMsal(${componentName})`;
    return ComponentWithMsal;
};
;
 //# sourceMappingURL=withMsal.js.map
}),
"[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-react/dist/index.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$MsalContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-react/dist/MsalContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$MsalProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-react/dist/MsalProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$components$2f$AuthenticatedTemplate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-react/dist/components/AuthenticatedTemplate.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$components$2f$UnauthenticatedTemplate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-react/dist/components/UnauthenticatedTemplate.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$components$2f$MsalAuthenticationTemplate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-react/dist/components/MsalAuthenticationTemplate.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$components$2f$withMsal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-react/dist/components/withMsal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$hooks$2f$useMsal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-react/dist/hooks/useMsal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-react/dist/hooks/useAccount.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$hooks$2f$useIsAuthenticated$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-react/dist/hooks/useIsAuthenticated.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$hooks$2f$useMsalAuthentication$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-react/dist/hooks/useMsalAuthentication.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$video_copilot_fresh$2f$node_modules$2f40$azure$2f$msal$2d$react$2f$dist$2f$packageMetadata$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/video_copilot_fresh/node_modules/@azure/msal-react/dist/packageMetadata.js [app-client] (ecmascript)"); //# sourceMappingURL=index.js.map
/*! @azure/msal-react v5.0.2 2026-01-17 */ 'use strict';
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
;
}),
]);

//# sourceMappingURL=b1ea9_9654058a._.js.map