import jwt_decode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import "./header.css";

function Header(props) {
  const [name, setName] = useState("");
  const history = useHistory();
  const onSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("token_id");
    history.push("/login");
  };
  useEffect(() => {
    if (localStorage.token) {
      try {
        let decoded = jwt_decode(localStorage.token);
        setName(decoded.name);
      } catch (error) {
        // ignore
      }
    }
  }, []);
  if (!localStorage.token_id) {
    return history.push("/login");
  }

  return (
    <div>
      <header className="app-header" aria-hidden="false">
        <div className="header-filters">
          <div className="logo" role="button" tabIndex="0">
            <span>
              <Link to="/">Jillo</Link>
            </span>
          </div>
        </div>
        <span className="header-controls">
          <span className="header-icon">
            <Dropdown style={{ backgroundColor: "transparent" }}>
              <Dropdown.Toggle
                variant="success"
                id="dropdown-basic"
                className="user-menu"
                style={{
                  backgroundColor: "gray",
                  borderWidth: 0,
                  borderRadius: 12.5,
                  width: 25,
                  height: 25,
                }}
              >
                <span
                  className="user-menu"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignSelf: "center",
                    justifySelf: "center",
                  }}
                >
                  {name.length > 0 ? name[0] : "?"}
                </span>
              </Dropdown.Toggle>

              <Dropdown.Menu
                style={{
                  backgroundColor: "white",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Dropdown.Header>{name}</Dropdown.Header>
                <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                <Dropdown.Item onClick={onSignOut}>Sign Out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </span>
        </span>
      </header>
    </div>
  );
}
export default Header;
