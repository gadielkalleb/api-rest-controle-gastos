const path = require('path')
const express = require('express')

const router = express.Router()
/**
 * @description middleware de autenticação, ve se o usuario esta valido para estar na sessão
 */
const authMiddleware = require(path.resolve('./app/middlewares/auth'))
/**
 * @description controller para as rotas de gasto mensal
 */
const gmController = require(path.resolve('./app/controllers/gastosMensaisController'))
/**
 * @description model de Despesas
 */
const Despesas = require(path.resolve('./app/models/despesas'))

router.use(authMiddleware)

router.post('/save', gmController.save.bind(null, Despesas))
router.get('/show', gmController.show.bind(null, Despesas))

module.exports = router
