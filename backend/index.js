const express = require('express');
const bodyParser = require('body-parser');   
const employeeRouter = require('./routes/employeeRouter');
require('dotenv').config();
const cors = require("cors");

const app = express();

// MongoDB connection
require("./models/db");

// Middleware
app.use(cors());
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: true })); 

// Employee API routes
app.use('/api/employee', employeeRouter);

// Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
