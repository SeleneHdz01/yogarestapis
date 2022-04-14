const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderbuySchema = new Schema({
    client:{
        type:Schema.ObjectId,
        ref: 'Clients'
    },
    order: [{
        product:{
            type: Schema.ObjectId,
            ref: 'Product'
        },
        quantity: Number 
    }],
    total:{
        type:Number
    }    
})

module.exports =  mongoose.model('Orderbuy', orderbuySchema);

