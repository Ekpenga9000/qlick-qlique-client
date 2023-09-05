import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CliquePost from "../CliquePost/CliquePost";
import "./PostList.scss";
import axios from "axios";

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
      })
        .catch((error) => {
        console.log(error)
        setErr(true);
        setErrMsg(error.message);
      });
  }, [token]);

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
      formData.append("content", contentValue)
      formData.append("cliqueid", cliqueid)
      formData.append("user_id", userId)

    axios
      .post(
        `${import.meta.env.VITE_SERVER_URL}/posts`,
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                 Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        let newDataArr = postData;
          newDataArr.unshift(response.data.post);
          console.log(response.data.post)
        e.target.reset();
        setContentValue(""); 
        setHasContent(false); 
        setPostData(newDataArr);
        navigate(0);
      })
        .catch((error) => {
          console.log(error)
        setErr(true);
        setErrMsg(`${error.message}`);
      });
  };

  return (
    <section className="postList">
      <article className="postList__container">
        <form onSubmit={handleFormSubmit} ref={postForm} encType="multipart/form-data" className="postList__form">
          <textarea
            name="content"
            id="content"
            cols="30"
            rows="10"
            placeholder="What are your thoughts..."
            value={contentValue}
                      onChange={handlePostBtn}
                      className="postList__text-area"
          ></textarea>
          <input type="file" name="file" onChange={handleFileChange} className="postList__file"/>
          
          {preview && <div className="postList__img-div"><img src={preview} alt="preview" width="200" className="postList__img"/></div>}
          {preview && <button onClick={handleFileCancel} className="postList__cancel-btn">Cancel</button>}
          {hasContent && <button className="postList__btn">Create post</button>}
        </form>
      </article>

          <article>
              <div className="postList__post-title">
                <h3>Posts</h3>
              </div>
              
        {postData.length ? (
          postData.map((post) => {
              return <CliquePost post={post} key={ post.id } />;
          })
        ) : (
          <div>No posts yet!!</div>
        )}
        {isErr && <div>{isErrMsg}</div>}
      </article>
    </section>
  );
}

export default PostList;

