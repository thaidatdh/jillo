import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { CompactPicker } from "react-color";
import Card from "./card";
import CardNew from "./card-new";
import "./column.css";
function Column(props) {
  const [cards, setCards] = useState([]);
  const [column, setColumn] = useState(props.column);
  const [color, setColor] = useState(props.column.color);
  const [isEditingColumnName, setIsEditingColumnName] = useState(false);
  const [tempColName, setTempColName] = useState("");
  const [newCards, setNewCards] = useState([]);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        let res = await fetch(
          `https://jillo-backend.herokuapp.com/api/card/column/${props.column._id}`,
          {
            method: "GET",
            headers: new Headers({
              Accept: "application/json; charset=utf-8",
            }),
          }
        );
        let response = await res.json();
        setCards(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCard();
  });
  const handleChangeColorComplete = async (colorChanged) => {
    setColor(colorChanged.hex);
    try {
      const requestOptions = {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ color: colorChanged.hex }),
      };
      let res = await fetch(
        `https://jillo-backend.herokuapp.com/api/column/${column._id}`,
        requestOptions
      );
      let response = await res.json();
      setColumn(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const onEditColNameClick = () => {
    setTempColName(column.name);
    setIsEditingColumnName(true);
  };
  const onCancelEditColName = () => {
    setIsEditingColumnName(false);
  };
  const onSaveColName = async () => {
    if (tempColName === column.name) {
      setIsEditingColumnName(false);
      return;
    }
    setColumn({ name: tempColName });
    setIsEditingColumnName(false);
    const requestOptions = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: tempColName }),
    };
    try {
      let res = await fetch(
        `https://jillo-backend.herokuapp.com/api/column/${column._id}`,
        requestOptions
      );
      let response = await res.json();
      setColumn(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const onChangeColNameInput = (e) => {
    setTempColName(e.target.value);
  };
  const onClickAddNew = () => {
    let nc = newCards.slice();
    let idt = Math.max.apply(
      Math,
      nc.map(function (o) {
        return o.id;
      })
    );
    idt = idt + 1;
    nc.push({ id: idt, content: "", column_id: props.column._id });
    setNewCards(nc);
  };
  const onChangeNewCard = (index, desc) => {
    newCards[index].content = desc;
  };
  const onClickCloseNewCard = (index) => {
    let nc = newCards.slice(0, index).concat(newCards.slice(index + 1));
    setNewCards(nc);
  };
  const onSaveNewCard = (index, card) => {
    onClickCloseNewCard(index);
    let nc = [card];
    nc = nc.concat(cards.slice());
    setCards(nc);
  };
  const renderCards = (cardsList) => {
    let newList = cardsList.slice();
    newList.reverse();
    return newList.map((card) => (
      <Card key={card._id} color={color} card={card} boardOwner={props.owner} />
    ));
  };
  const renderNewCards = (cardsList) => {
    let newList = cardsList.slice();
    newList.reverse();
    return cardsList.map((card, index) => (
      <CardNew
        key={"new_" + card.id}
        color={color}
        index={index}
        desc={card.content}
        column={card.column_id}
        onClose={onClickCloseNewCard}
        onSave={onSaveNewCard}
        onChange={onChangeNewCard}
      />
    ));
  };
  const popoverColorPicker = (
    <Popover id="popover-basic">
      <Popover.Content>
        <CompactPicker
          color={color}
          onChangeComplete={handleChangeColorComplete}
        />
      </Popover.Content>
    </Popover>
  );
  return (
    <span
      className="message-list ng-scope selected"
      data-column-id="1"
      data-column-index="0"
    >
      <div className="column-header">
        <h2
          className="ng-scope"
          style={{ flexDirection: "row", display: "inline-flex" }}
        >
          <span>
            <OverlayTrigger
              trigger="click"
              placement="bottom"
              overlay={popoverColorPicker}
            >
              <div
                style={{
                  backgroundColor: color,
                  height: 15,
                  width: 15,
                  marginRight: 10,
                  alignSelf: "center",
                  borderRadius: 5,
                }}
              />
            </OverlayTrigger>
          </span>
          <span
            className="column-name ng-binding"
            role="button"
            tabIndex="0"
            onClick={onEditColNameClick}
            style={{ display: !isEditingColumnName ? "inline-flex" : "none" }}
          >
            {column.name}
          </span>
          <div
            style={{
              flexDirection: "column",
              display: !isEditingColumnName ? "none" : "inherit",
            }}
          >
            <input
              type="text"
              maxLength="50"
              style={{ width: 200 }}
              value={tempColName}
              onChange={onChangeColNameInput}
            />
            <div
              style={{
                flexDirection: "row",
                marginTop: 5,
                justifyContent: "center",
              }}
            >
              <button onClick={onSaveColName}>Save</button>
              <button onClick={onCancelEditColName}>Cancel</button>
            </div>
          </div>
        </h2>

        <button
          className="add-card ng-scope"
          aria-label="Add new message"
          style={{ display: !isEditingColumnName ? "inherit" : "none" }}
          onClick={onClickAddNew}
        >
          <FontAwesomeIcon icon="plus" />
        </button>
      </div>
      <ul
        className="column"
        id="1"
        dragula='"bag-one"'
        dragula-model="messages"
      >
        {renderNewCards(newCards)}
        {renderCards(cards)}
      </ul>
    </span>
  );
}
export default Column;
