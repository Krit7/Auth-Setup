const express = require('express')
const router = express.Router()

const shopController = require('../controllers/shopController')

//isAuth Middleware Import
const middleware=require('../middlewares/isAuth')


router.get('/', shopController.getHome)

router.get('/products', shopController.getProduct)

router.get('/cart', middleware.isAuth ,shopController.getCart)

module.exports=router