import React from "react";
import "./Login";
import Button from "../Button/Button";

function Login() {
  const handleSubmit = (e) => {
    e.target.preventDefault();
  };
  return (
    <section className="login">
      <form onSubmit={handleSubmit} className="login__form">
        <input
          type="text"
          name="user"
          id="user"
          className="login__user"
          placeholder="username or email"
        />

        <input
          type="password"
          name="password"
          id="password"
          className="login__password"
          placeholder="password"
        />
        <div className="login__btn-container">
          <Button message={"Login"} />
        </div>
      </form>
    </section>
  );
}

export default Login;
