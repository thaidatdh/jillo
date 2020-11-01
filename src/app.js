import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import LoginIndex from "./components/login/login-index";
import Home from './components/home/home'
import BoardMain from "./components/board/board-main";
export default function App() {
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/login">
            <LoginIndex formState="login" />
          </Route>
          <Route path="/register">
            <LoginIndex formState="register" />
          </Route>
          <Route path="/board/:board_id">
            <BoardMain />
          </Route>
          <Route path="/">
            <Home />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}