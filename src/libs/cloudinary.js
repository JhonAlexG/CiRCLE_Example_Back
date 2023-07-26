import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";

config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (filePath, folder) => {
    return await cloudinary.uploader
        .upload(filePath, { folder })
        .catch((err) => {
            throw new Error(err);
        });
};

export const deleteImage = async (public_id) => {
    return await cloudinary.uploader.destroy(public_id).catch((err) => {
        throw new Error(err);
    });
};
