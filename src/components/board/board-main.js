import React, { useEffect, useState } from "react";
import Header from "../home/header/header";
import "./board-main.css";
import BoardNav from "./components/board-nav";
import Column from "./components/column";
function BoardMain(props) {
  const [boardId, setBoardId] = useState("5f93bea7b4472c330487a350");
  const [columns, setColumns] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:8080/api/column/board/${boardId}`, {
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
  });

  const renderColumns = (columnList) => {
    return columnList.map((col) => <Column column={col} />);
  };
  return (
    <div>
      <Header/>
      <BoardNav boardId={boardId} />
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
