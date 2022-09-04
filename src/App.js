
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

function App() {

  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/Login";
    });
  };
  return (
    <div className="App">
      <Router>

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
              </>
            )}
          </div>


        </nav>


        <Routes>
          <Route path="/" element={<Home isAuth={isAuth} />} />
          <Route path="/CreatePost" element={<CreatePost isAuth={isAuth} />} />
          <Route path="/Login" element={<Login setIsAuth={setIsAuth} />} />
          <Route path="/Techeditor" element={<Texteditor />}/>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
