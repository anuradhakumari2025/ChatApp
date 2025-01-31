import React, { useState } from "react";
import "./ProfileUpdate.css";
import assets from "../../assets/assets";

function ProfileUpdate() {
 
  const [image,setImage] = useState(false)
  return (
    <div className="profile min-h-[100vh] flex items-center justify-center bg-cover">
      <div className="profileContainer bg-white flex items-center justify-between min-w-[700px] rounded-xl">
        <form action="" className="flex flex-col gap-[20px]">
          <h3 className="text-xl font-medium">Profile Details</h3>
          <label className="flex items-center gap-[10px] text-gray-400 cursor-pointer" htmlFor="avatar">
            <input onClick={(e)=>setImage(e.target.files[0])} className="border" type="file" id="avatar" accept=".png,.jpg,.jpeg" hidden />
            <img className="w-[50px] aspect-[1/1] rounded-full" src={image ? URL.createObjectURL(image) : assets.avatar_icon} alt="" />
            upload profile image
          </label>
          <input className="" type="text" placeholder="Your name" />
          <textarea
            className=""
            name=""
            id=""
            placeholder="Wrire your profile bio"
          ></textarea>
          <button className="bg-blue-500 rounded-3xl text-normal border-none text-white cursor-pointer">
            Save
          </button>
        </form>
        <img
          className="profilePic max-w-[160px] aspect-[1/1] rounded-full "
          src={image?URL.createObjectURL(image):assets.logo_icon}
          alt=""
        />
      </div>
    </div>
  );
}

export default ProfileUpdate;
