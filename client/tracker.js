/* 
Learning `navigator` and `window` APIs:

navigator: https://developer.mozilla.org/en-US/docs/Web/API/Navigator
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

  


*/