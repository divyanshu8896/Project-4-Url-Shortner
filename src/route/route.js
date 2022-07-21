const express = require('express')
const router = express.Router()
const urlController = require('../controller/urlController')


// API for create a short URLs
router.post('/url/shorten', urlController. createShortURL)



//API for get a original url 
router.get('/:urlCode', urlController.getURL)

//API for Just Check the URL which is  correct or not 
router.all("/****", function (req, res) {
    res.status(404).send({
        status: false,
        message: "please enter the valid URL"
    })
})


module.exports = router


