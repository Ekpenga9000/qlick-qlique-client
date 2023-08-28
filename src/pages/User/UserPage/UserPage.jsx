import React from 'react';
import "./UserPage.scss"
import UserBanner from '../../../components/UserBanner/UserBanner';
import Post from '../../../components/Post/Post';

function UserPage() {
  return (
    <section className='userpage'> 
      <div className='userpage__profile'>
        <UserBanner/>
      </div>
      <div className='userpage__posts'>
        <Post/>
      </div>
    </section>
  )
}

export default UserPage