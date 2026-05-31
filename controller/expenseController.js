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
                [sequelize.fn('sum', sequelize.col('amount')), 'total_cost']
            ],
            include: [
                {
                    model: Expense,
                    attributes: [] 
                }
            ],
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
    const t = await sequelize.transaction();
    try {
        const { amount, details, category } = req.body;
        const userId = req.user.id;

        const lastExp = await Expense.findOne({
            where: { userId: userId },
            order: [['createdAt', 'DESC']],
            transaction: t
        });

        const previousTotal = lastExp ? lastExp.TotalAmount : 0;
        const updatedTotalAmount = Number(previousTotal) + Number(amount);

        const exp = await Expense.create({
            amount,
            TotalAmount: updatedTotalAmount,
            details,
            category,
            userId: userId
        }, { transaction: t });

        await t.commit();
        res.status(201).json({
            message: "Expense added...",
            data: exp
        });
    } catch (error) {
        await t.rollback();
        res.status(500).json({ message: error.message });
    }
}

const deleteExpense = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { id } = req.params;
        const userId = req.user.id;

        // 1. Fetch the target row before deleting it
        const targetExpense = await Expense.findOne({
            where: { id: id, userId: userId },
            transaction: t
        });

        if (!targetExpense) {
            await t.rollback();
            return res.status(404).json({ message: "Expense data Not Found or Unauthorized...!" });
        }

        // 2. Update subsequent TotalAmounts before deleting this row
        await Expense.update(
            { TotalAmount: sequelize.literal(`TotalAmount - ${Number(targetExpense.amount)}`) },
            {
                where: {
                    userId: userId,
                    createdAt: { [sequelize.Op.gt]: targetExpense.createdAt }
                },
                transaction: t
            }
        );

        // 3. Delete the target expense record
        await targetExpense.destroy({ transaction: t });

        await t.commit();
        res.status(200).json({ message: "Expense Deleted Successfully...!" });
    } catch (error) {
        await t.rollback();
        res.status(500).json({ message: error.message });
    }
}

const deleteAllExpense = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { userId } = req.params;

        const exp = await Expense.destroy({
            where: { userId: userId },
            transaction: t
        });

        if (!exp) {
            await t.rollback();
            return res.status(404).json({ message: "Expense data Not Found or Unauthorized...!" });
        }

        await t.commit();
        res.status(200).json({ message: "Expense Deleted Successfully...!" });
    } catch (error) {
        await t.rollback();
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
