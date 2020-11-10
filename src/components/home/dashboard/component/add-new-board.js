import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import "./add-new-board.css";

function AddNewBoard(props) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const onClose = props.onClose;
  const onNameChange = (e) => {
    setName(e.target.value);
  };
  const onCreate = async () => {
    if (name.length === 0) {
      setError("Please Enter valid Name");
      return;
    }
    //Create Board
    const owner_id = localStorage.token_id;
    const columns = [
      { name: "Went Well", color: "#009688", order: 1 },
      { name: "To Improve", color: "#e91e62", order: 2 },
      { name: "Action Items", color: "#8727b0", order: 3 },
    ];
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name, owner_id: owner_id }),
    };
    try {
      let res = await fetch(
        "https://jillo-backend.herokuapp.com/api/board",
        requestOptions
      );
      let response = await res.json();
      if (response.data) {
        const board = response.data;
        columns.forEach((col) => {
          const requestOptionsCol = {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: col.name,
              color: col.color,
              board_id: board._id,
              order: col.order,
            }),
          };
          fetch(
            "https://jillo-backend.herokuapp.com/api/column",
            requestOptionsCol
          );
        });
      }
    } catch (error) {
      console.log(error);
    }
    onClose();
  };
  return (
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
          class="create-board form create-board-show"
          role="button"
          tabindex="0"
        >
          {error ? (
            <Alert
              variant="error"
              style={{
                display: "flex",
                backgroundColor: "#f8d7da",
                flexDirection: "row-reverse",
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 50,
                paddingRight: 50,
                marginBottom: 10,
              }}
            >
              <p style={{ color: "darkred", textAlign: "center" }}>{error}</p>
            </Alert>
          ) : null}
          <div
            class="create-board-header"
            style={{
              flexDirection: "row",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <a style={{ justifySelf: "flex-start", alignSelf: "center" }}>
              <FontAwesomeIcon icon="times" color="transparent" />
            </a>
            <h1 style={{ justifySelf: "center" }}>Create Board</h1>
            <a
              style={{ justifySelf: "flex-end", alignSelf: "center" }}
              aria-label="Close settings sidebar"
              onClick={() => props.onClose()}
            >
              <FontAwesomeIcon icon="times" color="black" />
            </a>
          </div>
          <div class="create-board-body">
            <form
              name="createBoardForm"
              class="ng-valid ng-valid-maxlength ng-dirty ng-valid-parse"
            >
              <label for="newBoardName">Name </label>
              <input
                id="newBoardName"
                type="text"
                maxlength="100"
                autofocus=""
                class="ng-pristine ng-valid ng-empty ng-valid-maxlength ng-touched"
                aria-invalid="false"
                value={name}
                onChange={onNameChange}
              />

              <div class="template">
                <label for="template" aria-hidden="false">
                  Template
                </label>

                <div class="ng-scope">
                  <span class="header-select-container board-select-container">
                    <select
                      class="bigger ng-valid ng-not-empty ng-dirty ng-valid-parse ng-touched"
                      id="activity"
                      name="activity"
                      aria-invalid="false"
                    >
                      <option
                        selected={true}
                        label="Went Well - To Improve - Action Items"
                        value="object:158"
                      >
                        Went Well - To Improve - Action Items
                      </option>
                    </select>
                  </span>

                  <div class="ng-scope">
                    <div class="columns template">
                      <h3 nclass="ng-scope">Columns</h3>
                      <div>
                        <ul>
                          <li class="ng-scope">
                            <span class="ng-binding">Went Well</span>
                          </li>
                          <li class="ng-scope">
                            <span class="ng-binding">To Improve</span>
                          </li>
                          <li class="ng-scope">
                            <span class="ng-binding">Action Items</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                value="Submit"
                type="button"
                class="confirm"
                onClick={onCreate}
              >
                CREATE
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AddNewBoard;
