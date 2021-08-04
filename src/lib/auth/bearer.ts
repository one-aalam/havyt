import { FastifyRequest } from 'fastify'

export const getBearerAuthPayload = (req: FastifyRequest): Array<string> => {
    const header = req.headers.authorization || ''
    const [ scheme, credentials ] = header.split(' ')

    if (scheme === 'Bearer' && credentials) {
        return [ scheme, credentials ]
    }
    return ['', '']
}
