const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const Clients = require('../models/Clients');
const router = express.Router();

//Add new Client
exports.newClient = async (req, res, next) =>{

    const client = new Clients(req.body);

    try {
        //add register
        await client.save();
        res.json({message:'Add new register'});

    } catch (error) {
        //if error console.log and nex
        res.send(error);
        next();
    }
} 

//Get all clientes
exports.getClients = async (req, res, next) =>{

    try {
        const clients = await Clients.find({});

        res.json(clients);

    } catch (error) {
        console.log(error);
        next()
    } 
} 

//Get client by ID
exports.getClient = async (req, res, next) =>{
    const client = await Clients.findById(req.params.idClient);

    if(!client){
        res.json({message:'Client dont exist'});
        next();
    } 
    res.json(client);
} 

//Update client 
exports.updateClient = async (req, res, net) =>{
    const client = await Clients.findOneAndUpdate({_id:req.params.idClient}, req.body,{new:true}   );
    
    res.json(client);
    if(!client){
        res.json({message:'Client dont exist'});
        next();
    } 

} 

//Delete client
exports.deleteClient = async (req, res, next) =>{
    try {
        await Clients.findOneAndDelete({_id:req.params.idClient})
        res.json({ message: 'Client delete' })
    } catch (error) {
        console.log(error);
        next()
    }

} 
