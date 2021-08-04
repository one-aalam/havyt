import { FastifyRequest } from 'fastify'

export const getBasicAuthPayload = (req: FastifyRequest): Array<string> => {
    const header = req.headers.authorization || ''
    const [ scheme, credentials ] = header.split(' ')

    if (scheme === 'Basic' && credentials) {
        const creds = Buffer.from(credentials, 'base64').toString('ascii')
        return creds.split(':')
    }
    return ['', '']
}
