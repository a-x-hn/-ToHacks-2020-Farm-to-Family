const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

// DB Config
const uri = process.env.ATLAS_URI;

// Connect to MongoDB
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true});
const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

// A

const farmerRouter = require('./routes/api/farmers');
const clientRouter = require('./routes/api/clients');

// Routes
app.use('./routes/api/farmers', farmerRouter);
app.use('./routes/api/clients', clientRouter);

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});