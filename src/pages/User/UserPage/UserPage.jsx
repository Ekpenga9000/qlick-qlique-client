import React, { useState, useEffect } from "react";
import "./UserPage.scss";
import axios from "axios";
import { useParams } from "react-router";
import UserPostList from "../../../components/UserPostsList/UserPostList";
import UserFollowList from "../../../components/UserFollowList/UserFollowList";

function UserPage({ setLoggedIn, setUserId }) {
  const { userId } = useParams();
  const [userDeets, setUserDeets] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/profiles/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        setUserDeets(res.data);
        sessionStorage.setItem("userId", res.data.id);
        setUserId(res.data.id);
        console.log("The user information", res.data);
        setLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  if (!userDeets) {
    return <p>Loading...</p>;
  }

  const { display_name, created_at, bio, id  } = userDeets;

  const formatDate = (dateString) => {

    const dateObject = new Date(dateString);
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();
    const year = dateObject.getFullYear();
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const americanDate = `${month}/${day}/${year}`;
    const americanTime = `${hours}:${minutes}`;
    
    return `${americanDate} ${americanTime}`; 
  }

  const joined = formatDate(created_at);

  return (
    <section className="userpage">
      {userDeets && <article className="userpage__profile">
        <h3>{display_name}</h3>
        <p>{bio}</p>
        <address>Joined at {joined}</address>
      </article>}
      <article className="userpage__main">
        <div className="userpage__following">
          <UserFollowList user_id={ id }/>
        </div>
        <div className="userpage__posts">
          <UserPostList user_id={ id } />
        </div>
      </article>
     
    </section>
  );
}

export default UserPage;
