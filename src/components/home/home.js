import React, { useState } from "react";
import "./home.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import Header from "./header/header";
import Dashboard from "./dashboard/dashboard";
import BoardMain from "../board/board-main";
function Home(props) {
  return (
    <div>
      <Header />
      <Dashboard />
    </div>
  );
}
export default Home;
