import React, { useState } from "react";
import "./Login.css";
import assets from "../../assets/assets";
import { signup ,login} from "../../services/authService";


//test-email -> persistencequotient@gmail.com and password - 12345678 and username - anuradha
function Login() {
  const [currState, setCurrState] = useState("Sign Up");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const onSubmitHandler = (e)=>{
    e.preventDefault()
    if(currState === 'Sign Up'){
      signup(userName,email,password)
      console.log(userName,email,password)
    }
    else{
      login(email,password)
      console.log(email,password)
    }
  }
  return (
    <div className="login min-h-[100vh] flex items-center justify-evenly">
      <img src={assets.logo_big} alt="" className="logo w-[max(20vw,200px)]" />
      <form onSubmit={onSubmitHandler} className="flex flex-col bg-white gap-[20px] loginForm" action="">
        <h2 className="w-full text-2xl font-[500]">{currState}</h2>
        {currState === "Sign Up" && (
          <input
            onChange={(e) => setUserName(e.target.value)}
            className="border"
            type="text"
            placeholder="username"
            value={userName}
            required
          />
        )}
        <input
          onChange={(e) => setEmail(e.target.value)}
          className="border"
          type="email"
          placeholder="email"
          value={email}
          required
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          className="border"
          type="password"
          placeholder="password"
          value={password}
          required
        />
        <button type="submit" className="rounded-[4px] cursor-pointer text-[16px] font-[400] outline-none bg-[#077eff]">
          {currState === "Sign Up" ? "Create Account" : "Login"}
        </button>
        <div className="flex gap-2 text-[#808080]">
          <input type="checkbox" required />
          <p className="text-[12px]">
            Agree to the terms of use & privacy and policy
          </p>
        </div>
        <div>
          {currState === "Sign Up" ? (
            <p className="text-[13px] text-[#5c5c5c]">
              Already have an account ?
              <span
                onClick={() => setCurrState("Login")}
                className="cursor-pointer text-[#077eff] font-[500]"
              >
                &nbsp;click here
              </span>
            </p>
          ) : (
            <p className="text-[13px] text-[#5c5c5c]">
              Create a new account ?
              <span
                onClick={() => setCurrState("Sign Up")}
                className="cursor-pointer text-[#077eff] font-[500]"
              >
                &nbsp;click here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

export default Login;
