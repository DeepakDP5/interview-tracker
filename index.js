const mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
const express = require('express');
const authcontroller = require('./controllers/authenticationController');
const app = express();
const problemSet = require('./models/problemSetModel');
const authRouter = require('./routes/authenticationRoutes');
app.set('view engine', 'ejs');
app.use(express.json());
app.use(cookieParser());
app.use('/', authRouter);
app.get('/', authcontroller.protect, (req,res) => {
    console.log(req.user);
    res.render('home', {user:req.user} );
});
app.use((req,res) => {
    res.status(404).render('404');
});
module.exports = app;