import StormDB from 'stormdb'
import { Inject, Service } from 'typedi'
import { User, UserParams, UserCreateBody, UserUpdateBody } from './types'
import { StoreService, DbToken } from '../../lib/store'
import storeConfig from '../../config/store'



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
  create = async (body: UserCreateBody) => await this._store.create(body)
  update = async (params: UserParams, body: UserUpdateBody) => await this._store.updateById(params.id, body)

  /* Soft-delete probably */
  delete = async (params: UserParams) => await this._store.deleteById(params.id)

  getByUsername = async (username: string) => {
    const user = await (await this.getAll()).find(user => user.username === username)
    return user
      ? Promise.resolve(user)
      : Promise.reject(new UserNotFoundError('username', username))
  }

  getByUsernameAndPassword = async (username: string, password: string) => {
    const user = await (await this.getAll()).find(user => user.username === username && user.password === password)
    return user
      ? Promise.resolve(user)
      : Promise.reject(new UserNotFoundError('username', username))
  }

  getByEmailAndPassword = async (email: string, password: string) => {
    const user = await (await this.getAll()).find(user => user.email === email && user.password === password)
    return user
    ? Promise.resolve(user)
    : Promise.reject(new UserNotFoundError('email', email))
  }
}
