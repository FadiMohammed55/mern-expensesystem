import express from "express";
import {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
} from "../controllers/expenseController.js";
import protect from "../middleware/authMiddleware.js";
import rateLimit from "../middleware/rateLimit.js";

const router = express.Router();

router
  .route("/")
  .post(protect, rateLimit, createExpense)
  .get(protect, getExpenses);

router
  .route("/:id")
  .put(protect, rateLimit, updateExpense)
  .delete(protect, rateLimit, deleteExpense);

export default router;
