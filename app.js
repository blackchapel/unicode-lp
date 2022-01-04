// Importing modules
const express = require('express');
const morgan = require('morgan');
const db = require('./connection');

// Initializing an express app
const app = express();

// Importing routes
const courseRouter = require('./routes/course');
const userRouter = require('./routes/user');

// Formatting incoming data
app.use(express.json());
app.use('/uploads', express.static('./public'));

// Logging
app.use(morgan('dev'));

// Routes
app.use('/course', courseRouter);
app.use('/user', userRouter);

// Error Handeling
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

// Listening on port 3000
const server = app.listen(3000, () => {
    console.log('Server is running');
});

module.exports = server;