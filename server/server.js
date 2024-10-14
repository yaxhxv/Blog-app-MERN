const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const morgan = require("morgan");
const connectDB = require('./config/db');



const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"))

const PORT = process.env.PORT || 8080;


// dbconnection
connectDB();

//routes
const userRoutes = require('./routes/userRoutes');

app.use("/api/v1/users" , userRoutes)









app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});