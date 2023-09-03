import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Clique from "../../../components/Clique/Clique";
import "./CliquePage.scss";
import axios from "axios";

function CliquePage() {
  const formRef = useRef();
  const searchRef = useRef();
  const userId = sessionStorage.getItem("userId");
  const token = sessionStorage.getItem("token");
  const [cliqueData, setCliqueData] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [altDisplay, setAltDisplay] = useState("");
  const [hasData, setHasData] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/cliques`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        setCliqueData(res.data.clique);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = formRef.current.name.value;
    const category = formRef.current.category.value;
    const description = formRef.current.description.value;
    const user_id = userId;

    if (!user_id) {
      navigate("/");
    }

    if (
      name.trim() === "" ||
      category.trim() === "" ||
      description.trim() === ""
    ) {
      setErr(true);
      setErrMsg("Please fill out all the required fields");
      return;
    }

    axios
      .post(
        `${import.meta.env.VITE_SERVER_URL}/cliques`,
        {
          name: name,
          category: category,
          description: description,
          user_id: user_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        let newDataArr = cliqueData;
        newDataArr.unshift(response.data.cliqueData);
        e.target.reset();
        setIsClicked(false);
        setCliqueData(newDataArr);
        navigate(0);
      })
      .catch((error) => {
        setErr(true);
        setErrMsg(`${error.message}`);
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const search = searchRef.current.search.value;

    if (search.trim() === "") {
      return;
    }

    axios
      .post(
        `${import.meta.env.VITE_SERVER_URL}/cliques/search`,
        {
          search: search,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        e.target.reset();
        setIsClicked(false);
        setCliqueData(response.data.cliqueData);
      })
      .catch((error) => {
        setErr(true);
        setErrMsg(`${error.message}`);
      });
  };

  return (
    <section className="cliquepage">
      <div className="cliquepage__top-bar">
        <div>Cliques</div>
        <form onSubmit={handleSearch} ref={searchRef}>
          <input type="search" name="search" placeholder="Search" />
          <button>search</button>
        </form>
        <div>
          <button onClick={() => setIsClicked(!isClicked)}>
            {isClicked ? "Cancel" : "Create Clique"}
          </button>
        </div>
      </div>
      {isClicked && (
        <article className="clique__form-div">
          <form
            className="clique__form--visible"
            onSubmit={handleSubmit}
            ref={formRef}
          >
            <input
              type="text"
              name="name"
              id="name"
              placeholder="What is your Clique called? "
            />
            <input
              type="text"
              name="category"
              id="category"
              placeholder="Category"
            />
            <textarea
              name="description"
              id="description"
              cols="30"
              rows="10"
              placeholder="Please describe your Clique"
            ></textarea>
            {err && <div>{errMsg}</div>}
            <button>Create Clique</button>
            <button onClick={() => setIsClicked(false)}>Cancel</button>
          </form>
        </article>
      )}
      <section className="cliqueList">
        {!!cliqueData ? (
          cliqueData.map((clique) => {
            return <Clique clique={clique} key={clique?.id} />;
          })
        ) : (
          <div>No cliques to display</div>
        )}
      </section>
    </section>
  );
}

export default CliquePage;
