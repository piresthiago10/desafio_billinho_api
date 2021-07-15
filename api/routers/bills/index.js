const router = require('express').Router()

router.use('/', (request, response) => { response.send('ok') })

module.exports = router