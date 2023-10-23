import {useState, useEffect} from 'react'; 
import "./PostPage.scss";
import axios from 'axios';
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useParams, useNavigate, Link } from 'react-router-dom';
import CliquePost from '../../components/CliquePost/CliquePost';
import Loading from '../../components/Loading/Loading';

function PostPage() {
    const navigate = useNavigate();
    const { postid, cliqueid} = useParams();
    const userId = sessionStorage.getItem("userId");
    const token = sessionStorage.getItem("token");
    const [postDeets, setPostDeets] = useState(null);

    if(!userId){
        navigate("/")
    }

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const postData = await axios.get(`${import.meta.env.VITE_SERVER_URL}/posts/${postid}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    withCredentials: true,
                })
                setPostDeets(postData.data);
            } catch (error) {
                console.error(error)
            }
        }
        fetchPost();
    }, [postid])

    if(!postDeets) return <Loading/>
  return (
      <section className='post-page'>
          <Link to={`/cliques/${cliqueid}`} className='post-page__return'> <AiOutlineArrowLeft/> </Link>
          <div>
              <CliquePost post={ postDeets } />
          </div>
      </section>
  )
}

export default PostPage