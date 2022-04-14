const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors");

//Server create
const app = express();

app.use(express.json());
app.use(cors());

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
      mongoose.connect('mongodb://localhost/yogarestapis');
      console.log("Database connected");
    } catch (error) {
      console.error('el error',error);
    }
  };

//Port
app.listen(4000, () =>{
    console.log('api ready port 4000');
    connectDb()
});



