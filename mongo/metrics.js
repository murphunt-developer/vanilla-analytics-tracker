import { getDb } from './db.js';

export async function getFcpMetrics({ 
  field, 
  value, 
  dimensions = {} 
}) {
  const db = getDb();

  // query single field
  const events = await db.collection('events').find({
    'metricName': 'FirstContentfulPaint'
  }).toArray();

  // query nested fields
  const docs = await db.collection('events').find({
    'dimensions.hostname': 'www.amazon.com'
  }).toArray();

  // how to query if field exists
  db.events.find({
    'dimensions.path': { $exists: true }
  })
  
}

export async function writeMetric({ 
  metricName, 
  value, 
  dimensions = {} 
}) {
  const db = getDb();
  const collection = db.collection('metrics');

  return collection.insertOne({
    metricName,
    value,
    dimensions,
    timestamp: new Date(), // TODO: might be better to use client timestamp for accuracy
  });
}

export async function emitAnalyticsData(data) {
    const parsedData = JSON.parse(data);
    const hostname = parsedData.hostname ?? 'unknown'; // page sending data
    const pathname = parsedData.pathname ?? 'unknown'; // page sending data
    const fcp = parsedData.fcp ?? undefined;
    const lcp = parsedData.lcp ?? undefined;
    const ttfb = parsedData.ttfb ?? undefined;
    const cls = parsedData.cls ?? undefined;
    // TODO:
    // const inp = data.inp ?? 'unknown'; // { name, startTime, duration }
    // const lt = data.lt ?? 'unknown'; // list of long tasks
    const device = parsedData.device ?? 'unknown'; // human / robot / unknown
    const userType = parsedData.userType ?? 'unknown'; // robot / human / unknown
    if (fcp) {
      await writeMetric({ 
        metricName: 'FirstContentfulPaint', 
        value: fcp, 
        dimensions: { hostname, pathname, device, userType }
      })
    };
    if (lcp) {
      await writeMetric({
        metricName: 'LargestContentfulPaint', 
        value: lcp, 
        dimensions: { hostname, pathname, device, userType }
      })
    }
    if (ttfb) {
      await writeMetric({
        metricName: 'TimeToFirstByte', 
        value: ttfb, 
        dimensions: { hostname, pathname, device, userType }
      })
    }
    if (cls) {
      await writeMetric({
        metricName: 'CumulativeLayoutShift', 
        value: cls, 
        dimensions: { hostname, pathname, device, userType }
      })
    }

    // if (lt) await sendMetric(origin + ':LongTask:' + device + ':' + userType, value);
    // if (inp) await sendMetric(origin + ':InterationToNextPaint:' + device + ':' + userType, value);
}
