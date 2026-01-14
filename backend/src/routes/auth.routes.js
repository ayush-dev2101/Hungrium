//Create API
const express = require('express');
const authController = require("../controllers/auth.controller")

const router = express.Router();


// User Auth APIs
router.post("/user/register", authController.registerUser);   // .post is sending the JSON format of data of user to the server containing _id, email, fullName 
router.post('/user/login', authController.loginUser);
router.get('/user/logout', authController.logoutUser); //Logout usually does NOT modify server data, it only ends the session or clears the token, so many apps use (GET)


//FoodPartner Auth APIs
router.post('/food-partner/register', authController.registerFoodPartner);
router.post('/food-partner/login', authController.loginFoodPartner);
router.get('/food-partner/logout', authController.logoutFoodPartner);



module.exports = router;