import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { postsRoutes } from './routes/post.js'

const app = express()
app.use(cors())
app.use(bodyParser.json())

postsRoutes(app)

export { app }
