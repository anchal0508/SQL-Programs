const db = require('../utils/db-connection');

exports.addBus = (req, res) => {
    const { BUS_NAME, TOTAL_SEATS, AVAILABLE_SEATS } = req.body;
    const busQuery = `INSERT INTO BUSES (BUS_NAME, TOTAL_SEATS, AVAILABLE_SEATS) 
                        VALUES( ? , ? , ? )`;

    db.execute(busQuery, [BUS_NAME, TOTAL_SEATS, AVAILABLE_SEATS], (err, result) => {
        if (err) {
            console.log(err.message);
            return res.status(500).send(err.message);
        }
        console.log('Bus details added successfully!');
        res.status(200).send(`bus details added with ID ${result.insertId} successfully!`);
    })
}

exports.availableSeats = (req, res) => {
    const minmumSeats = req.params.seats;
    const query = ` SELECT * FROM BUSES WHERE AVAILABLE_SEATS > ?`;

    db.execute(query, [minmumSeats], (err, result) => {
        if (err) {
            console.log(err.message);
            return res.status(500).send(err.message);
        }
        console.log(`Total available seats are :${result.length}`);
        res.status(200).json(result);
    })
}