import React, { useState, useEffect } from "react";
import "./UserFollowList.scss";
import axios from "axios";
import UserFollow from "../UserFollow/UserFollow";
import { useNavigate, Link } from "react-router-dom";
import Clique from "../../assets/images/clique.png";
import Loading from "../Loading/Loading";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

function UserFollowList({ user_id }) {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("userId");

  const [favouritesData, setFavouritesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/favourites/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        setFavouritesData(res.data);
        setIsLoading(false);
        if (!userId || user_id.toString() !== userId.toString()) {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false); // Set loading to false on error
      });
  }, [token]);

  const handleUnfollow = (cliqueid) => {
    axios
      .post(
        `${import.meta.env.VITE_SERVER_URL}/favourites/remove`,
        {
          user_id: userId,
          clique_id: cliqueid,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        setFavouritesData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <article className="userFollowList">
      <h3 className="userFollowList__title">Following</h3>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {!!favouritesData.length ? (
            <Card>
              <CardContent>
                <div className="userFollowList__container">
                  {favouritesData.map((favorite) => (
                    <UserFollow
                      data={favorite}
                      handleUnfollow={handleUnfollow}
                      key={favorite.favourites_id}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="userFollowList__noClique-div">
              <div className="userFollowList__img-div">
                <img
                  src={Clique}
                  alt="No clicks yet"
                  className="userFollowList__img"
                />
              </div>
              <p>You're currently not following any clique</p>
              <Link to="/cliques">Don't miss out on the fun!</Link>
            </div>
          )}
        </>
      )}
    </article>
  );
}

export default UserFollowList;
