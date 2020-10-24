import React from 'react';
import './home.css';
import Header from './header/header'
import Dashboard from './dashboard/dashboard';
function Home(props) {
   return (
      <div>
        <Header/>
        <Dashboard/>
      </div>
   );
};
export default Home;