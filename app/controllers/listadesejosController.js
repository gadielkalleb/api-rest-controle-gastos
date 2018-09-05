const path = require('path')

const ListaDesejos = require(path.resolve('./app/models/listadesejos'))

exports.saveProduto = async (req, res) => {
  const produto = await ListaDesejos.create(req.body)
  try {
    res.status(200).res.send({
      ok: true,
      produto,
    })
  } catch (error) {
    res.status(400).res.send({
      ok: false,
      message: 'Não foi possivel salvar seu produto na lista de desejos nesse momento tente mais tarde!',
    })
  }
}
