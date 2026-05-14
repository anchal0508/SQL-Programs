const Course = require('../models/courses');
const UserTable = require('../models/userTable');
const CourseTable = require('../models/courses');


const addCourse = async (req, res) => {
    try {
        const { name } = req.body;
        const course = await Course.create({
            name
        });
        res.status(201).json(course)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const addUserToCourses = async (req, res) => {
    try {
        const { userId , courseIds} = req.body;
        const user = await UserTable.findByPk(userId);
        const course = await CourseTable.findAll({
            where: {
                id: courseIds
            }
        })
        await user.addCourse(course);
        const updatedUser = await UserTable.findByPk(userId, { include: CourseTable })

        res.status(200).json(updatedUser);
    } catch (error) {
res.status(500). json(error.message);
    }
}

module.exports = {
    addCourse,
    addUserToCourses
};