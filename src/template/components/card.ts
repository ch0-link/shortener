import { Cheerio, Node } from 'cheerio'

interface CardOptions {
  borderColor?: string
  padding?: number
}

export default (ctx: Cheerio<Node>, option?: CardOptions): Cheerio<Node> => {
  return center(card(ctx, option))
}

export function center (ctx: Cheerio<Node>): Cheerio<Node> {
  return ctx.wrapAll('<div class="flex h-full items-center justify-center">')
    .parent()
}

export function card (ctx: Cheerio<Node>, opt?: CardOptions): Cheerio<Node> {
  const option: { borderColor: string, padding: number } = {
    ...{
      borderColor: 'white',
      padding: 8
    },
    ...opt
  }

  return ctx.wrapAll('<div>').parent()
    .addClass(`border-${option.borderColor} border-4 p-${option.padding} space-y-2 w-10/12 sm:w-3/4 max-w-4xl`)
}
