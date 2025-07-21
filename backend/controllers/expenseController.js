import Expense from "../models/Expense.js";

export const createExpense = async (req, res) => {
  const { title, amount, category } = req.body;
  if (!title || !amount || !category)
    return res.status(400).json({ message: "All fields required" });
  const expense = await Expense.create({
    user: req.user.id, // ✅ attaches the logged-in user
    title,
    amount,
    category,
  });
  res.status(201).json(expense);
};

export const getExpenses = async (req, res) => {
  const { search = "", page = 1, limit = 6 } = req.query;
  const query = {
    user: req.user._id,
    title: { $regex: search, $options: "i" },
  };
  const expenses = await Expense.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit));
  const total = await Expense.countDocuments(query);
  res.json({ expenses, total });
};

export const updateExpense = async (req, res) => {
  const expense = await Expense.findOne({
    _id: req.params.id,
    user: req.user._id,
  });
  if (!expense) return res.status(404).json({ message: "Expense not found" });
  const updated = await Expense.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
};

export const deleteExpense = async (req, res) => {
  const expense = await Expense.findOne({
    _id: req.params.id,
    user: req.user._id,
  });
  if (!expense) return res.status(404).json({ message: "Expense not found" });
  await expense.deleteOne();
  res.json({ message: "Expense deleted" });
};
