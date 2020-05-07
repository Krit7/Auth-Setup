const session = require('express-session')
const mongoStore = require('connect-mongodb-session')(session)


const MONGO_URI = "mongodb+srv://default-user:krit7@auth-5nmyx.mongodb.net/Auth?retryWrites=true&w=majority"


const Store = new mongoStore({
    uri: MONGO_URI,
    collection: 'sessions'
})


module.exports = Store
