import { jsonHeaders } from '.'

export default (): Response => new Response(
  JSON.stringify(
    {
      success: false,
      err: { code: 'ERR_SLUG_UNKNOWN', message: 'Slug not found' }
    }
  ), { headers: jsonHeaders })
