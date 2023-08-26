import React, { useState } from "react";
import Login from "../../components/Login/Login";
import Registration from "../../components/Registration/Registration";

function Authentication() {
  const [isRegistration, setIsRegistration] = useState(false);
  return (
    <section className="authentication">
      <article>
        {!isRegistration && <Login />}
        {isRegistration && <Registration />}
      </article>
      <div>
        <p>{!isRegistration ? "Don't have an account?" : "Already have an account?" } <span onClick={()=> setIsRegistration(!isRegistration)}>{ !isRegistration ? "Sign up":"Login"}</span></p>        
      </div>
    </section>
  );
}

export default Authentication;
