import { Link, useMatch, useResolvedPath } from "react-router-dom";
import Signin from "./Signin";
import { auth } from "../firebase";
import { useState } from "react";
import { signOut } from "firebase/auth";

export default function Navbar() {
  //use to check if user is logged in or not
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  //log user out
  const logOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/";
    });
  };

  return (
    <nav className="nav">
      <a href="/" className="site-title">
        {" "}
        Bruh Lets Go{" "}
      </a>
      <ul>
        {
          /*will display log out when logged in and vice versa*/ !isAuth ? (
            ""
          ) : (
            <CustomLink to="/CreatePlan">Create</CustomLink>
          )
        }

        {
          /*will display log out when logged in and vice versa*/ !isAuth ? (
            ""
          ) : (
            <CustomLink to="/Link2">My Page</CustomLink>
          )
        }

        {
          /*will display log out when logged in and vice versa*/ !isAuth ? (
            <Signin setIsAuth={setIsAuth} />
          ) : (
            <button onClick={logOut}> Log Out</button>
          )
        }
      </ul>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);

  //look at which nav we currently on
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
