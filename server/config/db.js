const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected ' , mongoose.connection.host))
  .catch(err => console.error('MongoDB connection error:', err));

    }
    catch (err) {}  
}

module .exports =  connectDB;

// MongoDB connection
