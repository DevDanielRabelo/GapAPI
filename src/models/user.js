'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    nome: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    acessos: [{
        type: String,
        require: true,
        enum: ['user', 'admin'],
        default: 'user'        
    }]
});

module.exports = mongoose.model('Usuario', schema);