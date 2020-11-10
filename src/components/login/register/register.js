import React, { useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import "./register.css";
import {config} from '../../../store'
function Register(props) {
  const [isAcceptTerm, setAcceptTerm] = useState(false);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [isReceiveEmail, setIsReceiveEmail] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const history = useHistory();
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
  const onRegister = async (e) => {
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
    try {
      let res = await fetch(
        "https://jillo-backend.herokuapp.com/api/user/signup",
        requestOptions
      );
      let response = await res.json();
      setSuccess(response.success);
      setError(response.msg);
    } catch (error) {
      setError("Error when register");
      console.log(error);
    }
  };
  const errorGoogle = (response) => {
    console.log(response);
  }
  const responseFacebook = async (response) => {
    if (!response.name) {
      return;
    }
    const fbresponse = {
      name: response.name,
      email: response.email,
      facebook_token: response.userID,
      photo_link: response.picture.data.url,
      username: response.email,
    };
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fbresponse),
    };
    try {
      let res = await fetch(
        "https://jillo-backend.herokuapp.com/api/user/signupfacebook",
        requestOptions
      );
      let response = await res.json();
      setError(!response.success);
      if (response.success) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("token_id", response.data);
        history.push("/");
      } else {
        setError(response.msg);
      }
    } catch (error) {
      setError("Error when login");
      console.log(error);
    }
  }
  const signUpGoogle = async (response) => {
    const googleresponse = {
      name: response.profileObj.name,
      email: response.profileObj.email,
      google_token: response.googleId,
      photo_link: response.profileObj.imageUrl,
      username: response.profileObj.email,
    };
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(googleresponse),
    };
    try {
      let res = await fetch(
        "https://jillo-backend.herokuapp.com/api/user/signupgoogle",
        requestOptions
      );
      let response = await res.json();
      setError(!response.success);
      if (response.success) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("token_id", response.data);
        history.push("/");
      } else {
        setError(response.msg);
      }
    } catch (error) {
      setError("Error when login");
      console.log(error);
    }
  };
  if (localStorage.token_id) {
    return <Redirect to="/" />;
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
            marginBottom: 20,
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
            marginBottom: 20,
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
          <Link to="/" style={{ color: "black" }}>
            Terms
          </Link>
          &nbsp; and &nbsp;
          <Link to="/" style={{ color: "black" }}>
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
      <GoogleLogin disabled={!isAcceptTerm}
                clientId={config.google_auth_client_id + ".apps.googleusercontent.com"}
                buttonText="Login with Google"
                onSuccess={signUpGoogle}
                onFailure={errorGoogle} ></GoogleLogin>
      <br />
      <FacebookLogin isDisabled={!isAcceptTerm}
        appId={config.facebook_app_id}
        fields="name,email,picture"
        callback={responseFacebook}
      />
      <br />
      <br />
      Or{" "}
      <Link to="/login" style={{ color: "black" }}>
        Login
      </Link>
    </form>
  );
}
export default Register;
