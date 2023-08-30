import React, {useState, useEffect} from 'react';
import "./UserPage.scss";
import axios from 'axios';
import UserBanner from '../../../components/UserBanner/UserBanner';
import Post from '../../../components/Post/Post';
import { useParams } from 'react-router';

function UserPage() {
  const { userId } = useParams()
  const [userDeets, setUserDeets] = useState(null);
  
  useEffect(() => {
    const token = sessionStorage.getItem("token")
    
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials:true
      })
      .then(res => {
        setUserDeets(res.data);
      })
      .catch(err => { console.log(err) });
  }, [userId])

  if (!userDeets) {
    return <p>Loading...</p>
  }
  return (
    <section className='userpage'> 
      <div className='userpage__profile'>
        <UserBanner user={userDeets}/>
      </div>
      <div className='userpage__posts'>
        <Post/>
      </div>
    </section>
  )
}

export default UserPage