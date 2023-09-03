import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoIosNotificationsOutline, IoIosPeople } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { BsPeople, BsChatLeftDots } from "react-icons/bs";
import { CgLogOut } from "react-icons/cg";

function Header({ userId }) {
    const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    if (userId) {
      const token = sessionStorage.getItem("token");

      axios
        .get(`${import.meta.env.VITE_SERVER_URL}/profiles/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        })
        .then((res) => {
          setUserDetails(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userId]);
    
    
    const handleClick = () => {
        sessionStorage.removeItem("userId");
      sessionStorage.removeItem("token");
      setUserDetails(null);
        navigate("/")
  }

  if (!userDetails) {
    return <></>;
  }

  const { id, avatar_url, display_name } = userDetails;

  return (
    <article className="user" key={id}>
      <Link to={ `/profiles/${userId}` } className="user__profile">
        <div className="user__img-container">
          <img
            src={`${import.meta.env.VITE_SERVER_URL}/${avatar_url}`}
            alt={display_name}
            crossOrigin="anonymous"
            className="user__img"
          />
        </div>

        <span className="user__username">{display_name}</span>
      </Link>
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
          <li>
            <Link to={"/cliques"} className="user__list--black">
              <IoIosPeople />
              <span>Qliques</span>
            </Link>
          </li>
          <li className="user__list--black" onClick={handleClick}>
              <CgLogOut />
              <span>Log out</span>
          </li>
        </ul>
      </div>
    </article>
  );
}

export default Header;
