import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { motion } from 'framer-motion';

const COLORS = [
    '#843dff', '#9f75ff', '#bea6ff', '#d9ceff',
    '#6b0ef7', '#5a0dd3', '#4c0fa8', '#7c1fff'
];

const ExpenseChart = ({ expenses }) => {
    const chartData = useMemo(() => {
        const categoryTotals = expenses.reduce((acc, expense) => {
            acc[expense.category] = (acc[expense.category] || 0) + Number(expense.amount);
            return acc;
        }, {});

        return Object.entries(categoryTotals).map(([name, value]) => ({
            name,
            value: Number(value.toFixed(2))
        }));
    }, [expenses]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-4 rounded-xl shadow-lg"
        >
            <h3 className="text-xl font-bold text-suns-purple-800 mb-4">
                Expense Distribution
            </h3>
            <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            animationDuration={1000}
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value) => `$${value.toFixed(2)}`}
                            contentStyle={{ backgroundColor: '#fff', borderRadius: '8px' }}
                        />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};

export default ExpenseChart; 