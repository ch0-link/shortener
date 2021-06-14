import { icons } from 'feather-icons'
import header from '../components/header'
import base from '../components/base'

import * as cheerio from 'cheerio'
const $ = cheerio.default

export function body (): string {
  return $.html(
    base(
      header().add(
        $(`<div class="flex h-full items-center justify-center">
      <div class="flex flex-col bg-black items-end space-y-2">
        <form class="flex flex-col sm:flex-row space-x-0 space-y-2 sm:space-x-2 sm:space-y-0" id="form" action="/" method="POST">
        <input type="url" name="link" class="p-2 pl-2 w-64 sm:text-sm placeholder-white placeholder-opacity-60 text-white bg-transparent border-solid border-2 focus:border-4 transition-border border-white" placeholder="Link">
        <input type="text" name="slug" class="p-2 pl-2 w-64 sm:text-sm placeholder-white placeholder-opacity-60 text-white bg-transparent border-solid border-2 focus:border-4 transition-border border-2 border-white" placeholder="Slug">
        </form>
        <button type="submit" form="form" class="bg-white text-black">${icons['arrow-right'].toSvg({ 'stroke-linecap': 'butt', 'stroke-linejoin': 'butt' })}</button>
      </div>
    </div>`)
      )
    )
  )
}

export function head (): string {
  return '<title>ch0.link - the URL shortener you love</title>'
}
