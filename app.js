// importing modules
const express = require('express');
const db = require('./connection');
const courseRouter = require('./routes/course');
const userRouter = require('./routes/user');

// initializing express app
const app = express();

app.use(express.urlencoded({extended: true}));
app.use('/courses', courseRouter);
app.use('/user', userRouter);

// listening on port 3000
app.listen(3000, () => {
    console.log("server is running");
});