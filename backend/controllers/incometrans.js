const IncomeSchema = require("../models/income");

exports.addIncome = async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  const income = IncomeSchema({
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
    await income.save();
    res.status(200).json({ message: "Income added" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getIncomes = async (req, res) => {
  try {
    const incomes = await IncomeSchema.find().sort({ createdAt: -1 });
    res.status(200).json(incomes);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.delIncome = async (req, res) => {
  const { id } = req.params;
  IncomeSchema.findByIdAndDelete(id)
    .then((income) => {
      res.status(200).json({ message: "Income deleted" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Server Error" });
    });
};
