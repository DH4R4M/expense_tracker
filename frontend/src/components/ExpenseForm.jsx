import React, { useState, useEffect } from "react";  // Added useEffect
import { motion } from "framer-motion";
import { PlusCircle, Save } from "lucide-react";  // Added Save icon

const CATEGORIES = [
  { value: 'groceries', label: 'Groceries', emoji: '🛒' },
  { value: 'food', label: 'Food', emoji: '🍽️' },
  { value: 'transport', label: 'Transport', emoji: '🚌' },
  { value: 'entertainment', label: 'Entertainment', emoji: '🎉' },
  { value: 'rent', label: 'Rent', emoji: '🏠' },
  { value: 'shopping', label: 'Shopping', emoji: '🛍️' },
  { value: 'health', label: 'Health', emoji: '⚕️' },
  { value: 'pets', label: 'Pets', emoji: '🐾' },
];

const ExpenseForm = ({ onExpenseAdded, isEditing, expenseToEdit }) => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    amount: "",
    date: new Date().toISOString().split('T')[0],
  });


  useEffect(() => {
    if (isEditing && expenseToEdit) {
      setFormData({
        title: expenseToEdit.title || "",
        category: expenseToEdit.category || "",
        amount: expenseToEdit.amount || "",
        date: expenseToEdit.date || new Date().toISOString().split('T')[0],
      });
    } else {
     
      setFormData({
        title: "",
        category: "",
        amount: "",
        date: new Date().toISOString().split('T')[0],
      });
    }
  }, [isEditing, expenseToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onExpenseAdded(formData);
      
      if (!isEditing) {
        setFormData({
          title: "",
          category: "",
          amount: "",
          date: new Date().toISOString().split('T')[0],
        });
      }
    } catch (error) {
      console.error("Error adding expense", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-xl shadow-lg"
    >
      <motion.h2
        className="text-2xl font-bold mb-6 text-center text-purple-600"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {isEditing ? '✏️ Edit Expense' : '💸 Add New Expense'}
      </motion.h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            What did you spend on? 🤔
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g., Pizza Party 🍕"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          />
        </div>

        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <div className="grid grid-cols-2 gap-2">
            {CATEGORIES.map((cat) => (
              <motion.button
                key={cat.value}
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFormData({ ...formData, category: cat.value })}
                className={`p-2 rounded-lg text-left ${formData.category === cat.value
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
                  }`}
              >
                <span className="mr-2">{cat.emoji}</span>
                {cat.label}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            How much? 💰
          </label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-500">$</span>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              placeholder="0.00"
              step="0.01"
              min="0"
              className="w-full p-3 pl-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            When? 📅
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          />
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
        >
          {isEditing ? (
            <>
              <Save size={20} />
              Update Expense
            </>
          ) : (
            <>
              <PlusCircle size={20} />
              Add Expense
            </>
          )}
        </motion.button>

        {isEditing && (
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setFormData({
                title: "",
                category: "",
                amount: "",
                date: new Date().toISOString().split('T')[0],
              });
              onExpenseAdded(null); // This will cancel editing mode
            }}
            className="w-full mt-2 bg-gray-100 text-gray-600 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Cancel Edit
          </motion.button>
        )}
      </form>
    </motion.div>
  );
};

export default ExpenseForm;