import React from "react";
import {
  Redirect
} from "react-router-dom";
import Dashboard from "./dashboard/dashboard";
import Header from "./header/header";
import "./home.css";
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
