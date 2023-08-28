import React, { useState } from "react";
import "./Registration.scss";
import Button from "../Button/Button";
import { AiOutlineUser } from "react-icons/ai";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import {
  MdAlternateEmail,
  MdOutlineDriveFileRenameOutline,
} from "react-icons/md";
import { LiaBirthdayCakeSolid } from "react-icons/lia";



function Registration() {
  const [isRevealed, setRevealed] = useState(false);
  const [isRevealed2, setRevealed2] = useState(false);
  const [isFirstNameActive, setFirstNameActive] = useState(false);
  const [isLastNameActive, setLastNameActive] = useState(false);
  const [isEmailActive, setEmailActive] = useState(false);
  const [isPwdActive, setPwdActive] = useState(false);
  const [isUserActive, setUserActive] = useState(false);
  const [isConPwdActive, setConPwdActive] = useState(false);
  const [isDOBActive, setDOBActive] = useState(false);
  

  const getMaxDate = () => {
    const today = new Date();
    const eighteenYearsAgo = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    );
    return eighteenYearsAgo.toISOString().split("T")[0];
  };

  return (
    <article className="registration">
      <div
        className={
          !isFirstNameActive
            ? "registration__input-div"
            : "registration__input-div--border"
        }
        onFocus={() => setFirstNameActive(true)}
        onBlur={() => setFirstNameActive(false)}
      >
        <label htmlFor="firstname">
          <MdOutlineDriveFileRenameOutline />
        </label>
        <input
          type="text"
          name="firstname"
          id="firstname"
          className="registration__input"
          placeholder="First name"
        />
      </div>
      <div
        className={
          !isLastNameActive
            ? "registration__input-div"
            : "registration__input-div--border"
        }
        onFocus={() => setLastNameActive(true)}
        onBlur={() => setLastNameActive(false)}
      >
        <label htmlFor="lastname">
          <MdOutlineDriveFileRenameOutline />
        </label>
        <input
          type="text"
          name="lastname"
          id="lastname"
          className="registration__input"
          placeholder="Last name"
        />
      </div>
      <div
        className={
          !isEmailActive
            ? "registration__input-div"
            : "registration__input-div--border"
        }
        onFocus={() => setEmailActive(true)}
        onBlur={() => setEmailActive(false)}
      >
        <label htmlFor="email">
          <MdAlternateEmail />
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="registration__input"
          placeholder="Email"
        />
      </div>
      <div
        className={
          !isDOBActive
            ? "registration__input-div"
            : "registration__input-div--border"
        }
        onFocus={() => setDOBActive(true)}
        onBlur={() => setDOBActive(false)}
      >
        <label htmlFor="dob">
          <LiaBirthdayCakeSolid />
        </label>
        <input
          type="date"
          name="dob"
          id="dob"
          className="registration__input"
          max={getMaxDate()}
        />
      </div>
      <div
        className={
          !isUserActive
            ? "registration__input-div"
            : "registration__input-div--border"
        }
        onFocus={() => setUserActive(true)}
        onBlur={() => setUserActive(false)}
      >
        <label htmlFor="username">
          <AiOutlineUser />
        </label>
        <input
          type="username"
          name="username"
          id="username"
          className="registration__input"
          placeholder="Username"
        />
      </div>
      <div
        className={
          !isPwdActive
            ? "registration__input-div"
            : "registration__input-div--border"
        }
        onFocus={() => setPwdActive(true)}
        onBlur={() => setPwdActive(false)}
      >
        <div onClick={() => setRevealed(!isRevealed)}>
          {!isRevealed ? <BsEyeSlash /> : <BsEye />}
        </div>
        <input
          type={!isRevealed ? "password" : "text"}
          name="password"
          id="password"
          className="registration__input"
          placeholder="password"
        />
      </div>
      <div
        className={
          !isConPwdActive
            ? "registration__input-div"
            : "registration__input-div--border"
        }
        onFocus={() => setConPwdActive(true)}
        onBlur={() => setConPwdActive(false)}
      >
        <div onClick={() => setRevealed2(!isRevealed2)}>
          {!isRevealed2 ? <BsEyeSlash /> : <BsEye />}
        </div>
        <input
          type={!isRevealed2 ? "password" : "text"}
          name="password2"
          id="password2"
          className="registration__input"
          placeholder="Confirm password"
        />
      </div>

      <div className="registration__btn-container">
        <Button message={"Sign up"} />
      </div>
    </article>
  );
}

export default Registration;
