import { Method, Router } from 'tiny-request-router'
import CloudflareWorkerGlobalScope from 'types-cloudflare-worker'

import { handle, EventContext } from './handler'
declare var self: CloudflareWorkerGlobalScope // eslint-disable-line @typescript-eslint/no-unused-vars

const router = new Router()

router
  // Redirect handler
  .all('/:slug/(.*)', (ctx: EventContext) => handle('redirect', ctx))
  .all('/:slug', (ctx: EventContext) => handle('redirect', ctx))
  // Homepage handler
  .get('/', (ctx: EventContext) => handle('home', ctx))
  // Shorten form handler
  .post('/', (ctx: EventContext) => handle('shorten', ctx))

// Main entry point in workers
addEventListener('fetch', event => {
  const request = event.request
  const { pathname } = new URL(request.url)

  const match = router.match(request.method as Method, pathname)
  if (match != null) {
    event.respondWith(match.handler({ event, match, request }))
  }
})
