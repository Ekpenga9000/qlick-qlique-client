import {useState, useEffect} from 'react';
import "./HeaderBottom.scss";
import { Link } from 'react-router-dom';
import { AiOutlineHome, AiFillHome, AiOutlineSetting, AiFillSetting} from "react-icons/ai";
import { HiOutlineUserGroup, HiUserGroup} from "react-icons/hi2";
import { IoIosNotificationsOutline, IoIosPeople } from "react-icons/io";
import { BsPeople, BsChatLeftDots } from "react-icons/bs";
import { CgLogOut } from "react-icons/cg";

function HeaderBottom({ userId }) {
    const [isHome, setIshome] = useState(false);
    const pathname = window.location.href;
    
    console.log(isHome)
  return (
      <section className='floor'>
          <Link to={`/profiles/${userId}`} className='floor__item'>
              {isHome ? <AiFillHome/> : <AiOutlineHome />} 
          </Link>

          <div className='floor__item'>
            <HiOutlineUserGroup/>  
          </div>

          <div className='floor__item'>
            <BsChatLeftDots/>  
          </div>

          <div className='floor__item'>
            <AiOutlineSetting/>  
          </div>
          
          <div className='floor__item'>
            <CgLogOut/>  
          </div>
    </section>
  )
}

export default HeaderBottom