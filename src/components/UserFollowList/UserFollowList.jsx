import React, { useState, useEffect } from "react";
import "./UserFollowList.scss";
import axios from "axios";
import UserFollow from "../UserFollow/UserFollow";
import { useNavigate, Link } from "react-router-dom";
import Clique from "../../assets/images/clique.png";
import Loading from "../Loading/Loading";

function UserFollowList({ user_id }) {
  const [favouritesData, setFavouritesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/favourites/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log("The favourites", res.data);
        setFavouritesData(res.data);
        setIsLoading(false); // Set loading to false when data is fetched
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false); // Set loading to false on error
      });
  }, []);

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
      .then(() => {
        navigate(0);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <article className="userFollowList">
      <h3 className="userFollowList__title">Following</h3>
      {isLoading ? (
        <Loading/>
      ) : (
        <>
          {!!favouritesData.length ? (
            <div>
              {favouritesData.map((favorite) => (
                <UserFollow
                  data={favorite}
                  handleUnfollow={handleUnfollow}
                  key={favorite.favourites_id}
                />
              ))}
            </div>
          ) : (
            <div className="userFollowList__noClique-div">
              <div className="userFollowList__img-div">
                    <img src={ Clique } alt="No clicks yet" className="userFollowList__img"/>
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
