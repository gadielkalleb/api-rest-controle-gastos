exports.saveProduto = async (ListaDesejos, req, res) => {
  try {
    const produto = await ListaDesejos.create(req.body)
    res.status(200).send({
      ok: true,
      produto,
    })
  } catch (error) {
    res.status(400).send({
      ok: false,
      message: 'Não foi possivel salvar seu produto na lista de desejos nesse momento tente mais tarde!',
    })
  }
}

exports.getProduto = async (ListaDesejos, req, res) => {
  try {
    const produtos = await ListaDesejos.find({})
    res.status(200).send({ ok: true, produtos })
  } catch (error) {
    res.status(400).send({ ok: false, message: 'Error processing get Produto' })
  }
}
