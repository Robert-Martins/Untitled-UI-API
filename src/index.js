const express = require('express');
const bodyParser = require('body-parser');
const connectToDatabase = require('./database/connect')
const dotenv = require('dotenv');

dotenv.config();

connectToDatabase();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (request, response)=>{
    response.send('OK')
})

require('./controller/authController')(app);

const port = 5000;

app.listen(port, ()=> console.log("Server is running"))