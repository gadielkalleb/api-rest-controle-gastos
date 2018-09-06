const cheerio = require('cheerio')
const request = require('request')
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/api-rest', { useNewUrlParser: true });
mongoose.Promise = global.Promise;

const ListaDesejosSchema = new mongoose.Schema({
  // user: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: 'user',
  //   required: true,
  // },

    nome: { type: String },
    valor: { type: String },
    urllojaoficial: { type: String },
    urllojaalternativa: { type: String },
    ultimaconsulta: { type: Date },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const list = mongoose.model('ListaDesejos', ListaDesejosSchema)

const produtos = {
  dell: {
    url: 'https://www.dell.com/pt-br/shop/ofertas/dell-g3-15/spd/g-series-15-3579-laptop/cag3579w10h191421brw',
    title: 'Dell G3 15',
    idTitle: '#sharedPdPageProductTitle',
    classTitle: '.hidePageTitle',
    idPrice: '#starting-price',
  },
}

request(produtos.dell.url, async (err, response, html) => {
  console.log('====>>>>> iniciei a pesquisa!!!');
  if (err) {
    console.log(err)
  } else {
    const $ = await cheerio.load(html)
    const titulo = $(`${produtos.dell.idTitle}${produtos.dell.classTitle}`).text().trim()
    const valor = $(`${produtos.dell.idPrice}`).text().trim().split(',')[0]
    try {
      const save = await list.create({
        nome: titulo,
        valor,
        url: produtos.dell.url,
        ultimaconsulta: Date.now(),
      })
      console.log(save)
    } catch (e) {
      console.log(e)
    }
  }
  console.log('====>>>>> finalizei a pesquisa!!!');
})
