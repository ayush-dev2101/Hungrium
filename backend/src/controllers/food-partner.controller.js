const foodPartnerModel = require("../models/foodpartner.model");
const foodModel = require("../models/food.model")

const  getFoodPartnerById = async (req, res)=>{
  const foodPartnerId = req.params.id;

  const foodPartner = await foodPartnerModel.findById(foodPartnerId)
  const foodItemsByFoodPartner = await foodModel.find({foodPartner: foodPartnerId})

  if(!foodPartner){
    return res.status(404).json({message: "Food Partner Not Found"})
  }

  res.status(200).json({
    message: "Food Partner Retrieved Successfully",
    foodPartner: {
      ...foodPartner.toObject(),
      foodItems: foodItemsByFoodPartner
    }
  });
}

module.exports = {
  getFoodPartnerById
};