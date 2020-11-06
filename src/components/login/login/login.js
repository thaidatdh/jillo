import React, { useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import "./login.css";

function Login(props) {
  const [isAbleToLogin, setIsAbleToLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const history = useHistory();
  const onPasswordChange = (text) => {
    setPassword(text);
    if (text.length >= 8 && username.length > 0) {
      setIsAbleToLogin(true);
    } else {
      setIsAbleToLogin(false);
    }
  };
  const onUsernameChange = (text) => {
    setUsername(text);
    if (password.length >= 8 && text.length > 0) {
      setIsAbleToLogin(true);
    } else {
      setIsAbleToLogin(false);
    }
  };
  const onLogin = async (e) => {
    e.preventDefault();
    if (password.length < 8 || username.length <= 0) {
      console.log("error");
      return;
    }
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: username,
        password: password,
      }),
    };
    try {
      let res = await fetch(
        "https://jillo-backend.herokuapp.com/api/user/signin",
        requestOptions
      );
      let response = await res.json();
      setError(!response.success);
      if (response.success) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("token_id", response.data);
        history.push("/");
      } else {
        setMessage(response.msg);
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
    <form className="form" onSubmit={onLogin}>
      <h2>Login</h2>
      {error ? (
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
          {message}
        </div>
      ) : null}
      <div className="form-group">
        <input
          id="email"
          type="text"
          placeholder="Username (or Email)"
          autocomplete="username"
          required=""
          focus=""
          className="ng-pristine ng-empty ng-invalid ng-invalid-required ng-touched"
          aria-invalid="true"
          onChange={(text) => onUsernameChange(text.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          id="password"
          type="password"
          maxLength="75"
          placeholder="Password"
          autocomplete="current-password"
          required=""
          className="ng-pristine ng-untouched ng-empty ng-invalid ng-invalid-required ng-valid-maxlength"
          aria-invalid="true"
          onChange={(text) => onPasswordChange(text.target.value)}
        />
        <Link
          to="/forgot-password"
          className="forgot-password"
          style={{ color: "black" }}
        >
          Forgot password?
        </Link>
      </div>
      <button
        type="submit"
        className="button first"
        disabled={!isAbleToLogin}
        /*onClick={onLogin}*/
      >
        Login
      </button>
      <br />
      <button className="google-login">Google Login</button>
      <br />
      Or &nbsp;
      <Link to="/register" style={{ color: "black" }}>
        Register
      </Link>
    </form>
  );
}
export default Login;
