import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc, addDoc, updateDoc, increment, arrayUnion, arrayRemove } from "firebase/firestore";
import { auth, db } from "../../firebase";
import "../../components/Home/Home.css";
import delet from "../../image/delete.png";
import { async } from "@firebase/util";
import liked from "../../image/thumb-up.png";
import unliked from "../../image/thumb-down.png"

function Home({ isAuth }) {
    const [postLists, setPostList] = useState([]);
    const postsCollectionRef = collection(db, "posts");
    const [count, setCount] = useState(0);
    console.log(count);

    const getPosts = async () => {
        const data = await getDocs(postsCollectionRef);
        setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

    };



    useEffect(() => {


        getPosts();
    }, []);


    const deletePost = async (id) => {
        const postDoc = doc(db, "posts", id);

        await deleteDoc(postDoc);
        getPosts();

    };
    /*
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

    */
    const [counter, setcounter] = useState(0)

    const like = async (id) => {
        const postDoc = doc(db, "posts", id);


        setcounter(counter + 1);

        console.log("cb c ")
        if (isAuth) {

            await updateDoc(postDoc, {
                likecount: arrayUnion(auth.currentUser.uid),
            });



        }

        getPosts();

    }
    const unlike = async (id) => {
        const postDoc = doc(db, "posts", id);



        if (isAuth) {

            await updateDoc(postDoc, {
                likecount: arrayRemove(auth.currentUser.uid),
            });



        }

        getPosts();

    }
    console.log(counter)
    return (
        <div className="homePage">
            
          
            {postLists
                /*.filter(post => {
                    const a = value.toLowerCase();
                    const b = post.title.toLowerCase();
                    if (value == 0) {
                        return (post.title)

                    } else {
                        return (b.startsWith(a))
                    }


                })*/
                .map((post, index) => {
                    return (
                        <div className="post" key={index}>
                            <div className="top-section">
                                <div className="title">
                                    <h1 > {post.title}</h1>
                                </div>
                                <div className="deletePost">
                                    {isAuth && post.user_id === auth.currentUser.uid && (
                                        <button
                                            onClick={() => {
                                                deletePost(post.id);
                                            }}
                                        >
                                            <span><img src={delet} /></span>
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div className="postHeader">

                                <div className="image-cont">{
                                    post.imagelink == 0 ? <p>no image</p> : <img src={post.imagelink} />

                                }

                                </div>


                                <div className="postTextContainer"> {post.postText} </div>
                                <div className="lower">
                                    <h3 >@{post.name}</h3>
                                    <div className="commented">


                                    </div>
                                    <div className="liked">
                                        <button onClick={() => { like(post.id) }}>
                                            <img src={liked} />
                                        </button>
                                        <button onClick={() => { unlike(post.id) }}>
                                            <img src={unliked} />
                                        </button>
                                        <p>{post.likecount.length}</p>
                                    </div>

                                </div>




                            </div>



                        </div>
                    );
                })}
        </div>
    );
}
export default Home;