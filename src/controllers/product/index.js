// src/controllers/product/index.js

const productController = require('./addProduct');

module.exports = {
    '/addProduct': {
        method: 'post',
        handler: productController.addProduct
    },

};
