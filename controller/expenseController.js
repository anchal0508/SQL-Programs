const Expense = require('../models/expense');




const getAllexp = async (req, res) => {
    try {
        const userId = req.user.id;
        const expenses = await Expense.findAll({
            where:{
                userId : userId
            }
        });
        res.status(200).json(expenses);
        console.log("Total exp: " + expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAllexpLeaderBoard = async (req, res) => {
    try {
        const userId = req.user.id;
        const expenses = await Expense.findAll();
        res.status(200).json(expenses);
        console.log("Total exp: " + expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const addExpense = async (req, res) => {
    try {

        const { amount, details, category } = req.body;
        const userId = req.user.id;
        const exp = await Expense.create({
            amount,
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
        const exp = await Expense.destroy({ where: { id: id } });
        if (!exp) {
            return res.status(404).json({ message: "Expense data Not Found...!" });
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
    getAllexpLeaderBoard
}