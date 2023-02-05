import React from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

//prop to check if user is logged in or not
export default function Signin({ setIsAuth }) {
  let navigate = useNavigate(); //so we can redirect--i prob don't need thi s

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setIsAuth(true); //note that user is logged in
        console.log(result);
        /* the 'result' contains tons of info on the user logged in
         */
        const name = result.user.displayName;
        const email = result.user.email;
        const profilePic = result.user.photoURL;
        localStorage.setItem("isAuth", true);
        console.log(result.user.photoURL);
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("profilePic", result.user.photoURL);
        navigate("/"); //redirect to home page
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <button className="login-with-google-btn" onClick={signInWithGoogle}>
        Sign In with Google{" "}
      </button>

      <h1>{localStorage.getItem("name")}</h1>
      <h1>{localStorage.getItem("email")}</h1>
      <img src={localStorage.getItem("profilePic")} />
      <h1>{localStorage.getItem("profilePic")}</h1>
    </div>
  );
}
