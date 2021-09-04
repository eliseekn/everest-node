require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const path = require('path')
const post = require('./routes/post')
const comment = require('./routes/comment')
const login = require('./routes/login')
const fixtures = require('./fixtures')

if (process.env.NODE_ENV === 'test') {
    fixtures.load()
}

const server = express()
const port = process.env.NODE_SERVER_PORT

server.use(fileUpload({createParentPath: true}));
server.use("/public", express.static(path.join(__dirname, 'public')));
server.use(cors({origin: '*'}))
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: true}))
server.use('/api/post', post)
server.use('/api/comment', comment)
server.use('/api/login', login)

server.listen(port, '', () => {
    console.log('Server running on port ' + port)
})