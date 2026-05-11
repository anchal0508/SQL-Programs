const db = require('../utils/db-connection');


const addStudent = (req, res) => {
    const { NAME, EMAIL, AGE } = req.body;
    const query = `INSERT INTO STUDENTS (NAME, EMAIL, AGE) VALUES ( ?, ?, ?)`;

    db.execute(query, [NAME, EMAIL, AGE], (err, result) => {
        if (err) {
            console.log(err.message);
            return res.status(500).send(err.message);
        }
        console.log(`Studend Data inserted Successfully with ID: ${result.insertId}!`);
        res.status(200).send(`Studend Data inserted Successfully with ID: ${result.insertId}!`);
    });

}

const updateStudent = (req, res) => {
    const ID = req.params.id;
    const { NAME } = req.body;
    const query = `UPDATE STUDENTS SET NAME = ? WHERE ID = ?`;

    db.execute(query, [NAME, ID], (err, result) => {
        if (err) {
            console.log(err.message);
            return res.status(500).send(err.message);
        }
        if (result.affectedRows === 0) {
            console.log('Student Not Found');
            res.status(404).send(`Student Not Found with ID: ${ID}`);
        }
        console.log(`Student name has been updated to : ${NAME}`);
        res.status(200).send(`Student name has been updated to : ${NAME}`);
    })

}


const getStudentById = (req, res) => {
    const id = req.params.id;
    const query = `SELECT * FROM STUDENTS WHERE ID = ?`;

    db.execute(query, [id], (err, result)=>{
        if(err){
            console.log(err.message);
            return res.status(500).send(err.message);
        }
        
        console.log(result);
        res.status(200).send(result);
    })
}



const getAllStudents = (req, res)=>{
    const query =   `SELECT * FROM STUDENTS`;
    db.execute(query, (err, result)=>{
        if(err){
            console.log(err.message);
            return res.status(500).send(err.message);
        }
        console.log(result);
        res.status(200).send(result);

    })
}


module.exports = {
    addStudent,
    updateStudent,
    getStudentById,
    getAllStudents
}