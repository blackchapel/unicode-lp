// importing modules
const express = require('express');
const db = require('./connection');
const app = express();

app.listen(3000, () => {
    console.log("server is running");
});