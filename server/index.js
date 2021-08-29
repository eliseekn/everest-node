const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const post = require('./routes/post')

const server = express()
const port = process.env.PORT || 3001

server.use(cors({origin: '*'}))
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: true}))
server.use('/api/post', post)

server.listen(port, '', () => {
    console.log('Server running on port ' + port)
})