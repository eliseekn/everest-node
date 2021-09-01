const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const path = require('path')
const post = require('./routes/post')

const server = express()
const port = process.env.PORT || 3001

server.use(fileUpload({createParentPath: true}));
server.use("/public", express.static(path.join(__dirname, 'public')));
server.use(cors({origin: '*'}))
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: true}))
server.use('/api/post', post)

server.listen(port, '', () => {
    console.log('Server running on port ' + port)
})