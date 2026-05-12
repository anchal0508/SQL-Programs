const db = require('../utils/db-connection');
const Student = require('../models/students');
const sequelize = require('../utils/db-connection');

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



}

const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;

        const student = await Student.findByPk(id);

        if (!student) {
            res.status(404).send('Student is not Found');
        }

        // student.name = name;
        await student.update({
            name: name || student.name,
            email: email || student.email
        });

        res.status(200).send('student has been UPDATED');
    }
    catch (error) {
        res.status(500).send('Student can not be updated...' + error.message);
    }


}


const getStudentById = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.findByPk(id);
        if (!student) {
            console.log('Student not Found');
            res.status(404).send('Student not Found...');
        }
        res.status(200).send(student);
    } catch (error) {
        res.status(500).send('Error in fatching Student');
    }

}



const getAllStudents = async (req, res) => {
    try {
        const students = await Student.findAll();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).send('Error in feching students');
    }

}

const deleteStudent = async (req, res) => {
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