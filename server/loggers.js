import { appendFileSync } from 'node:fs';

/**
 * Helper function to log analytics data
 * TODO: integrate with datastore, for now logging locally
 * @param {*} req 
 */
export const logAnalyticsData = (file, data) => {
  const request = {
    data,
    timestamp: Date.now()
  }
  appendFileSync(file, JSON.stringify(request) + '\n-------------------------------------------------\n');
}


/**
 * Helper function to log bad requests
 * @param {*} req 
 */
export const logBadActor = (req, file) => {
  const request = {
    domain: req.headers.origin,
    userAgent: req.headers['user-agent'],
    timestamp: Date.now()
  }
  appendFileSync(file, JSON.stringify(request) + '\n-------------------------------------------------\n');
}
