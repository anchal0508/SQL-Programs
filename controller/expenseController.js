const expenseTable = require('../module/expenseTable');


const addExpense = async (req, res) => {
    try {
        const expense = await expenseTable.create(req.body);
        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json(error.message);
    }
}


const getAll = async (req, res) => {
    try {
        const allExpenses = await expenseTable.findAll();
        res.status(200).json(allExpenses);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

const deleteExp = async (req, res) => {
    try {
        const { id } = req.params;

        await expenseTable.destroy({ where: { id: id } });

        res.status(200).json({ message: "Expense deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const updateExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const { expenseOn, amount } = req.body;

        await expenseTable.update(
            { expenseOn, amount },
            { where: { id: id } }
        );
        res.status(200).json({ message: "Expense updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    addExpense,
    getAll,
    deleteExp,
    updateExpense
}