import React, { useState } from 'react';
import logo from './assets/logo.png';
import { customerRegister } from './api';
import { ToastContainer} from 'react-toastify';
import { useNavigate } from 'react-router-dom';
function Customer() {
  const navigate = useNavigate();
  const [parcelname, setParcelName] = useState('');
  const [deliverycompany, setDeliveryCompany] = useState('');
  const [fare, setFare] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    const retrievedObject = localStorage.getItem('userData');  
    const userData = JSON.parse(retrievedObject);  
    const rn=userData.registrationnumber;
    const data = {
      registrationnumber: rn,
      parcelname,
      deliverycompany,
      fare,
      location
    };
    console.log(data);
    const res=await customerRegister(data)
    console.log(res);
  }

  return (
    <div className="valign-wrapper" style={{ "height": '100vh' ,"overflow":'hidden'}}>
      <div className="container">
        <div className="row">
          <div className="col s12 m8 offset-m2">
            <div className="card-panel"> 
              <h4 className="center-align" style={{color:'#ff8a00'}}>
              <h4 className="head" style={{ color: '#ff8a00' }}>
            <img src={logo} height="150px" width="300px" alt="Logo" />
            </h4> <b> 
                Parcel Information</b></h4>
              <form onSubmit={handleSubmit}>
                <div className="input-field">
                  <input
                    id="parcelName"
                    type="text"
                    className="validate"
                    value={parcelname}
                    onChange={(e) => setParcelName(e.target.value)}
                    required
                  />
                  <label htmlFor="parcelName">Parcel Name</label>
                </div>
                <div className="input-field">
                  <input
                    id="deliveryCompany"
                    type="text"
                    className="validate"
                    value={deliverycompany}
                    onChange={(e) => setDeliveryCompany(e.target.value)}
                    required
                  />
                  <label htmlFor="deliveryCompany">Delivery Company</label>
                </div>
                <div className="input-field">
                  <input
                    id="fare"
                    type="number"
                    className="validate"
                    value={fare}
                    onChange={(e) => setFare(e.target.value)}
                    step="0.01"
                    min="0"
                    required
                  />
                  <label htmlFor="fare">Fare (e.g., 15.99)</label>
                </div>
                <div className="input-field">
                  <input
                    id="location"
                    type="text"
                    className="validate"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                  <label htmlFor="location">Location</label>
                </div>
                <div className="center-align">
                  <button className="btn waves-effect waves-light btn-large" type="submit" name="action">
                    Submit
                    <i className="material-icons right">send</i>
                  </button>
                </div>
              </form>
              
              <div className="center-align">
              <button className="btn waves-effect  btn-small" style={{"margin-top": "10px"}} onClick={(e)=>{
                navigate('/checkstatus')
              }}>
                    Check status
                  </button>
                  </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Customer;
