
import "./App.css"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home/Home.js"
import CreatePost from './components/CreatePost/CreatePost';
import Login from './components/Login/Login';
import { useState } from 'react';
import { auth } from './firebase';
import { signOut } from "firebase/auth";
import blog from "../src/image/blog.png"
import Texteditor from "./components/texteditor/Texteditor.js";
import NavBar from "./components/NavBar/NavBar";
import Default from "./components/Default/Default";
import MyAccount from "./components/MyAccount/MyAccount";

function App() {
  

  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/";
    });
  };
  return (
    <div className="App">
      <Router>
        <NavBar isAuth={isAuth} setIsAuth={setIsAuth}  />

        <Routes>
          <Route path="/" element={<Home isAuth={isAuth}  />} />
          <Route path="/createPost" element={<CreatePost isAuth={isAuth} />} />
          <Route path="/Login" element={<Login setIsAuth={setIsAuth} />} />
          <Route path="/Texteditor" element={<Texteditor  />} />
          <Route path="/Default/:Default" element={<Default isAuth={isAuth}/>}/>
          <Route path="/MyAccount" element={<MyAccount isAuth={isAuth}/>}/>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
