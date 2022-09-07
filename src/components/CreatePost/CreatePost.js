import React from "react";
import { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import Texteditor from "../texteditor/Texteditor";

import "../CreatePost/CreatePost.css";


function CreatePost({ isAuth }) {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [imagelink, setimagelink] = useState("");

  const postsCollectionRef = collection(db, "posts");
  let navigate = useNavigate();

  const createPost = async () => {
    await addDoc(postsCollectionRef, {
      title,
      postText,
      name: auth.currentUser.displayName,
      user_id: auth.currentUser.uid,
      imagelink,
      likecount:[],
      
    });
    navigate("/");
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);
  //TEXT EDITOR
  
    return (
      <div className="createPostPage">
        
        <h1>Create A Post</h1>
        

        <div className="cpContainer">
       
         

          <div className="inputGp">


            <input
              placeholder="Title..."
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </div>
          <div className="inputGp">

            <textarea
              placeholder="Post..."
              onChange={(event) => {
                setPostText(event.target.value);
              }}
            />
          </div>
          <div className="inputAp">
            <input
              placeholder="Image Link..."
              onChange={(event) => {
                setimagelink(event.target.value);
              }}
            />
            <button onClick={createPost}> Submit Post</button>
          </div>
        </div>
      </div>
    );
  }

export default CreatePost; 