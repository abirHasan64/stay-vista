/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import AddRoomForm from "../../../components/Form/AddroomsForm";
import useAuth from "../../../hooks/useAuth";
import { uploadImage } from "../../../api/utils";

const Addroom = () => {
  const user = useAuth();
  const [imagePreview, setImagePreview] = useState();
  const [imageText, setImageText] = useState("Upload Image");
  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: null,
    key: "selection",
  });
  //   Date range handler
  const handleDateChange = (item) => {
    console.log("Selected Range:", item);
    setDates(item.selection);
  };

  //   Form handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const location = form.location.value;
    const category = form.category.value;
    const title = form.title.value;
    const price = form.price.value;
    const guests = form.total_guest.value;
    const description = form.description.value;
    const bathrooms = form.bathrooms.value;
    const image = form.image.files[0];
    const bedrooms = form.bedrooms.value;
    const to = dates.endDate ? dates.endDate : null;
    const from = dates.startDate;
    const host = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
    };
    // Handle form submission logic here
    try {
      const image_url = await uploadImage(image);
      const roomData = {
        location,
        category,
        title,
        price: parseFloat(price),
        guests,
        description,
        bedrooms,
        bathrooms,
        image: image_url,
        from,
        to,
        host,
      };
      console.table(roomData);
    } catch (error) {
      console.error("Error uploading image:", error);
    }

    console.log("Form submitted with dates:", dates);
  };

  const handleImage = (image) => {
    setImagePreview(URL.createObjectURL(image));
    setImageText(image.name);
  };
  return (
    <div>
      {/* Add Room Form */}
      <AddRoomForm
        dates={dates}
        handleDateChange={handleDateChange}
        handleSubmit={handleSubmit}
        handleImage={handleImage}
        imageText={imageText}
        imagePreview={imagePreview}
      />
    </div>
  );
};

export default Addroom;
