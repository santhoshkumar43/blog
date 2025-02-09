import React from "react";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";
import { useRef } from "react";
import "../CreatePost/CreatePost.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Rewrite from "../ReWrite/Rewrite";
function CreatePost({ isAuth }) {

  const editor = useRef(null);
  
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [imagelink, setimagelink] = useState("");
  const [titleError, setTitleError] = useState(""); // State for title validation error
  const showErrorToast = () => {
    console.log()
    toast.error("Something went Wrong", {
      position: "top-right",
      autoClose: 5000, // Close after 5 seconds
    });
  };
  const showSuccessToast = () => {
    toast.success("Post Published successfully!", {
      position: "top-right",
      autoClose: 3000, // Close after 3 seconds
    });
  };
  const postsCollectionRef = collection(db, "posts");
  let navigate = useNavigate();
  const config = {
    readonly: false, // Make the editor editable
    toolbar: true, // Show the toolbar
    buttons: [
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "|",
      "fontsize",
      "font",
      "|",
      "align",
      "ul",
      "ol",
      "|",
      "link",
      "image",
      "|",
      "undo",
      "redo",
    ],
    height: 500, // Set editor height
  };

  const createPost = async () => {
    if(title == "" || title == " "){

      showErrorToast() 
    }
    else if (postText == "" || postText == " "){
      showErrorToast() 
    }
    else if(imagelink == "" || imagelink == " "){
      showErrorToast() 
    }
    
    // If validation passes, proceed to create the post
    else{
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
      showSuccessToast();
      navigate("/");
    }
  };

  const handleTitleChange = (event) => {
    const value = event.target.value;
    if (value.length <= 100) {
      setTitle(value);
      setTitleError(""); // Clear error if input is valid
    } else {
      setTitleError("Title cannot exceed 100 characters."); // Set error message
    }
  };

  return (
    <div className="createPostPage">
   
      <h1>Create a Post</h1>
      <div className="cpContainer">
        <div>
          <h3>Title of the blog :</h3>
        </div>
     
          <input
            // Corrected attribute name (maxLength instead of maxlength)
            placeholder="Title..."
            value={title}
            onChange={handleTitleChange} // Updated handler
            style={{ border: titleError ? "1px solid red" : "1px solid #ff6f00" }} // Highlight input if there's an error
          />
          {titleError && (
            <p style={{ color: "red", fontSize: "0.875rem" }}>{titleError}</p> // Display error message
          )}
       
        <div>        <h3>Write the blog here:</h3></div>
        <div className="inputP">
          <JoditEditor
            ref={editor}
            value={postText}
            config={config}
            onBlur={(event) =>
              setPostText(event)
            }
          />
        </div>
        <Rewrite content={postText} setPostText={setPostText}/>
        <h3>Thumbnail Link:</h3>
        
          
          <input
            placeholder="Image Link..."
            onChange={(event) => {
              setimagelink(event.target.value);
            }}
        />
        <button className="sub-btn" onClick={createPost}>
          Submit Post
        </button>
        <div className="poweredByAI">
          <p>🚀 Powered by AI</p>
        </div>

      </div>
      <ToastContainer />
    </div>
  );
}

export default CreatePost;