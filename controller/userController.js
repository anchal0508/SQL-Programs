const User = require('../models/user');

const signup = async (req, res) => {
    try {
        const signup = await User.create(req.body);
        res.status(200).json(signup);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
}


module.exports = {
    signup,
}