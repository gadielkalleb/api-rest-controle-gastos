const cheerio = require('cheerio')
const request = require('request')

const listModel = require('../models/listadesejos')

const updateProduct = async (modelToSave) => {
  try {
    const updateModel = await listModel.update({
      _id: modelToSave.id,
    }, {
      $set: {
        valor: modelToSave.valor,
        message: modelToSave.message,
      },
    })
    console.log(`Valores atualizados com o scraping: ${updateModel}`)
  } catch (e) {
    console.log(`Não foi possivel fazer o update dos dados do scraping: ${e}`)
  }
}

const data = async () => {
  try {
    const getProduto = await listModel.find({})
    console.log(getProduto)
    return getProduto
  } catch (error) {
    console.log(error)
  }
}

module.exports = () => {
  // const produto = data.filter(prd => prd.isScraping === true)

  for (let i = 0; data.length; i++) {
    request(data.url, async (err, response, html) => {
      if (err) {
        console.log(err)
      } else {
        const modelToSave = {}
        try {
          const $ = await cheerio.load(html)
          if ((!$(`${data.idTitle}${data.classTitle}`)) && ($(`${data.idTitle}${data.classTitle}`) !== data.nome)) {
            modelToSave.message = 'Nome do produto não confere, por favor revise os dados no site do produto'
          }
          if (!$(`${data.idPrice}`)) {
            modelToSave.message = 'Valor não encontrado, por favor revise o site do produto'
          }
          modelToSave.nome = $(`${data.idTitle}${data.classTitle}`).text().trim()
          modelToSave.valor = data.valor !== $(`${data.idPrice}`).text().trim() ? $(`${data.idPrice}`).text().trim() : data.valor
          modelToSave.url = data.url
          modelToSave.valorantigo = data.valor !== $(`${data.idPrice}`).text().trim() ? data.valor : $(`${data.idPrice}`).text().trim()
          modelToSave.ultimaconsulta = Date.now()
          updateProduct(modelToSave)
        } catch (error) {
          console.log(`Error ao fazer o Scraping: ${error}`)
        }
      }
    })
  }
}
