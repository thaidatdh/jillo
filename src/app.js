import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BoardMain from "./components/board/board-main";
import Home from "./components/home/home";
import LoginIndex from "./components/login/login-index";
import Profile from "./components/profile/profile";
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
          <Route path="/profile">
            <Profile />
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
