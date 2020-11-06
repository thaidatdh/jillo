import React, { useEffect, useState } from "react";
import Header from "../home/header/header";
import "./board-main.css";
import BoardNav from "./components/board-nav";
import Column from "./components/column";
import { Redirect, useParams, useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";
import copy from "copy-to-clipboard";
function BoardMain(props) {
  const [boardId, setBoardId] = useState(props.boardId);
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);
  const [isCopyMessageShow, setIsCopyMessageShow] = useState(false);
  const history = useHistory();
  let { board_id } = useParams();
  if (!props.boardId && !boardId) {
    setBoardId(board_id);
  }

  useEffect(() => {
    const onLoad = async () => {
      try {
        let res = await fetch(
          `https://jillo-backend.herokuapp.com/api/board/${boardId}`,
          {
            method: "GET",
            headers: new Headers({
              Accept: "application/json; charset=utf-8",
            }),
          }
        );
        let response = await res.json();
        setBoard(response.data);
        if (!board) {
          history.push('/');
          return;
        }
        let resCol = await fetch(
          `https://jillo-backend.herokuapp.com/api/column/board/${boardId}`,
          {
            method: "GET",
            headers: new Headers({
              Accept: "application/json; charset=utf-8",
            }),
          }
        );
        let responseCol = await resCol.json();
        let data = await responseCol.data.slice();
        data.sort(function (a, b) {
          return a.order - b.order;
        });
        setColumns(data);
      } catch (error) {
        console.log(error);
      }
    };
    onLoad();
  });
  const onShare = () => {
    setIsCopyMessageShow(true);
    copy(`https://jillo-frontend.herokuapp.com/board/${boardId}`);
  };
  const renderColumns = (columnList) => {
    return columnList.map((col) => (
      <Column key={col._id} column={col} owner={board.owner_id} />
    ));
  };
  if (!localStorage.token_id) {
    return <Redirect to="/login" />;
  }
  return (
    <div>
      <Header />
      <BoardNav boardId={boardId} board={board} onShare={onShare} />
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
