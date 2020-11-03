import React, { useEffect, useState } from "react";
import Header from "../home/header/header";
import "./board-main.css";
import BoardNav from "./components/board-nav";
import Column from "./components/column";
import { Redirect, useParams } from "react-router-dom";
import { Alert } from "react-bootstrap";
import copy from "copy-to-clipboard"; 
function BoardMain(props) {
  const [boardId, setBoardId] = useState(props.boardId);
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);
  const [isCopyMessageShow, setIsCopyMessageShow] = useState(false);
  
  let { board_id } = useParams();
  if (!props.boardId && !boardId) {
    setBoardId(board_id);
  }

  useEffect(() => {
    fetch(`https://jillo-backend.herokuapp.com/api/board/${boardId}`, {
      method: "GET",
      headers: new Headers({
        Accept: "application/json; charset=utf-8",
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        setBoard(response.data);
      })
      .catch((error) => console.log(error));
    if (!board) return;
    fetch(`https://jillo-backend.herokuapp.com/api/column/board/${boardId}`, {
      method: "GET",
      headers: new Headers({
        Accept: "application/json; charset=utf-8",
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        let data = response.data.slice();
        data.sort(function (a, b) {
          return a.order - b.order;
        });
        setColumns(data);
      })
      .catch((error) => console.log(error));
  });
  const onShare = () => {
    setIsCopyMessageShow(true);
    copy(`https://jillo-frontend.herokuapp.com/board/${boardId}`);
  };
  const renderColumns = (columnList) => {
    return columnList.map((col) => <Column column={col} owner={board.owner_id} />);
  };
  if (!localStorage.token_id) {
    return <Redirect to="/login"/>
  }
  return (
    <div>
      <Header />
      <BoardNav boardId={boardId} onShare={onShare} />
      {isCopyMessageShow ? (
        <Alert
          variant="success"
          onClose={() => setIsCopyMessageShow(false)}
          dismissible
          style={{
            display: "flex",
            backgroundColor: "#d4edda",
            flexDirection: "row-reverse",
            alignItems: "center",
            justifyContent: "space-between",
            paddingLeft: 50,
            paddingRight: 50,
          }}
        >
          <p style={{ color: "#155724", textAlign: "center" }}>
            Board URL copied! Share it with people to collaborate.
          </p>
        </Alert>
      ) : null}
      <main
        main-content=""
        className="ng-scope"
        style={{ flexDirection: "row", justifyContent: "center" }}
      >
        <span
          dragula='"bag-two"'
          id="capture"
          className="ng-isolate-scope container"
        >
          {renderColumns(columns)}
        </span>
      </main>
    </div>
  );
}
export default BoardMain;
