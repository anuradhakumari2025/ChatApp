import React from "react";
import "./RightSidebar.css";
import assets from "../../assets/assets";

function RightSidebar() {
  return (
    <div className="rs text-white relative h-[75vh] overflow-y-scroll">
      <div className="rsProfile flex items-center flex-col text-center max-w-[70%]">
        <img
          className="w-[110px] rounded-full aspect-[1/1]"
          src={assets.profile_img}
          alt=""
        />
        <h3 className="flex justify-center font-[400] text-[16px] items-center gap-[5px]">
          Anuradha Kumari
          <img
            className="w-[25px] rounded-full dot"
            src={assets.green_dot}
            alt=""
          />
        </h3>
        <p className="text-[10px] opacity-[80%] font-[300]">
          Hey,I am here what's about you
        </p>
      </div>
      <hr />
      <div className="rsMedia">
        <p className="media">Media</p>
        <div>
          <img src={assets.pic1} alt="" />
          <img src={assets.pic2} alt="" />
          <img src={assets.pic3} alt="" />
          <img src={assets.pic4} alt="" />
          <img src={assets.pic1} alt="" />
          <img src={assets.pic2} alt="" />
        </div>
      </div>
      <button className="text-[13px] rounded-2xl cursor-pointer font-semibold  border-none bg-[#077eff]">
        Logout
      </button>
    </div>
  );
}

export default RightSidebar;
