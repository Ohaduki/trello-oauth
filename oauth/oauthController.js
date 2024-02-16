oauth = require('./oauth')
tokens = require('../lib/tokens')

class OauthController {

    static login(req, res){
        oauth.getOAuthRequestToken((error, token, tokenSecret, results) => {
            if (error) {
                res.status(500).send(error)
            } else {
                tokens[token] = tokenSecret
                res.redirect(`https://trello.com/1/OAuthAuthorizeToken?oauth_token=${token}&scope=write,read`)
            }
        })
    }

    static getToken(req, res, next){
        const { oauth_token, oauth_verifier } = req.query
        oauth.getOAuthAccessToken(oauth_token, tokens[oauth_token], oauth_verifier, (error, accessToken, accessTokenSecret, results) => {
            if (error) {
                res.status(500).send(error)
            }
            else {
                res.cookie('trello_token', accessToken)
                res.redirect(`${process.env.SERVER_URL}`)
            }
        })
    }
}

module.exports = OauthController