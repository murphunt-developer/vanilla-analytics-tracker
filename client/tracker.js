const MOBILE = 'mobile';
const DESKTOP = 'desktop';
const ROBOT = 'robot';
const HUMAN = 'human';

// TODO: update to real endpoint
const AJAX_ENDPOINT = 'https://localhost:8444/collect';

let analyticsData = {
  origin: location.origin, // page sending data
  fcp: undefined, // first contentful paint
  lcp: undefined, // largest contentful paint
  ttfb: undefined, // time to first byte
  inp: { // interaction to next paint
    name: undefined,
    duration: undefined,
    startTime: undefined,
  },
  cls: undefined, // cumulative layout shift
  lt: [], // long tasks
  device: undefined,
  userType: undefined,
};

const perfObs = (type, cb) => {
  try {
    new PerformanceObserver((list) => list.getEntries().forEach(cb))
      .observe({ type, buffered: true });
  } catch (e) {
    console.warn(`Issue setting up ${type} observer`);
  }
};

let dataSent = false;
// setup performance observers
initializeLcpObserver();
addTtfbMetric();
perfObs('paint', (e) => {
  if (e.name === 'first-contentful-paint') {
    analyticsData.fcp = e.startTime;
  }
});
perfObs('event', (e) => {
  if (e.duration > (analyticsData?.inp?.duration || 0)) {
    analyticsData.inp.duration = e.duration;
    analyticsData.inp.name = e.name;
    analyticsData.inp.startTime = e.startTime;
  }
});
perfObs('layout-shift', (e) => {
  if (!e.hadRecentInput) analyticsData.cls = (analyticsData.cls || 0) + e.value;
});
perfObs('longtask', (e) => {
  let data = {
    name: e.name,
    startTime: e.startTime,
    duration: e.duration,
  }
  const attributionData = aggregateAttributions(e.attribution);
  if (attributionData) {
    data.attributionData = attributionData;
  }

  analyticsData.lt.push(data);
});

analyticsData.device = isMobileDevice() ? MOBILE : DESKTOP;
analyticsData.userType = isRobot() ? ROBOT : HUMAN;

/**
 * Send analytic data to server to be recorded
 */
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden' && !dataSent) {
    const success = navigator.sendBeacon(
      AJAX_ENDPOINT, 
      JSON.stringify(analyticsData)
    );
    if (success) {
      dataSent = true;
      console.log("Analytics data sent!")
    }
  }
});

/**
 * Returns true if request is from mobile device, false otherwise
 */
function isMobileDevice() {
  console.log(navigator.userAgent);
  if (navigator.userAgentData && 'mobile' in navigator.userAgentData)
    return navigator.userAgentData.mobile;

  return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

/**
 * Returns true if request is likely from a robot, false otherwise
 * 
 * bot: googlebot, bingbot, etc. => search indexing
 * spider: baiduspider, sogou spider, etc. => crawling
 * crawl: various scraping => scraping/indexing
 * slurp: yahoo!'s crawler => legacy crawler
 * mediapartners: Google's AdSense crawler used for ad content analysis
 * 
 */
function isRobot() {
  if (navigator.userAgentData) {
    const brands = navigator.userAgentData.brands
    .map(b => b.brand.toLowerCase())
    .join(' ');
    return /bot|crawl|spider/.test(brands);
  }
  return /bot|crawl|spider|slurp|mediapartners/i.test(navigator.userAgent);

};

/**
 * Sets up a Performance Observer for Largest Contentful Paint (LCP). Pulls the 
 * last entry in the 'largest-contentful-paint' entries.
 */
function initializeLcpObserver() {
  try {
    new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
      analyticsData.lcp = lastEntry.startTime;
    }).observe({ type: 'largest-contentful-paint', buffered: true });
  } catch (e) {
    console.warn('LCP observer not supported:', e)
  }
};

function addTtfbMetric() {
  try {
    const nav = performance.getEntriesByType('navigation')[0];
    analyticsData.ttfb = nav.responseStart;
  } catch (e) {
    console.warn(
      `Issue pulling time to first byte metric`
    );
  }
}

function aggregateAttributions(attrs) {
  if (attrs?.length > 0) {
    const longTaskdata = [];
    attrs.forEach(a => {
      const src = a.containerSrc;
      const type = a.containerType;
      const name = a.containerName;
      const id = a.containerId;
      if (id || name || src) {
        longTaskdata.push({
          id: id ?? undefined,
          name: name ?? undefined,
          src: src ?? undefined,
          type: type ?? undefined,
        });
      }
    });
    return longTaskdata;
  }
  return undefined;
}

