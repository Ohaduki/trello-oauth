require('dotenv').config({ path: '.env' });
const { default: axios } = require('axios');
const app = require('./app');
const OauthController = require('./oauth/oauthController');
const { validateSchema } = require('./schema/validateSchema');
const { boardSchema } = require('./schema/board.schema');

app.get('/login', OauthController.login)

app.get('/callback', OauthController.getToken)

app.get('/boards', async (req, res) => {
    app.use(userCheck)
    const token = req.cookies.trello_token
    try{
        data = await axios.get(`https://api.trello.com/1/members/me/boards?key=${process.env.TRELLO_KEY}&token=${token}`)
        res.ok(data.data)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.post('/boards', validateSchema(boardSchema), async (req, res) => {
    app.use(userCheck)
    const token = req.cookies.trello_token
    const { name } = req.body
    try{
        data = await axios.post(`https://api.trello.com/1/boards?key=${process.env.TRELLO_KEY}&token=${token}&name=${name}`,
        {
            desc : req.body.desc
        })
        res.ok()
    } catch (error) {
        res.status(500).send(error)
    }
})

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})