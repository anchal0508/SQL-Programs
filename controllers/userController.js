const db = require('../utils/db-connection');

exports.addUser = (req, res) => {
    const { NAME, PHONE } = req.body;
    const insertQuery = `INSERT INTO USERS (NAME, PHONE) VALUES ( ? , ? )`;

    db.execute(insertQuery, [NAME, PHONE], (err, result)=>{
        if(err){
            console.log(err.message);
            
            return res.status(500).send(err.message);
            
        }
        console.log('User added Successfully');
        res.status(200).send(`Users with ID number : ${result.insertId} has been added Successfully!`);
    });
}