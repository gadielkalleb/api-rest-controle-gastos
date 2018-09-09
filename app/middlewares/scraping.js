const cheerio = require('cheerio')
const request = require('request')
const EventEmitter = require('events');

const event = new EventEmitter()

const isScrapProduto = prd => prd.isScraping
const produtoFilter = data => data.produto.filter(isScrapProduto)
const updateProduct = async (model, modelToSave) => {
  try {
    const updateModel = await model.update({
      _id: modelToSave.id,
    }, {
      $set: {
        valor: modelToSave.valor,
      },
    })
    console.log(`Valores atualizados com o scraping: ${updateModel}`)
  } catch (e) {
    console.log(`Não foi possivel fazer o update dos dados do scraping: ${e}`)
  }
}

module.exports = (data, listModel) => {
  const produto = produtoFilter(data)
  request(produto.url, async (err, response, html) => {
    const modelToSave = {}
    if (err) {
      console.log(err)
    } else {
      try {
        const $ = await cheerio.load(html)
        if ((!$(`${produto.idTitle}${produto.classTitle}`)) && ($(`${produto.idTitle}${produto.classTitle}`) !== produto.nome)) {
          return res.status(404).send({
            ok: false,
            message: 'Nome do produto não confere, por favor revise os dados no site do produto',
            url: produto.url,
          })
        }
        if (!$(`${produto.idPrice}`)) {
          return res.status(404).send({
            ok: false,
            message: 'Valor não encontrado, por favor revise o site do produto',
            url: produto.url,
          })
        }
        modelToSave.nome = await $(`${produto.idTitle}${produto.classTitle}`).text().trim()
        modelToSave.valor = await $(`${produto.idPrice}`).text().trim()
        modelToSave.url = produto.url
        updateProduct(listModel, modelToSave)
      } catch (error) {
        console.log(`Error ao fazer o Scraping: ${error}`)
      }
    }
  })
}
