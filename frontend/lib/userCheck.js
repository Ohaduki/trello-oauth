userCheck = (req, res, next) => {
    const { trello_token } = req.cookies
    if(req.url === '/login' || req.url === '/callback') {
        return next()
    }
    if (!trello_token) {
        res.redirect('/login')
    } else {
        return next()
    }
}