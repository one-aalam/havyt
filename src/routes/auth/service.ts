import { Service } from 'typedi'
import { createToken } from '../../lib/auth'
import { UserService } from '../user/service'
import { User } from '../user/types'
import { AuthSignInPayload, AuthSignUpPayload } from './types'
import envConfig from '../../config/env'

@Service()
export class AuthService {
  private userService: UserService
  constructor(userService: UserService) {
    this.userService = userService
  }

  signIn = async ({ email, password }: AuthSignInPayload) => {
    const user = await this.userService.getByEmailAndPassword(email, password)
    return this._genAuthResp(user)
  }

  signUp = async (body: AuthSignUpPayload) => {
    const user = await this.userService.create(body)
    return this._genAuthResp(user, false)
  }

  // sendToken: As sign-in's are more frequent event than sign-ups
  private _genAuthResp = (user: User, sendToken = true) =>  ({
        id: user.id,
        email: user.email,
        token: sendToken ? this._genToken(user) : null,
        appMetadata: {
            provider: 'email'
        }
   })

  private _genToken = ({ id, email }: User) =>  ({
        accessToken: createToken({ id, email }),
        tokenType: 'bearer',
        expiresIn: envConfig.JWT_EXP,
        expiresAt: new Date().getTime() + envConfig.JWT_EXP
  })
}
