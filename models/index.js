const User = require('./user');
const Bus = require('./bus');
const Booking = require('./booking');


// User booking One to Many connection -> One User can have many Bookings
User.hasMany(Booking, {foreignKey: 'userId', onDelete: 'CASCADE'});
Booking.belongsTo(User, {foreignKey: 'userId'});


// Bus bookings (also One to Many) -> one Bus can have many Users
Bus.hasMany(Booking, {foreignKey: 'busId', onDelete: 'CASCADE'});
Booking.belongsTo(Bus, {foreignKey: 'busId'});


module.exports = {
    User, 
    Bus, 
    Booking
}