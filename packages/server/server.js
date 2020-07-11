require('dotenv').config();

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('config');

const { HOST, mongoURI } = config;
// console.log(mongoURI);

const mongoose = require('mongoose');
console.log('server running....');
console.log('server running....');

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

const app = express();

app.use(cors());

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

app.use(express.static(path.join(__dirname, 'public')));
const apiRouter = require('./src/routes/api');
app.use('/api/v1', apiRouter);
app.listen(HOST, () => console.log('server started'));
