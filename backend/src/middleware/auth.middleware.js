const foodPartnerModel = require("../models/foodpartner.model");
const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken');


//Middleware for the foodPartner to store the food on the website
async function authFoodPartnerMiddleware(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Please login firsts"
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  //decoded will fetch the data in object format 

    const foodPartner = await foodPartnerModel.findById(decoded._id);

    req.foodPartner = foodPartner;


    next();

  } catch (err) {
    return res.status(401).json({
      message: "Invalid"
    })
  }
}
//Middleware for Users to see the stored food videos 
async function authUserMiddleware(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(400).json(
      {
        message: "Please Login First"
      });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await userModel.findById(decoded._id);
    req.user = user
    next()
  }
  catch (error) {
    return res.status(401).json({
      message: "Invalid"
    })
  }
}

module.exports = {
  authFoodPartnerMiddleware,
  authUserMiddleware
}