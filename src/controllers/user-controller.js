'use strict'

const repository = require('../repositories/user-repository');
const md5 = require('md5');
const emailService = require('../services/email-service');
const authService = require('../services/auth-service');

exports.get = async (req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            massage: "Falha ao processar sua requisição"
        })
    }
}

exports.post = async (req, res, next) => {
    try {
        await repository.create({
            nome: req.body.nome,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY),
            acessos: ["user"]
        });

        emailService.send(
            req.body.email,
            'Bem Vindo ao Teste Node.js',
            global.EMAIL_TMPL.replace('{0}', req.body.nome)
        );

        res.status(201).send({ massage: 'Cliente cadastrado com sucesso!' });
    } catch (e) {
        res.status(500).send({
            massage: 'Falha ao processar sua requisição'
        });
    }
};


exports.authenticate = async (req, res, next) => {
    try {
        const user = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });
        if (!user) {
            res.status(404).send({ massage: 'Usuário ou senha inválidos' });
            return;
        }

        const token = await authService.generateToken({
            id: user._id,
            email: user.email,
            nome: user.nome,
            acessos: user.acessos
        })

        res.status(201).send({
            token: token,
            data: {
                email: user.email,
                name: user.name,
                acessos: user.acessos
            }
        });
    } catch (e) {
        console.log
        res.status(500).send({
            massage: 'Falha ao processar sua requisição'
        });
    }
};