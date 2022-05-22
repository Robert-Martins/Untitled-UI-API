const express = require('express');
const bodyParser = require('body-parser');
const connectToDatabase = require('./database/connect')
const dotenv = require('dotenv');

dotenv.config();

connectToDatabase();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

require('./app/controller/authController')(app);
require('./app/controller/projectController')(app);
require('./app/controller/userController')(app);

const port = 5000;

app.listen(port, ()=> console.log("Server is running"))