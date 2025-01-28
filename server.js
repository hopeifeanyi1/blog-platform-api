require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Middleware for parsing JSON request bodies
app.use(bodyParser.json());

// MongoDB Connection
const mongoUri = `mongodb+srv://${process.env.NAME}:${process.env.PASSWORD}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });


// Routes
const articleRoutes = require('./routes/articles');
app.use('/api/articles', articleRoutes); // Mount the article routes

// Add Error-Handling Middleware Here
app.use((err, req, res, next) => {
    console.error('Error:', err.message); // Log the error message
    console.error('Stack:', err.stack); // Log the error stack for debugging
    res.status(500).json({ error: err.message }); // Send the error message as a response
  });
  
// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
