require('dotenv').config({ path: '.env' });
const { default: axios } = require('axios');
const app = require('./app');
const OauthController = require('./oauth/oauthController');

app.get('/login', OauthController.login)

app.get('/callback', OauthController.getToken)

app.get('/boards', async (req, res) => {
    const token = req.cookies.trello_token
    try{
        data = await axios.get(`https://api.trello.com/1/members/me/boards?key=${process.env.TRELLO_KEY}&token=${token}`)
        res.ok(data.data)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.post('/boards', async (req, res) => {
    const token = req.cookies.trello_token
    const { name } = req.body
    try{
        data = await axios.post(`https://api.trello.com/1/boards?key=${process.env.TRELLO_KEY}&token=${token}&name=${name}`)
        res.ok()
    } catch (error) {
        res.status(500).send(error)
    }
})

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})