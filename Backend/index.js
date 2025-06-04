const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { expressApp: app, httpServer } = require('./utils/socket');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/globalErrorController');
const userRouter = require('./routes/userRoutes');
const messageRouter = require('./routes/messageRoutes');
const purchaseRouter = require('./routes/purchaseRoutes');

// Catch uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err);
  console.log('-----');
  console.log(err.name, '***', err.message);
  process.exit(1);
});

// Load environment variables
dotenv.config();

// Create Express app, old not using, using socket.io's app now
// const app = express();

// Middleware setup
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

// Rate limit
const limiter = rateLimit({
  max: 400,
  windowMs: 60 * 60 * 1000, // 1 hour
  message: 'Too many request from this IP, please try again in an hour!',
});

// Apply limiter to all routes that start with '/api'
app.use('/api', limiter);

// Body and cookie parsers
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true })); // For parsing URL-encoded data
app.use(cookieParser());

// Data sanitization middlewares
app.use(mongoSanitize());
app.use(xss());

// Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/messages', messageRouter);
app.use('/api/v1/purchases', purchaseRouter);
app.use('/api/v1/getkey', (req, res) => {
  res.status(200).json({ key: process.env.RAZORPAY_KEY_ID });
});

// ping this every 10 minutes using UptimeRobot to keep server alive, and avoid cold start
app.get('/health', (req, res) => res.sendStatus(200));

// Handle undefined routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handler
app.use(globalErrorHandler);

// Connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to Database'))
  .catch((err) => console.log('Error in MongoDB connection', err));

// Start server
const PORT = process.env.PORT || 6700;

// OLD one
// app.listen(PORT, () => {

httpServer.listen(PORT, () => {
  console.log(`Server starting in ${process.env.NODE_ENV} environment`);
  console.log(`App running on port: ${PORT}`);
});

// Unhandled promise/async function rejection error handler
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLER REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  httpServer.close(() => {
    // 0 - success, 1 - uncaught exception
    process.exit(1);
  });
});

module.exports = app;
