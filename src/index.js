const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors");
require('dotenv').config({path:'.env'});

//Server create
const app = express();

app.use(express.json());

//define a domain to receive the requests
const whitelist =[process.env.FRONTEND_URL];
const corsOptions = {
  origin: (origin, callback) =>{
    // console.log(origin);
    //check if request exist in whitelist
    const existDomain = whitelist.some(domain => domain === origin);
    if (existDomain){
      callback(null, true)
    }else{
      callback(new Error('Acceess denied'))
    }
  }
}

//use corse
app.use(cors(corsOptions));

//Body Parser Start 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

//Apps´s route
app.use('/', routes());

app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({ message: error.message });
});

//Conect to Mongo
const connectDb = () => {
    try {
      mongoose.connect(process.env.DB_URL);
      console.log("Database connected");
    } catch (error) {
      console.error('el error',error);
    }
  };

//Host
const host = process.env.HOST || '0.0.0.0';

//PORT
const port = process.env.PORT || 4000;

//Port
app.listen(port, host, () =>{
    console.log('api ready port');
    connectDb()
});



