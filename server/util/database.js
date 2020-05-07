const mongodb = require('mongodb');
const mongoose = require('mongoose')
const MongoClient = mongodb.MongoClient;

const MONGO_URI = "mongodb+srv://default-user:krit7@auth-5nmyx.mongodb.net/Auth?retryWrites=true&w=majority"
// const MONGO_URI = 'mongodb://localhost/auth'


const mongoConnect = () => {
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
    .then(client => {
      console.log('Connected To Database!');
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

module.exports = {
  mongoConnect,
}
