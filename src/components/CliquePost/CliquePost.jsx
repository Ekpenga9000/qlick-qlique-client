import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../Post/Post.scss";
import FormatDate from "../../util/formatDate";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { GoComment } from "react-icons/go";
import { FaUserCheck } from "react-icons/fa";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

function CliquePost({ post }) {
  if (!post) {
    return <></>;
  }

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const user = sessionStorage.getItem("userId");
  const token = sessionStorage.getItem("token");

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

  const handleUnLike = async() => {
    setIsLiked(!isLiked);
    try {
      const response = await axios.put(`${import.meta.env.VITE_SERVER_URL}/likes/unlike`, {
        post_id: id
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }, withCredentials:true
      })

      // setIsLiked(false);
      setLikeCount(response.data.data);

    } catch (error) {
      console.error(error);
    }
  }

  const handleLike = async() => {
    setIsLiked(!isLiked);

    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/likes`, {
        post_id: id
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }, withCredentials:true
      })

      setIsLiked(true);
      setLikeCount(response.data.data);

    } catch (error) {
      console.log(error);
    }
    
  }

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/likes/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }, withCredentials:true
        });

        console.log("This are all likes", response.data, content)
        setIsLiked(response.data.userLiked);
        setLikeCount(response.data.likesCount);
      } catch (error) {
        console.error(error);
      }
    }

    fetchLikes();
  }, [id, token])
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
              {isLiked && <div className="post__impressions--liked" onClick={handleUnLike}>
                <AiFillHeart /> { likeCount }
              </div>}

              {!isLiked && <div className="post__impressions" onClick={handleLike}>
                <AiOutlineHeart /> { likeCount }
              </div> }
              
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
