const ExpenseSchema = require("../models/expense");

exports.addExpense = async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  const expense = ExpenseSchema({
    title,
    amount,
    category,
    description,
    date,
  });
  try {
    if (!title || !category || !description || !date) {
      return res.status(400).json({ err: "All fields are required" });
    }
    if (amount <= 0) {
      return res.status(400).json({ err: "Amount must be a postiive" });
    }
    await expense.save();
    res.status(200).json({ message: "Expense added" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await ExpenseSchema.find().sort({ createdAt: -1 });
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.delExpense = async (req, res) => {
  const { id } = req.params;
  ExpenseSchema.findByIdAndDelete(id)
    .then((expense) => {
      res.status(200).json({ message: "Expense deleted" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Server Error" });
    });
};
