import React, { useEffect, useState } from 'react';
import Board from './Board/board';
import './dashboard.css';

function Dashboard(props) {

  const [listBoard, setListBoard] = useState([]);


  useEffect(() => {
    fetch('https://jillo-backend.herokuapp.com/api/board', {
      method: 'GET',
      headers: new Headers({
        Accept: "application/json; charset=utf-8"
      })
    }).then(res => res.json())
    .then(response => {
      setListBoard(response.data);
    })
    .catch(error => console.log(error));
  });

  const renderListItems = () => {
    return listBoard.map((item) => <Board board={item}/>);
  }
   return (
      <div>
        <div className="dashboard ng-scope">
      <h1>My boards</h1>
      <div className="ng-scope">
        <h2>
          <span>Public boards
            <small>collaborate by sharing URL with people</small>
          </span>
        </h2>
        <ul>
          <li className="dashboard-item add-item tooltip ng-scope" role="button" tabIndex="0">
            <span className="add">
              <i className=" fa fa-plus"></i> <small>Add board</small>
            </span>
          </li>
          {renderListItems()}
        </ul>
      </div>
    </div>
      </div>
   );
};
export default Dashboard;