const User = require('./userTable');
const IdentityCard = require('./identitycard');

User.hasOne(IdentityCard);
IdentityCard.belongsTo(User);



module.exports = {
    IdentityCard,
    User
}