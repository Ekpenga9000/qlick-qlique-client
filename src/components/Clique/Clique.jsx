import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import "./clique.scss";

function Clique({ clique, handleRemoveFromFavourites, handleAddToFavourites }) {
  const { id, name, category, description, display_name, status } =
    clique;
  
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate(`/cliques/${id}`);
  };

  const handleFollow = () => {
    handleAddToFavourites(id);
  }

  const handleUnfollow = () => {
    handleRemoveFromFavourites(id);
  }

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
            {status === "Added" ? <Chip label="Following" /> : <Chip label="Not Following" variant="outlined" />}
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
            {status === "Added" ? (
              <Button size="small" onClick={handleUnfollow}>
                - Unfollow
              </Button>
            ): (
              <Button size="small" onClick={handleFollow}>
                + Follow
              </Button>
            )}
          </div>
        </CardActions>
      </Card>
    </article>
  );
}

export default Clique;
