
const mongoose = require('mongoose')
const connectDatabse = async () => {
  try {
      await mongoose.connect('mongodb+srv://Betul123:Betul123@cluster0.geton.mongodb.net/Ecomerce?retryWrites=true&w=majority&appName=Cluster0'
    );
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

module.exports= connectDatabse;
