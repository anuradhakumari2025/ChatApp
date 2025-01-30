import React from "react";
import "./Login.css";
import assets from "../../assets/assets";

function Login() {
  return (
    <div className="login min-h-[100vh] flex items-center justify-[space-evenly]">
      <img src={assets.logo_big} alt="" className="logo" />
      <form action="">
        <h2>Sign up</h2>
        <input type="text" placeholder="username" />
        <input type="email" placeholder="email" />
        <input type="password" placeholder="password" />
        <button>Sign Up</button>
        <div>
          <input type="checked"  />
          <p>Agree to the terms of use & privacy and policy</p>
        </div>
        <div>
          <p>Already have an account <span>click here</span></p>
        </div>
      </form>
    </div>
  );
}

export default Login;
