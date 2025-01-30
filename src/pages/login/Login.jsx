import React, { useState } from "react";
import "./Login.css";
import assets from "../../assets/assets";

function Login() {
  const [currState, setCurrState] = useState("Sign Up");
  return (
    <div className="login min-h-[100vh] flex items-center justify-evenly">
      <img src={assets.logo_big} alt="" className="logo w-[max(20vw,200px)]" />
      <form className="flex flex-col bg-white gap-[20px] loginForm" action="">
        <h2 className="w-full text-2xl font-[500]">{currState}</h2>
        {currState === "Sign Up" && (
          <input
            className="border"
            type="text"
            placeholder="username"
            required
          />
        )}
        <input className="border" type="email" placeholder="email" required />
        <input
          className="border"
          type="password"
          placeholder="password"
          required
        />
        <button className="rounded-[4px] cursor-pointer text-[16px] font-[400] outline-none bg-[#077eff]">
          {currState === 'Sign Up' ? "Create Account" : "Login"}
        </button>
        <div className="flex gap-2 text-[#808080]">
          <input type="checkbox" required />
          <p className="text-[12px]">
            Agree to the terms of use & privacy and policy
          </p>
        </div>
        <div>
          {currState === "Sign Up" ?  <p className="text-[13px] text-[#5c5c5c]">
            Already have an account ?
            <span
              onClick={() => setCurrState("Login")}
              className="cursor-pointer text-[#077eff] font-[500]"
            >
              &nbsp;click here
            </span>
          </p>:
           <p className="text-[13px] text-[#5c5c5c]">
           Create a new account ?
           <span
             onClick={() => setCurrState("Sign Up")}
             className="cursor-pointer text-[#077eff] font-[500]"
           >
             &nbsp;click here
           </span>
         </p>
          }
         
        </div>
      </form>
    </div>
  );
}

export default Login;
