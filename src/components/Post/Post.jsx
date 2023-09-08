import React from "react";
import { Link } from "react-router-dom";
import "./Post.scss";
import { HiMiniUserGroup } from "react-icons/hi2";
import { AiOutlineHeart } from "react-icons/ai";
import { GoComment } from "react-icons/go";
import { BsFlag } from "react-icons/bs";
import { CiSaveDown2 } from "react-icons/ci";

function Post({ post }) {
  if (!post) {
    return <></>;
  }

  const { id, user_id,
    clique_id, content,
    display_name, created_by,
    avatar_url, image_url, name
  } = post; 

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


  return (
    <article className="post">
      <div className="post__img-container">
        <img src={`${import.meta.env.VITE_SERVER_URL}/${avatar_url}`} alt={ display_name } className="post__img" />
      </div>
      <div className="post__content-container">
        <div className="post__user-details">
          <div className="post__details">
            <p className="post__username">{display_name}</p>
            <p className="post__date">{ formatDate(created_by) }</p>
          </div>
          <Link to={`/cliques/${clique_id}`} className="post__clique">
            <HiMiniUserGroup /> visit {name}
          </Link>
        </div>
        <p className="post__content">
          {content}
        </p>
        { image_url && <div className="post__media-container">
          <img src={`${import.meta.env.VITE_SERVER_URL}/${image_url}`} alt={`Uploaded by ${display_name}`} className="post__media" />
        </div>}
        <div className="post__impressions">
          <AiOutlineHeart />
          <GoComment />
          <CiSaveDown2 />
          <BsFlag />
        </div>
      </div>
    </article>
  );
}

export default Post;
