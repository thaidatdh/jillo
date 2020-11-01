import React, { useState } from "react";
import "./home.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  Redirect,
} from "react-router-dom";
import Header from "./header/header";
import Dashboard from "./dashboard/dashboard";
import BoardMain from "../board/board-main";
function Home(props) {
  if (!localStorage.token_id) {
    return <Redirect to="/login"/>
  }
  return (
    <div>
      <Header />
      <Dashboard />
    </div>
  );
}
export default Home;
