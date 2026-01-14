const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({   //foodSchema is only the blueprint or the reference of the MongoDB object collection
  name: {
    type: String,
    required: true
  },
  video: {
    type: String,
    required: true,
  },
  description: {
    type: String
  },
  foodPartner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "foodpartner"
  }
})

const foodModel = mongoose.model("food", foodSchema);  //foodModel is the constructor function used to interact with the MongoDB

module.exports = foodModel;