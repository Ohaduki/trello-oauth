oauth = require('oauth')

class OauthController {
    constructor() {
        this.oauth = oauth
    }
    
    static login(req, res){
        this.oauth.getOAuthRequestToken((error, token, tokenSecret, results) => {
            if (error) {
                res.status(500).send(error)
            } else {
                res.redirect(`https://trello.com/1/OAuthAuthorizeToken?oauth_token=${token}&scope=write,read`)
            }
        })
    }

    static getToken(req, res, next){
        this.oauth.getOAuthAccessToken(token, tokenSecret, verifier, (error, accessToken, accessTokenSecret, results) => {
            if (error) {
                res.status(500).send(error)
            }
            else {
                res.cookie('trello_token', accessToken)
                res.redirect(`${process.env.CLIENT_URL}`)
            }
        })
    }
}

module.exports = OauthController