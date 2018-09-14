const tryAwait = require('../middlewares/tryAwait')

const callback = (res) => ({
    try:  (result) => res.status(200).send({ ok: true, result }),
    catch: (error) => res.status(400).send({ ok: false, error, })
})

exports.save = (Despesas, req, res) => tryAwait( Despesas.create(req.body), callback(res) )
exports.show = (Despesas, req, res) => tryAwait( Despesas.find({ user: req.userId }), callback(res) )
