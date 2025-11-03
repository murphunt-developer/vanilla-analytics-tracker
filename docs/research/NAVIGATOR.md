## **Navigator API**  
[MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Navigator)

Represents the state and the identity of the user agent.  
Allows scripts to query it and to register themselves to carry on activities.  
Can be retrieved with `window.navigator`.

### **Instance Properties**

- **Navigator.bluetooth** — Returns a Bluetooth object for the current document, providing access to Web Bluetooth API.  
- **Navigator.clipboard** — Returns a Clipboard object that provides read and write access to the system clipboard.  
- **Navigator.connection** — Returns a NetworkInformation object containing information about the network connection of a device.  
- **Navigator.contacts** — Returns a ContactsManager interface which allows users to select entries from their contact list and share limited details with a website or app.  
- **Navigator.cookieEnabled** — Returns false if setting a cookie will be ignored and true otherwise.  
- **Navigator.credentials** — Returns the CredentialsContainer interface to request credentials and notify user agents when sign-in/out events occur.  
- **Navigator.deviceMemory** — Returns the approximate amount of device memory (in GB).  
- **Navigator.devicePosture** — Returns the DevicePosture object, allowing posture state queries (flat/folded).  
- **Navigator.geolocation** — Returns a Geolocation object for accessing the device’s location.  
- **Navigator.gpu** — Returns the GPU object (entry point for WebGPU API).  
- **Navigator.hardwareConcurrency** — Returns the number of logical processor cores.  
- **Navigator.hid** — Returns an HID object for connecting to Human Interface Devices (keyboard, mouse, etc).  
- **Navigator.ink** — Returns an Ink object for Ink API functionality.  
- **Navigator.keyboard** — Returns a Keyboard object for retrieving keyboard layout maps and capturing key presses.  
- **Navigator.language** — Returns an array of strings representing preferred languages.  
- **Navigator.locks** — Returns a LockManager object for managing Lock objects.  
- **Navigator.login** — Provides access to the browser's NavigatorLogin object (Federated Credential Management API).  
- **Navigator.maxTouchPoints** — Returns the maximum supported touch points.  
- **Navigator.mediaCapabilities** — Returns MediaCapabilities info about decoding/encoding support.  
- **Navigator.mediaDevices** — Returns MediaDevices reference to query media hardware.  
- **Navigator.mediaSession** — Returns a MediaSession object for global media metadata controls.  
- **Navigator.onLine** — Returns whether the browser is online.  
- **Navigator.pdfViewerEnabled** — Returns true if browser can render PDFs inline.  
- **Navigator.permissions** — Returns a Permissions object for querying/updating permission status.  
- **Navigator.presentation** — Returns Presentation API reference.  
- **Navigator.scheduling** — Returns a Scheduling object for the document.  
- **Navigator.serial** — Returns Serial API object for serial port communication.  
- **Navigator.serviceWorker** — Returns a ServiceWorkerContainer for managing service workers.  
- **Navigator.storage** — Returns StorageManager for persistence permissions and storage estimates.  
- **Navigator.usb** — Returns WebUSB API object.  
- **Navigator.userActivation** — Returns info about current window’s user activation state.  
- **Navigator.userAgent** — Returns user agent string.  
- **Navigator.virtualKeyboard** — Returns VirtualKeyboard API reference.  
- **Navigator.wakeLock** — Returns WakeLock interface for screen wake locks.  
- **Navigator.webdriver** — Indicates if browser is automation-controlled.  
- **Navigator.windowControlsOverlay** — Returns WindowControlsOverlay info for PWAs.  
- **Navigator.xr** — Returns XRSystem, entry to WebXR API for 3D rendering or AR.  

---
