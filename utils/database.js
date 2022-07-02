const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient;
let _db
const mongoConnect = callback => {
  MongoClient.connect('mongodb+srv://arunTeja:McJ5BfmvwARrpCur@cluster0.e6mns.mongodb.net/shop?retryWrites=true&w=majority')
    .then(client => {
      console.log('connected')
      _db = client.db()
      callback()
    })
    .catch(err => {
      console.log(err)
      // throw err
    })
}
// mongodb+srv://arunTeja:McJ5BfmvwARrpCur@cluster0.e6mns.mongodb.net/shop
// mongodb+srv://arunTeja:McJ5BfmvwARrpCur@test.e6mns.mongodb.net/shop?retryWrites=true&w=majority

const getDb = () => {
  if (_db) {
    return _db;
  }
  // throw 'no database found!'
}

exports.mongoConnect = mongoConnect
exports.getDb = getDb