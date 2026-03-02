const express = require('express');
const app = express();
const errorMiddleware = require('./middlewares/error');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, "config/config.env") });

// ✅ CORS — Allow CloudFront to call this backend
app.use(cors({
    origin: process.env.FRONTEND_URL,  // your CloudFront URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization ]
}));

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const products = require('./routes/product');
const auth = require('./routes/auth');
const order = require('./routes/order');
const payment = require('./routes/payment');

app.use('/api/v1/', products);
app.use('/api/v1/', auth);
app.use('/api/v1/', order);
app.use('/api/v1/', payment);



app.use(errorMiddleware);

module.exports = app;
