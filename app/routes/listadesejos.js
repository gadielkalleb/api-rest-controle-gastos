const express = require('express')
const path = require('path')

const router = express.Router()

const { saveProduto, getProduto } = require('../controllers/listadesejosController')

/**
 * @description middleware de autenticação, ve se o usuario esta valido para estar na sessão
 */
const authMiddleware = require(path.resolve('./app/middlewares/auth'))

router.use(authMiddleware)
router.get('/produtos', getProduto)
router.post('/produtos/create', saveProduto)

module.exports = router
