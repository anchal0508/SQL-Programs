const db = require('../utils/db-connection');
const Student = require('../models/students');

const addStudent = async (req, res) => {

    try {
        const { NAME, EMAIL, AGE } = req.body;
        const student = await Student.create({
            name: NAME,
            email: EMAIL,
            age: AGE
        });
        res.status(201).send(`Student with name ${NAME} is created`);

    } catch (error) {
        res.status(500).send("Unable to make an Entry...");
    }






    // const query = `INSERT INTO STUDENTS (NAME, EMAIL, AGE) VALUES ( ?, ?, ?)`;

    // db.execute(query, [NAME, EMAIL, AGE], (err, result) => {
    //     if (err) {
    //         console.log(err.message);
    //         return res.status(500).send(err.message);
    //     }
    //     console.log(`Studend Data inserted Successfully with ID: ${result.insertId}!`);
    //     res.status(200).send(`Studend Data inserted Successfully with ID: ${result.insertId}!`);
    // });

}

const updateStudent = async (req, res) => {
    try {
        const {id} = req.params;
        const { name } = req.body;

        const student = await Student.findByPk(id);

        if (!student) {
            res.status(404).send('Student is not Found');
        }

        student.name = name;
        await student.save();

        res.status(200).send('student has been UPDATED');
    }
    catch (error) {
        res.status(500).send('Student can not be updated...'+ error.message);
    }





    // const query = `UPDATE STUDENTS SET NAME = ? WHERE ID = ?`;

    // db.execute(query, [NAME, ID], (err, result) => {
    //     if (err) {
    //         console.log(err.message);
    //         return res.status(500).send(err.message);
    //     }
    //     if (result.affectedRows === 0) {
    //         console.log('Student Not Found');
    //         res.status(404).send(`Student Not Found with ID: ${ID}`);
    //     }
    //     console.log(`Student name has been updated to : ${NAME}`);
    //     res.status(200).send(`Student name has been updated to : ${NAME}`);
    // })

}


const getStudentById = (req, res) => {
    const id = req.params.id;
    const query = `SELECT * FROM STUDENTS WHERE ID = ?`;

    db.execute(query, [id], (err, result) => {
        if (err) {
            console.log(err.message);
            return res.status(500).send(err.message);
        }

        console.log(result);
        res.status(200).send(result);
    })
}



const getAllStudents = (req, res) => {
    const query = `SELECT * FROM STUDENTS`;
    db.execute(query, (err, result) => {
        if (err) {
            console.log(err.message);
            return res.status(500).send(err.message);
        }
        console.log(result);
        res.status(200).send(result);

    })
}

const deleteStudent = async (req, res)=>{
      try {
       const { id } = req.params;
        
        // student yahan deleted rows ka number return karega (0 or 1)
        const deletedRows = await Student.destroy({
            where: { id: id }
        });

        // Agar 0 rows delete hui, matlab student nahi mila
        if (deletedRows === 0) {
            return res.status(404).send('Student is not Found'); // 'return' lagana zaroori hai
        }

        res.status(200).send('Student is DELETED...');
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Error While Deleting...');
    }

}
module.exports = {
    addStudent,
    updateStudent,
    getStudentById,
    getAllStudents,
    deleteStudent
}