import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import Post from '../Post/Post';

function UserPostList({ user_id }) {
    if (!user_id) {
        return <></>;
    }
    const [postList, setPostList] = useState([]);
    const token = sessionStorage.getItem("token");

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_SERVER_URL}/posts`, {
            headers: {
               Authorization: `Bearer ${token}`
            },
            withCredentials:true, 
        })
            .then((res) => {
                console.log(res.data.post);
                setPostList(res.data.post);
            })
            .catch((err) => {
                console.log(err);
        })
    }, [user_id])

  return (
      <section>
          {postList.length > 0  ? postList.map((post) => {
              return <Post post={post} key={ post.id } />
          }) : <p>No posts yet</p>}
    </section>
  )
}

export default UserPostList
