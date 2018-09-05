const path = require('path')

const mongoose = require(path.resolve('./db'))
const DespesaSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'user',
    required: true,
  },
  nome: {
    type: String,
    lowercase: true,
    required: true,
  },
  descricao: {
    type: String,
    lowercase: true,
    required: false,
  },
  tipo: {
    type: String,
    enum: ['moradia', 'mercado', 'celular', 'vestuario', 'saude', 'emergencia', 'estudos', 'outros'],
    required: true,
  },
  subtipo: {
    type: String,
    lowercase: true,
    required: false,
  },
  valor: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Despesa', DespesaSchema)
