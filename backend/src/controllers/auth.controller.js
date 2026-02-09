const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');  //JWT is a secure way to send user identity information between client and server after login.


const foodPartnerModel = require("../models/foodpartner.model")
const userModel = require('../models/user.model');


//Register User Controller
async function registerUser(req, res) {
  const { fullName, email, password } = req.body;

  const isUserAlreadyExists = await userModel.findOne({
    email
  })
  if (isUserAlreadyExists) {
    return res.status(400).json({
      message: "User already exists"
    })
  }
  //To protect the Password breaching of the users
  const hashedPassword = await bcrypt.hash(password, 10); 

  const user = await userModel.create({
    fullName,
    email,
    password: hashedPassword
  })

  const token = jwt.sign({
    id: user._id
  }, process.env.JWT_SECRET)  //process.env calls the .env file that contains JWT_SECRET
  res.cookie("token", token);

  res.status(201).json({
    message: "User registered successfully",
    user: {
      _id: user.id,
      email: user.email,
      fullName: user.fullName
    }
  })
}


//Login User Controller
async function loginUser(req, res) {
  const { email, password } = req.body;
  const user = await userModel.findOne({
    email
  })
  if (!user) {
    res.status(400).json({
      message: "Invalid email or password"
    });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Incorrect Password"
    });
  }

  const token = jwt.sign({
    id: user._id
  },
    process.env.JWT_SECRET
  )
  res.cookie("token", token)
  res.status(200).json({
    message: "User logged in successfully",
    user: {
      _id: user._id,
      email: user.email,
      fullName: user.fullName
    }
  });
}

//Logout User Controller (End of the session)
function logoutUser(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "User logged out successfully"
  });
}

//Register FoodPartner Controller
async function registerFoodPartner(req, res) {
  const { name, email, password, phone, address } = req.body;
  const isAccountAlreadyExists = await foodPartnerModel.findOne({
    email
  });

  if (isAccountAlreadyExists) {
    return res.status(400).json({
      message: "The Food Partner is already registered!"
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const foodPartner = await foodPartnerModel.create({             //Saving memory to the database 
    name,
    email,
    password: hashedPassword,
    phone, 
    address, 
    contactName
  });

  const token = jwt.sign({
    id: foodPartnerModel._id
  }, process.env.JWT_SECRET)

  res.cookie("token", token)
  res.status(201).json({
    message: "Food Partner registered successfully",
    foodPartner: {
      _id: foodPartner._id,
      email: foodPartner.email,
      name: foodPartner.name,
      address: foodPartner.address,
      contactName: foodPartner.contactName,
      phone: foodPartner.phone
    }
  })
}

//Login FoodPartner Controller
async function loginFoodPartner(req, res) {
  try {
    const { email, password } = req.body;

    const foodPartner = await foodPartnerModel.findOne({ email });

    if (!foodPartner) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      foodPartner.password
    );

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
      { id: foodPartner._id },
      process.env.JWT_SECRET
    );

    res.cookie("token", token);
    return res.status(200).json({
      message: "Food Partner logged in successfully",
      foodPartner: {
        _id: foodPartner._id,
        email: foodPartner.email,
        name: foodPartner.name
      }
    });
  } catch (err) {
    console.error("loginFoodPartner error:", err);
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
}


//Logout FoodPartner Controller
function logoutFoodPartner(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "Food Partner logged out successfully"
  });
}





module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  registerFoodPartner,
  loginFoodPartner,
  logoutFoodPartner
}