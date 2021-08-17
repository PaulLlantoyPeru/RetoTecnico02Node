// const db = require("../config/database");
// const Client = db.getModel('client');

const models = require('../../models');
const Client = models.Client;
const { Op } = require("sequelize");
const sequelize = require("sequelize");

exports.saveClient = async (payload) => {
    return await Client.create(payload);
}


exports.getClientsOrderByAlpha = async () => {
    return await Client.findAll({
        attributes:['id', 'fullName','documentNumber', 'alpha'],
        order: [
            ['fullName',  'ASC']
        ]
    });
}


exports.searchClients = async (payload) => {
    return await Client.findAll({
        attributes:['id', 'fullName','documentNumber'],
        where : {
            fullName: {
                [Op.like]: `%${payload}%`
            }
        }
    });
}

exports.searchClientsCreditsByName = async (payload) => {
    return await Client.findAll({
        attributes:['id', 'fullName','documentNumber'],
        include: ['newCredits'],
        where : {
            fullName: {
                [Op.like]: `%${payload}%`
            }
        }
    });
}

exports.updateClientFilds = async ( clientId, payload) => {
    console.log({clientId, payload});
    return await Client.update(
        payload,
        {where: {id: clientId}}
    )
}