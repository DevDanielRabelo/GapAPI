'use strict'

const repository = require('../repositories/produto-repository');
// const azure = require('azure-storage');
const guid = require('guid');
const config = require('../config');

exports.get = async (req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            massage: 'Falha ao processar sua requisição'
        });
    }
};

exports.getBySlug = async (req, res, next) => {
    try {
        var data = await repository.getBySlug(req.params.slug);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            massage: 'Falha ao processar sua requisição'
        });
    }
};

exports.getById = async (req, res, next) => {
    try {
        var data = await repository.getById(req.params.id);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            massage: 'Falha ao processar sua requisição'
        });
    }
};

exports.getByTag = async (req, res, next) => {
    try {
        var data = await repository.getByTag(req.params.tag);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            massage: 'Falha ao processar sua requisição'
        });
    }
};

exports.post = async (req, res, next) => {
    try {

        //Criando o blob Service
        // const blobSvc = azure.createBlobService(config.containerConnectionString);

        let filename = guid.raw() + '.jpg';
        // let rawdata = req.body.image;
        // let matches = rawdata.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        // let type = matches[1];
        // let buffer = new Buffer(matches[2], 'base64');

        // //Salvar Imagem
        // await blobSvc.createBlockBlobFromText('product-images', filename, buffer, {
        //     contentType: type
        // }, function (error, result, response) {
        //     if (error) {
        //         filename = 'default-product.png'
        //     }
        // });

        var product = await repository.create({
            nome: req.body.nome,
            slug: req.body.slug,
            descricao: req.body.descricao,
            preco: req.body.preco,
            active: true,
            tags: req.body.tags,
            images: req.body.images
        });

        res.status(201).send(product = {
            _id: product._id,
            nome: product.nome,
            slug: product.slug,
            descricao: product.descricao,
            preco: product.preco,
            active: product.active
        });

    } catch (e) {
        if (e.errmsg) {
            res.status(500).send({
                massage: e.errmsg,
                data: e
            });
        }
        res.status(500).send({
            massage: 'Falha ao processar sua requisição',
            data: e
        });
    }
};

exports.put = async (req, res, next) => {
    try {
        await repository.update(req.params.id, req.body);
        res.status(200).send({
            massage: 'Produto atualizado com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            massage: 'Falha ao processar sua requisição'
        });
    }
};

exports.delet = async (req, res, next) => {
    try {
        var id = await repository.delet(req.body.id);
        res.status(200).send({id: id});
    } catch (e) {
        res.status(500).send({
            massage: 'Falha ao processar sua requisição'
        });
    }
};