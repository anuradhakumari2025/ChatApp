import React from "react";
import "./ChatBox.css";
import assets from "../../assets/assets";
function ChatBox() {
  return (
    <div className="chatBox bg-[#f1f5ff] relative h-[75vh]">
      <div className="chatUser flex items-center gap-[10px]">
        <img
          className="w-[38px] rounded-full aspect-[1/1]"
          src={assets.profile_img}
          alt=""
        />
        <p className="flex-1 font-[500] flex text-[20px] text-[#393939] items-center gap-[5px]">
          Anuradha Kumari
          <img
            className="w-[25px] rounded-full dot"
            src={assets.green_dot}
            alt=""
          />
        </p>
        <img className="w-[25px] rounded-full" src={assets.help_icon} alt="" />
      </div>
      <div className="chatMsg overflow-y-scroll flex flex-col-reverse">
        <div className="sMsg flex gap-[5px]">
          <p className="msg text-white bg-[#077eff] text-[12px] font-[300]">
            Lorem adipisicing elit. Possimu
          </p>
          <div className="text-center text-[9px]">
            <img
              className="aspect-[1/1] w-[27px] rounded-full"
              src={assets.profile_img}
              alt=""
            />
            <p>8:40pm</p>
          </div>
        </div>
        <div className="sMsg flex gap-[5px]">
          <img className="msgImg" src={assets.pic1} alt="" />
          <div className="text-center text-[9px]">
            <img
              className="aspect-[1/1] w-[27px] rounded-full"
              src={assets.profile_img}
              alt=""
            />
            <p>8:40pm</p>
          </div>
        </div>
        <div className="rMsg flex gap-[5px] flex-row-reverse">
          <p className="msg text-white bg-[#077eff] text-[12px] font-[300]">
            Lorem ipsum dolor sit adipisicing elit. Possimus
          </p>
          <div className="text-center text-[9px]">
            <img
              className="aspect-[1/1] w-[27px] rounded-full"
              src={assets.profile_img}
              alt=""
            />
            <p>8:40pm</p>
          </div>
        </div>
      </div>
      <div className="chatInput flex gap-[10px] items-center bg-white absolute bottom-0 left-0 right-0 ">
        <input
          className="border-none outline-none flex-1"
          type="text"
          placeholder="Send Message..."
        />
        <input type="file" id="image" accept="image/png,image/jpeg" hidden />
        <label htmlFor="image flex">
          <img
            className="w-[22px] cursor-pointer"
            src={assets.gallery_icon}
            alt=""
          />
        </label>
        <img
          className="w-[30px] cursor-pointer"
          src={assets.send_button}
          alt=""
        />
      </div>
    </div>
  );
}

export default ChatBox;
