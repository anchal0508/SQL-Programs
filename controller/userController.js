const { Sequelize } = require('sequelize');
const User = require('../models/user');
const sequelize = require('../util/db-connection');

exports.addUser = async (req, res) => {
    try {
        const { name, phone, email } = req.body;
        const data = await User.create({ name, phone, email });
        res.status(201).json({ newUserDetail: data });
    } catch (err) {
        console.log(error.message);
        res.status(500).json({ error: err })
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send(error);
    }
};


exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, phone, email } = req.body;

        const user = await User.findByPk(id);
        if (!user) {
            res.status(404).send('User Not Found...');
        }
        await user.update({
            name: name || User.name,
            phone: phone || User.phone,
            email: email || User.email
        })

        res.status(200).send('User Has been Updated Successfully...');

    } catch (error) {
        res.status(500).send('User can not be updated: ' + error.message);
    }
};


exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteRows = await User.destroy({
            where: { id: id }
        })

        if (deleteRows === 0) {
            return res.status(404).send('User did not Found');
        }
        res.status(200).send('User has been deleted...');

    } catch (error) {
        console.log(error);
        res.status(500).send('Error' + error.message);
    }
}