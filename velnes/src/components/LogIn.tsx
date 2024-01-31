import React, { useState } from "react";
import { Login } from "../types/types";
import { Profile } from "./Profile";
import { Link, useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

// the login users are in the data, pass and email(p.s if you can't see the appointment after sign in, try again to rebook,maybe because the other user has entry, so it doesn't update the data.)
export const LogIn = ({ login }: { login: Login[] }) => {
  const [errorMessages, setErrorMessages] = useState<{
    name: string;
    message: string;
  }>({ name: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<number | null>(null);

  const errors = {
    uname: "invalid username",
    pass: "invalid password",
  };

  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { uname, pass } = event.currentTarget;
    const userData = login.find(
      (user) => user.email === uname.value && user.password === pass.value
    );

    if (userData) {
      setIsSubmitted(true);
      setLoggedInUser(userData.id);
      localStorage.setItem("loggedUser", JSON.stringify(userData.id));
      navigate("/login/profile");
      window.location.reload();
    } else {
      setErrorMessages({ name: "uname", message: errors.uname });
      setErrorMessages({ name: "pass", message: errors.pass });
    }
  };

  const renderErrorMessage = (name: string) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  const renderForm = (
    <div className="form container">
      <div className="d-flex align-items-center justify-content-center relativeArrorDiv mb-3">
        <Link to={`/`}>
          <FontAwesomeIcon icon={faXmark} className="arrowLeft" />
        </Link>
        <h5 className="m-0">Log in or sign up</h5>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <TextField
            id="outlined-basic"
            type="text"
            name="uname"
            required
            label="Email"
            variant="outlined"
            className="w-100 mb-3"
          />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <TextField
            type="password"
            name="pass"
            required
            id="outlined-basic"
            label="Password"
            variant="outlined"
            className="w-100 mb-3"
          />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container mb-3">
          <button className="btn w-100" type="submit">
            Continue
          </button>
        </div>
        <div className="d-flex justify-content-center">
          <p>or</p>
        </div>
        <div className="button-container mb-3">
          <button className="btnTransparent btn w-100" type="submit">
            <h6 className="m-0">{<FaApple />} Continue with Apple</h6>
          </button>
        </div>
        <div className="button-container mb-3">
          <button className="btnTransparent btn w-100" type="submit">
            <h6 className="m-0">{<FaGoogle />} Continue with Google</h6>
          </button>
        </div>
        <div className="button-container mb-3">
          <button className="btnTransparent btn w-100" type="submit">
            <h6 className="m-0">{<FaFacebook />} Continue with Facebook</h6>
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        {isSubmitted ? (
          <Profile profile={login} id={loggedInUser || 0} />
        ) : (
          renderForm
        )}
      </div>
    </div>
  );
};
