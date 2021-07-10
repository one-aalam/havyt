import http from 'http'

const server = http.createServer((req, res) => {
  res.end(`You requested for ${req.url} using method ${req.method}`)
})

server.listen(process.env.APP_PORT, () => console.log(`Server started on ${process.env.APP_PORT} 🚀`))
