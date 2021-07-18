import StormDB from 'stormdb'
import { IHasIdentity } from '../../lib/commons/types'
import { StoreItemNotFoundError, StoreItemConflictError } from './store-error'
import { IRepository, StoreServiceOptions } from './types'

export class StoreService<T extends IHasIdentity> implements IRepository<T> {
  private _db: StormDB | undefined
  private _coll: string
  private _data: T[]
  private _unique: keyof T | false

  private _currId = 0

  constructor(options: StoreServiceOptions<T>) {
    this._db = options.db && options.db
    this._coll = options.coll ? String(options.coll) : 'collection'
    this._data =
      this._db && this._db.get(this._coll).value().length
        ? this._db.get(this._coll).value()
        : options.data?.length
        ? options.data
        : []
    this._unique = options.unique ? options.unique : false
    this._currId = this._data.length ? this._data[this._data.length - 1].id : 0
  }

  getAll = () => Promise.resolve(this._data)

  getById = async (id: number) => {
    const item = this._getById(id)
    return item ? Promise.resolve(item) : Promise.reject(new StoreItemNotFoundError('id', id))
  }

  getByKey = async (key: string, val: string | number | boolean) => {
    const item = this._getByKey(key, val)
    return item ? Promise.resolve(item) : Promise.reject(new StoreItemNotFoundError(key, val))
  }

  getIndexById = async (id: number) => {
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

  updateById = async (id: number, attrs: Partial<T>) => {
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
      // @ts-ignore
      const updates = Object.entries(attrs).reduce(
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

  deleteById = async (id: number) => {
    const index = this._getIndexById(id)
    if (index >= 0) {
      const item = this._data[index]
      this._data.splice(index, 1)
      this._db && this._db.set(this._coll, this._data).save()
      return Promise.resolve(item)
    }
    return Promise.reject(new StoreItemNotFoundError('id', id))
  }

  private _generateId(): number {
    this._currId += 1
    return this._currId
  }

  private _getById = (id: number) => {
    return this._data.find((item) => item.id === id)
  }

  private _getIndexById = (id: number) => {
    return this._data.findIndex((item) => item.id === id)
  }

  private _getByKey = (key: string, val: string | number | boolean) => {
    return this._data.find((item) => item[key] && item[key] === val)
  }
}
