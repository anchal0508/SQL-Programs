const connection = require('../utils/db-connections');
const db = require('../utils/db-connections');

const addEntries = (req, res) => {
    // res.send('Add entries function calling');

    const {email, name} = req.body;
    const insertQuery = `INSERT INTO STUDENTS (email, name) VALUES (?, ?)`;

    db.execute(insertQuery, [email, name], (err)=>{
        if(err){
            console.log(err.message);
            res.status(500).send(err.message);
            db.end();
            return;
        }
        console.log('Value has been inserted');
        res.status(200).send(`Student with name ${name} Successfully added` );
    });
}



const updateEntry = (req, res) =>{
    const {id} = req.params;
    const {name} = req.body;
    const updateQuery = `UPDATE STUDENTS SET name = ? WHERE ID = ?`;

    db.execute(updateQuery, [name,id], (err, result) =>{
        if(err){
            console.log(err.message);
            res.status(500).send(err.message);
            db.end();
            return;
        }
        if(result.affectedRows === 0){
            res.status(404).send('Student not Found');
            return;
        }

        res.status(200).send("Student has been updated");
    })
}


const deleteEntry = (req, res) =>{
    const {id} = req.params;
    const deleteQuery = ` DELETE FROM STUDENTS WHERE id = ?`;


    db.execute(deleteQuery, [id], (err, results)=> {
        if(err){
            console.log(err.message);
            res.status(500).send(err.message);
        }

        if(results.affectedRows === 0){
            res.status(404).send('Student not Found');
            return ;
        }

        res.status(200).send(`Student with ID : ${id} is deleted`);

    })
}
module.exports = {
    addEntries,
    updateEntry,
    deleteEntry
}