import React, { useState } from "react";
import "./Authentication.scss";
import Login from "../../components/Login/Login";
import Registration from "../../components/Registration/Registration";

function Authentication() {
  const [isRegistration, setIsRegistration] = useState(false);
  return (
    <section className="authentication">
      <article className="authentication__article">
        {!isRegistration && <Login />}
        {isRegistration && <Registration />}
      </article>
      <div className="authentication__message-container">
        <p>{!isRegistration ? "Don't have an account?" : "Already have an account?" } <span onClick={()=> setIsRegistration(!isRegistration)} className="authentication__custom">{ !isRegistration ? "Sign up":"Login"}</span></p>        
      </div>
    </section>
  );
}

export default Authentication;
