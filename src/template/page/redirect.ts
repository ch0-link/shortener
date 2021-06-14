import base from '../components/base'
import card from '../components/card'

import * as cheerio from 'cheerio'
const $ = cheerio.default

export function body (url: URL): string {
  return $.html(
    base(
      card(
        $('<h1 class="text-white text-xl font-bold space-x-2 border-b-2"><span>Redirecting…</span></h2>')
          .add($(`<div class="space-y-4">
              <p>If your browser is not redirecting automatically, click <a rel="nofollow" href="${url.href}" class="underline">here</a>.</p>
            </div>`))
      )
    )
  )
}

export function head (url: URL): string {
  return `<title>${url.href}</title>
          <meta http-equiv="refresh" content="3; url=${url.href}">`
}
