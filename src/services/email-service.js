'user strict';

var config = require('../config');
var sendgrid = require('sendgrid')(config.sendgridkey);

exports.send = async (to, subject, body) => {
    sendgrid.send({
        to: to,
        from: 'suportegap-1@gap1.com',
        subject: subject,
        html: body
    })
}