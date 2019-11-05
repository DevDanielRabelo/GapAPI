'use strict';

const mongoose = require("mongoose");
const Product = mongoose.model('Produto');

exports.get = async () => {
    const res = await Product
        .find({
            active: true
        }, 'nome preco slug');
    return res;
}

exports.getBySlug = async (slug) => {
    const res = await Product.findOne({
        slug: slug,
        active: true
    }, 'nome descricao preco slug tags');
    return res;
}

exports.getByTag = async (tag) => {
    const res = await Product.find({
        tags: tag,
        active: true
    }, 'nome descricao preco slug tags');
    return res;
}

exports.create = async (data) => {
    var product = new Product(data);
    await product.save();
}

exports.update = async (id, data) => {
    await Product.findByIdAndUpdate(id, {
        $set: {
            nome: data.nome,
            descricao: data.descricao,
            preco: data.preco,
            slug: data.slug
        }
    });
}

exports.delet = async (id) => {
    await Product.findOneAndRemove(id);
}