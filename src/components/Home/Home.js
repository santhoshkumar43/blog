import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../../firebase";
function Home({ isAuth }) {
    const [postLists, setPostList] = useState([]);
    const postsCollectionRef = collection(db, "posts");
    
    

    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(postsCollectionRef);
            setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            console.log(data.docs.map((doc) => ({ ...doc.data().author, id: doc.id })));
            
        };

        getPosts();
    });

    const deletePost = async (id) => {
        const postDoc = doc(db, "posts", id);
        await deleteDoc(postDoc);
        
    };
    return (
        <div className="homePage">
            {postLists.map((post,index) => {
                return (
                    <div className="post">
                        <div className="postHeader">
                            <div className="title">
                                <h1> {post.title}</h1>
                            </div>
                            <div className="deletePost">
                                {isAuth && post.user_id === auth.currentUser.uid && (
                                    <button 
                                        onClick={() => {
                                            deletePost(post.id);
                                        }}
                                    >
                                        x
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="postTextContainer"> {post.postText} </div>
                        <h3 key={index}>@{post.name}</h3>
                       
                    </div>
                );
            })}
        </div>
    );
}
export default Home; 