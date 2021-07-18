import { RECIPES } from '../routes/recipe/fixtures'
import { CATEGORIES } from '../routes/category/fixtures'

export default {
    categories: {
        data: CATEGORIES,
        unique: 'type'
    },
    recipes: {
        data: RECIPES
    },
}
