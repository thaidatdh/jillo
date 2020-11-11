import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
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
  const [items, setItems] = useState({});
  const [isCopyMessageShow, setIsCopyMessageShow] = useState(false);
  const [change, setChange] = useState(true);
  const history = useHistory();
  let { board_id } = useParams();
  if (!props.boardId && !boardId) {
    setBoardId(board_id);
  }

  // a little function to help us with reordering the result
  const reorder = (list, startIndex, endIndex) => {
    if (!list) {
      return [];
    }
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  /**
   * Moves an item from one list to another list.
   */
  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };

  const grid = 8;

  const getList = (id) => items[id];
  const onDragEnd = (result) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const itemsRearrange = reorder(
        getList(source.droppableId),
        source.index,
        destination.index
      );
      for (let i = 0; i < itemsRearrange.length; i++) {
        itemsRearrange[i].order = i + 1;
        const requestOptions = {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ order: i + 1 }),
        };
        let card_id = itemsRearrange[i]._id;
        fetch(
          `https://jillo-backend.herokuapp.com/api/card/${card_id}`,
          requestOptions
        ).catch((error) => console.log(error));
      }
      items[source.droppableId] = itemsRearrange;
    } else {
      const result = move(
        getList(source.droppableId),
        getList(destination.droppableId),
        source,
        destination
      );
      for (let i = 0; i < result[source.droppableId].length; i++) {
        result[source.droppableId][i].order = i + 1;
        result[source.droppableId][i].column_id = source.droppableId;
        const requestOptions = {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ order: i + 1, column_id: source.droppableId }),
        };
        let card_id = result[source.droppableId][i]._id;
        fetch(
          `https://jillo-backend.herokuapp.com/api/card/${card_id}`,
          requestOptions
        ).catch((error) => console.log(error));
      }
      for (let i = 0; i < result[destination.droppableId].length; i++) {
        result[destination.droppableId][i].order = i + 1;
        result[destination.droppableId][i].column_id = destination.droppableId;
        const requestOptions = {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            order: i + 1,
            column_id: destination.droppableId,
          }),
        };
        let card_id = result[destination.droppableId][i]._id;
        fetch(
          `https://jillo-backend.herokuapp.com/api/card/${card_id}`,
          requestOptions
        ).catch((error) => console.log(error));
      }
      items[source.droppableId] = result[source.droppableId];
      items[destination.droppableId] = result[destination.droppableId];
    }
    setChange(!change);
  };

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
          history.push("/");
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
        //Load col
        for (
          let i = 0;
          i < data.length /* && Object.keys(items).length < data.length*/;
          i++
        ) {
          let column_id = data[i]._id;
          await fetch(
            `https://jillo-backend.herokuapp.com/api/card/column/${column_id}`,
            {
              method: "GET",
              headers: new Headers({
                Accept: "application/json; charset=utf-8",
              }),
            }
          )
            .then((resC) => resC.json())
            .then((responseC) => {
              let dataC = responseC.data.slice();
              dataC.sort(function (a, b) {
                return a.order - b.order;
              });
              items[column_id] = dataC;
            })
            .catch((err) => console.log(err));
        }
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
      <Column
        key={col._id}
        column={col}
        owner={board.owner_id}
        cards={items[col._id]}
      />
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
      <DragDropContext
        onDragEnd={onDragEnd}
      >
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
      </DragDropContext>
    </div>
  );
}
export default BoardMain;
