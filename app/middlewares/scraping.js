const cheerio = require('cheerio')
const request = require('request')

const listModel = require('../models/listadesejos')
const tryAwait = require('./tryAwait')

// const sendJSON = ( res ) => ( result )  => res.json( res )
// const logError = ( res ) => ( result ) => console.log( res )

// const callback = ( res ) => ({
//   try: sendJSON( res ),
//   catch: logError( res )
// })

// const updateProduct = async (modelToSave) => {
//   try {
//     const updateModel = await listModel.update({
//       _id: modelToSave.id,
//     }, {
//       $set: {
//         valor: modelToSave.valor,
//         message: modelToSave.message,
//       },
//     })
//     console.log(`Valores atualizados com o scraping: ${updateModel}`)
//   } catch (e) {
//     console.log(`Não foi possivel fazer o update dos dados do scraping: ${e}`)
//   }
// }

// const el = async () => {
//   try {
//     const getProduto = await listModel.find({})
//     console.log(getProduto)
//     return getProduto
//   } catch (error) {
//     console.log(error)
//   }
// }

const data = tryAwait(listModel.find({}), '')
data.forEach(e => {
  request(e.url, async (err, response, html) => {
    if (err) console.log(err)
    else {
      const modelToSave = {}
      const $ = cheerio.load(html)
      if ((!$(`${e.idTitle}`)) && ($(`${e.idTitle}`) !== e.nome)) {
        modelToSave.message = 'Nome do produto não confere, por favor revise os dados no site do produto'
      }
      if (!$(`${e.idPrice}`)) {
        modelToSave.message = 'Valor não encontrado, por favor revise o site do produto'
      }
      modelToSave.nome = $(`${e.idTitle}`).text().trim()
      modelToSave.valor = e.valor !== $(`${e.idPrice}`).text().trim() ? $(`${e.idPrice}`).text().trim() : e.valor
      modelToSave.url = e.url
      modelToSave.valor = e.valor !== $(`${e.idPrice}`).text().trim() ? e.valor : $(`${e.idPrice}`).text().trim()
      modelToSave.ultimaconsulta = Date.now()
    }
  })
})
