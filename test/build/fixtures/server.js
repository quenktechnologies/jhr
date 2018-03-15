"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var cors = require("cors");
var app = express();
app.use(function (_, res, next) {
    res.set('Cache-Control', 'no-cache, no-store');
    next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.get('/', function (_, res) {
    res.send({ running: true });
});
app.post('/login', function (req, res) {
    if (typeof req.body !== 'object')
        return res.status(400).end();
    if ((req.body.email === 'me@email.com') && (req.body.password === 'password'))
        return res.status(200).end();
    return res.status(409).end();
});
app.get('/json', function (_, res) {
    res.json({ a: true, b: false, c: 1, d: '1' });
});
app.get('/status/:status', function (req, res) {
    res.status(req.params.status).send({});
});
app.listen(8000);
//# sourceMappingURL=server.js.map