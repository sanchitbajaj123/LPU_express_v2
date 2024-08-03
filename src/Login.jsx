// src/LoginForm.js
import React from 'react';
import {login} from './api'
import logo from './assets/logo.png';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const LoginForm = () => {
  const navigate = useNavigate();
  const [registrationnumber, setRegistrationnumber] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    try{
    e.preventDefault();
    const data={
      registrationnumber,
      password
    }
    console.log(data);
    const response=login(data)
    if(response){

      console.log(response)
      toast.dismiss()
      toast.success('login succesfully!', {
        onClose: () => navigate('/home')
      });
    }}
    catch(e){
      console.log(e);
      alert(e.message);
    }

  }
  return (
    <div className="valign-wrapper" style={{ height: '100vh' }}>
      <div className="container">
        <div className="row">
          <div className="col s12 m8 offset-m2">
            <div className="card-panel center-align">
              <h4 className="head" style={{ color: '#ff8a00' }}>
                <img src={logo} height="150px" width="300px" alt="Logo" />
              </h4>
              <form id="form" onSubmit={handleSubmit}>
                <div className="input-field">
                  <input id="rn" type="number" className="validate" value={registrationnumber} onChange={(e)=>{
                    setRegistrationnumber(e.target.value)
                  }} required />
                  <label htmlFor="rn">Registration number</label>
                </div>
                <div className="input-field">
                  <input id="login_password" type="password" className="validate" value={password} onChange={(e)=>{
                    setPassword(e.target.value)
                  }} required />
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
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
