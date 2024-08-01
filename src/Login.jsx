// src/LoginForm.js
import React from 'react';

import logo from './assets/logo.png';

const LoginForm = () => {
  return (
    <div className="valign-wrapper" style={{ height: '100vh' }}>
      <div className="container">
        <div className="row">
          <div className="col s12 m8 offset-m2">
            <div className="card-panel center-align">
              <h4 className="head" style={{ color: '#ff8a00' }}>
                <img src={logo} height="150px" width="300px" alt="Logo" />
              </h4>
              <form id="form">
                <div className="input-field">
                  <input id="rn" type="number" className="validate" required />
                  <label htmlFor="rn">Registration number</label>
                </div>
                <div className="input-field">
                  <input id="login_password" type="password" className="validate" required />
                  <label htmlFor="login_password">Password</label>
                </div>
                <div className="center-align">
                  <button className="btn waves-effect waves-light btn-large" type="submit" name="action">
                    Login
                    <i className="material-icons right">send</i>
                  </button>
                </div>
              </form>
              <p className="center-align">
                Don't have an account? <a href="/signup">Sign up</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
