import React, { useState } from 'react';
import './index.css';
import Login from './login/login';
import Register from './register/register';

function LoginIndex(props) {
   const [formState, setFormState] = useState(props.formState);
   const changeLocation = (directory) => {
      console.log("change location")
   }
   let element = props.formState === 'login' ? <Login setFormState={() => setFormState('register')}/>: <Register setFormState={() => setFormState('login')}/>;
   return (
      <span className="form-container">
        <a onClick={changeLocation('/')}> <h1>Jillo</h1> </a>
        {element}
      </span>
   );
};
export default LoginIndex;