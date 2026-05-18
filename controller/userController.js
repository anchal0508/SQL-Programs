const User = require('../models/user');

const signup = async (req, res) => {
    try {
        const signup = await User.create(req.body);
        res.status(200).json(signup);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
}

const login = async (req, res) => {
    try {
        const { email, pass } = req.body;

        if (!email || !pass) {
            res.status(400).json({ message: "Please enter both Email and Password...!" });
        }

        const login = await User.findOne({
            where: {
                email: email
            }
        });

        if (!login) {
            return res.status(401).json({ message: "user Does not exists...!" });
        }
        else if (login.pass !== pass) {
            return res.status(401).json({ message: "user exists but password is wrong...!" });
        }

        res.status(200).json({
            message: "logged in Successfully...!",
            success: true,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = {
    signup,
    login,
}