import {useState, useEffect} from 'react';
import "./HeaderTop.scss";
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Loading from '../../Loading/Loading';
import logo from "../../../assets/images/logo-lone.png";

function HeaderTop({ userId }) {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState(null);
    

    useEffect(() => {
        if (userId) {
            const token = sessionStorage.getItem("token");
            axios.get(`${import.meta.env.VITE_SERVER_URL}/profiles/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true,
            })
                .then((res) => {
                    setUserDetails(res.data);
                })
                .catch((error) => {
                    console.log(error);
            })
        } else {
            navigate("/");
        }
    }, [userId]);

    
    if (!userDetails || !userId) {
        return <></>;       
    }
    
    // Retrieve the user from the sessionStorage using the userId
  return (
      <section className='top'>
          <Link to={"/cliques"}  className='top__logo-container'>
              <img src={ logo } alt="Qlick-Qlique" className='top__logo' crossOrigin="anonymous"/>
          </Link> 
          <input type="search" name="" id="" className='top__search' />
          <Link to={`/profiles/${userId}`} className='top__profile-container'>
              <img src={`${import.meta.env.VITE_SERVER_URL}/${userDetails.avatar_url}` } alt={`Profile picture of ${userDetails.display_name}` } crossOrigin="anonymous" className='top__profile'/>
          </Link>
    </section>
  )
}

export default HeaderTop;