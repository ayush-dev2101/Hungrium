const foodModel = require("../models/food.model");
const storageService = require('../services/storage.services');
const {v4: uuid} = require('uuid');


async function createFood(req, res){
  console.log(req.body);     //this  renders the fieldname, originalname, encoding, mimetype
  // console.log(req.foodPartner);

  console.log(req.file);        //To access the video or img of any file they do not come under req.body


  const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid())   //uuid is assigned against the file we want to upload

  console.log(fileUploadResult);

  res.send("The Food Item registered successfully");
}

module.exports = {
  createFood
}