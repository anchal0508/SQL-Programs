const User = require('../models/user');
const Expense = require('../models/expense');

const ForgotPasswordRequest = require('../models/ForgotPasswordRequests'); 

// User and Expense relationships
User.hasMany(Expense);
Expense.belongsTo(User);

// User and ForgotPasswordRequest relationships
User.hasMany(ForgotPasswordRequest);
ForgotPasswordRequest.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
    User,
    Expense,
    ForgotPasswordRequest
};
