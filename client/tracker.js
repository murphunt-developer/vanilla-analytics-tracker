/* 
Learning `navigator` and `window` APIs:

NAVIGATOR: https://developer.mozilla.org/en-US/docs/Web/API/Navigator
 - represents the state and the identity of the user agent
 - allows scripts to query it and to register themsevles to carry on activities
 - can be retrieved with `window.navigator`

 Instance properties:
  - Navigator.bluetooth: returns a Bluetooth object for the current document, providing access to Web Bluetooth API 
  - Navigator.clipboard: returns a Clipboard object that provides read and write access to the system clipboard
  - Navigator.connection: returns a NetworkInformation object containing information about the network connection of a device
  - Navigator.contracts: returns a ContactsManager interface which allows users to select entries from their contact list and share limited details of the selected entries with a website or application
  - Navigator.cookieEnabled: returns false if setting a cookie will be ignored and true otherwise
  - Navigator.credentials: returns the CredentialsContainer interface which exposes methods to request credentials and notify the user agent when interesting events occur such as a successful sign in or sign out.
  - Navigator.deviceMemory: returns the amount of device memory in gigabytes. This value is an approximation given by rounding to the nearest power of 2 and dividing that number by 1024
  - Navigator.devicePosture: returns the browser's DevicePosture object, which allows developers to query the device's current posture (that is, whether the viewport is in a flat or folded state) and run code in response to posture changes
  - Navigator.geolocation: returns a Geolocation object allowing accessing the location of the device
  - Navigator.gpu: returns the GPU obejct for the current browsing context. The entry point for the WebGPU API
  - Navigator.hardwareConcurrency: returns the number of logical processor cores available
  - Navigator.hid: returns an HID (Human Interface Device -- keyboard, mouse, etc.) object providing methods for connecting to HID devices, listing attached HID devices, and event handlers for connected HID devices.
  - Navigator.ink: returns an Ink object for the current document, providing access to Ink API functionality
  - Navigator.keyboard: returns a Keyboard object hich provides access to functions that retrieve keyboard layout maps and toggle capturing of key presses from the physical keyboard
  - Navigator.language: returns an array of strings representing the languages known to the suer, by order of preference
  - Navigator.locks: returns a LockManager object that provides methods for requesting a new Lock object and querying for an existing Lock object.
  - Navigator.login: provides access to the browser's NavigatorLogin object, which a federated identity provider (IdP) can use to set a user's login status when they sign into or out of the IdP. See https://developer.mozilla.org/en-US/docs/Web/API/FedCM_API for more details
  - Navigator.maxTouchPoints: returns the maximum number of simultaneous touch contact points are supported by the current device.
  - Navigator.mediaCapabilities: returns a MediaCapabilities object that can expose information about the decoding and encoding capabilities for a given format and output capabilities.
  - Navigator.mediaDevices: returns a reference to a MediaDevices object which can then be used to get information about available media devices
  - Navigator.mediaSession: returns MediaSession object which can be used to provide metadata that can be used by the browser to present information about the currently-playing media to the user, such as in a global media controls UI.
  - Navigator.onLine: returns a boolean value indicating whether the browser is working online
  - Navigator.pdfViewerEnabled: returns true if the browser can display PDF files inline when navigating to them, and false otherwise
  - Navigator.permissions: returns a Permissions object that can be used to query and updte permission status of APIs covered by the Permissions API
  - Navigator.presentation: returns a reference to Presentation API
  - Navigator.scheduling: returns a Scheduling object for the current document
  - Navigator.serial: returns a Serial object, which representas the entry point into the WebSerial API to enable the control of serial ports
  - Navigator.serviceWorker: returns a ServiceWorkerContainer, object which provides access to registration, removal, upgrade, and communication with the ServiceWorker objects for the associated document.
  - Navigator.storage: returns the singleton StorageManager object used for managing persistence permissions and estimating available storae on a site-by-site/app-by-app basis
  - Navigator.usb: returns a USB object for the current document, providing access to WebUSB API functionality
  - Navigator.userActivation: returns a UserActivation object containing information about the current window's user activation state
  - Navigator.userAgent: returns the user agent string for current browser
  - Naviagtor.virtualKeyboard: returns a reference to the VirtualKeyboard API, to take control of the on-screen virtual keyboard
  - Navigator.wakeLock: returns a WakeLock interface you can use to request screen wake locks and prevent screen from dimming, turning off, or showing a screen saver
  - Navigator.webdriver: indicates whether the user agent is controlled by automation
  - Navigator.windowControlsOverlay: returns the WindowControlsOverlay interface which exposes information about the geometry of the title bar in desktop Progressive Web Apps, and an event to know whenever it changes.
  - Navigator.xr: returns XRSystem object, which represents the entry point into the WebXR API -- support 3D renering scenes to hardware designed for presenting virtual worlds, or for adding graphical imagery to the real world.


  WINDOW: https://developer.mozilla.org/en-US/docs/Web/API/Window
   - a window for a given document can be obtained using document.defaultView
   - `window` is a global variable representing the window in which the script is running
   - each "tab" is represented by its own Window object
   - some properties can apply to the overall window that contains the tabs such as `resizeTo()` and `innerHeight`
   
   Instance Properties:
    - Window.caches: returns CacheStorage object associated with the current context. this object enables functionality such as storing assets for offline use and generating custom responses to requests
    - Window.clientInformation: alias for Window.navigator
    - Window.closed: indicates whether the current window is closed or not
    - Window.cookieStore: returns reference to CookieStore object for the current document context
    - Window.credentialless: returns a boolean that indicates whether the current document was loaded inside a credentialess <iframe>
    - Window.corssOriginIsolated: returns a boolean value that indicates whether the website is in cross-origin isolation state
    - Window.crypto: returns the Crypto object associated to the global object
    - Window.customElements: returns a reference to the CustomElementRegistry object, which can be used to register new custom elements and get information about previously registered custom elements
    - Window.devicePixelRatio: returns ratio between physical pixels and device independent pixels in the current display
    - Window.document: returns a reference to the document that the window contains
    - Window.documentPicutreInPicture: returns reference to the document Picture-in-Picture window for the current document context
    - Window.fence: returns a Fence object instance for the current document context
    - Window.frameElement: returns the element in which the window is embedded, or null if the window is not embedded
    - Window.frames: returns an array of subframes in the current window
    - Window.fullScreen: indicates whether the window is displayed in full screen or not
    - Window.history: returns a reference to history object
    - Window.indexedDB: provides a mechanism for applications to asynchronously access capabilites of indexed databases; returns IDBFactory object
    - Window.innerHeight: gets height of the content area of the browser window including, if rendered, the horizontal scrollbar
    - Window.innerWidth: gets width of the content area of the browser including, if rendered, the vertical scrollbar
    - Window.isSecureContext: returns a boolean indicating whether the current context is secure (true) or not (false)
    - Window.launchQueue: when a progressive web app (PWA) is launched with a launch_handler `client_mode` value of `focus-existing`, `navigate-new`, or `navigate-existing`, the `launchQueue` provides access to the LaunchQueue class, which allows custom launch navigation handling to be implemented for the PWA.
    - Window.length: returns the number of frames in the window
    - Window.localStorage: returns a reference to the local storage object used to store data that may only be accessed by the origin that created it
    - Window.location: gets/sets the location, or current URL, of the window object
    - Window.locationbar: returns the locationbar object
    - Window.menubar: returns teh menubar object
    - Window.mozInnerScreenX: returns the horizontal (X) coordinate of the top-left corner of the window's viewport, in screen coordinates. This value is reported in CSS pixels. 
    - Window.mozInnerScreenY: returns the vertical (Y) coordinate of the top-left corner of the window's viewport, in screen coordinates. This value is reported in CSS pixels.
    - Window.name: gets/sets the name of the window
    - Window.navigation: returns the current window's associated Navigation object
    - Window.navigator: returns a reference to the navigator object
    - Window.opener: returns a reference to the window that opened this current window
    - Window.origin: returns the global object's origin, serialized as a string
    - Window.originAgentCluster: returns true if this window belongs to an origin-keyed agent cluster
    - Window.outerHeight: height of outside of the browser window
    - Window.outerWidth: width of the outside of the browser window
    - Window.pageXOffset: alias for window.scrollX
    - Window.pageYOffset: alias for window.scrollY
    - Window.parent: returns a reference to the parent of the current window or subframe
    - Window.performance: returns performance object which includes timing and navigation attributes each of which is an object providing performance related data
    - Window.personalbar: returns the personalbar object
    - Window.scheduler: returns the Scheduler object associated with the current context. Entry point for using the Prioritized Task Scheduling API
    - Window.screen: returns a reference to the screen object associated with the window
    - Window.screenX and Window.screenLeft: return horizontal distance from the left border of the user's browser viewport to the left side of the screen
    - Window.screenY and Window.screenTop: return vertical distance from the top border of the user's browser viewport to the top side of the screen
    - Window.scrollbars: returns scrollbars object
    - Window.scrollMaxX: maximum offset that the window can be scrolled horizontally i.e. document width minus the viewport width
    - Window.scrollMaxY: maximum offset that the window can be scrolled vertically i.e. document height minus the viewport height
    - Window.self: returns reference to window object itself
    - Window.sessionStorage: returns a reference to the session storage object
    - Window.sharedStorage: returns the WindowSharedStorage object for the current origin
    - Window.speechSynthesis: returns SpeechSynthesis object, entry point into using Web Speech API
    - Window.statusbar: returns statusbar object
    - Window.toolbar: returns toolbar object
    - Window.top: returns the reference to the topmost window in the window hierarchy 
    - Window.trustedTypes: returns the TrustedTypePolicyFactory object associated with teh global object, entry point for Trusted Types API
    - Window.viewport: returns Viewport object instance which provides information about the current state of the device's viewport
    - Window.visualViewport: returns a VisualViewport object which represents the visual viewport for a given window
    - Window.window: returns a reference to the current window (same as window.self). window[0], window[1] etc. can be used to access window(s)
    - 

 BEACON API: https://developer.mozilla.org/en-US/docs/Web/API/Beacon_API
  - used to send asynchronous and non-blocking request(s) to a web server
  - it does not expect a response
  - unlike XMLHttpRequest and Fetch API, the browser guarantees to initiate beacon requests before the page is unloaded and run them to completion
  - analytics is the main use case 
  - `navigator.sendBeacon()` method sends an HTTP POST request containing small amount of data to web server

  `sendBeacon()`: 
   - parameters:
    - url: where the request is sent
    - data (optional): ArrayBuffer, TypedArray, DataView, Blob, string literal, object, FormData, URLSearchParams 
   - return: 
    - true if user agent successfully queued the data for transfer
    - false otherwise

  - websites often want to send analytics or diagnostics to the server when the user has finished with the page. the most reliable way to do this is to send the data on the `visibilitychange` event

  Example: 

  ```
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      navigator.sendBeacon('/log', analyticsData);
    }
  });

  // 'unload' and 'beforeunloac' are incompatible with bfcache
  // fallback, using `pagehide` event tho is it not reliably fired, it is bfcache compatible


  ```
*/