import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BiError } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import "./Authentication.scss";
import Login from "../../components/Login/Login";
import Registration from "../../components/Registration/Registration";

function Authentication() {
  const formRef = useRef();
  const navigate = useNavigate();
  const [isRegistration, setIsRegistration] = useState(false);
  const [isErr, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState("This is an error message");

  const handleLoginValidation = () => {
    const text = formRef.current.text.value;
    const password = formRef.current.password.value;

    if (text.trim() === "" || password.trim() === "") {
      setErr(true);
      setErrMsg("Please ensure that all fields are filled.");
      return;
    }
    setErr(false);
    const userDetails = { text, password };
    return userDetails;
  };

  const handleRegistrationValidation = () => {
    const firstname = formRef.current.firstname.value;
    const lastname = formRef.current.lastname.value;
    const email = formRef.current.email.value;
    const date_of_birth = formRef.current.date_of_birth.value;
    const username = formRef.current.username.value;
    const password = formRef.current.password.value;
    const confirm_pwd = formRef.current.confirm_pwd.value;
    const phone_number = formRef.current.phone_number.value;

    if (
      firstname.trim() === "" ||
      lastname.trim() === "" ||
      email.trim() === "" ||
      date_of_birth.trim() === "" ||
      phone_number.trim() === "" ||
      username.trim() === "" ||
      password.trim() === "" ||
      confirm_pwd.trim() === ""
    ) {
      setErr(true);
      setErrMsg("Please ensure that all fields are filled.");
      return;
    }

    if (password.trim() !== confirm_pwd.trim()) {
      setErr(true);
      setErrMsg("Password fields must match.");
    }

    setErr(false);
    const userDetails = {
      firstname,
      lastname,
      email,
      date_of_birth,
      phone_number,
      username,
      password,
      confirm_pwd,
    };
    return userDetails;
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    console.log("The form", formRef.current);

    if (isRegistration) {
      const registrationDetails = handleRegistrationValidation();

      axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/register`, {
        firstname: registrationDetails.firstname,
        lastname: registrationDetails.lastname,
        email: registrationDetails.email,
        date_of_birth: registrationDetails.date_of_birth,
        phone_number: registrationDetails.phone_number,
        username: registrationDetails.username,
        password: registrationDetails.password,
        confirm_pwd: registrationDetails.confirm_pwd,
    })
        .then((response) => {
            sessionStorage.setItem("token", response.data.token);
            navigate(`/users/${response.data.userId}`);
      
        })
        .catch((error) => {
          setErr(true);
          setErrMsg(`${error.message}`)
        });


    } else if (!isRegistration) {
      const loginDetails = handleLoginValidation();

      axios
        .post(`${import.meta.env.VITE_SERVER_URL}/auth/login`, {
          text: loginDetails.text,
          password: loginDetails.password,
        })
        .then((response) => {
          sessionStorage.setItem("token", response.data.token);
          navigate(`/users/${response.data.userId}`);
        })
        .catch((error) => {
          setErr(true);
          setErrMsg(`${error.message}`);
        });
    } else {
      setErr(true);
      setErrMsg("Please input your details before submitting.");
    }
  };

  return (
    <section className="authentication">
      <article className="authentication__article">
        <h2 className="authentication__title">Qlick-Qlique</h2>
        <form className="form" onSubmit={handleOnSubmit} ref={formRef}>
          {!isRegistration && <Login />}
          {isRegistration && <Registration />}
        </form>
        {isErr && (
          <div className="authentication__error-container">
            <BiError />
            <p className="authentication__error">{errMsg}</p>
          </div>
        )}
      </article>
      <div className="registration__btn-div">
        <a
          href={`${import.meta.env.VITE_SERVER_URL}/auth/google`}
          className="registration__btn"
        >
          <span>
            {!isRegistration ? "Login with Google" : "Signup with Google"}{" "}
          </span>
          <FcGoogle />
        </a>
      </div>
      <div className="authentication__message-container">
        <p>
          {!isRegistration
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <span
            onClick={() => setIsRegistration(!isRegistration)}
            className="authentication__custom"
          >
            {!isRegistration ? "Sign up" : "Login"}
          </span>
        </p>
      </div>
    </section>
  );
}

export default Authentication;
