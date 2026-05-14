const { Sequelize, DataTypes } = require('sequelize');
const UserTable = require('../models/userTable');
const sequelize = require('../utils/db-connection');
const IdentityCard = require('../models/identitycard');

const addUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, phone, email, location } = req.body;

        const addUser = await UserTable.create({
            name: name,
            phone: phone,
            email: email,
            location: location
        });

        res.status(200).json({ 'newUser': addUser });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const list = await UserTable.findAll();
        res.status(200).json(list);

    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
}

const deleteUser = async (req, res) => {
    try {

        const { id } = req.params;
        const deletedRows = await UserTable.destroy({
            where: {
                id: id
            }
        });

        if (deletedRows === 0) {
            res.status(404).send("User not found...");
        }

        res.status(200).send('User Deleted...');

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}


const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, phone, email, location } = req.body;

        const [updatedUser] = await UserTable.update(
            { name, phone, email, location },
            { where: { id: id } }
        )

        if (updateUser === 0) {
            return res.status(404).send('User Not Found...');
        }
        res.status(200).send('User has been updated...');
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
}


const addingValuesToUserAndIdentityTable = async (req, res) => {
    try {
        const user = await UserTable.create(req.body.users);
        const idCard = await IdentityCard.create({
            ...req.body.IdentityCard,
            UserId: user.id
        })
        res.status(201).json({ users, idCard });
    } catch (error) {
       if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            console.log("Validation Errors:", error.errors.map(e => e.message));
            return res.status(400).json({ error: error.errors.map(e => e.message) });
        }
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    addUser,
    getAllUsers,
    deleteUser,
    updateUser,
    addingValuesToUserAndIdentityTable
}