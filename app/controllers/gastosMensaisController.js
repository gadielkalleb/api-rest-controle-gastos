const path = require('path')

const Despesas = require(path.resolve('./app/models/despesas'))

exports.save = async (req, res) => {
  const despesa = await Despesas.create(req.body)
  try {
    res.status(200).send({
      ok: true,
      user: req.userId,
      despesa,
    })
  } catch (err) {
    res.status(400).send({
      ok: false,
      message: 'Não foi possivel salvar seus gastos nesse momento tente mais tarde!',
    })
  }
}

exports.show = async (req, res) => {
  const despesas = await Despesas.find({ user: req.userId })
  try {
    res.status(200).send({
      status: 'ok',
      user: req.userId,
      despesas,
    })
  } catch (error) {
    res.status(400).send({
      status: 200,
      message: 'Not found',
    })
  }
}
