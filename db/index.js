const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://localhost:27017/api-rest', { useNewUrlParser: true });
mongoose.Promise = global.Promise;
module.exports = mongoose;
