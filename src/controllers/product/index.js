// src/controllers/product/index.js

const addProduct = require('./addProduct');
const getProduct = require('./getProduct');
module.exports = {
    '/addProduct': {
        method: 'post',
        handler: addProduct.addProduct
    },
    '/getAllProducts': {
        method: 'get',
        handler: getProduct.getAllProducts
    }

};
