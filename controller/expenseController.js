const Expense = require('../models/expense');
const User = require('../models/user');
const sequelize = require('../utils/db-connection');

const getAllexp = async (req, res) => {
    try {
        const userId = req.user.id;
        const expenses = await Expense.findAll({
            where: { userId: userId }
        });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAllexpLeaderBoard = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: [
                'id',
                'name',
                // MySQL direct amount column target karega bina mismatch ke
                [sequelize.fn('sum', sequelize.col('amount')), 'total_cost'] 
            ],
            include: [
                {
                    model: Expense,
                    attributes: [] // Row integration skip karne ke liye array blank rahega
                }
            ],
            // Database log ke alias sequence 'users AS user' ke hisaab se correct configuration
            group: ['user.id'], 
            order: [[sequelize.literal('total_cost'), 'DESC']],
            subQuery: false
        });

        res.status(200).json(users);
    } catch (error) {
        console.error("TERMINAL ERROR DEKHO:", error); 
        res.status(500).json({ message: error.message });
    }
}

const addExpense = async (req, res) => {
    try {
        const { amount, details,  category } = req.body;

        const userId = req.user.id;
        const lastExp = await Expense.findOne(
            {
                where: {userId: userId},
                order: [['createdAt', 'DESC']]
        });

        const previousTotal = lastExp ? lastExp.TotalAmount: 0;
        
        const updatedTotalAmount = Number(previousTotal) + Number(amount);

        const exp = await Expense.create({
            amount,
            TotalAmount: updatedTotalAmount,
            details,
            category,
            userId: userId
        });
        res.status(201).json({
            message: "Expense added...",
            data: exp
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id; // Security feature update

        const exp = await Expense.destroy({ 
            where: { 
                id: id,
                userId: userId // Sirf owner hi delete kar sake
            } 
        });
        
        if (!exp) {
            return res.status(404).json({ message: "Expense data Not Found or Unauthorized...!" });
        }
        res.status(200).json({ message: "Expense Deleted Successfully...!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const deleteAllExpense = async (req, res) => {
    try {
        const { userId } = req.params;

        const exp = await Expense.destroy({ 
            where: { 
                userId: userId,
            } 
        });
        
        if (!exp) {
            return res.status(404).json({ message: "Expense data Not Found or Unauthorized...!" });
        }
        res.status(200).json({ message: "Expense Deleted Successfully...!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllexp,
    addExpense,
    deleteExpense,
    getAllexpLeaderBoard,
    deleteAllExpense
}
