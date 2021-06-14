import { CloudflareWorkerKV } from 'types-cloudflare-worker'

import { EventContext, handle } from '..'
import render from '../../utils/render'
import { htmlHeaders } from '.'

declare const links: CloudflareWorkerKV
declare const DIRECT_DOMAIN: string

function canTrack (ctx: EventContext): boolean {
  return new URL(ctx.request.url).hostname !== DIRECT_DOMAIN && ctx.request.method === 'GET'
}

function track (url: URL): Response {
  return new Response(render('redirect', url), { headers: htmlHeaders })
}

function direct (url: URL): Response {
  return new Response(null, { status: 301, headers: new Headers({ Location: url.href }) })
}

export default async function redirect (ctx: EventContext): Promise<Response> {
  const res = await links.get(ctx.match.params.slug, 'json')
  if (res != null) {
    const url = new URL(ctx.match.params[0] ?? '', res.href)
    for (const [key, val] of new URL(ctx.request.url).searchParams.entries()) {
      url.searchParams.append(key, val)
    }
    return canTrack(ctx) ? track(url) : direct(url)
  } else {
    return await handle('not-found', ctx)
  }
}
