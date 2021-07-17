import StormDB from 'stormdb'

export interface IHasIdentity {
    id: number,
    [key: string]: any
}

export interface IRepository<T> {
    getAll(): Promise<T[]>
    getById(id: number): Promise<T>
    getByKey(key: string, val: string | number | boolean): Promise<T>
    getIndexById(id: number): Promise<number>
    create(entity: T): Promise<T>
    updateById(id: number, updates: Partial<T>): Promise<T>
    deleteById(id: number): Promise<T>
}

// let's maintain it here for now
export type Collection = 'categories' | 'recipes'
export type StoreServiceOptions<T> = {
    db: StormDB | undefined
    coll?: Collection
    data?: T[]
    unique?: keyof T | false// single key for now
}
