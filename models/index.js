const User = require('./userTable');
const IdentityCard = require('./identitycard');
const department = require('./department');


// one to one relation ship
User.hasOne(IdentityCard);
IdentityCard.belongsTo(User)


// one to many

department.hasMany(User);
User.belongsTo(department)

module.exports = {
    IdentityCard,
    User
}