const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productsSchema = new Schema({
    name:{
        type: String,
        trim: true
    },
    description:{
        type: String
    }, 
    price:{
        type: Number
    },
    image:{
        type: String
    } 

});

module.exports = mongoose.model('Products', productsSchema);

