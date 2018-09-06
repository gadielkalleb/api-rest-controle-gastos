const express = require('express')
const path = require('path')

const router = express.Router()

/**
 * @description controller para registro, autenticação e reset de password
 */
const authController = require(path.resolve('./app/controllers/authController'))

router.post('/register', authController.register)
router.post('/authenticate', authController.authenticate)
router.post('/forgot_password', authController.forgot_password)

module.exports = router
// module.exports = app => app.use('/auth', router)
