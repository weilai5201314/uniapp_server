// src/controllers/order/index.js

const addShoppingCart = require('./addShoppingCart');

module.exports = {
    '/addShoppingCart': {
        method: 'post',
        handler: addShoppingCart.addShoppingCart
    },


};
