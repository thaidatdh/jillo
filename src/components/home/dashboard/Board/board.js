import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import copy from "copy-to-clipboard";
import React, { useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Popup } from "reactjs-popup";
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
    const fetchBoardData = async () => {
      try {
        const fetchLink = `http://localhost:8080/api/column/board/${board._id}`;
        let res = await fetch(fetchLink, {
          method: "GET",
          headers: new Headers({
            Accept: "application/json; charset=utf-8",
          }),
        });
        let response = await res.json();
        let data = await response.data.slice();
        data.sort(function (a, b) {
          return a.order - b.order;
        });
        setColumns(data);
        if (data.length === 0) return;
        const columnIdList = await data.map((col) => col._id);
        const fetchLinkCards = `http://localhost:8080/api/card/column/columns=${columnIdList}/count`;
        let resCol = await fetch(fetchLinkCards, {
          method: "GET",
          headers: new Headers({
            Accept: "application/json; charset=utf-8",
          }),
        });
        let responseCol = await resCol.json();
        setCardNumber(responseCol.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBoardData();
  });
  const onCopyUrl = () => {
    props.onCopy();
    copy(`https://jillo-frontend.herokuapp.com/board/${board._id}`);
  };
  const onDelete = () => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    fetch(
      `http://localhost:8080/api/board/${board._id}`,
      requestOptions
    )
      .then((res) => res.json())
      .then((response) => {})
      .catch((error) => console.log(error));
  };
  const renderListColumns = () => {
    return columns.length > 0 ? (
      columns.map((item) => (
        <li key={item._id} className="board-small-column ng-scope">
          <span className="board-small-column-name ng-binding">
            {item.name}
          </span>
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip
                style={{
                  backgroundColor: "black",
                  color: "white",
                  padding: 5,
                  marginBottom: 3,
                  borderRadius: 5,
                }}
              >
                {item.name}
              </Tooltip>
            }
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
          <p className="board-name ng-binding">
            <Link to={link_to}>{board.name}</Link>
          </p>
          <p className="ng-binding"></p>
          <span className="board-date ng-binding">
            <i className="fa fa-clock"></i>
            {created_at}
          </span>
          <span className="tag ng-binding ng-scope">{cardNumber} cards</span>
        </div>
        <ul className="board-small ng-scope">{renderListColumns()}</ul>
      </a>
      <div className="board-actions" aria-hidden="false">
        <a className="board-action" aria-hidden="false" onClick={onCopyUrl}>
          <FontAwesomeIcon icon="copy" style={{ marginRight: 5 }} /> URL
        </a>

        <Popup
          trigger={
            <a className="board-action" aria-hidden="false">
              <FontAwesomeIcon icon="trash-alt" style={{ marginRight: 5 }} />{" "}
              Delete
            </a>
          }
          modal
          nested
        >
          {(close) => (
            <div
              className="modal swal2-popup"
              style={{
                borderColor: "black",
                borderWidth: 10,
                backgroundColor: "#2196f3",
              }}
            >
              <div className="content">
                <div
                  style={{
                    backgroundColor: "white",
                    padding: 20,
                    borderRadius: 10,
                  }}
                >
                  <h2 style={{ color: "black" }}>
                    Are you sure you want to delete{" "}
                    <strong>{board.name}</strong>?
                  </h2>
                  <div
                    style={{
                      flexDirection: "row",
                      display: "flex",
                      justifyContent: "space-around",
                      marginTop: 10,
                    }}
                  >
                    <button
                      type="button"
                      className="swal2-confirm swal2-styled"
                      style={{
                        marginTop: 10,
                      }}
                      onClick={() => {
                        onDelete();
                        close();
                      }}
                    >
                      Yes, delete it!
                    </button>
                    <button
                      type="button"
                      className="swal2-cancel swal2-styled"
                      onClick={() => {
                        close();
                      }}
                    >
                      No. Keep it!
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Popup>
      </div>
    </li>
  );
}
export default Board;
