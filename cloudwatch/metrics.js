import { PutMetricDataCommand } from '@aws-sdk/client-cloudwatch';
import { cw } from './aws.js';

export async function sendMetric(name, value = 1, dimensions = []) {
  await cw.send(
    new PutMetricDataCommand({
      Namespace: 'MurphuntAnalytics',
      MetricData: [
        {
          MetricName: name,
          Dimensions: dimensions,
          Timestamp: new Date(),
          Value: value,
          Unit: 'Count',
        },
      ],
    })
  );
}

export async function emitAnalyticsData(data) {
    const parsedData = JSON.parse(data);
    const hostname = parsedData.hostname ?? 'unknown'; // page sending data
    const pathname = parsedData.pathname ?? 'unknown'; // page sending data
    const client = buildClientName(hostname, pathname);
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
      await sendMetric('FirstContentfulPaint', fcp, [
        { Name: 'Client', Value: client },
        { Name: 'Device', Value: device },
        { Name: 'UserType', Value: userType },
      ])
    };
    if (lcp) {
      await sendMetric('LargestContentfulPaint', lcp, [
        { Name: 'Client', Value: client },
        { Name: 'Device', Value: device },
        { Name: 'UserType', Value: userType },
      ]);
    }
    if (ttfb) {
      await sendMetric('TimeToFirstByte', ttfb, [
        { Name: 'Client', Value: client },
        { Name: 'Device', Value: device },
        { Name: 'UserType', Value: userType },
      ]);
    }
    if (cls) {
      await sendMetric('CumulativeLayoutShift', cls, [
        { Name: 'Client', Value: client },
        { Name: 'Device', Value: device },
        { Name: 'UserType', Value: userType },
      ]);
    }

    // if (lt) await sendMetric(origin + ':LongTask:' + device + ':' + userType, value);
    // if (inp) await sendMetric(origin + ':InterationToNextPaint:' + device + ':' + userType, value);
}

function buildClientName(hostname, pathname) {
  if (hostname && pathname && pathname !== '/') {
    return hostname + pathname;
  } else if (hostname) {
    return hostname;
  } else {
    return 'unknown';
  }
}



