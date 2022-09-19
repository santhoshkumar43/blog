import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getDocs, collection, deleteDoc, doc, addDoc, updateDoc, increment, arrayUnion, arrayRemove, getDoc } from "firebase/firestore";
import liked from "../../image/thumb-up.png";
import unliked from "../../image/thumb-down.png";
import "../SmallContainer/SmallContainer.css";
import { auth, db } from "../../firebase";
import delet from "../../image/delete.png";
import "../Default/Default.css"
function Default({ isAuth, stat }) {

    const location = useLocation();
    const { title } = location.state;
    const { name } = location.state;
    const { id } = location.state;
    const { text } = location.state;

    const { imglnk } = location.state;

    const [Data, setdata] = useState("");
    const [comment, setcomment] = useState("");



    const like = async (id) => {
        const postDoc = doc(db, "posts", id);

        if (isAuth) {

            await updateDoc(postDoc, {
                likecount: arrayUnion(auth.currentUser.uid),
            });
        }
        cmt();

    }
    const unlike = async (id) => {
        const postDoc = doc(db, "posts", id);
        if (isAuth) {

            await updateDoc(postDoc, {
                likecount: arrayRemove(auth.currentUser.uid),
            });

        }
        cmt();




    }
    const docRef = doc(db, "posts", id);
    const cmt = async (id) => {
        const docSnap = await getDoc(docRef);
        setdata(docSnap.data().likecount)
        console.log(docSnap.data().title);

    }
    useEffect(() => {
        cmt();
        console.log("default")
    }, [0]);
    const commented = async (id) => {
        const postDoc = doc(db, "posts", id);
        if (isAuth) {

            await updateDoc(postDoc, {
                comment: arrayUnion({ user_id: auth.currentUser.displayName, text: comment }),
            });

        }



        cmt();
        setcomment(" ")

    }






    return (
        <div className="Default">


            <div className="in-Default">

                <div className="top-section">
                    <div className="title-d">
                        <h1 > {title}  </h1>

                    </div>

                </div>
                <div className="Header">

                    <div className="image">{
                        imglnk == 0 ? <p>no image</p> : <img src={imglnk} />

                    }

                    </div>


                    <div className="postTextContainer"> {text} </div>
                    <div className="lower">
                        <h3 >@{name}</h3>
                        <div className="commented">


                        </div>
                        <div className="liked">
                            <button onClick={() => { like(id) }}>
                                <img src={liked} />
                            </button>
                            <button onClick={() => { unlike(id) }}>
                                <img src={unliked} />
                            </button>
                            <p>{Data.length}</p>
                        </div>
                        <div >
                            <input
                                placeholder="Comment..."
                                onChange={(event) => {
                                    setcomment(event.target.value);
                                }}
                                value={comment}
                            />
                            <button onClick={() => { commented(id) }}> Submit Post</button>

                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}
export default Default;