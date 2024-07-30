require('dotenv').config()
const mongoose = require('mongoose');

// Define the mongodb connection url
const dbURL = process.env.MONGO_URL;

// Setting up the mongodb connection
mongoose.connect(dbURL);

//Get the default connection
// Mongodb maintains a default connection obj representing the mdb connection
const db = mongoose.connection;
// db represents the mongodb connection

// define event listeners for db connection
db.on('connected', () => console.log('mongodb connected'))
db.on('error', (err) => console.error('error in connection ', err))
db.on('disconnected', () => console.log('mongodb disconnected'))

// exporting the db 
module.exports = db;