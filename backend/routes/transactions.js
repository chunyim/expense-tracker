const router = require("express").Router();
const {
  addIncome,
  getIncomes,
  delIncome,
} = require("../controllers/incometrans");
const {
  addExpense,
  getExpenses,
  delExpense,
} = require("../controllers/expensetrans");

router
  .post("/add-income", addIncome)
  .get("/get-incomes", getIncomes)
  .delete("/delete-income/:id", delIncome)
  .post("/add-expense", addExpense)
  .get("/get-expenses", getExpenses)
  .delete("/delete-expense/:id", delExpense);

module.exports = router;
