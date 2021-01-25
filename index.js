const mongoose = require('mongoose');
const express = require('express');
const app = express();
const problemSet = require('./models/problemSetModel');
const authRouter = require('./routes/authenticationRoutes');
app.use(express.json());
app.use('/', authRouter);


const insertData = async () =>{
    try {
    const newSet = await problemSet.create({
        "Title":"Hello World",
        "Link":"https://www.geegsforgeek.org",
        "Solved":false,
    });
    console.log(newSet);
} catch(err){
    console.log(err);
}
}

insertData();



module.exports = app;