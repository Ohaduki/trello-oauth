const OAuth = require('oauth')


const oauth = new OAuth.OAuth(
    requestUrl = 'https://trello.com/1/OAuthGetRequestToken',
    accessUrl = 'https://trello.com/1/OAuthGetAccessToken',
    consumerKey = process.env.TRELLO_KEY,
    consumerSecret = process.env.TRELLO_OAUTH_SECRET,
    version = '1.0A',
    authorise_callback = `${process.env.SERVER_URL}/callback`,
    signatureMethod = 'HMAC-SHA1'
)

module.exports = oauth