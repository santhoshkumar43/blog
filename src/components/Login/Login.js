import React, { useState } from "react";
import { auth, provider } from "../../firebase.js";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../Login/Login.css"
import google from "../../image/google.png";




function Login({ setIsAuth }) {
  let navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      localStorage.setItem("name",auth.currentUser.displayName)
      setIsAuth(true);
      navigate("/");
    });
  };
  console.log(localStorage.getItem("name"))

  return (
    <div className="Login">


      <div className="loginPage">
        <h1>Login Here</h1>
        <button className="login-with-google-btn" onClick={signInWithGoogle}><span><img src={google}/></span>
          <p>Sign in with Google</p>
        </button>
      </div>
    </div>
  );
}

export default Login;