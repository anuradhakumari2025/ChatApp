import React, { useContext, useEffect, useState } from "react";
import "./ProfileUpdate.css";
import assets from "../../assets/assets";
import { setupAuthListener, updateUserProfile } from "../../services/authService";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { uploadImage } from "../../lib/upload";

function ProfileUpdate() {
  const [image, setImage] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [prevImage, setPrevImage] = useState("");
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const { loadUserData, userData } = useContext(AppContext);

  useEffect(() => {
    // Update bio and prevImage when userData changes
    if (userData) {
      setId(userData.id);
      if (userData.bio) {
        setBio(userData.bio);
      }
      if (userData.avatar) {
        setPrevImage(userData.avatar);
      }
      if (userData.name) {
        setName(userData.name);
      }
      console.log("User.bio is:", userData);
    } else {
      navigate('/')
    }
  }, [loadUserData]);

  const submitHandler =async (e) => {
    e.preventDefault();
    try {
      let imageUrl = prevImage;
      if(!prevImage && !image){
        toast.error("Please Upload Profile Picture")
        return;
      }
      if(image){
        imageUrl = await uploadImage(image, id);
        if (!imageUrl) {
          toast.error("Image upload failed");
          return;
        }
      }
        // Update user profile in the database
        const updatedUser = {
          id,
          name,
          bio,
          avatar: imageUrl,
        };
  
        const result = await updateUserProfile(updatedUser);
        if (result) {
          toast.success("Profile updated successfully");
          loadUserData(id); // Reload user data
        } else {
          toast.error("Profile update failed");
        }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  };
  return (
    <div className="profile min-h-[100vh] flex items-center justify-center bg-cover">
      <div className="profileContainer bg-white flex items-center justify-between min-w-[700px] rounded-xl">
        <form
          onSubmit={submitHandler}
          action=""
          className="flex flex-col gap-[20px]"
        >
          <h3 className="text-xl font-medium">Profile Details</h3>
          <label
            className="flex items-center gap-[10px] text-gray-400 cursor-pointer"
            htmlFor="avatar"
          >
            <input
              onClick={(e) => setImage(e.target.files[0])}
              className="border"
              type="file"
              id="avatar"
              accept=".png,.jpg,.jpeg"
              hidden
            />
            <img
              className="w-[50px] aspect-[1/1] rounded-full"
              src={image ? URL.createObjectURL(image) : assets.avatar_icon}
              alt=""
            />
            upload profile image
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            className=""
            type="text"
            placeholder="Your name"
          />
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            placeholder="Wrire your profile bio"
          ></textarea>
          <button className="bg-blue-500 rounded-3xl text-normal border-none text-white cursor-pointer">
            Save
          </button>
        </form>
        <img
          className="profilePic max-w-[160px] aspect-[1/1] rounded-full "
          src={image ? URL.createObjectURL(image) : assets.logo_icon}
          alt=""
        />
      </div>
    </div>
  );
}

export default ProfileUpdate;
