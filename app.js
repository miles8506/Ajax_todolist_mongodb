const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./router.js');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public/')));
app.use(express.static(path.join(__dirname, '/node_modules/')));
app.use(express.static(path.join(__dirname, '/mongo/')));
app.use(router);
app.use((err, req, res, next) => {
    res.status(500).json({
        status: 0,
        message: err.message
    });
});
app.listen(3000, () => {
    console.log('running')
});

