import React, { useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./board.css";
const DATE_OPTIONS = { year: "numeric", month: "short", day: "numeric" };
function Board(props) {
  const [board, setBoard] = useState(props.board);
  const [columns, setColumns] = useState([]);
  const [cardNumber, setCardNumber] = useState(0);
  const created_at = new Date(board.created_at).toLocaleDateString(
    "en-US",
    DATE_OPTIONS
  );

  useEffect(() => {
    const fetchLink = `http://localhost:8080/api/column/board/${board._id}`;
    fetch(fetchLink, {
      method: "GET",
      headers: new Headers({
        Accept: "application/json; charset=utf-8",
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        setColumns(response.data);
      })
      .catch((error) => console.log(error));

    if (columns.length === 0) return;
    const columnIdList = columns.map((col) => col._id);
    const fetchLinkCards = `http://localhost:8080/api/card/column/columns=${columnIdList}/count`;
    fetch(fetchLinkCards, {
      method: "GET",
      headers: new Headers({
        Accept: "application/json; charset=utf-8",
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        setCardNumber(response.data);
      })
      .catch((error) => console.log(error));
  });

  const renderListColumns = () => {
    return columns.length > 0 ? (
      columns.map((item) => (
        <li key={item._id} className="board-small-column ng-scope">
          <span className="board-small-column-name ng-binding">
            {item.name}
          </span>
          <OverlayTrigger
            trigger="focus"
            placement="bottom"
            overlay={<Tooltip >{item.name}</Tooltip>}
          >
            <ul className="column">
              <li
                className="front"
                style={{
                  background: item.color,
                  width: "100%",
                  minHeight: "7px",
                }}
              >
                &nbsp;
              </li>
            </ul>
          </OverlayTrigger>
        </li>
      ))
    ) : (
      <li className="board-small-column ng-scope">
        <span className="board-small-column-name ng-binding"></span>
        <ul className="column">
          <li
            className="front"
            style={{
              background: "transparent",
              width: "100%",
              minHeight: "7px",
            }}
          >
            &nbsp;
          </li>
        </ul>
      </li>
    );
  };
  const link_to = `/board/${board._id}`;
  return (
    <li
      key={0}
      className="dashboard-item dashboard-board ng-scope"
      id="board_0"
    >
      <a>
        <div className="dashboard-item-body">
          <p className="board-name ng-binding"><Link to={link_to}>{board.name}</Link></p>
          <p className="ng-binding"></p>
          <span className="board-date ng-binding">
            <i className="fa fa-clock"></i>
            {created_at}
          </span>
          <span className="tag ng-binding ng-scope">{cardNumber} cards</span>
        </div>
        <ul className="board-small ng-scope">{renderListColumns()}</ul>
      </a>
      {/*<div
        ng-show="userHasAdminRightsBoard(board, {isPublic: true})"
        className="board-actions"
        aria-hidden="false"
      >
        <a
          ng-show="!board.archived"
          className="board-action"
          ng-click="importExportService.copyURL($event, board.$id, userId)"
          aria-hidden="false"
        >
          <i className="fa fa-copy"></i> URL
        </a>
        <a
          ng-show="!board.archived"
          className="board-action"
          ng-click="cloneBoard($event, null, board.$id, board.boardName, true)"
          aria-hidden="false"
        >
          <i className="fa fa-clone"></i> CLONE
        </a>
      </div>*/}
    </li>
  );
}
export default Board;
