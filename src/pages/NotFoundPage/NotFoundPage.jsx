import { useEffect } from 'react';
import "./NotFoundPage.scss"
import { useNavigate, Link } from "react-router-dom";
import notfound from "../../assets/images/notfound.jpg";

function NotFoundPage() {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
          navigate("/");
        }, 3000)
      }, [navigate]);
  return (
      <section className='notFound'>
          <img src={notfound} alt="Not found" className='notFound__img' />
          <Link to={"/"}> Please go back to login page</Link>
    </section>
  )
}

export default NotFoundPage