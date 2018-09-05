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


router.use(authMiddleware)

/**
 * rota de para salvar gastos
 */
router.post('/save', gmController.save)

router.get('/show', gmController.show)

module.exports = app => app.use('/gastosmensais', router)
