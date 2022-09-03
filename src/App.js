
import './App.css';
import {BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home/Home.js"
import CreatePost from './components/CreatePost/CreatePost';
import Login from './components/Login/Login';
import { useState } from 'react';
import {auth} from './firebase';
import { signOut } from "firebase/auth";

function App() {
  
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  };
  return (
    <div className="App">
      <Router>
        <nav>
          <Link to="/">Home</Link>
          {!isAuth ? (
          <Link to="/Login"> Login </Link>
        ) : (
          <>
            <Link to="/CreatePost"> Create Post </Link>
            <button onClick={signUserOut}> Log Out</button>
          </>
        )}
          
        </nav>
        <Routes>
          <Route path="/" element={<Home isAuth={isAuth}/>}/>
          <Route path="/CreatePost" element={<CreatePost isAuth={isAuth}/>}/>
          <Route path="/Login" element={<Login setIsAuth={setIsAuth}/>}/>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
