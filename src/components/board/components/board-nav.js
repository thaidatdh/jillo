import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import "./board-nav.css";
function BoardNav(props) {
  const [board, setBoard] = useState({});
  const [tempBoardName, setTempBoardName] = useState("");
  const [isNameText, setIsNameText] = useState(true);
  const history = useHistory();
  useEffect(() => {
    const onLoad = async () => {
      if (props.board) {
        setBoard(props.board);
        return;
      }
      try {
        let res = await fetch(
          `https://jillo-backend.herokuapp.com/api/board/${props.boardId}`,
          {
            method: "GET",
            headers: new Headers({
              Accept: "application/json; charset=utf-8",
            }),
          }
        );
        let response = await res.json();
        setBoard(response.data);
      } catch (error) {
        history.push("/");
      }
    };
    onLoad();
  });
  const onChangeBoardName = () => {
    setIsNameText(false);
    setTempBoardName(board.name);
  };
  const onCancelEditBoardName = () => {
    setIsNameText(true);
  };
  const onSaveBoardName = async () => {
    if (tempBoardName === board.name) {
      setIsNameText(true);
      return;
    }
    try {
      const requestOptions = {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: tempBoardName }),
      };
      let res = await fetch(
        `https://jillo-backend.herokuapp.com/api/board/${board._id}`,
        requestOptions
      );
      let response = await res.json();
      setBoard(response.data);
    } catch (error) {
      console.log(error);
    }
    setIsNameText(true);
  };
  const onChangeBoardNameInput = (e) => {
    setTempBoardName(e.target.value);
  };
  return !board ? (
    <Redirect to="/" />
  ) : (
    <div>
      <nav menu="" className="ng-scope">
        <div className="menu board-menu" aria-hidden="false">
          <span
            className="board-name-container"
            role="button"
            tabIndex="0"
            aria-hidden="false"
            style={{ display: isNameText ? "inline-flex" : "none" }}
            onClick={onChangeBoardName}
          >
            <h2
              id="board-name"
              className="board-name edit-board-name ng-binding"
            >
              {board.name}
            </h2>
          </span>
          <div
            style={{
              flexDirection: "row",
              display: isNameText ? "none" : "inline-flex",
            }}
          >
            <input
              type="text"
              maxLength="50"
              style={{ width: 200 }}
              value={tempBoardName}
              onChange={onChangeBoardNameInput}
            />
            <button onClick={onSaveBoardName}>Save</button>
            <button onClick={onCancelEditBoardName}>Cancel</button>
          </div>
          <input
            id="board-context"
            className="board-context ng-pristine ng-valid ng-empty ng-valid-maxlength ng-touched"
            placeholder="Set the context of the retrospective here..."
            maxLength="140"
            aria-label="Board context"
            aria-hidden="false"
            aria-invalid="false"
          />
          <span className="menu-controls">
            <button
              className="normal-button import-btn copy-clipboard ng-scope"
              onClick={() => props.onShare()}
            >
              Share
            </button>
            {/*<button
              className="new-column new-column-desktop"
              aria-hidden="false"
            >
              New column
            </button>*/}
          </span>
        </div>
      </nav>
    </div>
  );
}
export default BoardNav;
