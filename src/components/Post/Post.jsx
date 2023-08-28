import React from "react";
import "./Post.scss";
import userImg from "../../assets/images/sampleman.jpg";
import eventPost from "../../assets/images/event1.jpg";
import { HiMiniUserGroup } from "react-icons/hi2";
import { AiOutlineHeart } from "react-icons/ai";
import { GoComment } from "react-icons/go";
import { BsFlag } from "react-icons/bs";
import { CiSaveDown2 } from "react-icons/ci";

function Post() {
  return (
    <article className="post">
      <div className="post__img-container">
        <img src={userImg} alt="" className="post__img" />
      </div>
      <div className="post__content-container">
        <div className="post__user-details">
          <div className="post__details">
            <p className="post__username">@user_name</p>
            <p className="post__date">14h</p>
          </div>
          <span className="post__clique">
            <HiMiniUserGroup /> Clique name
          </span>
        </div>
        <p className="post__content">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad, at.
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad, at.
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad, at.
        </p>
        <div className="post__media-container">
          <img src={eventPost} alt="" className="post__media" />
        </div>
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
