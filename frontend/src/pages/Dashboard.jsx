import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { showSuccess, showError } from "../utils/helpers";
import { Pencil, Trash2 } from "lucide-react";

const Dashboard = () => {
  const { authAxios } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchExpenses = async () => {
    try {
      const { data } = await authAxios.get("/expenses");
      setExpenses(data.expenses);
    } catch (err) {
      showError("Failed to fetch expenses", err);
    }
  };

  const resetForm = () => {
    setTitle("");
    setAmount("");
    setCategory("");
    setEditingId(null);
  };

  const addOrUpdateExpense = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await authAxios.put(`/expenses/${editingId}`, {
          title,
          amount,
          category,
        });
        showSuccess("Expense updated");
      } else {
        await authAxios.post(`/expenses`, { title, amount, category });
        showSuccess("Expense added");
      }
      resetForm();
      fetchExpenses();
    } catch (err) {
      showError("Failed to save expense", err);
    }
  };

  const startEdit = (expense) => {
    setEditingId(expense._id);
    setTitle(expense.title);
    setAmount(expense.amount);
    setCategory(expense.category);
  };

  const deleteExpense = async (id) => {
    try {
      await authAxios.delete(`/expenses/${id}`);
      showSuccess("Expense deleted");
      fetchExpenses();
    } catch {
      showError("Failed to delete");
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="p-5 max-w-4xl mx-auto space-y-5">
      <h1 className="text-3xl font-bold text-center">Dashboard</h1>

      <form
        onSubmit={addOrUpdateExpense}
        className="card bg-base-200 p-5 space-y-4 shadow-lg"
      >
        <h2 className="text-xl font-semibold">
          {editingId ? "Edit Expense" : "Add New Expense"}
        </h2>
        <input
          type="text"
          placeholder="Title"
          className="input input-bordered w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          className="input input-bordered w-full"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Category"
          className="input input-bordered w-full"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <button className="btn btn-primary w-full">
          {editingId ? "Update" : "Add"} Expense
        </button>
        {editingId && (
          <button type="button" className="btn w-full" onClick={resetForm}>
            Cancel Edit
          </button>
        )}
      </form>

      <div className="grid md:grid-cols-2 gap-4">
        {expenses.length === 0 ? (
          <p className="text-center">No expenses yet</p>
        ) : (
          expenses.map((exp) => (
            <div
              key={exp._id}
              className="card bg-base-100 shadow-xl p-4 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-bold">{exp.title}</h3>
                <p className="text-sm opacity-70">{exp.category}</p>
                <p className="text-lg font-semibold mt-2">${exp.amount}</p>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => startEdit(exp)}
                  className="btn btn-warning btn-sm flex-1"
                >
                  <Pencil className="w-4 h-4" /> Edit
                </button>
                <button
                  onClick={() => deleteExpense(exp._id)}
                  className="btn btn-error btn-sm flex-1"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
