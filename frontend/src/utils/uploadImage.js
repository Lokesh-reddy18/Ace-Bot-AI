import { API_PATHS } from "./apiPath";
import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile); // Append image file to form data

  try {
    const response = await axiosInstance.post(
      API_PATHS.IMAGE.UPLOAD_IMAGE,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Set header
        },
      }
    );
    if (response.data && response.data.imageUrl) {
      return response.data; // Return response
    } else {
      throw new Error("Image upload failed: No imageUrl in response.");
    }
  } catch (error) {
    console.error("Error while uploading image: ", error);
    throw error; // Rethrow error for handling
  }
};

export default uploadImage;
