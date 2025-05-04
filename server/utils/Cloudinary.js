import { v4 as uuid } from "uuid";
import { v2 as cloudinary } from "cloudinary";
import { getBase64 } from "../lib/Helper.js";

export const uploadFilesToCloudinary = async (files = []) => {
  const uploadPromises = files.map((file) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        getBase64(file),
        {
          resource_type: "auto",
          public_id: uuid(),
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
    });
  });
  try {
    const results = await Promise.all(uploadPromises);
    const formattedResults = results.map((result) => {
      return {
        url: result.secure_url,
        public_id: result.public_id,
      };
    });
    return formattedResults;
  } catch (error) {
    console.log("Error in uploading files to cloudinary", error);
  }
};

export const deleteFilesFromCloudinary = async (public_id) => {};
