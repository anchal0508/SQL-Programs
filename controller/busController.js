// const db = require('../utils/db-connection');
const Bus = require('../models/bus');
const sequelize = require('../utils/db-connection');
const {Op} = require('sequelize');



exports.addBus = async (req, res)=>{
    try{
        const {busName, totalSeats, availableSeats} = req.body;
        const bus = await Bus.create({
            busName: busName,
            totalSeats: totalSeats,
            availableSeats: availableSeats
        });
        res.status(201).send('Bus created ....');

    }catch(error){
        res.status(500).send('Unable to make Entry...');
    }
}

exports.getAvailableBus = async (req, res) => {
    try{
        const {seats} = req.params;
        const buses = await Bus.findAll({
            where: {
                availableSeats: {[Op.gt] : parseInt(seats)}
            }
        });
        res.status(200).send(buses);
    }catch(error){
        res.status(500).send(error.message);
    }
}