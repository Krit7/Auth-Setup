const getHome = (req, res) => {
    res.render('shop/index', {
        pageTitle: 'Shop',
        path: '/'
    });
}

const getProduct = (req, res) => {
    res.render('shop/products', {
        pageTitle: 'Products',
        path: '/product'
    });
}

const getCart = (req, res) => {
    res.render('shop/cart', {
        pageTitle: 'Cart',
        path: '/cart'
    });
}



module.exports={
    getHome,
    getProduct,
    getCart,
}