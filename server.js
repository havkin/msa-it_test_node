const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const config = require('./config.json');

mongoose.connect( "mongodb://localhost:27017", config, (err) => {
    if (err) {
        return console.log(err);
    }
    return console.log('connected to DB');
});


const Router = require('./routes/router');

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
// app.use(express.static(path.resolve(__dirname, 'dist')));

app.use('/', Router);

app.listen(3030, () => {
    console.log('Server listening at port 3030...', new Date());
});