import React from 'react';
import './header.css';

function Header(props) {
   return (
      <div>
        <header className="app-header" aria-hidden="false">
          <div className="header-filters">
            <div className="logo" role="button" tabIndex="0">
              <span>
                Jillo
              </span>
            </div>
          </div>
          <span className="header-controls">
            <span className="header-icon">
              <span className="user-menu">
                <img alt="user" title="Dat Ho" className="user-photo" role="button" tabIndex="0" aria-hidden="false" src="https://lh6.googleusercontent.com/-owXzYdPSkNI/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclp_msnllCAdWILSkwg_IdfQ9rJWw/s96-c/photo.jpg"/>
              </span>
            </span>
          </span>
        </header>
      </div>
   );
};
export default Header;