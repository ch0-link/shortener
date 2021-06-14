import { setup } from 'twind'
import { shim, virtualSheet, getStyleTag } from 'twind/shim/server'

import { crush } from 'html-crush'

import { TemplatePage } from '../template'

const sheet = virtualSheet()

declare const ENVIRONMENT: string

setup({
  theme: {
    extend: {
      fontFamily: {
        monospace: ['Jetbrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace']
      },
      fontSize: {
        logo: ['24px', {
          letterSpacing: '1px',
          lineHeight: '32px'
        }]
      }
    }
  },
  preflight: (preflight, { theme }) => ({
    ...preflight,
    // Import external stylesheet
    '@import': ["url('https://cdn.jsdelivr.net/npm/ress/ress.css')", "url('https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap')"]
  }),
  sheet,
  hash: ENVIRONMENT !== 'development'
})

sheet.reset()

export default function render (page: string, ctx?: any): string {
  const template: TemplatePage = require(`../template/page/${page}`) // eslint-disable-line @typescript-eslint/no-var-requires

  const markup = shim(template.body(ctx))

  const minified = crush(`<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">    
      <meta http-equiv="content-type" content="text/html; charset=utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0">  
      <meta name="description" content="the URL shortener you love">
      <meta name="keywords" content="url shortener, link management platform, bitly, tinyurl, api, branded urls, branded domian, links shortener, tiny url, short url, short link, links shortening, url traffic stats, url tracking, free url shortener, custom url shortener, shortening url, shorten url, shorten links, url, link, url redirect, shorter link, customize url, customize link, url shortener no ads, url shortener without ads, click stats, unu">
      ${getStyleTag(sheet)}
      ${template.head(ctx)}
    </head>
    <body>${markup}</body>
  </html>
`, {
    removeHTMLComments: true,
    removeLineBreaks: true
  })

  return minified.result
}
