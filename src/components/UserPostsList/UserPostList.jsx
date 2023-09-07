import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "../Post/Post";
import { Link } from "react-router-dom";
import nopost from "../../assets/images/nopost.svg";
import "./UserPostList.scss";

function UserPostList({ user_id }) {
  if (!user_id) {
    return <></>;
  }
  const [postList, setPostList] = useState([]);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/posts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        setPostList(res.data.post);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user_id]);

  return (
    <section className="userPostList">
      <h3 className="userPostList__title">Posts</h3>
      {postList.length > 0 ? (
        postList.map((post) => {
          return <Post post={post} key={post.id} />;
        })
      ) : (
          <div className="userPostList__nopost-container">
            <div className="userPostList__img-div">
              <img src={nopost} alt="No posts!" className="userPostList__img"/>
            </div>
            <Link to={"/cliques"}>No post, say something to your clique?</Link>
          </div>
        
      )}
    </section>
  );
}

export default UserPostList;
