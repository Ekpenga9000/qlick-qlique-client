import { useNavigate, useParams } from "react-router-dom";
import "./UserDashboardPage.scss";
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircle from '@mui/icons-material/AccountCircle';
import GroupIcon from '@mui/icons-material/Group';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import ForumIcon from '@mui/icons-material/Forum';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ProfileForm from "../../../components/ProfileForm/ProfileForm";



function UserDashboardPage({ user_id }) {

  const { userid } = useParams();
    const navigate = useNavigate();

  const userId = sessionStorage.getItem("userId");

  if (!userId || userid.toString() !== userId.toString()) {
    navigate("/");
  }

  
    
  return (
    <section className="dashboard">
      <ul className="dashboard__sidebar">
        <li className="dashboard__item">  <AccountCircle /> Profile</li>              
        <li className="dashboard__item"><GroupIcon/>Your Cliques</li>              
        <li className="dashboard__item"><FavoriteIcon/> Following</li>              
        <li className="dashboard__item"><Diversity3Icon/>Network</li>              
        <li className="dashboard__item"><ForumIcon/>DM's</li>  
        <li className="dashboard__item"><NotificationsIcon/>Notifications</li>                      
        <li className="dashboard__item"><DarkModeIcon/>Themes</li>                      
      </ul>
          <section className="dashboard__main">
              <ProfileForm/>              
      </section>
    </section>
  );
}

export default UserDashboardPage;
