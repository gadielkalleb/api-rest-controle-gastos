const express = require('express')
const path = require('path')

const router = express.Router()

/**
 * @description middleware de autenticação, ve se o usuario esta valido para estar na sessão
 */
const authMiddleware = require(path.resolve('./app/middlewares/auth'))

router.use(authMiddleware)

router.get('/produtos', (req, res) => {
  res.status(200).send({ status: 'ok', message: 'not implemented' })
})

module.exports = router
