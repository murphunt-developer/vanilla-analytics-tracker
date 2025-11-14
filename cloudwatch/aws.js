import { CloudWatchClient } from '@aws-sdk/client-cloudwatch';
import { CloudWatchLogsClient } from '@aws-sdk/client-cloudwatch-logs';

export const cw = new CloudWatchClient({ region: 'us-west-2' });
export const cwLogs = new CloudWatchLogsClient({ region: 'us-west-2' });

// TODO: configure AWS credentials