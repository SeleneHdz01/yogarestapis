const express = require('express');
const Products = require('../models/Products');
const router = express.Router();
const multer = require('multer');
const shortid  = require('shortid')

const configurationMulter ={
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname+'/../uploads/');
        },
        filename: (req, file, cb) =>{
            const extension = file.mimetype.split('/')[1];
            cb(null,`${shortid.generate()}.${extension}`);
        }    
    }),
    fileFilter(req, file, cb){
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
            cb(null, true);
        }else{
            cb(new Error('Format not valid'))
        } 
    } 
} 

//Give configuration to field
const upload = multer(configurationMulter).single('image');

//Upload file
exports.uploadFile = (req, res, next) =>{

    //image
    upload(req, res, (error) =>{
        if(error){
            res.json({message: error}  )
        } 
        return next();
    } )
} 

//Add new Product
exports.newProduct = async(req, res, next) => {
    const product = new Products(req.body);

    try {
        if(req.file.filename){
            product.image = req.file.filename
        } 
        //add new Product
        await product.save();
        console.log(product);
        res.json({message:'Add new Product' })

    } catch (error) {
        console.log(error);
        next();
        
    }

}

//Get products
exports.getproducts = async(req, res, next) =>{
    try {
        
        const products = await Products.find({});
        res.json(products);

    } catch (error) {
       
        console.log(error);
        next()
    }
} 

//Get product by ID
exports.getProduct = async(req, res, next) =>{
    const product = await Products.findById(req.params.idProduct);

    if(!product){
        res.json({message:'Product dont exist'});
        return next();
    } 
    res.json(product);
} 

//Update product by ID
exports.updateProduct = async(req, res, next) =>{

    try {
        //get product by Id
        let lastProduct = await Products.findById(req.params.idProduct);
        
        //do new product
        let newProduct = req.body;

        //validate if exist new image
        if(req.file){
            newProduct.image = req.file.filename;
        }else{
            newProduct.image = lastProduct.image;
        }  


        let product = await Products.findOneAndUpdate({_id: req.params.idProduct}, req.body,{ new: true}  )
        res.json(product);

    } catch (error) {
        console.log(error);
        return next();
    }
} 

//Delete product by Id
exports.deleteProduct = async(req, res, next) =>{
    try {
        await Products.findOneAndDelete({_id:req.params.idProduct})
        res.json({message:'Deleted product'} )
        
    } catch (error) {
        console.log(error);
        return next();
    }
} 




