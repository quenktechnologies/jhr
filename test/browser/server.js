const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const port = process.env.PORT || 2407;
const app = express();

process.env.PORT = port;

app.use(function(_, res, next) {
    res.set('Cache-Control', 'no-cache, no-store');
    next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.static(`${__dirname}/../../node_modules/mocha`));
app.use(express.static(`${__dirname}/../browser/public`));

app.post('/login', function(req, res) {

    if (typeof req.body !== 'object')
        return res.status(400).end();

    if ((req.body.email === 'me@email.com') && (req.body.password === 'password'))
        return res.status(200).end();

    return res.status(409).end();

});

app.get('/json', function(_, res) {

    res.json({ a: true, b: false, c: 1, d: '1' });

});

app.get('/status/:status', function(req, res) {

    res.status(req.params.status).send({});

});

app.listen(port, () => console.log(`Started test server on port ${port}`));
