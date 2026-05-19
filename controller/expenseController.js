const Expense = require('../models/expense');

const getAllexp = async (req, res) => {
    try {
        const expenses = await Expense.findAll();
        res.status(200).json(expenses);
        console.log("Total exp: " + expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const addExpense = async (req, res) => {
    try {
        

        const exp = await Expense.create(req.body);
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
    deleteExpense
}