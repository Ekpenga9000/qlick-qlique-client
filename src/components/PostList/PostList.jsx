import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { HiXMark } from "react-icons/hi2";
import { AiOutlinePicture, AiOutlineSend } from "react-icons/ai";
import CliquePost from "../CliquePost/CliquePost";
import "./PostList.scss";
import axios from "axios";
import postclique from "../../assets/images/postclique.png";

function PostList({ cliqueid }) {
  if (!cliqueid) {
    return <></>;
  }

  const userId = sessionStorage.getItem("userId");
  const navigate = useNavigate();
  if (!userId) {
    return navigate("/");
  }
  const token = sessionStorage.getItem("token");
  const [postData, setPostData] = useState([]);
  const [isErr, setErr] = useState(false);
  const [isErrMsg, setErrMsg] = useState("");
  const [hasContent, setHasContent] = useState(false);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [contentValue, setContentValue] = useState("");
  const [personalProfile, setPersonalProfile] = useState({});
  const postForm = useRef();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/cliques/${cliqueid}/posts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        setPostData(res.data.post);
        axios
          .get(`${import.meta.env.VITE_SERVER_URL}/profiles/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          })
          .then((res) => {
            setPersonalProfile(res.data);
          });
      })
      .catch((error) => {
        console.log(error);
        setErr(true);
        setErrMsg(error.message);
      });
  }, [token, userId]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleFileCancel = (e) => {
    e.preventDefault();
    setFile(null);
    setPreview(null);

    postForm.current.file.value = "";
  };

  const handlePostBtn = (e) => {
    const newContent = e.target.value;
    setContentValue(newContent);
    console.log("The content form", newContent);

    if (newContent.trim() !== "") {
      setHasContent(true);
    } else {
      setHasContent(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("postImg", file);
    formData.append("content", contentValue);
    formData.append("cliqueid", cliqueid);
    formData.append("user_id", userId);

    axios
      .post(`${import.meta.env.VITE_SERVER_URL}/posts`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then((response) => {
        let newDataArr = postData;
        newDataArr.unshift(response.data.post);
        console.log(response.data.post);
        e.target.reset();
        setContentValue("");
        setHasContent(false);
        setPostData(newDataArr);
        navigate(0);
      })
      .catch((error) => {
        console.log(error);
        setErr(true);
        setErrMsg(`${error.message}`);
      });
  };

  return (
    <section className="postList">
      <article className="postList__container">
        <form
          onSubmit={handleFormSubmit}
          ref={postForm}
          encType="multipart/form-data"
          className="postList__form"
        >
        <div className="postList__form-profile">
         {personalProfile && ( <div className="postList__img-container">
            <img
              src={`${import.meta.env.VITE_SERVER_URL}/${
                personalProfile.avatar_url
              }`}
              alt={`${personalProfile.display_name}`}
              className="postList__profile-img"
            />
         
            </div>)}
            <div className="postList__text-input">
          <textarea
            name="content"
            id="content"
            cols="30"
            rows="10"
            placeholder="What are your thought..."
            value={contentValue}
            onChange={handlePostBtn}
            className="postList__text-area"
              ></textarea>
             
             <input
            type="file"
            name="file"
            onChange={handleFileChange}
                className="postList__file"
                id="form__file"
              />
             </div> 
        </div>      
         

          {preview && (
            <div className="postList__img-div">
              <button onClick={handleFileCancel} className="postList__cancel-btn">
                <HiXMark/>
              </button>
              <img
                src={preview}
                alt="preview"
                width="200"
                className="postList__img"
              />
            </div>
          )}
          <div className="postList__post-div">
            <label htmlFor="form__file" className="postList__file-label"><AiOutlinePicture /></label> 
            {(hasContent||preview) ? <button className="postList__btn"><AiOutlineSend/></button>:<span className="postList__btn"><AiOutlineSend/></span>}
          </div>
          
        </form>
      </article>

      <article>
        <div className="postList__post-title">
          <h3 className="postList__h3">
            {postData.length ? "Posts" : "No Posts Yet"}
          </h3>
        </div>

        {!postData.length && (
          <div className="postList__noimg-container">
            <div className="postList__noimg-div">
              <img
                src={postclique}
                alt="No posts"
                className="postList__noimg"
              />
            </div>
            <p>C'mon let's build our clique!</p>
          </div>
        )}

        {postData.length ? (
          postData.map((post) => {
            return <CliquePost post={post} key={post.id} />;
          })
        ) : (
          <div></div>
        )}
        {isErr && <div>{isErrMsg}</div>}
      </article>
    </section>
  );
}

export default PostList;
