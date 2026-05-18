const User = require('../models/user');
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
    try {

        const { name, email, pass } = req.body;
        if ((isstringinvalid(name) || isstringinvalid(email) || isstringinvalid(pass))) {
            return res.status(400).json({ err: "Bad parameters . Somthing is missing..." });
        }

        const saltround = 10;

        bcrypt.hash(pass, saltround, async (err, hash) => {
            console.log(err);
            await User.create({ name, email, pass: hash })
            res.status(201).json({ message: "Successfully created new User..." });
        })


    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
}


function isstringinvalid(string) {
    if (string == undefined || string.trim().length === 0) {
        return true; // String invalid hai
    }
    return false; // String sahi hai
}


const login = async (req, res) => {
   try {
        const { email, pass } = req.body;

        if (isstringinvalid(email) || isstringinvalid(pass)) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        const user = await User.findOne({ where: { email } });
        
        if (!user) {
            return res.status(404).json({ message: "User does not exist...!" });
        }

        // Compare parameters: (Plain Text Input, Database Hashed Password)
        const isMatch = await bcrypt.compare(pass, user.pass);

        if (isMatch) {
            return res.status(200).json({
                message: "Logged in Successfully...!",
                success: true,
                user: { id: user.id, email: user.email, name: user.name }
            });
        } else {
            // Password invalid status
            return res.status(401).json({ message: "User exists but password is wrong...!" });
        }

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
}


module.exports = {
    signup,
    login,
}