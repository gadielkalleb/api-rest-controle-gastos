const path = require('path')

const mongoose = require(path.resolve('./db'))

const ListaDesejosSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'user',
    required: true,
  },
  produto: [{
    nome: { type: String },
    valor: { type: String },
    urllojaoficial: { type: String },
    urllojaalternativa: { type: String },
    ultimaconsulta: { type: Date },
    lowercase: true,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('ListaDesejos', ListaDesejosSchema)
