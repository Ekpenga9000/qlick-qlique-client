import React, { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import "./Login.scss";
import Button from "../Button/Button";

function Login() {
  const [isRevealed, setRevealed] = useState(false);
  const [isUserActive, setUserActive] = useState(false);
  const [isPwdActive, setPwdActive] = useState(false);
  const handleSubmit = (event) => {
    event.target.preventDefault();
  };

  return (
    <section className="login">
      <h2 className="login__title">Qlick-Qlique</h2>
      <form onSubmit={handleSubmit} className="login__form">
        <div className={!isUserActive ? "login__input-div":"login__input-div--border"}  onFocus={()=> setUserActive(true)} onBlur={()=> setUserActive(false)}>
          <label htmlFor="user">
            <AiOutlineUser />
          </label>  
          <input
            type="text"
            name="user"
            id="user"
            className="login__input"
            placeholder="username or email"
          />
        </div>
        <div className={!isPwdActive ? "login__input-div" : "login__input-div--border"} onFocus={() => setPwdActive(true)} onBlur={() => setPwdActive(false)}>
          <div onClick={() => setRevealed(!isRevealed)}>
            {!isRevealed ? <BsEyeSlash /> : <BsEye />}
          </div>
          <input
            type={!isRevealed ? "password" : "text"}
            name="password"
            id="password"
            className="login__input"
            placeholder="password"
          />
        </div>

        <div className="login__btn-container">
          <Button message={"Login"} />
        </div>
      </form>
    </section>
  );
}

export default Login;
