import { useState } from "react";
import { Link } from "react-router-dom";
import "../Post/Post.scss";
import FormatDate from "../../util/formatDate";
import { AiOutlineHeart } from "react-icons/ai";
import { GoComment } from "react-icons/go";
import { FaUserCheck } from "react-icons/fa";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

function CliquePost({ post }) {
  if (!post) {
    return <></>;
  }


  const user = sessionStorage.getItem("userId");

  const {
    id,
    user_id,
    clique_id,
    content,
    display_name,
    created_by,
    avatar_url,
    image_url,
  } = post;

  const newDate = FormatDate(created_by);

  const handleClick = () => {
    alert(`Ow! you clicked me! ${id}`)
  }

  return (

    <section className="clique-post">
      <div to={`/${clique_id}/posts/${id}`} className="post">
        <Card>
          <CardContent>
            <Link to={`/${clique_id}/posts/${id}`} className="post__href">
            <article className="post__header">
              <div className="post__details">
                <div className="post__img-container">
                  <img
                    src={`${import.meta.env.VITE_SERVER_URL}/${avatar_url}`}
                    alt={display_name}
                    className="post__img"
                  />
                </div>
                <div className="post__author">
                  <p className="post__display-name">
                    {display_name}
                    {user === user_id.toString() && <FaUserCheck />}
                  </p>
                  <p className="post__date">{FormatDate(created_by)}</p>
                </div>
              </div>
            </article>
            <p className="post__content">{content}</p>
            {image_url && (
              <div className="post__media-container">
                <img
                  src={`${import.meta.env.VITE_SERVER_URL}/${image_url}`}
                  alt={`Uploaded by ${display_name}`}
                  className="post__media"
                />
              </div>
            )}
            </Link>
            <article className="post__impressions-div">
              <div className="post__impressions">
                <AiOutlineHeart /> Like
              </div>
              
              <div className="post__impressions" onClick={handleClick}>
                <GoComment/> Comment
              </div>
              
            </article>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default CliquePost;
