import React from "react";
import "./LeftSidebar.css";
import assets from "../../assets/assets";

function LeftSidebar() {
  return (
    <div className="ls bg-[#001030] text-white h-[75vh] overflow-hidden">
      <div className="lsTop">
        <div className="lsNav">
          <img className="max-w-[140px]" src={assets.logo} alt="" />
          <div className="menu relative opacity-[0.6] cursor-pointer">
            <img className="max-h-[20px]" src={assets.menu_icon} alt="" />
            <div className="subMenu hidden absolute top-[100%] right-0 w-[130px] rounded-[5px] bg-white text-black">
              <p className="cursor-pointer text-[14px]">Edit Profile</p>
              <hr />
              <p className="cursor-pointer text-[14px]">Logout</p>
            </div>
          </div>
        </div>
        <div className="lsSearch flex gap-[10px] items-center bg-[#002670]">
          <img className="w-[16px]" src={assets.search_icon} alt="" />
          <input
            className="border-none outline-none text-[16px] bg-transparent text-white"
            type="text"
            placeholder="Search here.."
          />
        </div>
      </div>
      <div className="lsList flex flex-col h-[70%] overflow-y-scroll overflow-hidden">
        {Array(12)
          .fill("")
          .map((item, index) => (
            <div
              key={index}
              className="friends flex items-center gap-[10px] text-[13px] cursor-pointer hover:bg-[#077eff]"
            >
              <img
                className="w-[35px] rounded-full"
                src={assets.profile_img}
                alt=""
              />
              <div className="flex flex-col">
                <p>Anuradha</p>
                <span className="text-[#9f9f9f] text-[11px]">
                  Hello, kaisi ho
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default LeftSidebar;
