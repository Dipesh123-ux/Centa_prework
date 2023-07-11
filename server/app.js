const express = require("express");
const { json, urlencoded } = require("body-parser");
const cors = require("cors");
require('dotenv').config();

const app = express();


// all routes

const adminRoute = require('./routes/admin');
const userRoute = require('./routes/user')

// middlewares
app.use(cors());
app.use('*',cors());
app.use(json());
app.use(urlencoded({ extended: true }));

//use routes

app.use('/admin', adminRoute);
app.use('/user', userRoute);


module.exports = app;