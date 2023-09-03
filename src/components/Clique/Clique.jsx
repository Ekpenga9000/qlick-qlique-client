import React from "react";
import { Link } from "react-router-dom";
import "./clique.scss";

function Clique({ clique }) {
  console.log("Clique", clique)
  const { id, name, category, description, display_name } = clique;

  return (
    <Link to={`/cliques/${id}`} className="clique" key={id}>
      <h3>{name}</h3>
      <address>Created By {display_name}</address>
      <h3>{ category }</h3>
      <p>{description}</p>
    </Link>
  );
}

export default Clique;
