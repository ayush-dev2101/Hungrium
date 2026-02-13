const foodModel = require("../models/food.model");
const likeModel = require("../models/like.model");
const saveModel = require("../models/save.model");
const storageService = require('../services/storage.services');
const {v4: uuid} = require('uuid');

//Creating Food Item
const createFood = async (req, res)=>{
  console.log(req.body);     //this  renders the fieldname, originalname, encoding, mimetype
  // console.log(req.foodPartner);

  console.log(req.file);        //To access the video or img of any file they do not come under req.body


  const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid())   //uuid is assigned against the file we want to upload

  console.log(fileUploadResult);

  const foodItem = await foodModel.create({
    name: req.body.name,
    description: req.body.description,
    video: fileUploadResult.url,
    foodPartner: req.foodPartner._id
  })

  res.status(201).json({
    message: "Food Item Created Successfully"
  })
}

//Fetching the Food Item
const getFoodItems = async (req, res)=>{
  const foodItems = await foodModel.find({})
  res.status(200).json({
      message: "Food items fetch successfully",
      foodItems
  })
}

//Like Controller
const likeFood = async (req, res)=>{
  const {foodId} = req.body;
  const user = req.user; 

  const isAlreadyLiked = await likeModel.findOne({
    user: user._id,
    food: foodId
  })

//The Already Liked and Error Part
  if (isAlreadyLiked){
    await likeModel.deleteOne({
      user: user._id,
      food: foodId
    })

    await foodModel.findByIdAndUpdate(foodId, {
      $inc: {likeCount: -1}
    }, {new: true})

    return res.status(200).json({
      message: "Food Unliked Successfully"
    })
  }
  //If Not liked then like function will run 
      const like = await likeModel.create({
      user: user._id,
      food: foodId
    })

    await foodModel.findByIdAndUpdate(foodId, {
      $inc: {likeCount: 1}
    })

    res.status(201).json({
      message: "Food Liked Successfully",
      like
    })
}

//Saving the Food into the Profile
const saveFood = async (req, res)=>{
  const {foodId} = req.body;
  const user = req.user;

  const isAlreadySaved = await saveModel.findOne({
    user: user._id,
    food: foodId
  })

  if (isAlreadySaved) {
    await saveModel.deleteOne({
      user: user._id,
      food: foodId
    })

    await foodModel.findByIdAndUpdate(foodId, {
      $inc: {savesCount: -1}
    })

    return res.status(200).json({
      message: "Food Unsaved Successfully"
    })
  }

  const save = await saveModel.create({
    user: user._id,
    food: foodId
  })

  await foodModel.findByIdAndUpdate(foodId, {
    $inc: {savesCount: 1}
  })

  res.status(201).json({
    message: "Food Saved Successfully",
    save
  })
}

const getSaveFood = async (req, res)=>{
  const user = req.user;
  const savedFoods = await saveModel.find({user: user._id}).populate('food');

  if(!savedFoods || savedFoods.length === 0){
    return res.status(404).json({
      message: "No Saved Food Found!"
    });
  }

  res.status(200).json({
    message: "Saved Foods Retrieved Successfully",
    savedFoods
  });
}

module.exports = {
  createFood, getFoodItems, likeFood, saveFood, getSaveFood
}