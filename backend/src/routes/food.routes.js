const express = require('express');
const multer = require('multer'); //Multer helps the express server to read all the type of documents(img, vdo, pdf)
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const foodController = require('../controllers/food.controller');


const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024 //50 MB is the size of the video that can be stored in the DB
  }
})
//Creating Food API
// #POST /api/food'/' [Protected]
router.post('/', authMiddleware.authFoodPartnerMiddleware, 
  upload.single("video"), 
  foodController.createFood
);

/* GET/api/food/ [protected] */
router.get("/food", authMiddleware.authUserMiddleware,
  foodController.getFoodItems
)



module.exports = router