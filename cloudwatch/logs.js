import {
  CreateLogGroupCommand,
  CreateLogStreamCommand,
  PutLogEventsCommand,
  DescribeLogStreamsCommand,
} from '@aws-sdk/client-cloudwatch-logs';
import { cwLogs } from './aws.js';

const LOG_GROUP = '/murphunt/analytics';
const LOG_STREAM = '/analytics/events';

async function ensureLogStream() {
  try {
    // TODO: update log group per client
    await cwLogs.send(new CreateLogGroupCommand({ logGroupName: LOG_GROUP }));
  } catch (e) {
    if (e.name !== 'ResourceAlreadyExistsException') console.error(e);
  }

  try {
    await cwLogs.send(
      new CreateLogStreamCommand({
        logGroupName: LOG_GROUP,
        logStreamName: LOG_STREAM,
      })
    );
  } catch (e) {
    if (e.name !== 'ResourceAlreadyExistsException') console.error(e);
  }
}

let sequenceToken = null;

async function sendLog(message) {
  await ensureLogStream();

  // Get latest token if needed
  if (!sequenceToken) {
    const desc = await cwLogs.send(
      new DescribeLogStreamsCommand({
        logGroupName: LOG_GROUP,
        logStreamNamePrefix: LOG_STREAM,
      })
    );

    const stream = desc.logStreams?.[0];
    sequenceToken = stream.uploadSequenceToken || null;
  }

  const params = {
    logGroupName: LOG_GROUP,
    logStreamName: LOG_STREAM,
    logEvents: [
      {
        message: typeof message === 'string' ? message : JSON.stringify(message),
        timestamp: Date.now(),
      },
    ],
    sequenceToken,
  };

  const resp = await cwLogs.send(new PutLogEventsCommand(params));
  sequenceToken = resp.nextSequenceToken;
}

export { sendLog };
