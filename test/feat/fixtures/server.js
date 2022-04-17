const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const multer = require('multer');

const port = process.env.PORT || 9999;

process.env.PORT = port;

module.exports.start = function(cb) {

const app = express();

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
        return res.status(200).send({ok:true}).end();

    return res.status(409).end();

});

app.get('/json', function(_, res) {

    res.json({ a: true, b: false, c: 1, d: '1' });

});

app.get('/status/:status', function(req, res) {

    res.status(req.params.status).send({});

});

app.get('/cookie', function(req, res) {

    res.cookie('first', 'ignore');
    res.cookie('test', 'passed');
    res.cookie('last', 'ignore');
    res.status(200).send({});

});

app.post('/cookie', function(req, res) {

    if(req.cookies['test'] === 'passed')
        res.status(200).send({});
    else
      res.status(409).send({});

});

app.post('/file', multer({storage: multer.memoryStorage()}).single('file'),
    function(req, res) {

        if(req.body == null)
            return res.status(409).send();

                if(req.body.filename !== 'somefile')
                return res.status(409).send();

        if(typeof req.file !== 'object')
            return res.status(409).send();

        if(req.file.buffer.toString('utf8') === 'some file')
            return res.status(204).send();

        return res.status(403).send();

    });

return app.listen(port, () => cb(port));

}
