import { StoreService } from '../../lib/store'
import { Category, CategoryCreateBody, CategoryItem, CategoryParams, CategoryUpdateBody } from './types'
import { CATEGORY_CUISINES, CATEGORY_COURSES } from './fixtures'

const categoryItemDict = {
    cuisines: CATEGORY_CUISINES,
    courses: CATEGORY_COURSES
}
const categoryItems: CategoryItem[] = [ ...CATEGORY_CUISINES, ...CATEGORY_COURSES ]

type CategoryItemType = keyof typeof categoryItemDict

type ServiceErrorCode = 'CategoryItemNotFound'

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

export class CategoryItemNotFoundError extends ServiceError {
  constructor(key: string, val: string | number | boolean) {
    super(`couldn't find a record with provided ${key}: ${val}`, 'CategoryItemNotFound', 404)
  }
}

export class CategoryService {
    private _store: StoreService<Category>
    constructor(store: StoreService<Category>) {
        this._store = store
    }

    getAll = async() => await this._store.getAll()
    getOne = async(params: CategoryParams) => await this._store.getById(params.id)
    create = async(body: CategoryCreateBody) => await this._store.create(body)
    update = async(params: CategoryParams, body: CategoryUpdateBody) => await this._store.updateById(params.id, body)
    delete = async(params: CategoryParams) => await this._store.deleteById(params.id)

    getAllItemsByCategoryType = (categoryType: CategoryItemType) => categoryItemDict[categoryType]
    getAllItemsByCategory = async(params: CategoryParams) => await categoryItems.filter(categoryItem => categoryItem.categoryId == params.id)
    getItemByCategoryItemId = async (categoryItemId: number) => {
        const item = categoryItems.find(categoryItem => categoryItem.id === categoryItemId)
        return item ? Promise.resolve(item) : Promise.reject(new CategoryItemNotFoundError('id', categoryItemId))
    }
}
