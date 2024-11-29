const API_URL = 'http://localhost:8080/api/expenses';

export const fetchExpenses = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch expenses');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching expenses:', error);
    throw error;
  }
};

export const addExpense = async (expenseData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(expenseData),
    });
    if (!response.ok) {
      throw new Error('Failed to add expense');
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding expense:', error);
    throw error;
  }
};

export const updateExpense = async (id, expenseData) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(expenseData),
    });
    if (!response.ok) {
      throw new Error('Failed to update expense');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating expense:', error);
    throw error;
  }
};

export const deleteExpense = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete expense');
    }
    return await response.json();
  } catch (error) {
    console.error('Error deleting expense:', error);
    throw error;
  }
};
