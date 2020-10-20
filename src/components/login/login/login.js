import React from 'react';
import './login.css';

function Login(props) {
   return (
      <form className="form ng-pristine ng-valid-email ng-invalid ng-invalid-required ng-valid-maxlength" ng-submit="login()">
        <h2>Login</h2>
        <div className="form-group">
          <input id="email" ng-model="email" type="email" placeholder="Your email" autocomplete="username" required="" focus="" className="ng-pristine ng-empty ng-valid-email ng-invalid ng-invalid-required ng-touched" aria-invalid="true"/>
        </div>
        <div className="form-group">
          <input id="password" ng-model="password" type="password" maxlength="75" placeholder="Password" autocomplete="current-password" required="" className="ng-pristine ng-untouched ng-empty ng-invalid ng-invalid-required ng-valid-maxlength" aria-invalid="true"/>
          <a className="forgot-password" ng-click="changeLocation('forgot')">Forgot password?</a>
        </div>
        <button ng-disabled="loading || disabled" className="button first" disabled="disabled">
          Login
          <div className="spinner spinner-small ng-hide" ng-show="loading" aria-hidden="true">
            <div className="rect rect1"></div>
            <div className="rect rect2"></div>
            <div className="rect rect3"></div>
          </div>
        </button>
        <br/>
        <button className="google-login" ng-click="loginGoogle($event)">
          Google Login
        </button>
        <br/>
        Or
        <a ng-click={props.setFormState('register')}>Register</a>
      </form>
   );
};
export default Login;