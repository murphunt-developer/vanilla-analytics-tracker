## **Window API**  
[MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Window)

A window for a given document can be obtained using `document.defaultView`.  
`window` is a global variable representing the window in which the script is running.  
Each browser tab has its own Window object.

### **Instance Properties**

- **Window.caches** — Returns CacheStorage object for offline assets and custom responses.  
- **Window.clientInformation** — Alias for Window.navigator.  
- **Window.closed** — Indicates whether the window is closed.  
- **Window.cookieStore** — Returns CookieStore reference.  
- **Window.credentialless** — Indicates if document was loaded in a credentialless iframe.  
- **Window.crossOriginIsolated** — Indicates whether site is cross-origin isolated.  
- **Window.crypto** — Returns Crypto object.  
- **Window.customElements** — Returns CustomElementRegistry for managing custom elements.  
- **Window.devicePixelRatio** — Returns ratio of physical to device-independent pixels.  
- **Window.document** — Returns reference to contained document.  
- **Window.documentPictureInPicture** — Returns Picture-in-Picture window reference.  
- **Window.fence** — Returns Fence object.  
- **Window.frameElement** — Returns embedding element or null.  
- **Window.frames** — Returns array of subframes.  
- **Window.fullScreen** — Indicates full-screen state.  
- **Window.history** — Returns History object.  
- **Window.indexedDB** — Returns IDBFactory for IndexedDB access.  
- **Window.innerHeight/innerWidth** — Dimensions of content area.  
- **Window.isSecureContext** — Indicates if context is secure (HTTPS).  
- **Window.launchQueue** — Provides LaunchQueue API access for PWAs.  
- **Window.length** — Number of frames.  
- **Window.localStorage** — Returns LocalStorage reference.  
- **Window.location** — Gets/sets current window URL.  
- **Window.locationbar/menubar/personalbar/statusbar/toolbar** — Return UI component references.  
- **Window.mozInnerScreenX/Y** — Return screen coordinates of viewport.  
- **Window.name** — Gets/sets window name.  
- **Window.navigation** — Returns Navigation object.  
- **Window.navigator** — Returns Navigator reference.  
- **Window.opener** — Returns reference to opener window.  
- **Window.origin** — Returns origin as string.  
- **Window.outerHeight/outerWidth** — Outer window dimensions.  
- **Window.pageXOffset/pageYOffset** — Aliases for scrollX/scrollY.  
- **Window.parent** — Returns parent window.  
- **Window.performance** — Returns Performance object with timing data.  
- **Window.scheduler** — Entry point for Prioritized Task Scheduling API.  
- **Window.screen** — Returns Screen object.  
- **Window.scrollMaxX/scrollMaxY** — Max scrollable distances.  
- **Window.self/window** — Self-reference to window.  
- **Window.sessionStorage** — Returns SessionStorage reference.  
- **Window.sharedStorage** — Returns SharedStorage object.  
- **Window.speechSynthesis** — Entry to Web Speech API.  
- **Window.top** — Reference to topmost window.  
- **Window.trustedTypes** — Entry point for Trusted Types API.  
- **Window.viewport/visualViewport** — Return viewport info objects.  

---
