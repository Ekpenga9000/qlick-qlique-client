
import React, { useState, useEffect, useRef } from 'react';
import Post from "../Post/Post";
import { useNavigate } from 'react-router-dom';
import "./PostList.scss";
import axios from 'axios';

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
  const postForm = useRef();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_SERVER_URL}/posts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    })
      .then((res) => {
        setPostData(res.data.post);
      })
      .catch((error) => {
        setErr(true);
        setErrMsg(error.message);
      })
  }, [token])


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

    // Clear the file input using its ref
    postForm.current.file.value = '';
    }
    
    const handlePostBtn = () => {
        const contentValue = postForm.current.content.value;
        const fileValue = postForm.current.file.value; 

        if (contentValue.trim() !== "") {
            setHasContent(true);
        } else if(fileValue !== null){
            setHasContent(true);
        } else {
            setHasContent(false);
        }
    }

    const handleFormSubmit = async(e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('postImg', file);
        formData.append('content', postForm.current.content.value);
        formData.append("user_id", userId);
        formData.append('cliqueid', cliqueid);


    
        try {
            const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/posts`, formData, {
            headers: {
                  'Content-Type': 'multipart/form-data',
                Authorization:`Bearer ${token}`
              },
              withCredentials:true,
          });
            // const newPostList = postData;
            // newPostList.unshift()
            console.log(res.data);
            navigate(0);
            e.target.reset();
        } catch (err) {
          console.log('There was an error uploading the file', err);
        }
    }

  return (
    <section>
      <article>
        <form onSubmit={handleFormSubmit} ref={postForm}>
          <textarea name="content" id="content" cols="30" rows="10" placeholder='What are your thoughts...' onChange={handlePostBtn}></textarea>
          <input type="file" name="file" onChange={handleFileChange} />
          
          {preview && <img src={preview} alt="preview" width="200" />}
          {preview && <button onClick={handleFileCancel}>X</button>}
          
          {hasContent && <button>Create post</button>}
        </form>
      </article>
      
      <article>
        {postData.length ? postData.map(post => {
          return <Post post={post} />
        }) : <div>No posts yet!!</div>}
        {isErr && <div>{isErrMsg}</div>}
      </article>
    </section>
  );
}

export default PostList;

























// import React, { useState, useEffect, useRef } from 'react';
// import Post from "../Post/Post";
// import { useNavigate } from 'react-router-dom';
// import "./PostList.scss";
// import axios from 'axios';

// function PostList({ cliqueid }) {
//     if (!cliqueid) {
//         return <></>;
//     }

//     const userId = sessionStorage.getItem("userId"); 
//     const navigate = useNavigate();
//     if (!userId) {
//         return navigate("/");
//     }
//     const token = sessionStorage.getItem("token");
//     const [postData, setPostData] = useState([]);
//     const [isErr, setErr] = useState(false);
//     const [isErrMsg, setErrMsg] = useState("");
//     const [hasContent, setHasContent] = useState(false);
//     const [preview, setPreview] = useState(null);
//     const [file, setFile] = useState(null);
//     const postForm = useRef();

//     useEffect(() => {
//         axios.get(`${import.meta.env.VITE_SERVER_URL}/posts`, {
//             headers: {
//                Authorization: `Bearer ${token}`,
//             }, 
//             withCredentials:true,
//         })
//             .then((res) => {
//                 console.log("Posts", res.data);
//                 setPostData(res.data.post); 
//             })
//             .catch((error) => {
//                 setErr(true);
//                 setErrMsg(error.message);
//         })
//    },[token])

//     // post has the user id - from the session data
//     // cliqueid that is to be passed. 

//     const handleFormSubmit = (e) => {
//         e.preventDefault();
//     }

//     const handlePostBtn = () => {
//         const contentValue = postForm.current.content.value; 

//         if (contentValue.trim() === "") {
//             setHasContent(false);
//         } else {
//             setHasContent(true);
//         }
//     }

//     const handleFileChange = (e) => {
//         const file = e.target.files[0];
//         setFile(file);
    
//         // File preview setup
//         const reader = new FileReader();
//         reader.onloadend = () => {
//           setPreview(reader.result);
//         };
    
//         if (file) {
//           reader.readAsDataURL(file);
//         } else {
//           setPreview(null);
//         }
//       };

//     const handleFileCancel = (e) => {
//         e.preventDefault();
//     }
    
//     return (
//         <section>
    
//         <article>
//                 <form onSubmit={handleFormSubmit} ref={postForm}>
//                     <textarea name="content" id="content" cols="30" rows="10" placeholder='What are your thoughts...' onChange={handlePostBtn}></textarea>
//                     <input type="file" name="file" onChange={handleFileChange} />
                    
//                     {preview && <img src={preview} alt="preview" width="200" />}
//                     {preview && <button onClick={ handleFileCancel }>X</button>}
                    
//                     {hasContent && <button>Create post</button>}
//                 </form>
//             </article>
            
//             <article>
//                 {postData.length ? postData.map(post => {
//                     return <Post post={ post } />
//                 }): <div>No posts yet!!</div>}
//                 {isErr && <div>{ isErrMsg }</div>}
//             </article>
//     </section>
//   )
// }

// export default PostList