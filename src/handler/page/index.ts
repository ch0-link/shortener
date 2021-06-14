import { EventContext } from '../'

import home from './home'
import notFound from './not-found'
import redirect from './redirect'
export const htmlHeaders = new Headers({ 'Content-Type': 'text/html; charset=UTF-8' })

export default function page (page: string, ctx: EventContext): Response | Promise<Response> {
  switch (page) {
    case 'home': {
      return home()
    }
    case 'redirect': {
      return redirect(ctx)
    }
    default: {
      return notFound(ctx)
    }
  }
}
