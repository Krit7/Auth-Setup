//LIBRARY IMPORTS
const express = require('express')
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session')

//APP SETUP
const app = express()
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', 'views');



//MONGO IMPORTS & SETUP
const mongoConnect = require('./util/database').mongoConnect
const store = require('./util/sessionStore')

//MONGOOSE CONNECT
mongoConnect()



//DEPENDENCIES SETUP
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())

app.use(session({
    secret: 'auth',
    resave: false,
    saveUninitialized: false,
    store: store
}))



//MIDDLEWARE IMPORTS
const middleware=require('./middlewares/middlewares')

//MIDDLEWARE USE
app.use(middleware.checkUser)

app.use(middleware.setLocals)


//ROUTES IMPORT
const userRoutes = require('./routes/userRoutes')
const shopRoutes = require('./routes/shopRoutes')

//ROUTES USE
app.use('/auth', userRoutes)
app.use('/', shopRoutes)




app.listen(3000, (req, res) => {
    console.log("Server Started Listening!")
})

