const path = require('path')

const Despesas = require(path.resolve('./app/models/despesas'))

const tryAwait = require('../middlewares/tryAwait')

// const sendJson = (res) => (result) => res.status(200).json({ ok: true, result })
// const logError = (res) => (error) => res.status(400).send({ ok: false, error, })

const callback = (res) => ({
    try:  (result) => res.status(200).send({ ok: true, result }),
    catch: (error) => res.status(400).send({ ok: false, error, })
})

exports.save = (req, res) => tryAwait( Despesas.create(req.body), callback(res) )

exports.show = (req, res) => tryAwait( Despesas.find({ user: req.userId }), callback( res ) )
