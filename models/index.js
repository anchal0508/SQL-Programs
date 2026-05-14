const User = require('./userTable');
const IdentityCard = require('./identitycard');
const department = require('./department');
const courses = require('./courses');
const userCourses = require('./userCourses');


// one to one relation ship
User.hasOne(IdentityCard, {
    foreignKey: 'userId',
    as: 'idCard'
});
IdentityCard.belongsTo(User, {
    foreignKey: 'userId',
    as : 'user'
})


// one to many

department.hasMany(User, {
    foreignKey: 'userId',
    as: 'user info'
});
User.belongsTo(department,{
     foreignKey: 'userId',
     as: 'Department'
})


// many to many

User.belongsToMany(courses, {through: userCourses});
courses.belongsToMany(User, {through: userCourses});

module.exports = {
    IdentityCard,
    User,
    courses,
    userCourses
}