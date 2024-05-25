// src/controllers/image/index.js


const uploadImage = require('./uploadImage');

module.exports = {
    '/uploadImage': {
        method: 'post',
        handler: uploadImage.uploadImage
    }
};