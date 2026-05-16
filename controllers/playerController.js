const Player = require('../models/player');


const getByName = async (req, res) => {
    try {
        const  name  = req.params.name;
        const player = await Player.findOne({
            where: {
                name: name
            }
        });

        if (!player) {
            return res.status(404).send('Player not Found...');
        }

        res.status(200).json(player);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const addPlayer = async (req, res) => {
    try {

        const addingPlayer = await Player.create(req.body);
        res.status(201).json(addingPlayer);
        console.log(addingPlayer);

    } catch (error) {

        res.status(500).json({ message: error.message });
        console.log(error.message);
        
    }
}

module.exports = {
    getByName,
    addPlayer
}