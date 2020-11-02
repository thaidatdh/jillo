import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import Board from "./Board/board";
import { Popup } from "reactjs-popup";
import AddNewBoard from './component/add-new-board'
import "./dashboard.css";

function Dashboard(props) {
  const [listBoard, setListBoard] = useState([]);
  const [isCopyUrl, setIsCopyUrl] = useState(false);
  useEffect(() => {
    let user_id = localStorage.token_id;
    fetch(`http://localhost:8080/api/board/user/${user_id}`, {
      method: "GET",
      headers: new Headers({
        Accept: "application/json; charset=utf-8",
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        setListBoard(response.data);
      })
      .catch((error) => console.log(error));
  });
  const onCopyUrl = () => {
    setIsCopyUrl(true);
  };
  const renderListItems = () => {
    return listBoard.map((item) => (
      <Board key={item._id} board={item} onCopy={onCopyUrl} />
    ));
  };
  const AddNewItem = (
    <li
      className="dashboard-item add-item tooltip ng-scope"
      role="button"
      tabIndex="0"
    >
      <span className="add">
        <i className=" fa fa-plus"></i> <small>Add board</small>
      </span>
    </li>
  );

  if (!localStorage.token_id) {
    return <Redirect to="/login" />;
  }
  return (
    <div>
      <div className="dashboard ng-scope">
        <h1>My boards</h1>
        <div className="ng-scope">
          {isCopyUrl ? (
            <Alert
              variant="success"
              style={{
                display: "flex",
                backgroundColor: "#d4edda",
                flexDirection: "row-reverse",
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 50,
                paddingRight: 50,
              }}
            >
              <p style={{ color: "#155724", textAlign: "center" }}>
                Board URL copied! Share it with people to collaborate.
              </p>
            </Alert>
          ) : null}
          <h2>
            <span>
              Public boards
              <small>collaborate by sharing URL with people</small>
            </span>
          </h2>
          <ul>
            <Popup trigger={AddNewItem} modal nested>
              {(close) => <AddNewBoard onClose={close} />}
            </Popup>
            {renderListItems()}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
