const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const multipart = require('connect-multiparty');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

const draw_provider = require('./providers/draw_provider');
const lottery_provider = require('./providers/lottery_provider');
const bitcoin_provider = require('./providers/bitcoin_provider');

// Connect To Database - AWESOME
mongoose.connect(config.database);
// On Connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database '+ config.database);
});
// On Error
mongoose.connection.on('error', (err) => {
    console.log('Connected error '+ err);
});

const app = express();

// Routes
const user = require('./routes/user');
const draw = require('./routes/draw');
const lottery = require('./routes/lottery');
const withdraw_wallets = require('./routes/withdraw_wallets');

// Port Number
const port = process.env.PORT || 8080;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json()); // parse json
app.use(bodyParser.urlencoded({extended: true}) ); //parse url enconded

// app.use(multipart());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// set path for the uploaded images
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

require('./config/passport')(passport);

// Use Route
app.use('/user', user);
app.use('/draw', draw);
app.use('/lottery', lottery);
app.use('/withdraw_wallets', withdraw_wallets);
// Index Route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

// set root path when build as production
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});


// Start Server
app.listen(port, () => {
    console.log('Server started on port : ' + port);
    draw_provider.startAction();
    
    /*setInterval(() => {
        lottery_provider.tester();
    },10000);*/
    // bitcoin_provider.transactionListener();
    // bitcoin_provider.tester();
    
});