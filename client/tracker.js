const MOBILE = 'mobile';
const DESKTOP = 'desktop';
const ROBOT = 'robot';
const HUMAN = 'human';

let analyticsData = {
  fcp: undefined,
  lcp: undefined,
  device: undefined,
  userType: undefined,
};

// setup performance observers
initializeLcpObserver();
initializeFcpObserver();

analyticsData.device = isMobileDevice() ? MOBILE : DESKTOP;
analyticsData.userType = isRobot() ? ROBOT : HUMAN;

/**
 * Send analytic data to server to be recorded
 */
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    navigator.sendBeacon('/murphunt/analytic-logger', JSON.stringify(analyticsData));
  }
});


/**
 * Returns true if request is from mobile device, false otherwise
 */
function isMobileDevice() {
  if (navigator.userAgentData) {
    return navigator.userAgentData.mobile;
  }
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
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
 * Returns the data for Largest Contentful Paint (LCP)
 */
function initializeLcpObserver() {
  try {
    const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1]; // Use the latest LCP candidate
    console.log(`The time to ${lastEntry.name} was ${lastEntry.startTime} milliseconds.`);
      analyticsData.lcp = lastEntry.startTime;
    });
    observer.observe({ type: 'largest-contentful-paint', buffered: true });
  } catch (e) {
    console.warn('LCP observer not supported:', e)
  }
};
/**
 * Returns the data for First Contentful Paint (FCP)
 */
function initializeFcpObserver() {
  try {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.name === 'first-contentful-paint') {
          console.log(`The time to LCP was ${entry.startTime} milliseconds.`);
          analyticsData.fcp = entry.startTime;
        }
      });
    });
    observer.observe({ type: 'paint', buffered: true });
  } catch (e) {
    console.warn('FCP observer not supported:', e)
  }
};

