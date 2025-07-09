import axios from "axios";

// image upload
export const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);
  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgBB_API_KEY}`,
    formData
  );
  return data.data.display_url;
};
