const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const { errorHandler } = require('./utils/errorHandler');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Route files
const userRoutes = require('./routes/userRoutes');
const assetRoutes = require('./routes/assetRoutes');
const assetOrderRoutes = require('./routes/assetOrderRoutes');
const loanTypeRoutes = require('./routes/loanTypeRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const depositRequestRoutes = require('./routes/depositRequestRoutes');
const withdrawalRequestRoutes = require('./routes/withdrawalRequestRoutes');
const activityRoutes = require('./routes/activityRoutes');
const bonusRoutes = require('./routes/bonusRoutes');
const loanOrderRoutes = require('./routes/loanOrderRoutes');
const adminSettingsRoutes = require('./routes/adminSettingsRoutes');



const app = express();

// Body parser2
app.use(express.json());

// Enable CORS
app.use(cors());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Health check endpoint for cron jobs
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Mount routers
app.use('/api/users', userRoutes);
app.use('/api/assets', assetRoutes);
app.use('/api/assetOrders', assetOrderRoutes);
app.use('/api/loanTypes', loanTypeRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/depositRequests', depositRequestRoutes);
app.use('/api/withdrawalRequests', withdrawalRequestRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/bonuses', bonusRoutes);
app.use('/api/loanOrders', loanOrderRoutes);
app.use('/api/adminSettings', adminSettingsRoutes);


// Error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});