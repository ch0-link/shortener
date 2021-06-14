import render from '../../utils/render'
import { htmlHeaders } from '.'
import { EventContext } from '../'

export default (ctx: EventContext): Response => new Response(render('not-found', ctx.match.params.slug), { headers: htmlHeaders })
