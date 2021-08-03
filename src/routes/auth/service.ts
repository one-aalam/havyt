import { Service } from 'typedi'
import { UserService } from '../user/service'
import { AuthSignInPayload, AuthSignUpPayload } from './types'

@Service()
export class AuthService {
  private userService: UserService
  constructor(userService: UserService) {
    this.userService = userService
  }

  signIn = async ({ email, password }: AuthSignInPayload) => await this.userService.getByEmailAndPassword(email, password)

  signUp = async (body: AuthSignUpPayload) => await this.userService.create(body)
}
