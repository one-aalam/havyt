import { AppCollConfig } from '../lib/commons/types'
import { RECIPES } from '../routes/recipe/fixtures'
import { CATEGORIES } from '../routes/category/fixtures'
import { USERS } from '../routes/user/fixtures'

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
  users: {
    coll: 'users',
    data: USERS,
    unique: 'email'
  },
}

export default storeConfig
