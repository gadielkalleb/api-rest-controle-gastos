const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const scraping = require('./app/middlewares/scraping')

const app = express();
const port = process.env.PORT || 3000;

const auth = require(path.resolve('./app/routes/auth'))
const gastosMensais = require(path.resolve('./app/routes/gastosMensais'))
const listaDesejos = require(path.resolve('./app/routes/listadesejos'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));

app.use('/auth', auth)
app.use('/gastosmensais', gastosMensais)
app.use('/listadesejos', listaDesejos)

setInterval(() => {
  scraping()
}, 1000);

app.listen(port, () => console.log(`escutando na porta ${port}`))
