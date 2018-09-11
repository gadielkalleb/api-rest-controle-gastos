const path = require('path')

const mongoose = require(path.resolve('./db'))

const ListaDesejosSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'user',
    required: true,
  },
  nome: { type: String },
  valor: { type: String },
  valorAntigo: [{
    valor: String,
  }],
  urllojaoficial: { type: String },
  urllojaalternativa: { type: String },
  idTitle: { type: String },
  classTitle: { type: String },
  idPrice: { type: String },
  isScraping: { type: Boolean },
  ultimaconsulta: { type: Date },
  message: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('ListaDesejos', ListaDesejosSchema)
