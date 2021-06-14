import { icons } from 'feather-icons'

import header from '../components/header'
import base from '../components/base'
import card from '../components/card'

import * as cheerio from 'cheerio'
const $ = cheerio.default

export function body (shorten: {
  data: {
    link: URL
    slug: string
  }
  domain: URL
}): string {
  return $.html(
    base(
      header().add(
        card(
          $('<h1 class="text-green-500 text-xl font-bold space-x-2 border-b-2"><span>Success</span></h2>').prepend(
            $(icons.check.toSvg({
              'stroke-linecap': 'butt',
              'stroke-linejoin': 'butt',
              height: 32,
              width: 32
            })).addClass('inline-block')
          ).add($(`<div class="flex flex-col items-center space-y-2">
            <div class="self-stretch overflow-x-auto bg-transparent border-solid border-2 focus:border-4 transition-border border-2 border-white">
                <p class="inline-block sm:text-sm text-white whitespace-nowrap select-all p-2">
                  ${shorten.data.link.toString()}
                </p>
              </div>
              ${icons['arrow-down'].toSvg({ 'stroke-linecap': 'butt', 'stroke-linejoin': 'butt' })}
              <div class="self-stretch overflow-x-auto bg-transparent border-solid border-2 focus:border-4 transition-border border-2 border-white">
                <p class="inline-block sm:text-sm text-white whitespace-nowrap select-all p-2">
                  ${new URL(`/${shorten.data.slug}`, shorten.domain).toString()}
                </p>
              </div>
            </div>`)),
          { borderColor: 'green-500' }
        )
      )
    )
  )
}

export function head (): string {
  return '<title>Success | ch0.link</title>'
}
