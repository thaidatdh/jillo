import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "./column.css";
function CardNew(props) {
  const backgroundColor = { backgroundColor: props.color };
  const [tempContent, setTempContent] = useState(props.content);
  const onChangeCardContentInput = (e) => {
    setTempContent(e.target.value);
    props.onChange(props.index, e.target.value);
  };
  const onSave = async () => {
    if (!tempContent || tempContent.trim() === "") {
      props.onClose(props.index);
      return;
    }
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ column_id: props.column, desc: tempContent }),
    };
    try {
      let res = await fetch(
        "http://localhost:8080/api/card",
        requestOptions
      );
      let response = await res.json();
      if (response.data) props.onSave(props.index, response.data);
      else props.onClose(props.index);
    } catch (error) {
      console.log(error);
    }
  };
  const onDelete = () => {
    props.onClose(props.index);
  };

  return (
    <li id={"new"} className="ng-scope message">
      <div messageid={"new"}>
        <div className="front" style={backgroundColor}>
          <div className="message-body" style={{ flexDirection: "column" }}>
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
                value={props.content}
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
              <button
                className="button-save"
                aria-label="Delete message"
                style={{
                  backgroundColor: "white",
                  borderColor: "lightgray",
                  marginLeft: 10,
                }}
                onClick={onDelete}
              >
                <FontAwesomeIcon icon={["fas", "trash-alt"]} color="red" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
export default CardNew;
