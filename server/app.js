//LIBRARY IMPORTS
const express = require('express')
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session')


const app = express()


app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', 'views');

//FILE IMPORTS
const mongoConnect = require('./util/database').mongoConnect
const ProductController = require('./controllers/ProductController')
const UserController = require('./controllers/UserController')
const store = require('./util/sessionStore')

const User = require('./models/User')
//ROUTES IMPORT
const userRoutes = require('./routes/userRoutes')

//MONGOOSE CONNECT
mongoConnect()

//Dependencies Setup
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())

app.use(session({
    secret: 'auth',
    resave: false,
    saveUninitialized: false,
    store: store
}))



//Middleware to get the user if it is and set the user object in browser to use its function
app.use((req, res, next) => {
    if (!req.session.isLoggedIn) {
        console.log('Not Logged In')
        next()
    } else {
        User.findOne(req.session.User._id)
            .then(AuthenticatedUser => {
                req.User = AuthenticatedUser
                console.log(`Logged In`)
                next()
            }).catch(err => {
                console.log(err)
            })
    }
})

//Middleware to send the isAuth to all the routes automatically
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    next();
  });

app.use('/auth', userRoutes)

app.get('/', (req, res) => {
    res.render('shop/index', {
        pageTitle: 'Shop',
        path: '/'
    });
})

app.listen(3000, (req, res) => {
    console.log("Server Started Listening!")
})

