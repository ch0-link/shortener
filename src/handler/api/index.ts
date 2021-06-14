import { EventContext } from '../'

import shorten from './shorten'
import notFound from './not-found'
import invalid from './invalid'
import error from './error'

export const jsonHeaders = new Headers({ 'Content-Type': 'application/json; charset=UTF-8' })

export default function api (page: string, ctx: EventContext): Response | Promise<Response> {
  switch (page) {
    case 'shorten': {
      return shorten(ctx)
    }
    case 'error': {
      return error()
    }
    case 'not-found': {
      return notFound()
    }
    default: {
      return invalid()
    }
  }
}
