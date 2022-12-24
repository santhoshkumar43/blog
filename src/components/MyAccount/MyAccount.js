import React from "react";
import "../MyAccount/MyAccount.css";
import { getDocs, collection, deleteDoc, doc, addDoc, updateDoc, increment, arrayUnion, arrayRemove } from "firebase/firestore";
import { auth, db } from "../../firebase";
import delet from "../../image/delete.png";
import SmallContainer from "../SmallContainer/SmallContainer";
import Home from "../Home/Home";
import { useState } from "react";
import Default from "../Default/Default";

import { Link } from "react-router-dom";


import { useEffect } from "react";

function MyAccount({ isAuth, id }) {

    const [postLists, setPostList] = useState([]);
    const postsCollectionRef = collection(db, "posts");
    





    const getPosts = async () => {
        const data = await getDocs(postsCollectionRef);
        setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));


    };
    useEffect(() => {
        getPosts();

        console.log("helllo")
    }, [0]);






    const [value, setvalue] = useState('');
    const onChange = (event) => {
        setvalue(event.target.value);
    }


    const onSearch = (searchTerm) => {

        if (value.length == searchTerm.length) {
            getPosts();
        }
        setvalue(searchTerm);
    }

    const deletePost = async (id) => {
        const postDoc = doc(db, "posts", id);
        await deleteDoc(postDoc);
    };
    return (
        <div>
            <h2>My Blogs</h2>
            <div>
                {postLists
                    .filter(post => {
                        const a = value.toLowerCase();
                        const c = post.postText.toLowerCase();
                        const b = post.title.toLowerCase();

                        if (post.user_id === auth.currentUser.uid) {

                            return (b)

                        } else {
                            return 0
                        }


                    })
                    .map((post, index) => {
                        return (

                            <div className="post" key={index}>
                                {/* <div className="top-section">

                                    <div className="deletePost">
                                        {isAuth && post.user_id === auth.currentUser.uid && (
                                            <button
                                                onClick={() => {
                                                    deletePost(id);
                                                }}
                                            >
                                                <span><img src={delet} /></span>
                                            </button>
                                        )}
                                    </div>
                                </div> */}

                                <SmallContainer  isAuth={isAuth} title={post.title} user_id={post.user_id} imglnk={post.imagelink} name={post.name} id={post.id} photoURL={post.photoURL} likecount={post.likecount.length} commet={post.comment} myAc={"1"} />

                            </div>
                        );
                    })}

            </div>

        </div>
    )
}
export default MyAccount;