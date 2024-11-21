import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const MonthlyTrendChart = ({ expenses }) => {
  const monthlyData = useMemo(() => {
    const monthlyTotals = expenses.reduce((acc, expense) => {
      const month = new Date(expense.date).toLocaleString('default', { month: 'short' });
      acc[month] = (acc[month] || 0) + Number(expense.amount);
      return acc;
    }, {});

    return Object.entries(monthlyTotals).map(([month, amount]) => ({
      month,
      amount: Number(amount.toFixed(2))
    }));
  }, [expenses]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-4 rounded-xl shadow-lg"
    >
      <h3 className="text-xl font-bold text-suns-purple-800 mb-4">
        Monthly Trend
      </h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip 
              formatter={(value) => `$${value.toFixed(2)}`}
              contentStyle={{ backgroundColor: '#fff', borderRadius: '8px' }}
            />
            <Area 
              type="monotone" 
              dataKey="amount" 
              stroke="#843dff" 
              fill="#843dff" 
              fillOpacity={0.2} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default MonthlyTrendChart; 