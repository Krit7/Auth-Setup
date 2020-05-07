const isAuth=(req,res,next)=>{
    if(req.session.isLoggedIn){
        next()
    }else{
        //console.log('Not Logged In! You have To Login First')
        res.redirect('/auth/login')
    }
}

module.exports={
    isAuth
}