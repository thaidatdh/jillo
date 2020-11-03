import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import "./profile.css";
import Header from "../home/header/header";
const DATE_OPTIONS = { year: "numeric", month: "long", day: "numeric" };
function Profile(props) {
  const [user, setUser] = useState({});
  const [createdAt, setCreatedAt] = useState("");
  const [isChangeEmail, setIsChangeEmail] = useState(false);
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const onChangeName = (e) => {
    let nameChanged = e.target.value;
    setUser({ name: nameChanged });
  };
  const onChangeEmail = (e) => {
    setNewEmail(e.target.value);
  };
  const onChangeCurrentPwd = (e) => {
    setCurrentPwd(e.target.value);
  };
  const onChangeNewPwd = (e) => {
    setNewPwd(e.target.value);
  };
  const onUpdate = () => {
    if (newPwd && newPwd.length < 8) {
      setError("Please enter password with atleast 8 characters");
      return;
    }
    let UpdatedUser = {
      name: user.name,
      password: null,
      email: null,
    };
    if (isChangeEmail && newEmail !== "" && newEmail !== user.email) {
      UpdatedUser.email = newEmail;
    }
    if (isChangePassword && newPwd !== "" && newPwd.length > 8) {
      UpdatedUser.password = newPwd;
      console.log(UpdatedUser.password);
    }
    console.log(UpdatedUser);
    const requestOptionsPwd = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: user._id, password: currentPwd }),
    };
    fetch(`http://localhost:8080/api/user/checkpassword`, requestOptionsPwd)
      .then((res) => res.json())
      .then((response) => {
        let isCorrectPwd = response.success;
        if (isCorrectPwd) {
          setError("");
          const requestOptions = {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(UpdatedUser),
          };
          fetch(`http://localhost:8080/api/user/${user._id}`, requestOptions)
            .then((res) => res.json())
            .then((response) => {
              localStorage.token = response.token;
              setUser(UpdatedUser);
              setError("");
              let msg =
                isChangeEmail && isChangePassword
                  ? "Email and Password"
                  : (isChangeEmail
                  ? "Email"
                  : (isChangePassword
                  ? "Password"
                  : ""));
              setSuccessMsg("Updated " + msg);
            })
            .catch((error) => setError("Error when Saving!"));
        } else {
          setError(response.msg);
        }
      })
      .catch((error) => setError("Error when Checking current Password!"));
  };
  useEffect(() => {
    if (localStorage.token) {
      try {
        let decoded = jwt_decode(localStorage.token);
        const created_at_temp = new Date(decoded.created_at).toLocaleDateString(
          "en-US",
          DATE_OPTIONS
        );
        let user = {
          _id: decoded._id,
          name: decoded.name,
          username: decoded.username,
          email: decoded.email,
          created_at: decoded.created_at,
        };
        setUser(user);
        setCreatedAt(created_at_temp);
      } catch (error) {
        // ignore
      }
    }
  }, []);
  if (!localStorage.token_id) {
    return <Redirect to="/login" />;
  }
  return (
    <div>
      <Header />
      <div>
        <form
          className="form form-tabs ng-pristine ng-valid ng-valid-required"
          layout="column"
        >
          <div className="tabs">
            <a className="active">User Profile</a>
          </div>
          <div className="ng-scope">
            <div className="form-group">
              <label>Username</label>
              <br />
              <strong id="current-username" className="ng-binding">
                {user.username}
              </strong>
            </div>
            <div className="form-group">
              <label>Name</label>
              <input
                id="name"
                type="text"
                placeholder="Name"
                required=""
                className="ng-pristine ng-untouched ng-scope ng-not-empty ng-valid ng-valid-required"
                aria-invalid="false"
                value={user.name}
                onChange={onChangeName}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <br />
              <strong id="current-email" className="ng-binding">
                {user.email}
              </strong>
              <br />
              {isChangeEmail ? (
                <div>
                  <br />
                  <input
                    id="name"
                    type="text"
                    placeholder="New Email"
                    required=""
                    className="ng-pristine ng-untouched ng-scope ng-not-empty ng-valid ng-valid-required"
                    aria-invalid="false"
                    value={newEmail}
                    onChange={onChangeEmail}
                    style={{ marginBottom: 10 }}
                  />
                  <button
                    type="button"
                    style={{
                      backgroundColor: "gray",
                      borderRadius: 10,
                      marginTop: 0,
                    }}
                    onClick={() => {
                      setNewEmail(user.email);
                      setIsChangeEmail(false);
                    }}
                  >
                    Cancel change email
                  </button>
                </div>
              ) : (
                <a className="ng-scope" onClick={() => setIsChangeEmail(true)}>
                  Change email
                </a>
              )}
            </div>
            <br className="ng-scope" />
            <div className="form-group ng-scope">
              <label>Password</label>
              <br />
              {isChangePassword ? (
                <div>
                  <br />
                  <input
                    id="name"
                    type="text"
                    placeholder="New Password"
                    required=""
                    className="ng-pristine ng-untouched ng-scope ng-not-empty ng-valid ng-valid-required"
                    aria-invalid="false"
                    value={newPwd}
                    onChange={onChangeNewPwd}
                    style={{ marginBottom: 5 }}
                  />
                  <button
                    type="button"
                    style={{
                      backgroundColor: "gray",
                      borderRadius: 10,
                      marginTop: 0,
                    }}
                    onClick={() => {
                      setNewPwd("");
                      setIsChangePassword(false);
                    }}
                  >
                    Cancel change password
                  </button>
                </div>
              ) : (
                <a
                  className="ng-scope"
                  onClick={() => setIsChangePassword(true)}
                >
                  Reset password
                </a>
              )}
            </div>
            <br />
            <div className="form-group">
              <label>Registered</label>
              <br />
              <strong className="ng-binding">{createdAt}</strong>
            </div>
            <br />
            {isChangePassword || isChangeEmail ? (
              <div>
                <input
                  id="name"
                  type="text"
                  placeholder="Current Password"
                  required=""
                  className="ng-pristine ng-untouched ng-scope ng-not-empty ng-valid ng-valid-required"
                  aria-invalid="false"
                  value={currentPwd}
                  onChange={onChangeCurrentPwd}
                />
                <br />
              </div>
            ) : null}
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
                {error}
              </div>
            ) : null}
            {!error && successMsg ? (
              <div
                style={{
                  backgroundColor: "#d4edda",
                  color: "#155724",
                  padding: 10,
                  borderRadius: 10,
                  marginTop: 10,
                  marginBottom: 20,
                }}
              >
                {successMsg}
              </div>
            ) : null}
            <button
              className="button first"
              type="button"
              aria-hidden="false"
              onClick={onUpdate}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Profile;