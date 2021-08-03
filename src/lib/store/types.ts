import StormDB from 'stormdb'
import { AppColl } from '../commons/types'

export interface IHasIdentity {
  id: string
  [key: string]: any
}

export interface IRepository<T> {
  getAll(): Promise<T[]>
  getById(id: string): Promise<T>
  getByKey(key: string, val: string | number | boolean): Promise<T>
  getIndexById(id: string): Promise<number>
  create(entity: T): Promise<T>
  updateById(id: string, updates: Partial<T>): Promise<T>
  deleteById(id: string): Promise<T>
}

// let's maintain it here for now

export type StoreServiceOptions<T> = {
  db: StormDB | undefined
  coll?: AppColl
  data?: T[]
  unique?: keyof T | false // single key for now
}

export type StoreServiceCollConfig = {
  coll?: AppColl
  data?: IHasIdentity[]
  unique?: string // single key for now
}
