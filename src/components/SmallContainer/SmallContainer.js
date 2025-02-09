import React from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import delet from "../../image/delete.png";
import "./SmallContainer.css";

function SmallContainer({ myAc, title, name, user_id, imglnk, id, isAuth,likecount }) {
    const deletePost = async (id) => {
        const postDoc = doc(db, "posts", id);
        await deleteDoc(postDoc);
    };

    useEffect(() => {
        deletePost();
    }, [0]);

    return (
        <div className="postContainer">
            {myAc === "1" && isAuth && user_id === auth.currentUser?.uid && (
                <button className="deleteButton" onClick={() => deletePost(id)}>
                    <img src={delet} alt="Delete" />
                </button>
            )}
            <div className="postImage">
                <img src={imglnk || "https://btibangalore.org/wp-content/uploads/2020/08/placeholder-300x202-1.jpg"} alt="Post" />
            </div>
            <div className="postContent">
                <h3 className="postTitle" style={{ fontSize: '20px', wordBreak: 'break-word' }}>{title}</h3>
                <div className="postbottom"><p className="postAuthor">By {name}</p> <p className="postAuthor">Likes: {likecount}</p></div>
            </div>
        </div>
    );
}

export default SmallContainer;
