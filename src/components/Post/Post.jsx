import React from "react";
import { Link } from "react-router-dom";
import "./Post.scss";
import FormatDate from "../../util/formatDate";
import { HiMiniUserGroup } from "react-icons/hi2";
import { AiOutlineHeart } from "react-icons/ai";
import { GoComment } from "react-icons/go";
import { BsFlag } from "react-icons/bs";
import { CiSaveDown2 } from "react-icons/ci";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

function Post({ post }) {
  if (!post) {
    return <></>;
  }

  const {
    id,
    user_id,
    clique_id,
    content,
    display_name,
    created_by,
    avatar_url,
    image_url,
    name,
  } = post;

  return (
    <section className="post">
    <Card>
      <CardContent>
        <article className="post__header">
          <div className="post__details">
            <div className="post__img-container">
                <img src={`${import.meta.env.VITE_SERVER_URL}/${avatar_url}`}
                  alt={display_name}
                  className="post__img" />
            </div>
            <div className="post__author">
              <p className="post__display-name">{display_name}</p>
              <p className="post__date">{FormatDate(created_by)}</p>
            </div>
          </div>
          <Link to={`/cliques/${clique_id}`} className="post__clique">
            <HiMiniUserGroup /> visit {name}
          </Link>
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
        <article className="post__impressions">
          <AiOutlineHeart />
          <GoComment />
           <CiSaveDown2 />
           <BsFlag />
        </article>
      </CardContent>
      </Card>
      </section>
  );
}

export default Post;
