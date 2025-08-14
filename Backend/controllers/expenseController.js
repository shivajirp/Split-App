import Expense from "../models/Expense.js";

export const addExpense = async (req, res) => {
  try {
    const {
      amount,
      description,
      paid_by,
      shared_with,
      split_type,
      split_values,
    } = req.body;

    if (!amount || amount <= 0) {
        return res.status(400).json({ success: false, message: "Amount must be a positive number" });
      }
      if (!description || description.trim().length === 0) {
        return res.status(400).json({ success: false, message: "Description is required" });
      }
      if (!paid_by || paid_by.trim().length === 0) {
        return res.status(400).json({ success: false, message: "paid_by is required" });
      }
      if (!Array.isArray(shared_with) || shared_with.length === 0) {
        return res.status(400).json({ success: false, message: "shared_with must be a non-empty array" });
      }
      
      if ((split_type === "percentage" || split_type === "exact") && (!split_values || split_values.length !== shared_with.length)) {
        return res.status(400).json({ success: false, message: "split_values must match shared_with count" });
      }
      

    if (
      !amount ||
      amount <= 0 ||
      !description ||
      !paid_by ||
      !Array.isArray(shared_with) ||
      shared_with.length === 0
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid expense data" });
    }

    const expense = new Expense({
      amount,
      description,
      paid_by,
      shared_with,
      split_type: split_type || "equal",
      split_values: split_values || [],
    });

    await expense.save();
    res
      .status(201)
      .json({
        success: true,
        data: expense,
        message: "Expense added successfully",
      });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: err.message });
  }
};

export const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ createdAt: -1 });
    res.json({ success: true, data: expenses });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateExpense = async (req, res) => {
  try {
    const updated = await Expense.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updated)
      return res
        .status(404)
        .json({ success: false, message: "Expense not found" });

    res.json({
      success: true,
      data: updated,
      message: "Expense updated successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const deleted = await Expense.findByIdAndDelete(req.params.id);

    if (!deleted)
      return res
        .status(404)
        .json({ success: false, message: "Expense not found" });

    res.json({ success: true, message: "Expense deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
