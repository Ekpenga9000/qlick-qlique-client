import React, { useState, useRef } from "react";
import { BiError } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import "./Authentication.scss";
import Login from "../../components/Login/Login";
import Registration from "../../components/Registration/Registration";

function Authentication() {
  const formRef = useRef();
  const [isRegistration, setIsRegistration] = useState(false);
  const [isErr, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState("This is an error message");
  
  const handleLoginValidation = () => {
    const username = formRef.current.user.value; 
    const password = formRef.current.password.value;

    if (username.trim() === "" || password.trim() === "") {
      setErr(true);
      setErrMsg("Please ensure that all fields are filled.")
      return;
    }
    setErr(false);
    const userDetails = { username, password }; 
    return userDetails;
  }
  
  // const handleRegistrationValidation = () => {

    
  // }


  const handleOnSubmit = (event) => {
    event.preventDefault();
    console.log("The form", formRef.current); 

    if (isRegistration) {
      
    } else if(!isRegistration) {
      const loginDetails = handleLoginValidation();
    } else {
      setErr(true);
      setErrMsg("Please input your details before submitting.")
    }

  }

  

  
  return (
    <section className="authentication">
      <article className="authentication__article">
      <h2 className="authentication__title">Qlick-Qlique</h2>
        <form className="form" onSubmit={handleOnSubmit} ref={formRef}>
        {!isRegistration && <Login />}
          {isRegistration && <Registration />}
        </form>  
        {isErr && <div className="authentication__error-container"><BiError/><p className="authentication__error">{errMsg}</p></div>}
      </article>
      <div className="registration__btn-div">
        <a href={`${import.meta.env.VITE_SERVER_URL}/auth/google`} className="registration__btn">
          <span>{!isRegistration ? "Login with Google":"Signup with Google"} </span>
          < FcGoogle />
        </a>
      </div>
      <div className="authentication__message-container">
        <p>{!isRegistration ? "Don't have an account?" : "Already have an account?" } <span onClick={()=> setIsRegistration(!isRegistration)} className="authentication__custom">{ !isRegistration ? "Sign up":"Login"}</span></p>        
      </div>
    </section>
  );
}

export default Authentication;
