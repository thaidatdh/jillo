import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './header.css';

function Header(props) {
  const onSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('token_id');
  }
   return (
      <div>
        <header className="app-header" aria-hidden="false">
          <div className="header-filters">
            <div className="logo" role="button" tabIndex="0">
              <span>
                <Link to="/">Jillo</Link>
              </span>
            </div>
          </div>
          <span className="header-controls">
            <span className="header-icon">
            <Dropdown style={{backgroundColor: 'transparent'}}>
              <Dropdown.Toggle variant="success" id="dropdown-basic" className="user-menu" style={{backgroundColor: 'transparent', borderWidth: 0}}>
                <span className="user-menu">
                  <img alt="user" title="Dat Ho" className="user-photo" role="button" tabIndex="0" aria-hidden="false" src="https://lh6.googleusercontent.com/-owXzYdPSkNI/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclp_msnllCAdWILSkwg_IdfQ9rJWw/s96-c/photo.jpg"/>
                </span>
              </Dropdown.Toggle>

              <Dropdown.Menu style={{backgroundColor: 'white', display: 'flex', flexDirection: 'column'}}>
                <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                <Dropdown.Item onClick={onSignOut}>Sign Out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            </span>
          </span>
        </header>
      </div>
   );
};
export default Header;