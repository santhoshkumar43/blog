import React from "react";
import { auth } from '../../firebase';
import { signOut } from "firebase/auth";
import blog from "../../image/blog.png";
import Texteditor from "../texteditor/Texteditor";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import "../NavBar/NavBar.css"


function NavBar({isAuth, setIsAuth}) {
    let navigate = useNavigate();
    const signUserOut = () => {
        signOut(auth).then(() => {
          localStorage.clear();
          setIsAuth(false);
          navigate("/");
        });
      };
    return (
        <div>
            <nav>
                <div className="logo"><img src={blog} /><div><h1>Let's Blog</h1></div></div>
                

                <div className="nav-items">
                    
                    <Link className="item" to="/">Home</Link>
                    {!isAuth ? (
                        <Link className="item" to="/Login"> Login </Link>
                    ) : (
                        <>
                            <Link className="item" to="/CreatePost"> Create Post </Link>
                            
                            


                            <a className="item" onClick={signUserOut}> Log Out</a>
                            <a className="item">contact us</a>
                            <a className="item item-id">{localStorage.getItem("name")}</a>
                            <img className="item " src={localStorage.getItem("photoURL")}/>
                            
                        </>
                    )}
                </div>



            </nav>
        </div>
    )

}
export default NavBar;