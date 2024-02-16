const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userCheck = require('./lib/userCheck');
const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
    res.ok = (data) => {
        res.status(200).send(data);
    }
    next();
})

app.use(userCheck);

module.exports = app;