import dotenv from 'dotenv'
import express from 'express'
import next from 'next'

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

dotenv.config()

app
  .prepare()
  .then(() => {
    const server = express()

    server.all('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  }).catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })
