import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Popup from "reactjs-popup";
import "./column.css";
function Card(props) {
  const backgroundColor = { backgroundColor: props.color };
  const [card, setCard] = useState(JSON.parse(JSON.stringify(props.card)));
  const [isEditing, setIsEditing] = useState(false);
  const [tempContent, setTempContent] = useState("");
  const onClickEdit = () => {
    if (!localStorage.token_id) {
      return;
    }
    setIsEditing(true);
    setTempContent(card.desc);
  };
  const onChangeCardContentInput = (e) => {
    setTempContent(e.target.value);
  };
  const onSave = async () => {
    if (tempContent === card.desc) {
      setIsEditing(false);
      return;
    }
    setCard({ desc: tempContent });
    const requestOptions = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ desc: tempContent }),
    };
    setIsEditing(false);
    try {
      let res = await fetch(
        `http://localhost:8080/api/card/${card._id}`,
        requestOptions
      );
      let response = await res.json();
      setCard(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const onDelete = async () => {
    if (localStorage.token_id !== props.boardOwner) {
      return;
    }
    const requestOptions = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    try {
      let res = await fetch(
        `http://localhost:8080/api/card/${card._id}`,
        requestOptions
      );
    } catch (error) {
      console.log(error);
    }
  };
  const renderCardView = (
    <div className="front" style={backgroundColor}>
      <div className="message-main">
        <div className="message-body">
          <div className="text ng-binding">{card.desc}</div>
          <a
            className="message-body-link ng-scope"
            aria-label="Edit message"
            onClick={onClickEdit}
          >
            <FontAwesomeIcon icon={["fas", "pen"]} />
          </a>
        </div>
        {/*<div className="votes">
              <strong className="vote-area">
                <a
                  className="ng-scope message-body-link show-vote-count"
                  style={{ marginLeft: 5, marginRight: 5 }}
                >
                  <FontAwesomeIcon icon="thumbs-up" />
                </a>
                <span className="ng-binding show-vote-count">0</span>
                <a
                  className="message-body-link"
                  aria-label="New comment"
                  style={{ marginLeft: 5, marginRight: 5 }}
                >
                  <FontAwesomeIcon icon="comment" />
                </a>
                <span className="ng-binding">1</span>
              </strong>
            </div>*/}
      </div>
    </div>
  );
  const renderCardEdit = (
    <div className="front">
      <div
        className="message-body"
        style={{ flexDirection: "column", backgroundColor: props.color }}
      >
        <div>
          <textarea
            msd-elastic="\n\n"
            aria-label="Message text entry"
            data-gramm_editor="false"
            className="ng-pristine ng-valid ng-not-empty ng-touched"
            aria-invalid="false"
            style={{
              overflow: "hidden",
              overflowWrap: "break-word",
              resize: "none",
              width: "100%",
              height: 54,
            }}
            onChange={onChangeCardContentInput}
            value={tempContent}
          ></textarea>
        </div>
        <div
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            flex: 1,
          }}
        >
          <button className="button-save" onClick={onSave}>
            DONE
          </button>
          <Popup
            trigger={
              <button
                className="button-save"
                aria-label="Delete message"
                style={{
                  backgroundColor: "white",
                  borderColor: "lightgray",
                  marginLeft: 10,
                }}
              >
                <FontAwesomeIcon icon={["fas", "trash-alt"]} color="red" />
              </button>
            }
            modal
            nested
          >
            {(close) => (
              <div
                className="modal swal2-popup"
                style={{
                  borderColor: "lightgray",
                  borderWidth: 2,
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
                      Are you sure you want to delete?
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
                        aria-label=""
                        style={{
                          borderLeftColor: "#e91e63",
                          borderRightColor: "#e91e63",
                        }}
                        onClick={() => {
                          onDelete();
                          close();
                        }}
                      >
                        Yes, delete it!
                      </button>
                      <button
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
      </div>
    </div>
  );
  return (
    <li id={"new_" + props.card._id} className="ng-scope message">
      <div messageid={"new_" + props.card._id}>
        {isEditing ? renderCardEdit : renderCardView}
      </div>
    </li>
  );
}
export default Card;
