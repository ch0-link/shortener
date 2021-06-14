import render from '../../utils/render'
import { htmlHeaders } from '.'

export default (): Response => new Response(render('home'), { headers: htmlHeaders })
