# Vanilla Analytics Tracker - Lesson Plan

## Phase 1: Foundations
- Learn window and navigator APIs
- Log page views to console
- Send data to server using fetch or image beacon

## Phase 2: Server Setup
- Build a Node.js HTTP server
- Create `/collect` endpoint
- Store data safely in JSON

## Phase 3: Visualization Dashboard
- Fetch data from `/stats`
- Aggregate data by URL/time
- Render charts with Canvas API or SVG

## Phase 4: Deployment to Hostinger
1. Login to Hostinger and create a Node.js app.
2. Set app root to your project folder.
3. Configure port and environment.
4. Upload files using File Manager or SFTP.
5. Start the Node.js process.
6. Point `murphunt.com` DNS A record to Hostinger server IP.
7. Test E2E by embedding your tracker:
```html
<script src="https://murphunt.com/tracker.js"></script>
```

## Challenges
- Make tracker 1-line embeddable.
- Add event types (clicks, form submissions).