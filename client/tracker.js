const MOBILE = 'mobile';
const DESKTOP = 'desktop';
const ROBOT = 'robot';
const HUMAN = 'human';

/* 
Dimensions: 
  - mobile-user
  - desktop-user
  - mobile-bot
  - desktop-bot
Metrics:
  - page hits - H (each request to analytics server would be a request)
  - first-contentfull-paint - FCP
  - largest-contentful-paint - LCP
  - 
*/

/**
 * Send analytic data to server to be recorded
 */
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    navigator.sendBeacon('/murphunt/analytic-logger', buildAnalyticsData());
  }
});


/**
 * Returns the analytical data to be sent via sendBeacon()
 */
const buildAnalyticsData = () => {
  const lcpObserver = getLargestContentfulPaint();
  const fcpObserver = getFirstContentfulPaint();
  return {
    lcp: 'TODO: pull data from observer',
    fcp: 'TODO: pull data from observer',
    device: isMobileDevice() ? MOBILE : DESKTOP,
    userType: isRobot() ? ROBOT : HUMAN,
  };
};


/**
 * Returns true if request is from mobile device, false otherwise
 * TODO: best way to determine mobile device?
 */
const isMobileDevice = () => {};

/**
 * Returns true if request is from robot, false otherwise
 * TODO: best way to determine robot status? user-agent?
 */
const isRobot = () => {};

/**
 * Returns the data for Largest Contentful Paint (LCP)
 */
const getLargestContentfulPaint = () => {
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      console.log(`The time to ${entry.name} was ${entry.startTime} milliseconds.`)
    });
  });

  observer.observe({ type: 'largest-contentful-paint', buffered: true });
  return observer;
};
/**
 * Returns the data for First Contentful Paint (FCP)
 */
const getFirstContentfulPaint = () => {
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.name === 'first-contentful-paint') {
        console.log(`The time to ${entry.name} was ${entry.startTime} milliseconds.`)
      }
    });
  });

  observer.observe({ type: 'paint', buffered: true });
  return observer;
};

