import chalk from 'chalk'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

import Community from '../models/community'
import People from '../models/people'
import { getCommunity } from './community'
import { generateCompanyCode, randomNumber } from './functions'
import { getPeople } from './people'

dotenv.config()

mongoose.set('useCreateIndex', true)
mongoose.set('useNewUrlParser', true)
mongoose.set('useUnifiedTopology', true)
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('error', err => {
  console.error(`%s ${err}`, chalk.red('x'))
})

let communityCount = 10
let peopleCount = 100

const codes = generateCompanyCode(communityCount)

const run = async () => {
  try {
    await Community.deleteMany()
    while (communityCount > 0) {
      const item = getCommunity(codes[communityCount - 1])
      await new Community({ ...item }).save()
      communityCount--
    }

    await People.deleteMany()
    while (peopleCount > 0) {
      const item = getPeople(codes[randomNumber(codes.length)])
      await new People({ ...item }).save()
      peopleCount--
    }
  } catch (err) {
    console.error(err)
    process.exit(1)
  } finally {
    process.exit()
  }
}

run()
