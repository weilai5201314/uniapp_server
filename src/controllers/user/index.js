// src/controllers/index.js

const loginController = require('./login');

module.exports = {
    '/login': {
        method: 'post',
        handler: loginController.handleLogin
    },

};
