export function render(elm) {
    loading()

    fetch('/api/recipes').then(res => res.json()).then(recipes => {
        loading()
        if (recipes.length) {
            const recipeList = document.createElement('ul')
            recipeList.classList = 'recipe-list grid'
            recipes.forEach(recipe => {
                const recipeListItem = document.createElement('li')
                recipeListItem.innerHTML = `${recipe.name}`
                recipeListItem.classList = 'recipe-card'
                recipeList.append(recipeListItem)
            })
            elm.append(recipeList)
        } else {
            elm.append(`No recipes found`)
        }
    })
}

function loading(rootElm) {
    const parent = rootElm || document.body
    const loader = parent.querySelector('.loader')
    if(loader) {
        loader.remove()
    } else {
        const loader = document.createElement('span')
        loader.classList = 'loader'
        loader.innerHTML = 'loading...'
        parent.append(loader)
    }
}
