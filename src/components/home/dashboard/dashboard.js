import React, { useState } from 'react';
import Board from './Board/board';
import './dashboard.css';

function Dashboard(props) {
  const tempList = [{
    _id: '123',
    name: 'Board 1',
    owner_id: '123',
    created_at: '2020-10-24T07:47:00.000Z'
  },{
    _id: '124',
    name: 'Board 2',
    owner_id: '123',
    created_at: '2020-10-24T07:47:00.000Z'
  },{
    _id: '125',
    name: 'Board 3',
    owner_id: '123',
    created_at: '2020-10-24T07:47:00.000Z'
  },];

  const [listBoard, setListBoard] = useState(tempList);
  const renderListItems = () => {
    return listBoard.map((item) => <Board board={item}/>);
  }
   return (
      <div>
        <div class="dashboard ng-scope">
      <h1>My boards</h1>
      <div class="ng-scope">
        <h2>
          <span>Public boards
            <small>collaborate by sharing URL with people</small>
          </span>
        </h2>
        <ul>
          <li class="dashboard-item add-item tooltip ng-scope" role="button" tabindex="0">
            <span class="add">
              <i class=" fa fa-plus"></i> <small>Add board</small>
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