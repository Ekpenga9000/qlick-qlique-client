import React, { useState, useEffect } from "react";
import "./UserPage.scss";
import axios from "axios";
import UserBanner from "../../../components/UserBanner/UserBanner";
import Post from "../../../components/Post/Post";
import { useParams } from "react-router";
import CliquePage from "../../Clique/CliquePage/CliquePage";

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
        setLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  if (!userDeets) {
    return <p>Loading...</p>;
  }
  return (
    <section className="userpage">
      <div className="userpage__profile">
        {/* <UserBanner user={userDeets} /> */}
      </div>
      <div className="userpage__posts">
       
      </div>
    </section>
  );
}

export default UserPage;
