//Create Server
const express = require('express');
const cookieParser = require('cookie-parser');  //Acts as a middleware
const authRoutes = require('./src/routes/auth.routes'); //It will create an API that will call the data from the Routes Folder --> auth.routes --> the data parsed by the user to the SERVER(app.js)
const foodRoutes = require('./src/routes/food.routes')

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
})
 
module.exports = app;