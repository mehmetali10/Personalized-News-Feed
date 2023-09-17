const express = require("express");
const server = express();
const cors = require("cors");
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

// Enable Cross-Origin Resource Sharing (CORS)
server.use(cors());

// Enhance your server security with Helmet
server.use(helmet());

// Implement Rate Limiting for API requests
const limiter = rateLimit({
  max: 500,
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  standardHeaders: true,
  message: 'Too many requests from this IP. Please try again in an hour.',
});

server.use('/api', limiter);

// Data Sanitization against NoSQL Injection
server.use(mongoSanitize());

// Data Sanitization against Cross-Site Scripting (XSS)
server.use(xss());

// Parse JSON and URL-encoded data
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Parse cookies
server.use(cookieParser());

// Set up CORS headers for all routes
server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization'
  );
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Include your authentication and news routers
const AuthRouter = require('./src/routes/authRoutes');
const NewsRouter = require('./src/routes/newsRoutes');

server.use(AuthRouter);
server.use(NewsRouter);

module.exports = server;
