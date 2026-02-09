//Create Server
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');  //Acts as a middleware

const authRoutes = require('./src/routes/auth.routes'); //It will create an API that will call the data from the Routes Folder --> auth.routes --> the data parsed by the user to the SERVER(app.js) --> We are using the data from the Controller
const foodRoutes = require('./src/routes/food.routes')

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
})
 
module.exports = app;