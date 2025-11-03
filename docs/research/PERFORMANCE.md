## **Performance API**  
[MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Performance)

### **Instance Properties**

- **Performance.eventCounts** — An EventsCount map containing the numbe of events which have been dispatched per event type
- **Performance.navigation** — A legacy PerformanceNavigation object that provides useful context about the operations included in the times listed in `timing`, including whether the page was a load or a refresh, how many redirections occurred, and so forth.
- **Performance.timing** — A legacy PerformanceTiming object containing latency-related performance information
- **Performance.memory** — A non-standard extension added in Chrome, this property provides an object with basic memory usage information. DO NOT USE.
- **Performance.timeOrigin** — Returns the high resolution timestamp of the start time of the performance measurement

### **Instance Methods**:

- **Performance.clearMarks()** — Removes the given mark from the browser's performance entry buffer
- **Performance.clearMeasures()** — Removes the given measure from the browser's performance entry buffer
- **Performance.clearResourceTimings()** — Removes all the performance entries with an entryType of "resource" from the browser's performance data buffer
- **Performance.getEntries()** — Returns a list of PerformanceEntry objects based on the given filter
- **Performance.getEntriesByName()** — returns a list of PerformanceEntry objects based on the given name and entry type
- **Performance.getEntriesByType()** — returns a list of PerformanceEntry objects on the given entry type 
- **Performance.mark()** — creates a timestamp in the browser's performance entry buffer with the given name
- **Performance.measure()** — creates a named timestamp in the browser's performance entry buffer between two specified marks (known as the start mark and end mark, respectively)
- **Performance.measureUserAgentSpecificMemory()** — estimates the memory usage of a web application including all its iframes and workers
- **Performance.now()** — returns a DOMHighResTimeStamp representing the number of milliseconds elapsed since a reference instant
- **Performance.setResourceTimingBufferSize()** — Sets the browser's resource timing buffer size to the specified number of "resource" type PeformanceEntry objects
- **Performance.toJSON()** — Returns a JSON representation of the Performance object

### **Events**:
- `resourcetimingbufferfull` — find when the browser's resource timing buffer is full


### Collecting Data:

#### Element Timing
##### **Example: Element Timing Usage**
The below code uses `elementtiming` (NOTE: not usable on firefox or safari) attribute to indicate that an element is flagged for tracking by PerformanceObserver objects using `element` type.

```html
<img src="image.jpg" elementtiming="big-image" />
<p elementtiming="text" id="text-id">text here</p>
```
```js
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    console.log(entry);
  });
});
observer.observe({ type: "element", buffered: true });
```


#### User Timing
- User Timing is part of the Performance API and allows you to measure the performance of applications using high-precision timestamps that are part of the browser's performance timeline
- two types of timing performance entries:
  - PerformanceMark: marks that you can name and add at any location in an application
  - PerformanceMeasure: time measuremeants between two marks
- `Performance.measure()` is used to create a PerformanceMeasure object, it accepts a name parameter, used to identify the measure, and two marks, start and end that it should measure between.


##### **Example: User Timing Usage**
- Markers
```js
// Place at a location in the code that starts login
performance.mark("login-started");

// Place at a location in the code that finishes login
performance.mark("login-finished");

// you can also pass an optional object with information in `detail` property
// you can also specify the startTime as well
performance.mark("login-started", {
  startTime: 12.5,
  detail: { htmlElement: myElement.id },
});

// measure duration between markers
const loginMeasure = performance.measure(
  "login-duration", // measure name
  "login-started",  // start mark
  "login-finished", // end mark
);

console.log(loginMeasure.duration); // duration is in ms


// you can also use the event on event listener to set the start time in order to measure an 
// event click
loginButton.addEventListener("click", (clickEvent) => {
  fetch(loginURL).then((data) => {
    renderLoggedInUser(data);

    const marker = performance.mark("login-finished");

    performance.measure("login-click", {
      detail: { htmlElement: myElement.id },
      start: clickEvent.timeStamp,
      end: marker.startTime,
    });
  });
});
```

##### Observing performance Measures
- The preferred way to get notified about your custom performance measures is the use of PerformanceObserver objects
- they allow you to subscribe passively to performance marks and measures as they happen

```js
function perfObserver(list, observer) {
  list.getEntries().forEach((entry) => {
    if (entry.entryType === 'mark') {
      console.log(`${entry.name}'s startTime: ${entry.startTime}`);
    }
    if (entry.entryType === 'measure') {
      console.log(`${entry.name}'s duration: ${entry.duration}`);
    }
  })
}
// pass callback to PerformanceObserver constructor to be called when performance 
// entry is recorded for one of the specified `entryTypes`
const observer = new PerformanceObserver(perfObserver);
observer.observe({ entryTypes: ['measure', 'mark'] });
```

##### Retrieving markers and measures
- The Performance interface provides 3 methods to retrieve performance marks and measures

`performance.getEntries()`

```js
const entries = performance.getEntries();
entries.forEach((entry) => {
  if (entry.entryType === 'mark') {
    console.log(`${entry.name}'s startTime: ${entry.startTime}`);
  }
  if (entry.entryType === 'measure') {
    console.log(`${entry.name}'s duration: ${entry.duration}`);
  }
})
```

`performance.getEntriesByType(entryType)`

```js
const marks = performance.getEntriesByType('mark');
marks.forEach((entry) => {
  console.log(`${entry.name}'s startTime: ${entry.startTime}`);
})

const measures = performance.getEntriesByType('measure');
measures.forEach((entry) => {
  console.log(`${entry.name}'s duration: ${entry.duration}`);
});
```

`performance.getEntriesByName(name, entryType)`

```js
const debugMarks = performance.getEntriesByName('debug-mark', 'mark');
debugMarks.forEach((entry) => {
  console.log(`${entry.name}'s startTime: ${entry.startTime}`);
})

```

##### Removing markers and measures
- the clean up marks/measures
  - `performance.clearMarks()`
  - `performance.clearMeasures()`

```js
// clear all marks
performance.clearMarks();

// remove marker with name 'myMarker'
performance.clearMarks('myMarker');

// clear all measures
performance.clearMeasures();

// remove measure with name 'myMeasure'
performance.clearMeasures('myMeasure');

```


#### Server Timing
- enables you to measure time taken for application-defined server-side operations
- must send the `Server-Timing` HTTP header

##### Sending server metrics
- `Server-Timing` HTTP header is used to surface any backend server timing metrics. For example, you may want to send database read/write operation times, CPU time, and file system access
- You can send metrics with or w/out values
- metrics can optionally contain a description
  - advised to keep names, descriptions,data as short as possible to minimize HTTP overhead
- examples

```http
// Single metric w/out value
Server-Timing: missedCache

// Single metric with value
Server-Timing: cpu;dur=2.4

// Single metric with description and value
Server-Timing: cache;desc="Cache Read";dur=23.2

// Two metrics with values
Server-Timing: db;dur=53, app;dur=47.2

// Server-Timing as trailer
Trailer: Server-Timing
--- response body ---
Server-Timing: total;dur=123.4
```

- There is no clock synchronization between server, client, and intermediate proxies

##### Retrieving server metrics
- Server timing metrics usually appear in developer tools of browser, but they're also stored as `PerformanceServerTiming` performance entries that you can access like other performance data
- There is no "server-timing" entries on their own, the `PerformanceServerTiming` objects are observable from "navigation" and "resource" performance entities
- You access the server metrics `PerformanceResourceTiming.serverTiming` property which is an array of `PerformanceServerTiming` objects

- Given a `Server-Timing` like this:
```http
Server-Timing: cache;desc="Cache Read";dur=23.2,db;dur=53,app;dur=47.2
```
- A `PerformanceObserver` can log the entities on the client side with the following code:

```js
const observer = new PerformanceObserver((list) => {
  list.getEntities().forEach((entry) => {
    entry.serverTiming.forEach((serverEntry) => {
      console.log(`${serverEntry.name} (${serverEntry.description}) duration: ${serverEntry.duration}`);
    })
    // logs "cache (Cache Read) duration: 23.2"
    // logs "db () duration: 53"
    // logs "app () duration: 47.2"
  });
});

['navigation', 'resource'].forEach((type) => {
  observer.observe({ type, buffered: true })
})
```

##### Privacy & security considerations
- `Server-Timing` header may expose potentially sensitve application and infrastructure information
- You should control when the metrics are returned and to whom on the server side
  - i.e. show metrics for authenticated users but not for public
- `PerformanceServerTiming` interface is restriced to same origin, but you can ues `Timing-Allow-Origin` header to specify the domains that are allowed to access the server metrics

### Performance data structure
- You can collect performance data in both `Window` and `Worker` global contexts
- Use `performance.timeOrigin` to synchronize time origins between contexts

#### Performance entries
- A single recorded performance data point is called a performance entry and is represented by an instance of `PerformanceEntry` interface
- `PerformanceEntry` has an `entryType` property which is a string describing the type of entry
  - `'element'`: records how long it takes an element to load and render
  - `'event'`: records how long it took the browser to start running an event handler in response to its trigger, and how long the event handler took to run. Used to measure [Interaction to Next Paint](https://developer.mozilla.org/en-US/docs/Glossary/Interaction_to_next_paint)
  - `'first-input'`: records the [First Input Delay](https://developer.mozilla.org/en-US/docs/Glossary/First_input_delay)
  - `'largest-contentful-paint'`: records the largest paint during page load
  - `'layout-shift'`: records a metric representing how much the page layout has shifted in each animation frame
  - `'longtask'`: records tasks that took 50ms or more
  - `'mark'`: records a custom timestamp made by the developer
  - `'measure'`: records a custom measurement between two timestamps made by the developer
  - `'navigation'`: records the metrics associated with navigating to and initial load of the page
  - `'paint'`: records key moments of rendering during page load
  - `'resource'`: records how long it took the browser to fetch a resource
  - `'visibility-state'`: records the timing of page visibility state changes, i.e. when a tab changes from the foreground to the background or vice versa

#### Performance entry subclasses
- Particular entry types typically include extra type-specific data:
  - `'resource'` type:
    - captures the time at which DNS lookup started and ended
    - is represented by an instance of `PerformanceResourceTiming` which inherts `PerformanceEntry` and adds properties to record DNS lookup timestamps
- The subclasses of `PerformanceEntry` also define semantics of the properties belonging to `PerformanceEntry`
  - `PerformanceEntry` has a `name` property whose meaning depends on the subclass
- These interfaces inherit from `PerformanceEntry`:
  - [LargestContentfulPaint](https://developer.mozilla.org/en-US/docs/Web/API/LargestContentfulPaint)
  - [LayoutShift](https://developer.mozilla.org/en-US/docs/Web/API/LayoutShift)
  - [PerformanceElementTiming](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceElementTiming)
  - [PerformanceEventTiming](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceEventTiming)
  - [PerformanceLongTaskTiming](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceLongTaskTiming)
  - [PerformanceMark](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceMark)
  - [PerformanceMeasure](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceMeasure)
  - [PerformancePaintTiming](https://developer.mozilla.org/en-US/docs/Web/API/PerformancePaintTiming)
  - [PerformanceResourceTiming](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming)
    - [PerformanceNavigationTiming](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceNavigationTiming)
  - [TaskAttributeTiming](https://developer.mozilla.org/en-US/docs/Web/API/TaskAttributionTiming)
  - [VisibilityStateEntry](https://developer.mozilla.org/en-US/docs/Web/API/VisibilityStateEntry)

### Accessing data
- You can access performance entries in one of two ways:
  1. `PerformanceObserver` interface, which is constructed with a callback to be called when the particular performance entries are recorded
    - You then call its `observe` method, passing in the types to observe and using the `buffered` option to retrieve entries that occured before observation

```js

function logEventDuration(entries) {
  const events = entries.getEntriesByType('event');
  for (const event of events) {
    console.log(`Event handler took: ${event.processingEnd - event.processingStart} milliseconds`);
  }
}

const observer = new PerformanceObserver(logEventDuration);
observer.observe({ type: 'event', buffered: true});
```
  2. `Performance.getEntries()`, `Performance.getEntriesByName()`, `Performance.getEntriesByType()` are methods to retrieve all performance entries for a page, or entries matching a given name or type

```js
const events = performance.getEntriesByType('event');
for (const event of events) {
  console.log(`Event handler took: ${event.processingEnd - event.processingStart} milliseconds`);
}
```

- The `PerformanceObserver` option is preferred because:
  - `getEntries*` methods will always return all relevant entries since the start of the timeline, so if you call it twice, you will see the same entries again and will need to filter out entries you already have seen
  - Observer notifications are delivered asynchronously, so the browser can dispatch them during idle time to minimize their performance impact
  - not all entry types work with `getEntries*` methods

### Managing buffer sizes

- There is a buffer limit for performance entries for each global object
- Buffer Limits:

| entryType identifier | Interface | Max num buffer entries |
|---|---|---|
| 'mark' | [PerformanceMark](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceMark) | Infinite |
| 'measure' | [PerformanceMeasure](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceMeasure) | Infinite |
| 'navigation' | [PerformanceNavigationTiming](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceNavigationTiming) | Infinite |
| 'resource' | [PerformanceResourceTiming](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming) | 250 (adjustable) |
| 'longtask' | [PerformanceLongTaskTiming](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceLongTaskTiming) | 200 |
| 'paint' | [PerformancePaintTiming](https://developer.mozilla.org/en-US/docs/Web/API/PerformancePaintTiming) | 2 (there won't be more) |
| 'element' | [PerformanceElementTiming](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceElementTiming) | 150 |
| 'event' | [PerformanceEventTiming](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceEventTiming) | 150 |
| 'first-input' | [PerformanceEventTiming](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceEventTiming) | 1 (there won't be more) |
| 'layout-shift' | [LayoutShift](https://developer.mozilla.org/en-US/docs/Web/API/LayoutShift) | 150 |
| 'largest-contentful-paint' | [LargestContentfulPaint](https://developer.mozilla.org/en-US/docs/Web/API/LargestContentfulPaint) | 150 |
| 'visibility-state' | [VisibilityStateEntity](https://developer.mozilla.org/en-US/docs/Web/API/VisibilityStateEntry) | 50 |

- The `PerformanceObserver` callback has 3 available parameters: ([link](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver/PerformanceObserver))
  - `entries`: list of performance entries
  - `observer`: the observer object that is receiving the above entries
  - `options`:
    - `droppedEntriesCount`: number of entries which could not be recorded because the Performance object's internal buffer was full
      - This is only provided the first time the observer calls the callback, when the buffered entries are replayed. Once the observer starts making future observations, it no longer needs to use the buffer. After the first time, `options` will be `{}`
- `PerformanceObserver.takeRecords()` returns the current list of performance entries stored in the performance observer while also emptying it out

### JSON data
- All performance entries have `toJSON()` serializer which returns a JSON representation of the entry.

```js
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    console.log(entry.toJSON());
  });
});

observer.observer({ type: 'event', buffered: true });

// logged object
{
  "name": "dragover",
  "entryType": "event",
  "startTime": 67090751.599999905,
  "duration": 128,
  "processingStart": 67090751.70000005,
  "processingEnd": 67090751.900000095,
  "cancelable": true
}
```


## PerformancePaintTiming
[MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/PerformancePaintTiming)

- Provides timing information about "paint" (aka "render") operations during a web page construction. "paint" refers to conversion of the render tree to on-screen pixels
- Two key paint moments:
  - First Paint (FP): time when anything is rendered. note that the marking of the first paint is optional, not all user agents support it
  - First Contentful Paint (FCP): time when the first bit of DOM text or image content is rendered
- A third key moment is provided by [LargestContentfulPaint](https://developer.mozilla.org/en-US/docs/Web/API/LargestContentfulPaint) API:
  - LargestContentfulPaint (LCP): render time of the largest image or text block visible within the viewport, recorded from when the page first begins to load

### Instance Properties:
- `PerformanceEntry.entryType`: returns `'paint'`
- `PerformancEntry.name`: returns either `'first-paint'` or `'first-contentful-paint'`
- `PerformanceEntry.startTime`: returns the timestamp when the paint occured
- `PerformanceEntry.duration`: returns 0

### Instance Methods:
- none

### Examples:
#### Get paint timings:

```js
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    console.log(`The time to ${entry.name} was ${entry.startTime} milliseconds.`)
  });
});

observer.observe({ type: 'paint', buffered: true });

// largest-contentful-paint
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    console.log(`The time to ${entry.name} was ${entry.startTime} milliseconds.`)
  });
});

observer.observe({ type: 'largest-contentful-paint', buffered: true });
```


