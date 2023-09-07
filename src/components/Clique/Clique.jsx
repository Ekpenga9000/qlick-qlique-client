import { useState } from "react";
import axios from "axios";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import "./clique.scss";

function Clique({ clique }) {
  const { id, name, category, description, display_name, is_favourite, status } =
    clique;
  const [isFavourite, setIsFavourite] = useState(status === "Added");
  const userId = sessionStorage.getItem("userId");
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate(`/cliques/${id}`);
  };

  const handleAddToFavourites = () => {
    axios
      .post(
        `${import.meta.env.VITE_SERVER_URL}/favourites`,
        {
          user_id: userId,
          clique_id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      )
      .then(() => {
        navigate(0);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRemoveFromFavourites = () => {
    axios
      .post(
        `${
          import.meta.env.VITE_SERVER_URL
        }/favourites/remove`,
        {
          user_id: userId,
          clique_id:id
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      )
      .then(() => {
        navigate(0);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <article className="clique">
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <div className="clique__btn-div">
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {name} by {display_name}
            </Typography>
            {isFavourite && <Chip label="Following" />}
            {!isFavourite && <Chip label="Not Following" variant="outlined" />}
          </div>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {category}
          </Typography>
          <Typography variant="body2">{description}</Typography>
        </CardContent>
        <CardActions>
          <div className="clique__btn-div">
            <Button size="small" onClick={handleNavigation}>
              Visit Clique
            </Button>
            {!isFavourite && (
              <Button size="small" onClick={handleAddToFavourites}>
                + Follow
              </Button>
            )}
            {isFavourite && (
              <Button size="small" onClick={handleRemoveFromFavourites}>
                - Unfollow
              </Button>
            )}
          </div>
        </CardActions>
      </Card>
    </article>
  );
}

export default Clique;
