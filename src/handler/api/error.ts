import render from '../../utils/render'

import { htmlHeaders } from '../page'

export default (): Response => new Response(render('error', 'Internal Server Error'), { status: 500, headers: htmlHeaders })
