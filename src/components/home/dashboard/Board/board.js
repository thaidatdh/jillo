import React, { useState } from "react";
import "./board.css";
const DATE_OPTIONS = { year: 'numeric', month: 'short', day: 'numeric' };
function Board(props) {
   const [board, setBoard] = useState(props.board);
   const created_at = (new Date(board.created_at)).toLocaleDateString('en-US', DATE_OPTIONS)
  return (
    <li
      ng-if="!user.isManager"
      class="dashboard-item dashboard-board ng-scope"
      id="board_0"
      ng-repeat="board in publicBoards | filter: { archived: toggleArchive } | filter: filterText | orderBy:'date_created':sortDesc"
    >
      <a
        ng-href="publicboard/DOU2KxqBtLhASnlV8Wx2G0D2wUB3/ce211fc6-8d5a-4505-be1d-977ff61f6d75"
        href="publicboard/DOU2KxqBtLhASnlV8Wx2G0D2wUB3/ce211fc6-8d5a-4505-be1d-977ff61f6d75"
      >
        <div class="dashboard-item-body">
          <p class="board-name ng-binding">{board.name}</p>
          <p class="ng-binding"></p>
          <span class="board-date ng-binding">
            <i class="fa fa-clock"></i>
            {created_at}
          </span>
          <span
            class="tag ng-binding ng-scope"
            ng-if="board.messages.length > 0"
          >
            2 cards
          </span>
        </div>
        <ul ng-if="board.messages.length > 0" class="board-small ng-scope">
          <li
            ng-repeat="column in board.columns"
            class="board-small-column ng-scope"
          >
            <span class="board-small-column-name ng-binding">Went Well</span>
            <ul class="column column_1">
              <li
                ng-repeat="message in board.messages | filter: {type: {id: column.id}}"
                class="front front_1"
              >
                &nbsp;
              </li>
            </ul>
          </li>
          <li
            ng-repeat="column in board.columns"
            class="board-small-column ng-scope"
          >
            <span class="board-small-column-name ng-binding">To Improve</span>
            <ul class="column column_2">
              <li
                ng-repeat="message in board.messages | filter: {type: {id: column.id}}"
                class="front front_2"
              >
                &nbsp;
              </li>
            </ul>
          </li>
          <li
            ng-repeat="column in board.columns"
            class="board-small-column ng-scope"
          >
            <span class="board-small-column-name ng-binding">Action Items</span>
            <ul class="column column_3">
              <li
                ng-repeat="message in board.messages | filter: {type: {id: column.id}}"
                class="front front_3"
              >
                &nbsp;
              </li>
            </ul>
          </li>
        </ul>
      </a>
      {/*<div
        ng-show="userHasAdminRightsBoard(board, {isPublic: true})"
        class="board-actions"
        aria-hidden="false"
      >
        <a
          ng-show="!board.archived"
          class="board-action"
          ng-click="importExportService.copyURL($event, board.$id, userId)"
          aria-hidden="false"
        >
          <i class="fa fa-copy"></i> URL
        </a>
        <a
          ng-show="!board.archived"
          class="board-action"
          ng-click="cloneBoard($event, null, board.$id, board.boardName, true)"
          aria-hidden="false"
        >
          <i class="fa fa-clone"></i> CLONE
        </a>
      </div>*/}
    </li>
  );
}
export default Board;
