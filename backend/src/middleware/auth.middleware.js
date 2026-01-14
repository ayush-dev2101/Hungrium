const foodPartnerModel = require("../models/foodpartner.model");
const jwt = require('jsonwebtoken');


//Middleware for the foodPartner to store the food on the website
async function authFoodPartnerMiddleware(req, res, next){
  const token = req.cookies.token; 
  if(!token){
   return res.status(401).json({
      message: "Please login firsts"
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  //decoded will fetch the data in object format 

    const foodPartner = await foodPartnerModel.findById(decoded._id);

    req.foodPartner = foodPartner;


    next();
     
  }catch(err){
    return res.status(401).json({

    })
  }
}

module.exports = {
  authFoodPartnerMiddleware,
}