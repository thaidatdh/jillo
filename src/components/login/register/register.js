import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import "./register.css";

function Register(props) {
  const [isAcceptTerm, setAcceptTerm] = useState(false);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [isReceiveEmail, setIsReceiveEmail] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const onCheckTerm = (e) => {
    setAcceptTerm(e.target.checked);
  };
  /*const onCheckReceiveEmail = (e) => {
    setIsReceiveEmail(e.target.checked);
  }*/
  const onUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const onNameChange = (e) => {
    setName(e.target.value);
  };
  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const onRegister = (e) => {
    e.preventDefault();
    if (password.length < 8 || username.length <= 0) {
      return;
    }
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        name: name,
        password: password,
        email: email,
      }),
    };
    fetch("https://jillo-backend.herokuapp.com/api/user/signup", requestOptions)
      .then((res) => res.json())
      .then((response) => {
        setSuccess(response.success);
        setError(response.msg);
      })
      .catch((error) => {
        setError("Error when register");
        console.log(error);
      });
  };
  if (localStorage.token_id) {
    return <Redirect to="/"/>
  }
  return (
    <form
      className="form ng-pristine ng-invalid ng-invalid-required ng-valid-maxlength ng-valid-email ng-valid-pattern"
      layout="column"
      onSubmit={onRegister}
    >
      <h2>Register</h2>
      {error && !success ? (
        <div
          style={{
            backgroundColor: "red",
            color: "darkred",
            padding: 10,
            borderRadius: 10,
            marginTop: 10,
            marginBottom: 20
          }}
        >
          {error}
        </div>
      ) : null}
      {success ? (
        <div
          style={{
            backgroundColor: "#d4edda",
            color: "darkred",
            padding: 10,
            borderRadius: 10,
            marginTop: 10,
            marginBottom: 20
          }}
        >
          {error}
        </div>
      ) : null}
      
      <div className="form-group">
        <input
          id="name"
          maxLength="100"
          type="text"
          placeholder="Name"
          autoComplete="given-name"
          required=""
          focus=""
          className="ng-pristine ng-empty ng-invalid ng-invalid-required ng-valid-maxlength ng-touched"
          aria-invalid="true"
          onChange={onNameChange}
        />
      </div>
      <div className="form-group">
        <input
          id="username"
          maxLength="100"
          type="text"
          placeholder="Username"
          autoComplete="username"
          required=""
          className="ng-pristine ng-untouched ng-empty ng-valid-email ng-invalid ng-invalid-required ng-valid-maxlength"
          aria-invalid="true"
          onChange={onUsernameChange}
        />
      </div>
      <div className="form-group">
        <input
          id="email"
          maxLength="100"
          type="email"
          placeholder="Email"
          autoComplete="username"
          required=""
          className="ng-pristine ng-untouched ng-empty ng-valid-email ng-invalid ng-invalid-required ng-valid-maxlength"
          aria-invalid="true"
          onChange={onEmailChange}
        />
      </div>
      <div className="form-group">
        <input
          id="password"
          ng-model="password"
          type="password"
          maxLength="75"
          pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*?[0-9])(?=.*[a-z]).*$"
          placeholder="Password"
          autoComplete="new-password"
          required=""
          className="ng-pristine ng-untouched ng-empty ng-invalid ng-invalid-required ng-valid-pattern ng-valid-maxlength"
          aria-invalid="true"
          onChange={onPasswordChange}
        />
        <small className="hint">
          Should contain at least 8 chars, 1 number, 1 uppercase, 1 lowercase
          and 1 special char.
        </small>
      </div>
      <div className="form-group">
        <label htmlFor="accept-terms">
          <input
            id="accept-terms"
            type="checkbox"
            required=""
            className="ng-pristine ng-untouched ng-empty ng-invalid ng-invalid-required"
            aria-invalid="true"
            onChange={onCheckTerm}
          />
          By signing up you agree to our &nbsp;
          <Link to="/terms" style={{ color: "black" }}>
            Terms
          </Link>
          &nbsp; and &nbsp;
          <Link to="/privacy" style={{ color: "black" }}>
            Privacy Policy
          </Link>
        </label>
        <br />
        {/*<label htmlFor="accept-subs">
          <input
            id="accept-subs"
            type="checkbox"
            className="ng-pristine ng-untouched ng-valid ng-empty"
            aria-invalid="false"
            onChange={onCheckReceiveEmail}
          />
          I want to receive updates, promotions and tips in my inbox
  </label>*/}
      </div>
      <br />
      <button
        type="submit"
        className="button first"
        disabled={!isAcceptTerm}
        /*onClick={onRegister}*/
      >
        Register
      </button>
      <br />
      <button type="button" className="google-login" disabled={!isAcceptTerm}>
        Google Login
      </button>
      <br />
      Or{" "}
      <Link to="/login" style={{ color: "black" }}>
        Login
      </Link>
    </form>
  );
}
export default Register;
