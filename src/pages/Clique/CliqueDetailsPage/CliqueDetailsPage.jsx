import { useEffect, useState } from "react";
import "./CliqueDetailsPage.scss";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import PostList from "../../../components/PostList/PostList";

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
        setErrorMsg(err);
        navigate("/");
      });
  }, [cliqueid]);

  if (!cliqueData) {
    return <>Loading...</>;
  }
  const { name, description, category, username, display_name, banner_url } =
    cliqueData;

  return (
    <section className="clique-detail">
      <article className="clique-detail__hero">
        <div className="clique-detail__details">
          <h2>Clique page</h2>
          <Card sx={{ minWidth: 600 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 24 }}
                color="text.secondary"
                gutterBottom
              >
                {name}
              </Typography>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                by {display_name}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {category}
              </Typography>
              <Typography variant="body2">{description}</Typography>
            </CardContent>
          </Card>
        </div>
      </article>
      <article className="clique-detail__body">
        {!!errorMsg && <div>{errorMsg}</div>}
        <PostList cliqueid={cliqueid} />
      </article>
    </section>
  );
}

export default CliqueDetailsPage;
