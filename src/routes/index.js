const express = require('express');
const router = express.Router();
const clientsController = require('../controllers/clientsController');
const productsController = require('../controllers/productsController');
const ordersController = require('../controllers/ordersController');



module.exports = () => {

    /**Clients */
    //add new clients for post
    router.post('/clients', clientsController.newClient)
    
    //get new client
    router.get('/clients', clientsController.getClients)
    
    //get one client
    router.get('/clients/:idClient', clientsController.getClient)

    //update client
    router.put('/clients/:idClient', clientsController.updateClient)

    //delete client
    router.delete('/clients/:idClient', clientsController.deleteClient)
    

    /**Products */
    //add new product
    router.post('/products', 
    productsController.uploadFile,
    productsController.newProduct)
    
    //get product
    router.get('/products', productsController.getproducts)
    
    //get product by ID
    router.get('/products/:idProduct', productsController.getProduct)

    //update product
    router.put('/products/:idProduct', 
    productsController.uploadFile,
    productsController.updateProduct)

    //delete produc
    router.delete('/products/:idProduct', productsController.deleteProduct)


    /**Orders */
    //new order
    router.post('/orders', ordersController.newOrderbuy);

    //get order
    router.get('/orders', ordersController.getOrdersbuy);

    //get order by Id
    router.get('/orders/:idOrder', ordersController.getOrderbuy);

    //Update order by Id
    router.put('/orders/:idOrder', ordersController.updateOrder);

    //Delete order by Id
    router.delete('/orders/:idOrder', ordersController.deleteOrder)


    return router;
} 
