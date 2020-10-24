import React from 'react';
import './header.css';

function Header(props) {
   return (
      <div>
        <header class="app-header" aria-hidden="false">
          <div class="header-filters">
            <div class="logo" role="button" tabindex="0">
              <span>
                Jillo
              </span>
            </div>
          </div>
          <span class="header-controls">
            <span class="header-icon">
              <span class="user-menu">
                <img alt="user image" ng-show="user.photoURL" title="Dat Ho" class="user-photo" role="button" tabindex="0" aria-hidden="false" ng-src="https://lh6.googleusercontent.com/-owXzYdPSkNI/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclp_msnllCAdWILSkwg_IdfQ9rJWw/s96-c/photo.jpg" src="https://lh6.googleusercontent.com/-owXzYdPSkNI/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclp_msnllCAdWILSkwg_IdfQ9rJWw/s96-c/photo.jpg"/>
              </span>
            </span>
          </span>
        </header>
      </div>
   );
};
export default Header;