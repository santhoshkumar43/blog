import React from "react";
import { getDocs, collection, deleteDoc, doc, addDoc, updateDoc, increment, arrayUnion, arrayRemove } from "firebase/firestore";
import liked from "../../image/thumb-up.png";
import "../SmallContainer/SmallContainer.css";
import chat from "../../image/chat.png"
import { auth, db } from "../../firebase";
import delet from "../../image/delete.png";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Default from "../Default/Default";




function SmallContainer({ myAc, title, name, user_id, imglnk, id, isAuth, photoURL, likecount }) {



    const deletePost = async (id) => {
        const postDoc = doc(db, "posts", id);

        await deleteDoc(postDoc);
    };
    useEffect(() => {
        deletePost();
    }, [0]);
    
    return (
        <div className="postContainer">
            <div className="top-section">

                {myAc == "1" &&( <div className="deletePost">
                    {isAuth && user_id === auth.currentUser.uid && (
                        <button
                            onClick={() => {
                                deletePost(id);
                            }}
                        >
                            <span><img src={delet} /></span>
                        </button>
                    )}
                </div>)}
            </div>
            
            <div className="postHeader">

                <div className="image-cont">{
                    imglnk == 0 ? <img src="https://btibangalore.org/wp-content/uploads/2020/08/placeholder-300x202-1.jpg" /> : <img src={imglnk} />

                }

                </div>
            </div>
            <div className="title">
                <p > {title}  </p>

            </div>
            {/* <div className="lower">

                <h4 >{name}</h4>
                <p>Likes: {likecount}</p>
            </div> */}
           
            






        </div>
    )
}
export default SmallContainer;