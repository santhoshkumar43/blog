import React from "react";
import { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";
import { useRef } from "react";
import "../CreatePost/CreatePost.css";

function CreatePost({ isAuth }) {
  const editor = useRef(null)
  const [content, setcontent] = useState('')
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState('');
  const [imagelink, setimagelink] = useState("");

  const postsCollectionRef = collection(db, "posts");
  let navigate = useNavigate();

  const createPost = async () => {
    await addDoc(postsCollectionRef, {
      title,
      postText,
      name: auth.currentUser.displayName,
      user_id: auth.currentUser.uid,
      photoURL: auth.currentUser.photoURL,

      imagelink,
      likecount: [],
      comment: [],


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

      <h1>Create a Post</h1>


      <div className="cpContainer">


        <div>
          <h3>Title of the blog :</h3>
        </div>
        <div className="inputT">
          <input
            placeholder="Title..."
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>
        <h3>Write the blog here:</h3>
        <div className="inputP">
          <JoditEditor
            ref={editor}
            value={postText}
            onChange={event => {
              setPostText(event);
            }}


          />


        </div>
        <h3>Thumbnil Link:</h3>
        <div className="inputAp">

          <input
            placeholder="Image Link..."
            onChange={(event) => {
              setimagelink(event.target.value);
            }}
          />
          <button className="sub-btn" onClick={createPost}> Submit Post</button>
        </div>
        {/* <div>
        <div dangerouslySetInnerHTML={{ __html: postText.substring() + "...." }}>

                </div>
          {postText}
        </div> */}
      </div>
    </div>
  );
}

export default CreatePost; 