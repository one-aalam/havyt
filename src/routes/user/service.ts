import StormDB from 'stormdb'
import { Inject, Service } from 'typedi'
import { hash, compare } from 'bcrypt'
import { User, UserParams, UserCreateBody, UserUpdateBody } from './types'
import { StoreService, DbToken } from '../../lib/store'
import storeConfig from '../../config/store'
import userConfig from '../../config/user'



type ServiceErrorCode = 'UserNotFound'

export class ServiceError extends Error {
  constructor(
    public message: string,
    public error: ServiceErrorCode,
    public code: number,
    public data: Record<string, any> = {}
  ) {
    super()
  }
}

export class UserNotFoundError extends ServiceError {
  constructor(key: string, val: string | number | boolean) {
    super(`couldn't find a user with provided ${key}: ${val}`, 'UserNotFound', 404)
  }
}

@Service()
export class UserStoreService extends StoreService<User> {
  constructor(@Inject(DbToken) protected db: StormDB) {
    super(db, storeConfig.users)
  }
}

@Service()
export class UserService {
  private _store: UserStoreService
  constructor(store: UserStoreService) {
    this._store = store
  }

  /** Only Admin */
  getAll = async () => await this._store.getAll()

  /* Only User & Admin */
  getOne = async (params: UserParams) => await this._store.getById(params.id)

  /* Only User */
  create = async (body: UserCreateBody) => await this._store.create({
      ...body,
      password: await this._hashPassword(body.password)
  })
  update = async (params: UserParams, body: UserUpdateBody) => await this._store.updateById(params.id, {
      ...body,
      password: body?.password && body?.password.trim() !== '' ? await this._hashPassword(body.password) : body.password
  })

  /* Soft-delete probably */
  delete = async (params: UserParams) => await this._store.deleteById(params.id)

  getByUsername = async (username: string) => {
    const user = await (await this.getAll()).find(user => user.username === username)
    return user
      ? Promise.resolve(user)
      : Promise.reject(new UserNotFoundError('username', username))
  }

  getByEmail = async (email: string) => {
    const user = await (await this.getAll()).find(user => user.email === email)
    return user
      ? Promise.resolve(user)
      : Promise.reject(new UserNotFoundError('email', email))
  }

  getByUsernameAndPassword = async (username: string, password: string) => {
    const user = await this.getByUsername(username)
    const isValidUser = await this._comparePassword(password, user.password!)
    return !isValidUser
        ? Promise.reject(new UserNotFoundError('username', username))
        : Promise.resolve(user)
  }

  getByEmailAndPassword = async (email: string, password: string) => {
    const user = await this.getByEmail(email)
    const isValidUser = await this._comparePassword(password, user.password!)
    return !isValidUser
        ? Promise.reject(new UserNotFoundError('email', email))
        : Promise.resolve(user)
  }

  _hashPassword = async (password: string = userConfig.passDefault) => await hash(password, userConfig.passSaltRounds)
  _comparePassword = async (attempt: string, password: string) => await compare(attempt, password)

}
