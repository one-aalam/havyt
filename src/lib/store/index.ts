import StormDB from 'stormdb'
import { nanoid } from 'nanoid'
import { Service, Token } from 'typedi'
import { IHasIdentity } from '../commons/types'
import { StoreItemNotFoundError, StoreItemConflictError } from './store-error'
import { IRepository, StoreServiceCollConfig } from './types'

export const DbToken = new Token<StormDB>('STORE_DB_CONTEXT')

@Service({ transient: true })
export class StoreService<T extends IHasIdentity> implements IRepository<T> {
  private _db: StormDB
  private _coll: string
  private _data: T[]
  private _unique: keyof T | false

  constructor(
    db: StormDB,
    options: StoreServiceCollConfig = {
      coll: 'collection',
      data: [],
      unique: '',
    }
  ) {
    this._db = db
    this._coll = options.coll ? String(options.coll) : 'collection'
    this._data =
      this._db && this._db.get(this._coll).value() && this._db.get(this._coll).value().length
        ? this._db.get(this._coll).value()
        : options?.data?.length
        ? options.data
        : []
    this._unique = options.unique ? options.unique : false
  }

  getAll = () => Promise.resolve(this._data)

  getById = async (id: string) => {
    const item = this._getById(id)
    return item ? Promise.resolve(item) : Promise.reject(new StoreItemNotFoundError('id', id))
  }

  getByKey = async (key: string, val: string | number | boolean) => {
    const item = this._getByKey(key, val)
    return item ? Promise.resolve(item) : Promise.reject(new StoreItemNotFoundError(key, val))
  }

  getIndexById = async (id: string) => {
    const index = this._getIndexById(id)
    return index ? Promise.resolve(index) : Promise.reject(new StoreItemNotFoundError('id', id))
  }

  create = async (attrs: Omit<T, 'id'>) => {
    if (this._unique) {
      const key = this._unique as string
      const found = this._getByKey(key, attrs[key])
      if (found) {
        return Promise.reject(new StoreItemConflictError(key))
      }
    }

    const id = this._generateId()
    // @ts-ignore
    const item: T = {
      ...attrs,
      id,
    }

    this._data.push(item)
    this._db && this._db.set(this._coll, this._data).save()

    return Promise.resolve(item)
  }

  updateById = async (id: string, attrs: Partial<T>) => {
    const index = await this._getIndexById(id)
    if (index >= 0) {
      if (this._unique) {
        const key = this._unique as string
        const found = this._getByKey(key, attrs[key]!)
        if (found) {
          return Promise.reject(new StoreItemConflictError(key))
        }
      }

      let item = this._data[index]
      const updates = Object.entries(attrs).reduce(
        // @ts-ignore
        (acc, [key, val]: [string, string]) => (val ? ((acc[key] = val), acc) : acc),
        {}
      )
      item = { ...item, ...updates, id: item.id }

      this._data[index] = item
      this._db && this._db.set(this._coll, this._data).save()

      return Promise.resolve(item)
    }
    return Promise.reject(new StoreItemNotFoundError('id', id))
  }

  deleteById = async (id: string) => {
    const index = this._getIndexById(id)
    if (index >= 0) {
      const item = this._data[index]
      this._data.splice(index, 1)
      this._db && this._db.set(this._coll, this._data).save()
      return Promise.resolve(item)
    }
    return Promise.reject(new StoreItemNotFoundError('id', id))
  }

  private _generateId(): string {
    return nanoid()
  }

  private _getById = (id: string) => {
    return this._data.find((item) => item.id === id)
  }

  private _getIndexById = (id: string) => {
    return this._data.findIndex((item) => item.id === id)
  }

  private _getByKey = (key: string, val: string | number | boolean) => {
    return this._data.find((item) => item[key] && item[key] === val)
  }
}
