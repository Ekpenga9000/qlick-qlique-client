import { useState } from "react";
import { Link } from "react-router-dom";
import "../Post/Post.scss";
import FormatDate from "../../util/formatDate";
import { AiOutlineHeart } from "react-icons/ai";
import { GoComment } from "react-icons/go";
import { FaUserCheck } from "react-icons/fa";
import { BsFlag, BsPatchCheckFill } from "react-icons/bs";
import { CiSaveDown2 } from "react-icons/ci";
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

  return (
    //   <article className="post">
    //   <div className="post__img-container">
    //     <img src={`${import.meta.env.VITE_SERVER_URL}/${avatar_url}`} alt={ display_name } className="post__img" />
    //   </div>
    //   <div className="post__content-container">
    //     <div className="post__user-details">
    //       <div className="post__details">
    //         <Link to={`/profiles/${user_id}`} className="post__username">{display_name}</Link>
    //         <p className="post__date">{ newDate }</p>
    //       </div>
    //       {user === user_id.toString() && <span className="post__clique">
    //         <BsPatchCheckFill /> Your post
    //       </span> }
    //     </div>
    //     <p className="post__content">
    //       {content}
    //     </p>
    //     { image_url && <div className="post__media-container">
    //       <img src={`${import.meta.env.VITE_SERVER_URL}/${image_url}`} alt={`Uploaded by ${display_name}`} className="post__media" />
    //     </div>}
    //     <div className="post__impressions">
    //       <AiOutlineHeart />
    //       <GoComment />
    //       <CiSaveDown2 />
    //       <BsFlag />
    //     </div>
    //   </div>
    // </article>
    <section className="clique-post">
      <section className="post">
        <Card>
          <CardContent>
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

                    {/* {user === user_id.toString() && <BsPatchCheckFill />} */}
                    {user === user_id.toString() && <FaUserCheck />}
                  </p>
                  <p className="post__date">{FormatDate(created_by)}</p>
                </div>
              </div>
              {/* {user === user_id.toString() && (
                <span className="post__clique--alternate">
                  <FaUserCheck />
                </span>
              )} */}
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
    </section>
  );
}

export default CliquePost;
