import { AppCollConfig } from '../lib/commons/types'
import { RECIPES } from '../routes/recipe/fixtures'
import { CATEGORIES } from '../routes/category/fixtures'

const storeConfig: AppCollConfig = {
  categories: {
    coll: 'categories',
    data: CATEGORIES,
    unique: 'type',
  },
  recipes: {
    coll: 'recipes',
    data: RECIPES,
  },
}

export default storeConfig
