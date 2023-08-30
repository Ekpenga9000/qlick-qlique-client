import React from "react";
import "./UserBanner.scss";
// import userImg from "../../assets/images/sampleman.jpg";
import { IoIosNotificationsOutline, IoIosPeople } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { BsPeople, BsChatLeftDots } from "react-icons/bs";

function UserBanner({ user }) {
  const { id, avatar_url, display_name } = user;
  
  return (
    <article className="user" key={id}>
      <div className="user__profile">
        <div className="user__img-container">
          <img src={`${import.meta.env.VITE_SERVER_URL}/${avatar_url}`} alt={display_name} crossOrigin="anonymous" className="user__img" />
        </div>

        <span className="user__username">{display_name}</span>
      </div>
      <div className="user__messages">
        <ul className="user__ul">
          <li className="user__list">
            <BsChatLeftDots />
          </li>
          <li className="user__list">
            <BsPeople />
          </li>
          <li className="user__list">
            <IoIosNotificationsOutline />
          </li>
          <li className="user__list">
            <IoSettingsOutline />
          </li>
          <li className="user__list--black">
            <IoIosPeople />
            <span>Qliques</span>
          </li>
        </ul>
      </div>
    </article>
  );
}

export default UserBanner;
