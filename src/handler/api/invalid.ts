import render from '../../utils/render'

import { htmlHeaders } from '../page'

export default (): Response => new Response(render('invalid', 'Invalid request.'), { status: 400, headers: htmlHeaders })
