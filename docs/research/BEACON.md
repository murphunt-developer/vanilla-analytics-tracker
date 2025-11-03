## **Beacon API**  
[MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Beacon_API)

Used to send asynchronous, non-blocking requests to a web server (typically analytics).  
Unlike Fetch or XHR, the browser guarantees beacon requests before page unload.

### **Method: `navigator.sendBeacon()`**

- **Parameters:**
  - `url` — Destination URL.  
  - `data` *(optional)* — `ArrayBuffer`, `Blob`, `FormData`, `URLSearchParams`, etc.  
- **Returns:**  
  - `true` if queued successfully, `false` otherwise.

### **Example Usage**

```js
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    navigator.sendBeacon('/log', analyticsData);
  }
});

// Note:
// 'unload' and 'beforeunload' are incompatible with bfcache.
// 'pagehide' can be used as a fallback but is less reliable.
```
