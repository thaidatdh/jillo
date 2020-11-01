import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./login.css";

function Login(props) {
  const [isAbleToLogin, setIsAbleToLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const onPasswordChange = (text) => {
    setPassword(text);
    if (text.length > 8 && username.length > 0) {
      setIsAbleToLogin(true);
    } else {
      setIsAbleToLogin(false);
    }
  };
  const onUsernameChange = (text) => {
    setUsername(text);
    if (password.length > 8 && text.length > 0) {
      setIsAbleToLogin(true);
    } else {
      setIsAbleToLogin(false);
    }
  };
  const onLogin = () => {
    history.push("/");
  };
  const onLoad = () => {};
  return (
    <form className="form" onLoad={onLoad}>
      <h2>Login</h2>
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
        <Link to="/forgot-password" className="forgot-password" style={{}}>
          Forgot password?
        </Link>
      </div>
      <button
        className="button first"
        disabled={!isAbleToLogin}
        onClick={onLogin}
      >
        Login
      </button>
      <br />
      <button className="google-login" ng-click="loginGoogle($event)">
        Google Login
      </button>
      <br />
      Or &nbsp;
      <Link to="/register">Register</Link>
    </form>
  );
}
export default Login;
