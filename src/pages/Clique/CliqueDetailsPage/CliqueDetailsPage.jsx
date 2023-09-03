import { useEffect, useState } from 'react';
import "./CliqueDetailsPage.scss";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import PostList from '../../../components/PostList/PostList';

function CliqueDetailsPage() {
    const { cliqueid } = useParams();
    const [cliqueData, setCliqueData] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();
    const token = sessionStorage.getItem("token");
    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_SERVER_URL}/cliques/${cliqueid}`, {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
                withCredentials: true,
            })
            .then((res) => {
                setCliqueData(res.data);
            })
            .catch((err) => {
                console.log("error", err);
                setErrorMsg(err);
                // navigate("/")
            })
    },[cliqueid])
    
    if (!cliqueData) {
        return <>Loading...</>
    }
    const { name, description, category, username, display_name, banner_url } = cliqueData;

  return (
      <section className='clique-detail'>
          <article className='clique-detail__banner'>
              <div>
                  <img src={`${import.meta.env.VITE_SERVER_URL}${banner_url}`} alt={name}/>
              </div>
              <div>
                  <h3>{name}</h3>
                  <p>{category}</p>
                  <address>{display_name}</address>
                  <address>{username}</address>
                  <p>{description}</p>
              </div>
          </article>
          <article className='clique-detail__body'>
              {!!errorMsg && <div>{ errorMsg }</div>}
              <PostList cliqueid={cliqueid } />
          </article>
    </section>
  )
}

export default CliqueDetailsPage;
