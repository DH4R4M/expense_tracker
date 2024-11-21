const API_URL = 'http://localhost:8080/api/expenses';

export const fetchExpenses = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const addExpense = async (expense) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(expense),
  });
  return response.json();
};

export const updateExpense = async (id, expense) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(expense),
  });
  return response.json();
};

export const deleteExpense = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
};
