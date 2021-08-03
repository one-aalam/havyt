import { Service, Inject } from 'typedi'
import StormDB from 'stormdb'
import { StoreService, DbToken } from '../../lib/store'
import {
  Recipe,
  RecipeQuerystring,
  RecipeParams,
  RecipeCreateBody,
  RecipeUpdateBody,
} from './types'
import { CategoryService } from '../category/service'
import storeConfig from '../../config/store'

@Service()
export class RecipeStoreService extends StoreService<Recipe> {
  constructor(@Inject(DbToken) protected db: StormDB) {
    super(db, storeConfig.recipes)
  }
}

@Service()
export class RecipeService {
  private _recipeStore: RecipeStoreService
  private _categoryService: CategoryService
  constructor(recipeStore: RecipeStoreService, categoryService: CategoryService) {
    this._categoryService = categoryService
    this._recipeStore = recipeStore
  }

  getAll = async (query: RecipeQuerystring) => {
    const { offset = 0, limit = 10, tag, cuisineId, courseId } = query
    const recipes = await this._recipeStore.getAll()
    return recipes
      .filter(
        (recipe) => !tag || recipe.tags?.map((tag) => (tag || '').toLowerCase()).includes(tag)
      )
      .filter((recipe) => !cuisineId || recipe.cuisineId == cuisineId)
      .filter((recipe) => !courseId || recipe.courseId == courseId)
      .slice(offset, offset + limit)
  }

  getOne = async (params: RecipeParams) => await this._recipeStore.getById(params.id)
  create = async (body: RecipeCreateBody) => {
    await this._categoryService.getItemByCategoryItemId(body.cuisineId)
    await this._categoryService.getItemByCategoryItemId(body.courseId)
    return await this._recipeStore.create(body)
  }
  update = async (params: RecipeParams, body: RecipeUpdateBody) => {
    if (body.cuisineId) {
      await this._categoryService.getItemByCategoryItemId(body.cuisineId)
    }
    if (body.courseId) {
      await this._categoryService.getItemByCategoryItemId(body.courseId)
    }
    return await this._recipeStore.updateById(params.id, body)
  }
  delete = async (params: RecipeParams) => await this._recipeStore.deleteById(params.id)
}
