const { User, Bus, Booking } = require('../models/index');

exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// POST /buses
exports.createBus = async (req, res) => {
    try {
        const bus = await Bus.create(req.body);
        res.status(201).json(bus);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.createBooking = async (req, res) => {
    try {
        const booking = await Booking.create(req.body);
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.findAll({
            where: { userId: req.params.id },
            attributes: ['id', 'seatNumber'],
            include: [{ model: Bus, attributes: ['busNumber'] }]
        });
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getBusBookings = async (req, res) => {
    try {
        const bookings = await Booking.findAll({
            where: { busId: req.params.id },
            attributes: ['id', 'seatNumber'],
            include: [{ model: User, attributes: ['name', 'email'] }]
        });
        res.status(200).json(bookings);
    } catch (err) { res.status(500).json({ error: err.message }); }
};