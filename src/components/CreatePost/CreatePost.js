import React from "react";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";
import { useRef } from "react";
import "../CreatePost/CreatePost.css";

function CreatePost({ isAuth }) {
  const editor = useRef(null);
  const [content, setcontent] = useState("");
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [imagelink, setimagelink] = useState("");
  const [titleError, setTitleError] = useState(""); // State for title validation error

  const postsCollectionRef = collection(db, "posts");
  let navigate = useNavigate();

  const createPost = async () => {
    // Check if title exceeds the maximum length
    if (title.length > 10) {
      setTitleError("Title cannot exceed 10 characters.");
      return; // Stop the function if validation fails
    }

    // If validation passes, proceed to create the post
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

  const handleTitleChange = (event) => {
    const value = event.target.value;
    if (value.length <= 50) {
      setTitle(value);
      setTitleError(""); // Clear error if input is valid
    } else {
      setTitleError("Title cannot exceed 50 characters."); // Set error message
    }
  };

  return (
    <div className="createPostPage">
      <h1>Create a Post</h1>
      <div className="cpContainer">
        <div>
          <h3>Title of the blog :</h3>
        </div>
        <div className="inputT">
          <input
           // Corrected attribute name (maxLength instead of maxlength)
            placeholder="Title..."
            value={title}
            onChange={handleTitleChange} // Updated handler
            style={{ border: titleError ? "1px solid red" : "1px solid #ccc" }} // Highlight input if there's an error
          />
          {titleError && (
            <p style={{ color: "red", fontSize: "0.875rem" }}>{titleError}</p> // Display error message
          )}
        </div>
        <h3>Write the blog here:</h3>
        <div className="inputP">
          <JoditEditor
            ref={editor}
            value={postText}
            onChange={(event) => {
              setPostText(event);
            }}
          />
        </div>
        <h3>Thumbnail Link:</h3>
        <div className="inputAp">
          <input
            placeholder="Image Link..."
            onChange={(event) => {
              setimagelink(event.target.value);
            }}
          />
          <button className="sub-btn" onClick={createPost}>
            Submit Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;