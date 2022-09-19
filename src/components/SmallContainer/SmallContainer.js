import React from "react";
import { getDocs, collection, deleteDoc, doc, addDoc, updateDoc, increment, arrayUnion, arrayRemove } from "firebase/firestore";

import "../SmallContainer/SmallContainer.css";
import { auth, db } from "../../firebase";
import delet from "../../image/delete.png";


function SmallContainer({ title, name, user_id, imglnk, id, isAuth, photoURL }) {

    /*const deletePost = async (id) => {
        const postDoc = doc(db, "posts", id);

        await deleteDoc(postDoc);
        func();


    };*/
    return (
        <div className="postContainer">
            <div className="top-section">

                {/*<div className="deletePost">
                    {isAuth && user_id === auth.currentUser.uid && (
                        <button
                            onClick={() => {
                                deletePost(id);
                            }}
                        >
                            <span><img src={delet} /></span>
                        </button>
                    )}
                        </div>*/}
            </div>
            <div className="postHeader">

                <div className="image-cont">{
                    imglnk == 0 ?  <img src="https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png" />: <img src={imglnk} />

                }

                </div>
            </div>
            <div className="title">
                <h1 > {title}  </h1>

            </div>
            <div className="lower">
                <img src={photoURL} />
                <h3 >{name}</h3>



            </div>






        </div>
    )
}
export default SmallContainer;