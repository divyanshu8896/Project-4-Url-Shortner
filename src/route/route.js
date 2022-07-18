const express = require('express')
const router = express.Router()
const urlController = require('../controller/urlController')



router.post('/url/shorten', urlController. createShortURL)

router.get('/:urlCode', urlController.getURL)



router.all("/****", function (req, res) {
    res.status(404).send({
        status: false,
        message: "please enter the valid URL"
    })
})










module.exports = router


