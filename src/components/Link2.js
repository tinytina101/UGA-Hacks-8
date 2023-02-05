import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";

export default function Link2() {
  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, localStorage.getItem("email"));

  //to retrieve info from firebase
  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      // console.log(data);
      console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  });

  return (
    <div className="mypage_container">
      <div className="grid-container">
        {postLists.map((post) => {
          return (
            <div>
              <a className="page_linkCards" href={"Edit/" + post.id}>
                <div className="post">{post.title}</div>
                <div className="card_timestamp">
                  <label>{post.time}</label>
                </div>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
