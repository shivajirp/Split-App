import Expense from "../models/Expense.js";
import { calculateBalances, simplifyDebts } from "../utils/calculateSettlement.js";

export const getPeople = async (req, res) => {
  try {
    const expenses = await Expense.find();
    const people = new Set();

    expenses.forEach(exp => {
      people.add(exp.paid_by);
      exp.shared_with.forEach(p => people.add(p));
    });

    res.json({ success: true, data: Array.from(people) });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getBalances = async (req, res) => {
  try {
    const expenses = await Expense.find();
    if (!expenses.length) {
        return res.json({ success: true, data: {}, message: "No expenses to calculate" });
      }
      
    const balances = calculateBalances(expenses);
    res.json({ success: true, data: balances });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getSettlements = async (req, res) => {
  try {
    const expenses = await Expense.find();
    const balances = calculateBalances(expenses);
    const settlements = simplifyDebts(balances);
    res.json({ success: true, data: settlements });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
