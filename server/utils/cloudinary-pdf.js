const cloudinary = require("../config/cloudinary-config");
const streamifier = require("streamifier");

const uploadPDFToCloudinary = (fileBuffer, filename) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "raw",
        public_id: filename,
        folder: "Material Profiles",
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};

const deletePDFFromCloudinary = (filename) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(
      filename,
      { resource_type: "raw" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
  });
};

module.exports = { uploadPDFToCloudinary, deletePDFFromCloudinary };
