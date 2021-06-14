import { icons } from 'feather-icons'

import header from '../components/header'
import base from '../components/base'
import card from '../components/card'

import * as cheerio from 'cheerio'
const $ = cheerio.default

export function body (slug: string): string {
  return $.html(
    base(
      header().add(
        card(
          $('<h1 class="text-red-500 text-xl font-bold space-x-2 border-b-2"><span>Not Found</span></h2>').prepend(
            $(icons.x.toSvg({
              'stroke-linecap': 'butt',
              'stroke-linejoin': 'butt',
              height: 32,
              width: 32
            })).addClass('inline-block')
          ).add($(`<div class="space-y-4">
            <p>The requested slug <code class="italic">${slug}</code> was not found on this server.</p>
              <div class="flex flex-col space-y-2 sm:(space(y-0 x-2) flex-row)">
                <a class="bg-white text-black border-white border-2 p-2" href="https://status.mcha.cloud/">Status ↗</a>
                <a class="bg-black text-white border-white border-2 p-2" href="/">Home ↗</a>
                <a class="bg-black text-white border-white border-2 p-2" onclick="window.$chatwoot.toggle()" href="#" data-action="support">Support ↗</a>
                <noscript>
                  <style>
                    a[data-action='support'] {
                      opacity: .6;
                      cursor: not-allowed;
                      text-decoration: line-through;
                    }
        
                    a[data-action='support']::after {
                      content: '\\00a0 (✕ JS)';
                      vertical-align: bottom;8
                    }
                  </style>
                </noscript>
              </div>
            </div>`)),
          { borderColor: 'red-500' }
        )
      )
    )
  )
}

export function head (): string {
  return '<title>Not Found | ch0.link</title>'
}
