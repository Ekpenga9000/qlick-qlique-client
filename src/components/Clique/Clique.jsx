import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineStar,
  AiFillStar,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "./clique.scss";

function Clique({ clique, handleRemoveFromFavourites, handleAddToFavourites }) {
  const {
    id,
    name,
    category,
    description,
    display_name,
    banner_url,
    avatar_url,
    status,
  } = clique;

  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate(`/cliques/${id}`);
  };

  const handleFollow = () => {
    handleAddToFavourites(id);
  };

  const handleUnfollow = () => {
    handleRemoveFromFavourites(id);
  };

  return (
    <section className="clique">
      <article className="card">
        <div className="card__banner">
          <img
            src={`${import.meta.env.VITE_SERVER_URL}/${banner_url}`}
            alt={`${name}`}
            className="card__img"
            onClick={handleNavigation}
          />
        </div>
        <div className="card__content">
          <div className="card__header">
            <p className="card__title" onClick={handleNavigation}>
              {name}
            </p>
            <div className="card__icon">
              {status === "Added" ? (
                <AiFillStar
                  className="card__icon--following"
                  onClick={handleUnfollow}
                />
              ) : (
                <AiOutlineStar
                  className="card__icon--unfollow"
                  onClick={handleFollow}
                />
              )}
            </div>
          </div>
          <div className="author">
            <div className="author__img-container">
              <img
                src={`${import.meta.env.VITE_SERVER_URL}/${avatar_url}`}
                alt={`${display_name}`}
                className="author__img"
                onClick={handleNavigation}
              />
            </div>
            <p className="author__name">{display_name}</p>
          </div>
          <p className="card__category">{category}</p>
          <p className="card__description">{description}</p>
        </div>
      </article>
    </section>
  );
}

export default Clique;
