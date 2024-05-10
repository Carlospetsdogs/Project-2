// app.js or server.js
const express = require('express');
const userRoutes = require('./routes/user-routes');

const app = express();

// Use user routes
app.use('/api/users', userRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
