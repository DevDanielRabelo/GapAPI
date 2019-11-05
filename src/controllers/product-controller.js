'use strict'

const repository = require('../repositories/produto-repository');
const mongoose = require("mongoose");
const Product = mongoose.model('Produto');

// exports.get = async (req, res, next) => {
//     try {
//         var data = await repository.get();
//         res.status(200).send(data);
//     } catch (e) {
//         res.status(500).send({
//             massage: 'Falha ao processar sua requisição'
//         });
//     }
// };

exports.get = (req, res, next) => {
        Product.find({}).then(x=>{
            res.status(200).send(x);
        }).catch(e => {
            res.status(400).send(e);
        })
    
};



// exports.getBySlug = async (req, res, next) => {
//     try {
//         var data = await repository.getBySlug(req.params.slug);
//         res.status(200).send(data);
//     } catch (e) {
//         res.status(500).send({
//             massage: 'Falha ao processar sua requisição'
//         });
//     }
// };

// exports.getByTag = async (req, res, next) => {
//     try {
//         var data = await repository.getByTag(req.params.tag);
//         res.status(200).send(data);
//     } catch (e) {
//         res.status(500).send({
//             massage: 'Falha ao processar sua requisição'
//         });
//     }
// };