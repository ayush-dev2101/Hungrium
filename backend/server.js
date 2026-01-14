require('dotenv').config();  //dotenv loads the environment variables to the server
//Start Server
const app = require('./app');
const connectDB = require('./src/db/db');
console.log("ImageKit Public Key:", process.env.IMAGEKIT_PUBLIC_KEY);

connectDB();


app.listen(3000, () =>{
  console.log("Server is running on port 3000")
})