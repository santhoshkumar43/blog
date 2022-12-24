import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getDocs, collection, deleteDoc, doc, addDoc, updateDoc, increment, arrayUnion, arrayRemove, getDoc } from "firebase/firestore";
import liked from "../../image/thumb-up.png";
import unliked from "../../image/thumb-down.png";
import "../SmallContainer/SmallContainer.css";
import { auth, db } from "../../firebase";
import delet from "../../image/delete.png";
import "../Default/Default.css"
function Default({ isAuth }) {
    const [Data, setdata] = useState("");
    const [comment, setcomment] = useState("");
    const [cmts, setcmts] = useState([""]);
    const [title, settitle] = useState("");
    const [name, setname] = useState("");
    const [text, settext] = useState("");
    const [imglnk, setimglnk] = useState("");


    const pid = useParams();
    const id = pid.Default;

    const docRef = doc(db, "posts", id);
    const cmt = async (id) => {
        const docSnap = await getDoc(docRef);
        setdata(docSnap.data().likecount)
        setname(docSnap.data().name);
        setimglnk(docSnap.data().imagelink);
        settitle(docSnap.data().title);
        settext(docSnap.data().postText);
        setcmts(docSnap.data().comment)


    }


    useEffect(() => {
        cmt();

    }, []);




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
                        imglnk == 0 ? <img src="https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png" /> : <img src={imglnk} />

                    }

                    </div>


                    <div className="postTextContainer"><div dangerouslySetInnerHTML={{ __html: text.substring() + "...." }}>

                    </div></div>
                    <div className="lower-def">
                        <h3 >Author: @{name}</h3>
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


                    </div>
                    <div className="cmt-def">
                        <input
                            placeholder="Comment..."
                            onChange={(event) => {
                                setcomment(event.target.value);
                            }}
                            value={comment}
                        />
                        <button onClick={() => { commented(id) }}> Comment</button>

                    </div>
                    <div className="all-cmt-def">
                        <h3>Comments: </h3>
                        {cmts.length == 0 ? <div>no comments</div> : cmts


                            .map((post, index) => {
                                return (

                                    <div className="comments">
                                        <p>{post.text}</p>
                                        <b>{post.user_id}</b>



                                    </div>
                                );
                            })}



                    </div>
                </div>

            </div>
        </div>
    )
}
export default Default;