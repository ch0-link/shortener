import { nanoid } from 'nanoid'
import slugify from 'slugify'

export function sanitizeHttpUrl (string: string): URL {
  const url = new URL(string)

  if (url.protocol === 'http:' || url.protocol === 'https:') {
    return url
  } else {
    throw new URIError('Not a HTTP(S) URI')
  }
}

export function sanitizeSlug (string: string = nanoid()): string {
  return slugify(string, { remove: /[/\\?#%]/g })
}
