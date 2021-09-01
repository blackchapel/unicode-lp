// Importing modules
const express = require('express');
const db = require('./connection');

// Initializing an express app
const app = express();

// Importing routes
const courseRouter = require('./routes/course');
const userRouter = require('./routes/user');

// Routes
app.use('/courses', courseRouter);
app.use('/users', userRouter);

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
app.listen(port, () => {
    console.log('Server is running!')
});