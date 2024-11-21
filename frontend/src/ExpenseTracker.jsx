import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseChart from "./components/ExpenseChart";
import MonthlyTrendChart from "./components/MonthlyTrendChart";
import { fetchExpenses, addExpense, updateExpense, deleteExpense } from "./services/firebaseService";

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    loadExpenses();
  }, []);

  useEffect(() => {
    const total = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
    setTotalSpent(total);
  }, [expenses]);

  const loadExpenses = async () => {
    try {
      const data = await fetchExpenses();
      setExpenses(data);
    } catch (error) {
      console.error("Error loading expenses:", error);
    }
  };

  const handleAddExpense = async (expenseData) => {
    try {
      if (editingExpense) {
        const updated = await updateExpense(editingExpense.id, expenseData);
        setExpenses(expenses.map((exp) => 
          exp.id === editingExpense.id ? updated : exp
        ));
        setEditingExpense(null);
      } else {
        const newExpense = await addExpense(expenseData);
        setExpenses([...expenses, newExpense]);
      }
    } catch (error) {
      console.error("Error saving expense:", error);
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      await deleteExpense(id);
      setExpenses(expenses.filter((exp) => exp.id !== id));
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const calculateMonthlyTotal = () => {
    const currentMonth = new Date().getMonth();
    return expenses.reduce((total, expense) => {
      const expenseMonth = new Date(expense.date).getMonth();
      if (expenseMonth === currentMonth) {
        return total + Number(expense.amount);
      }
      return total;
    }, 0);
  };

  const calculateDailyAverage = () => {
    if (expenses.length === 0) return 0;
    const total = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
    return total / expenses.length;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-suns-purple-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-suns-purple-700 mb-2">
            💰 Expense Tracker
          </h1>
          <p className="text-suns-purple-600">Keep track of your spending!</p>
          <motion.div 
            className="mt-4 bg-white rounded-xl p-6 shadow-lg"
            whileHover={{ scale: 1.02 }}
          >
            <p className="text-gray-600">Total Spent</p>
            <motion.p 
              className="text-4xl font-bold text-suns-purple-600"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              ${totalSpent.toFixed(2)}
            </motion.p>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <ExpenseChart expenses={expenses} />
          <MonthlyTrendChart expenses={expenses} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <ExpenseForm 
              onExpenseAdded={handleAddExpense}
              isEditing={!!editingExpense}
              expenseToEdit={editingExpense}
            />
            
            {/* Quick Stats */}
            <motion.div 
              className="mt-6 grid grid-cols-2 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-white p-4 rounded-xl shadow-md">
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-xl font-bold text-suns-purple-600">
                  ${calculateMonthlyTotal().toFixed(2)}
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-md">
                <p className="text-sm text-gray-600">Avg/Day</p>
                <p className="text-xl font-bold text-suns-purple-600">
                  ${calculateDailyAverage().toFixed(2)}
                </p>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-2">
            <ExpenseList
              expenses={expenses}
              onDelete={handleDeleteExpense}
              onEdit={setEditingExpense}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;
