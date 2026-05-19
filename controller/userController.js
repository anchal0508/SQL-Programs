const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const getAlluser = async (req, res) => {
    try {
        const users = await User.findAll(req.body);
        res.status(200).send(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addUser = async (req, res) => {
    try {
        const { name, email, pass } = req.body;

        const saltaround = 10;
        bcrypt.hash(pass, saltaround, async (err, hash) => {
            if (!err) {
                await User.create({ name, email, pass: hash });
                res.status(201).json({ message: "New User added..." });
            }
            else {
                console.log(err.message);
            }
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


function generateAccessToken(id, name){
    return jwt.sign({ userId: id , name: name}, 'my_expense_tracker_app_secret_123!');;
}



const login = async (req, res) => {
    try {
        const { email, pass } = req.body;

        const user = await User.findOne({ where: { email } });

         if (!user) {
            return res.status(404).json({ message: "User does not exist...!" });
        }

        const isMatch = await bcrypt.compare(pass, user.pass);

        if (!isMatch) {
            return res.status(404).json({ message: "PassWord is Wrong..." });
        }

        res.status(200).json({
            message: 'logging Success',
            success: true,
            token: generateAccessToken(user.id, user.name)

        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAlluser,
    addUser,
    login
}