import { RouteMatch } from 'tiny-request-router'
import page from './page'
import api from './api'

export interface EventContext {
  event: FetchEvent
  match: RouteMatch<any>
  request: Request
}

export function handle (action: string, ctx: EventContext): Response | Promise<Response> {
  switch (action) {
    case 'shorten': {
      return api('shorten', ctx)
    }
    case 'redirect': {
      return page('redirect', ctx)
    }
    default: {
      return page(action, ctx) // TODO: properly handle
    }
  }
}
