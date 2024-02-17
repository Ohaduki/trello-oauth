userCheck = (req, res, next) => {
    const { trello_token } = req.cookies
    if (!trello_token) {
        return res.status(401).send('Not authenticated')
    } else {
        return next()
    }
}

module.exports = userCheck