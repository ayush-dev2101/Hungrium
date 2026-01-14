const ImageKit = require('imagekit');

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

async function uploadFile(file, fileName){
  const result = await imagekit.upload({
    file: "file", //required  --> Will be getting from teh Buffer which was called by the Multer (converting the vdo, img into binary form)
    fileName: "filename" //required
  });

  return result     //Returns the URL of the uploaded file
}

// console.log("The public key of the imagekit is:" , process.env.IMAGEKIT_PUBLIC_KEY);


module.exports = {
  uploadFile
}