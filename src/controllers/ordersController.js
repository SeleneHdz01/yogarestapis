const express = require('express');
const Orderbuy = require('../models/Orders');

exports.newOrderbuy = async(req, res, next) =>{
    const order = new Orderbuy(req.body);

    try {
         await order.save();
         res.json({message: 'Add new order'})  
    } catch (error) {
        console.log(error);
        next()
    }


} 

exports.getOrdersbuy = async(req,res, next) =>{
    try {
        
        const orders = await Orderbuy.find({}).populate('client').populate({
            path: 'order.product',
            model: 'Products'
        });
        console.log(orders);
        res.json(orders);

    } catch (error) {
        console.log(error);
        next();
    }
} 

exports.getOrderbuy = async(req, res, next) =>{

    const order = await Orderbuy.findById(req.params.idOrder).populate('client').populate({
        path: 'order.product',
        model: 'Products'
    });

    if(!order){
        res.json({message:'Order dont exist'});
       next();
    } 
    res.json(order);
} 

//Update Order by Id
exports.updateOrder = async(req, res, next) =>{
    
    try {
        let order = await Orderbuy.findOneAndUpdate({_id:req.params.idOrder}, req.body,{new:true});
        res.json(order);
    } catch (error) {
        console.log(error);
        next();
    }
    
} 

//Delete order by Id
exports.deleteOrder = async(req, res, next) =>{
    try {
        await Orderbuy.findOneAndDelete({_id:req.params.idOrder})
        res.json({ message: 'Order delete' })
    } catch (error) {
        console.log(error);
        next()
    }

} 




