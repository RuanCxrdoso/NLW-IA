import cors from  'cors'
import express, { request, response } from 'express'

import { download } from './download.js'

const app = express()
app.use(cors())

app.get('/summary/:id', (request, response) => {
  const id = request.params.id
  download(id)
  response.json({ result: "Video download was successfull" })
})

app.listen(3333, () => console.log('Server is running on port 3333'))
