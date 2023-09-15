const express = require("express");
const server = express();
const AuthRouter = require('./src/routes/authRoutes');
const cors = require("cors");
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

server.use(cors());

server.use(helmet());

const limiter = rateLimit({
  max: 500,
  windowMs: 24 * 60 * 60 * 1000,
  standardHeaders: true,
  message: 'Too Many Request From this IP, please try again in an hour',
});

server.use('/api', limiter);

//Data Sanitization against NOSQL query Injection
server.use(mongoSanitize());

//Data Sanitization against XSS
server.use(xss());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());

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
  console.log("istek buraya düştü cors")
  next();
});

server.use(AuthRouter);

module.exports = server;
