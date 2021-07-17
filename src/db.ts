import StormDB from 'stormdb'
import { RECIPES } from './routes/recipe/fixtures'
import { CATEGORIES } from './routes/category/fixtures'

export default async function db() {
    const db = new StormDB(new StormDB.localFileEngine(process.env?.APP_FILE_DB || 'db/havyt.stormdb' ))
    if(!db.get('categories').value() && !db.get('recipes').value()) {
        db.default({
            categories: CATEGORIES,
            recipes: RECIPES
        })
        await db.save()
        console.log('DB: Initialized ✅')
    }
}
