const app = require('./app');
const db = require('./firebase-config');

const PORT = process.env.PORT || 8080;

// Test database connection
db.collection('expenses').limit(1).get()
  .then(() => {
    console.log('Firebase connection successful');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to Firebase:', error);
    process.exit(1);
  });