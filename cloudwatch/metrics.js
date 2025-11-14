import { PutMetricDataCommand } from '@aws-sdk/client-cloudwatch';
import { cw } from './aws.js';

export async function sendMetric(name, value = 1) {
  await cw.send(
    new PutMetricDataCommand({
      Namespace: 'MurphuntAnalytics',
      MetricData: [
        {
          MetricName: name,
          Timestamp: new Date(),
          Value: value,
          Unit: 'Count',
        },
      ],
    })
  );
}

export async function emitAnalyticsData(data) {
    const hostname = data.hostname ?? 'unknown'; // page sending data
    const pathname = data.pathname ?? 'unknown'; // page sending data
    const client = buildClientName(hostname, pathname);
    const fcp = data.fcp ?? undefined;
    const lcp = data.lcp ?? undefined;
    const ttfb = data.ttfb ?? undefined;
    const cls = data.cls ?? undefined;
    // TODO:
    // const inp = data.inp ?? 'unknown'; // { name, startTime, duration }
    // const lt = data.lt ?? 'unknown'; // list of long tasks
    const device = data.device ?? 'unknown'; // human / robot / unknown
    const userType = data.userType ?? 'unknown'; // robot / human / unknown
    if (fcp) await sendMetric(client + ':FirstContentfulPaint:' + device + ':' + userType, value);
    if (lcp) await sendMetric(client + ':LargestContentfulPaint:' + device + ':' + userType, value);
    if (ttfb) await sendMetric(client + ':TimeToFirstByte:' + device + ':' + userType, value);
    if (cls) await sendMetric(client + ':CumulativeLayoutShift:' + device + ':' + userType, value);

    // if (lt) await sendMetric(origin + ':LongTask:' + device + ':' + userType, value);
    // if (inp) await sendMetric(origin + ':InterationToNextPaint:' + device + ':' + userType, value);
}

function buildClientName(hostname, pathname) {
  if (hostname && pathname) {
    return hostname + pathname;
  } else if (hostname) {
    return hostname;
  } else {
    return 'unknown';
  }
}



