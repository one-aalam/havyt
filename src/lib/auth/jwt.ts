import { createSigner, createVerifier } from 'fast-jwt'
import envConfig from '../../config/env'


const signSync = createSigner({ key: envConfig.JWT_SECRET , algorithm: 'HS256', expiresIn: envConfig.JWT_EXP })
const verifySync = createVerifier({ key: envConfig.JWT_SECRET })

export const createToken = (payload: {[key: string]: any}) => signSync(payload)

export const verifyToken = (token: string): { [key: string]: any } => verifySync(token)
