// src/controllers/index.js

const loginController = require('../user/login');

module.exports = {
    '/xxx': {
        method: 'post',
        handler: loginController.handleLogin
    },
    '/xxx2': {
        method: 'get',
        handler: loginController.handleLogin
    },
};
