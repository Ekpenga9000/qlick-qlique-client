import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import "./clique.scss";

function Clique({ clique }) {
  console.log("Clique", clique)
  const { id, name, category, description, display_name } = clique;

  const navigate = useNavigate()
  const handleNavigation = () => {
    navigate(`/cliques/${id}`)
  }

  return (
      <article className="clique">
      <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {name} by { display_name }
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {category}
        </Typography>
        <Typography variant="body2">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleNavigation}>Visit Clique</Button>
      </CardActions>
      </Card>
      </article>
  );
}

export default Clique;
