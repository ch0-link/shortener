import CloudflareWorkerGlobalScope, { CloudflareWorkerKV } from 'types-cloudflare-worker'

import contentType from 'content-type'

import { EventContext } from '../'
import { htmlHeaders } from '../page'
import { sanitizeHttpUrl, sanitizeSlug } from '../../utils/sanitize'

import render from '../../utils/render'

import { nanoid } from 'nanoid'

declare var self: CloudflareWorkerGlobalScope // eslint-disable-line @typescript-eslint/no-unused-vars

declare const links: CloudflareWorkerKV

export default async (ctx: EventContext): Promise<Response> => {
  var data: { link: URL, slug: string }
  try {
    switch (
      contentType.parse(
        ctx.request.headers.get('Content-Type') ??
          'application/x-www-form-urlencoded')
        .type
    ) {
      case 'application/json': {
        const json = await ctx.request.json()
        const link = sanitizeHttpUrl(json.link as string)
        const slug = sanitizeSlug(json.slug as string)
        data = { link: link, slug: slug }
        break
      }
      default: {
        const form = await ctx.request.formData()
        const link = sanitizeHttpUrl(form.get('link') as string)
        const slug = sanitizeSlug(form.get('slug') as string)
        data = { link: link, slug: slug }
      }
    }
  } catch (e) {
    return new Response(render('invalid', e.message), { status: 400, headers: htmlHeaders })
  }

  const key = nanoid()

  try {
    await links.put(data.slug, JSON.stringify({ href: data.link.href, key: key }))
  } catch (e) {
    return new Response(render('error', e.message), { status: 500, headers: htmlHeaders })
  }

  const domain = new URL(ctx.request.url)
  domain.pathname = '/'

  return new Response(render('result', { data, domain }), { headers: htmlHeaders })
}
