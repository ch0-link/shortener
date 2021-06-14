import { Cheerio, Node } from 'cheerio'

export default (ctx: Cheerio<Node>): Cheerio<Node> => {
  return ctx.wrapAll('<div class="w-screen h-screen bg-black text-white font-monospace">').parent()
}
