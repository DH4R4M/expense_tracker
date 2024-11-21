import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit2, Trash2 } from "lucide-react";

const ExpenseList = ({ expenses, onDelete, onEdit }) => {
  const getCategoryEmoji = (category) => {
    const categoryMap = {
      groceries: "🛒",
      food: "🍽️",
      transport: "🚌",
      entertainment: "🎉",
      rent: "🏠",
      shopping: "🛍️",
      health: "⚕️",
      pets: "🐾",
    };
    return categoryMap[category] || "💰";
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4 text-gray-700">Recent Expenses</h3>
      <div className="space-y-3">
        <AnimatePresence>
          {expenses.map((expense) => (
            <motion.div
              key={expense.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getCategoryEmoji(expense.category)}</span>
                  <div>
                    <h4 className="font-medium text-gray-800">{expense.title}</h4>
                    <p className="text-sm text-gray-500">
                      {new Date(expense.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-lg font-bold text-purple-600">
                    ${Number(expense.amount).toFixed(2)}
                  </span>
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onEdit(expense)}
                      className="p-2 text-blue-500 hover:bg-blue-50 rounded-full"
                    >
                      <Edit2 size={18} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onDelete(expense.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                    >
                      <Trash2 size={18} />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ExpenseList;