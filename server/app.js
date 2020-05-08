import bodyParser from 'body-parser'
import chalk from 'chalk'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import next from 'next'

import apiRoutes from './routes/index'

import './models/community'
import './models/people'
import './models/transaction'

dotenv.config()

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

mongoose.set('useCreateIndex', true)
mongoose.set('useNewUrlParser', true)
mongoose.set('useUnifiedTopology', true)
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('error', err => {
  console.error(`%s ${err}`, chalk.red('x'))
})

app
  .prepare()
  .then(() => {
    const server = express()
    server.use(bodyParser.json())
    server.use('/api', apiRoutes)

    server.get('/p/:communityCode', (req, res) => {
      res.redirect(`/cadastro/pessoa?code=${req.params.communityCode}`)
    })

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
