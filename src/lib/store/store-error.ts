type StoreErrorCode = 'StoreItemNotFound' | 'StoreItemConflict'

export class StoreError extends Error {
    constructor(
        public message: string,
        public error: StoreErrorCode,
        public code: number,
        public data: Record<string, any> = {}
    ) {
        super()
    }
}

export class StoreItemNotFoundError extends StoreError {
    constructor(key: string, val: string | number | boolean) {
        super(`couldn't find a record with provided ${key}: ${val}`, 'StoreItemNotFound', 404)
    }
}

export class StoreItemConflictError extends StoreError {
    constructor(key: string) {
        super(`"${key}" has a conflict with a pre-existing record's "${key}"`, 'StoreItemConflict', 409)
    }
}
