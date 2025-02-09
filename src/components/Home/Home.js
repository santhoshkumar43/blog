import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc, addDoc, updateDoc, increment, arrayUnion, arrayRemove } from "firebase/firestore";
import { auth, db } from "../../firebase";

import "../../components/Home/Home.css";
import delet from "../../image/delete.png";
import { async } from "@firebase/util";
import liked from "../../image/thumb-up.png";
import unliked from "../../image/thumb-down.png";
import TextDecoder from "../texteditor/Texteditor.js";
import SmallContainer from "../SmallContainer/SmallContainer.js";
import { Link } from "react-router-dom";
import Banner from "../Banner/Banner";

function Home({ isAuth }) {
 
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

    return (
        <div className="main-home">

            <div>
                <Banner onSearch={onSearch} postsList={postLists} />
            </div>
            <div className="homePage">
                {postLists
                    .filter(post => {
                        const a = value.toLowerCase();
                        const b = post.title.toLowerCase();
                        const d = b.sort;

                        if (value == 0) {

                            return (b)

                        } else {
                            return (b == a)
                        }


                    })
                    .map((post, index) => {
                        return (

                            <div className="post" key={index}>

                                <Link to={"Default/" + post.id} className="h-con" ><SmallContainer isAuth={isAuth} title={post.title} user_id={post.user_id} imglnk={post.imagelink} name={post.name} id={post.id} photoURL={post.photoURL} likecount={post.likecount.length} commet={post.comment} /></Link>

                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
export default Home;