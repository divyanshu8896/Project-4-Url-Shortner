const express = require('express')
const router = express.Router()
const urlController = require('../controller/urlController')


// ————————————————————— create a short URLs ——————————————————————//
router.post('/url/shorten', urlController. createShortURL)

// ————————————————————— get a Original URLs ——————————————————————//
router.get('/:urlCode', urlController.getURL)

// ————————————————————— hundled Invalid URLs ———————————————————————//
router.all("/****", function (req, res) {
    res.status(404).send({
        status: false,
        message: "please enter the valid URL"
    })
})


module.exports = router


