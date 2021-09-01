const slugify = require('./slugify')

function fileUpload(req, res, path) {
    const image = req.files.file
    
    let fileName = image.name.split('.')
    fileName = slugify(fileName[0]) + '.' + fileName[1]

    image.mv(`${path}/${fileName}`, err => {
        if (err) {
            return res.status(500).send(err)
        }
    })

    return fileName
}

module.exports = fileUpload