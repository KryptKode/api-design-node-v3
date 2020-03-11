import express, { Router } from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

import config from './config'

export const app = express()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

const router = Router()
router.get('/me', (req, res) => {
  res.send('This is the /me endpoing')
})

const log = (req, res, next) => {
  console.log('Logger')
  next()
}

app.use('/api', router)

app.get('/data', [log, log, log], (req, res) => {
  res.send({ data: 'ME' })
})

const PORT = config.port

export const start = () => {
  app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`)
  })
}
