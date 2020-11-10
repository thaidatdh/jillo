import React, { useState } from "react";
import "./index.css";
import Login from "./login/login";
import Register from "./register/register";

function LoginIndex(props) {
  const [formState, setFormState] = useState(props.formState);
  const onChangeFormStateLogin = () => {
    setFormState("login");
  };
  const onChangeFormStateRegister = () => {
    setFormState("register");
  };
  let element =
    props.formState === "login" ? (
      <Login setFormState={onChangeFormStateRegister} />
    ) : (
      <Register setFormState={onChangeFormStateLogin} />
    );
  return (
    <span className="form-container">
      <a>
        {" "}
        <h1>Jillo</h1>{" "}
      </a>
      {element}
    </span>
  );
}
export default LoginIndex;
