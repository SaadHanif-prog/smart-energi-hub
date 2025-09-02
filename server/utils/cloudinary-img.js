const cloudinary = require("../config/cloudinary-config");
const streamifier = require("streamifier");

// Upload Image to Cloudinary
const uploadImageToCloudinary = (fileBuffer, filename) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
        public_id: filename,
        folder: "Properties",
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result); 
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};

// Delete Image from Cloudinary
const deleteImageFromCloudinary = (publicId) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(
      publicId, 
      { resource_type: "image" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
  });
};

module.exports = { uploadImageToCloudinary, deleteImageFromCloudinary };
