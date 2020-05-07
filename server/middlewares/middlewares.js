const User = require('../models/User')

//Middleware to get the user if it is and set the user object in browser to use its function
const checkUser=(req, res, next) => {
    if (!req.session.isLoggedIn) {
        // console.log('Not Logged In')
        next()
    } else {
        User.findOne(req.session.User._id)
            .then(AuthenticatedUser => {
                req.User = AuthenticatedUser
                // console.log(`Logged In`)
                next()
            }).catch(err => {
                console.log(err)
            })
    }
};

//Middleware to send the isAuth to all the routes automatically
const setLocals=(req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    next();
};

module.exports={
    setLocals,
    checkUser
}