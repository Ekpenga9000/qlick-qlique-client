import React, { useState, useEffect } from "react";
import "./UserPage.scss";
import axios from "axios";
import { useParams } from "react-router";
import FormatDate from "../../../util/formatDate";
import UserPostList from "../../../components/UserPostsList/UserPostList";
import UserFollowList from "../../../components/UserFollowList/UserFollowList";
import Loading from "../../../components/Loading/Loading";

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
    return <Loading/>;
  }

  const { display_name, created_at, bio, id  } = userDeets;

  const joined = FormatDate(created_at);

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
