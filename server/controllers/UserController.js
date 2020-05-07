const User = require('../models/User')
const bcrypt = require('bcryptjs')

const getRegister = (req, res) => {
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'Signup'
    });
};

const postRegister = (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const password2 = req.body.password2
    if (!password || !password2 || !email) {
        res.redirect('/auth/register')
    } else if (password != password2) {
        res.redirect('/auth/register')
    } else {
        bcrypt.genSalt(12)
            .then(salt => {
                bcrypt.hash(password, salt)
                    .then(hashPassword => {
                        const newUser = {
                            email: email,
                            password: hashPassword
                        }
                        User.create(newUser)
                            .then(createdUser => {
                                console.log('User created')
                                res.redirect('/auth/login')
                            })
                            .catch(err => {
                                console.log(err)
                                res.redirect('/auth/register')
                            })
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }
}

const getLogin = (req, res, next) => {
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
    });
};

const postLogin = (req, res) => {
    const email = req.body.email
    const password = req.body.password
    if (!password || !email) {
        res.redirect('/auth/login')
    } else {
        const user = {
            email: email
        }
        User.findOne(user)
            .then(fetchedUser => {
                if (!fetchedUser) {
                    res.redirect('/auth/login')
                } else {
                    bcrypt.compare(password, fetchedUser.password)
                        .then(isMatch => {
                            if (isMatch) {
                                req.session.User = fetchedUser;
                                req.session.isLoggedIn = true;
                                console.log('Login Successfull')
                                req.session.save(err => {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        res.redirect('/');
                                    }
                                });
                            } else {
                                res.redirect('/auth/login')

                            }
                        })
                        .catch(err => {
                            console.log(err)
                            res.redirect('/auth/login')
                        })
                }

            })
            .catch(err => {
                console.log(err)
            })
    }
}

const postLogout=(req,res)=>{
    req.session.destroy(()=>{
        res.clearCookie("connect.sid");
        res.redirect('/');
    })
}

module.exports = {
    getLogin,
    postLogin,
    getRegister,
    postRegister,
    postLogout
}