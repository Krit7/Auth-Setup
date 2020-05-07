const express = require('express')
const router = express.Router()

const userController = require('../controllers/UserController')

router.get('/register', userController.getRegister)

router.post('/register', userController.postRegister)

router.get('/login', userController.getLogin)

router.post('/login', userController.postLogin)

router.post('/logout', userController.postLogout)

module.exports = router