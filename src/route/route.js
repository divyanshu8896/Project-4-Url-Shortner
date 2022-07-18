const express = require('express')
const router = express.Router()
const urlController = require('../controller/urlController')



router.post('/url/shorten', urlController. createShortURL)

router.get('/:urlCode', urlController.getURL)













module.exports = router


