const express = require('express');
const cors = require('cors');
const expenseRoutes = require('./routes/expenseRoutes');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Basic health check route
app.get('/', (req, res) => {
  res.send('Expense Tracker API is running');
});

app.use('/api/expenses', expenseRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;