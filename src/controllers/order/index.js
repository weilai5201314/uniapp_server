// src/controllers/order/index.js

const addShoppingCart = require('./addShoppingCart');
const getShoppingCart = require("./getShoppingCart");
const deleteShoppingCart = require("./deleteShopping");

module.exports = {
    '/addShoppingCart': {
        method: 'post',
        handler: addShoppingCart.addShoppingCart
    },
    '/getShoppingCart': {
        method: 'post',
        handler: getShoppingCart.getShoppingCart
    },
    '/deleteShoppingCart': {
        method: 'delete',
        handler: deleteShoppingCart.deleteShoppingCart
    }


};
