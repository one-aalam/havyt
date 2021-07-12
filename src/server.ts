import http from 'http'
import { USERS, RECIPES, RECIPE_CATEGORIES } from './fixtures'

const APP_PORT = process.env.APP_PORT || 3000

const server = http.createServer((req: http.IncomingMessage, res: http.OutgoingMessage) => {
  const route = req.method + ' ' + req.url // ex: GET /users

  if (route === 'GET /users') {
    res.end(JSON.stringify(USERS))
  } else if (route === 'GET /recipes') {
    res.end(JSON.stringify(RECIPES))
  } else if (route === 'GET /categories') {
    res.end(JSON.stringify(RECIPE_CATEGORIES))
  } else {
    res.end(
      `You requested for ${req.url} using method ${req.method}, which does not have an associated response`
    )
  }
})

server.listen(APP_PORT, () => console.log(`Server started on ${APP_PORT} 🚀`))
