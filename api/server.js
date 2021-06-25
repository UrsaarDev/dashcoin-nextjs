const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const authController = require('./controllers/authController');
const productController = require('./controllers/productController');
const API_PORT = 3001;
const app = express();
const fs = require('fs');
app.use(cors());

// this is our MongoDB database
const dbRoute = 'mongodb://localhost:27017/nextDB';

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);

let db = mongoose.connection;

db.once('open', () => console.log('MongoDB connected'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// append /api for our http requests
app.use('/api/authController', authController);
app.use('/api/productController', productController);


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
    next();
});

var connected_emails = JSON.parse(fs.readFileSync('friends.json','utf8')).friends;

// launch our backend into a port
var http = require('http').Server(app);
var io = require('socket.io')(http,{
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    }
});

io.on("connection", (socket) => {
    socket.on("message", (msg) => {
        if(connected_emails.indexOf(msg) === -1) {
            connected_emails.push(msg);
            var formData = {
                friends : connected_emails
            }
            fs.writeFileSync("friends.json", JSON.stringify(formData));
        }
    });
});

http.listen(API_PORT, () => {
    console.log(`LISTENING ON PORT ${API_PORT}`)
});