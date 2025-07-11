/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import AddRoomForm from "../../../components/Form/AddroomsForm";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

import { uploadImage } from "../../../api/utils";
import { Helmet } from "react-helmet";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Addroom = () => {
  const user = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState();
  const [imageText, setImageText] = useState("Upload Image");
  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  //   Date range handler
  const handleDateChange = (item) => {
    console.log("Selected Range:", item);
    setDates(item.selection);
  };

  // use mutation for tanstack querry
  const { mutateAsync } = useMutation({
    mutationFn: async (roomData) => {
      // Post the room data to server
      const data = await axiosSecure.post("/room", roomData);
      return data;
    },
    onSuccess: () => {
      console.log("data saved successfully");
      setLoading(false);
      toast.success("Room added successfully!");
      navigate("/dashboard/my-listings");
    },
  });
  //   Form handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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
      // Post the room data to server
      await mutateAsync(roomData);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to save room data.", error.message);
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
      <Helmet>
        <title>Add Room | Dashboard</title>
      </Helmet>
      {/* Add Room Form */}
      <AddRoomForm
        dates={dates}
        handleDateChange={handleDateChange}
        handleSubmit={handleSubmit}
        handleImage={handleImage}
        imageText={imageText}
        imagePreview={imagePreview}
        loading={loading}
      />
    </div>
  );
};

export default Addroom;
