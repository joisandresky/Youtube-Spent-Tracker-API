const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const Config = require('./config');

const app = express();

// Koneksi Ke Database
mongoose.connect(`mongodb+srv://${Config.APP_DB_USERNAME}:${Config.APP_DB_PWD}@${Config.APP_DB_URL}/${Config.APP_DB_NAME}?retryWrites=true&w=majority`)
mongoose.connection.on('connected', () => console.log("DATABASE CONNECTED!"));
mongoose.connection.on('error', err => console.log("ERROR TO CONNECT", err));

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

require('./routes')(app);

app.listen(Config.APP_PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${Config.APP_PORT}`);
});