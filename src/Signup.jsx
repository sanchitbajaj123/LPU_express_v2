import React from "react";

import logo from './assets/logo.png';

function Signup() {
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
                                    <input id="name" type="text" className="validate" required />
                                    <label htmlFor="name">Name</label>
                                </div>
                                <div className="input-field">
                                    <input id="rn" type="number" className="validate" required />
                                    <label htmlFor="rn">Registration Number</label>
                                </div>
                                <div className="input-field">
                                    <input id="phone" type="tel" className="validate" required />
                                    <label htmlFor="phone">Phone Number</label>
                                </div>
                                <div className="input-field">
                                    <input id="password" type="password" className="validate" required />
                                    <label htmlFor="password">Password</label>
                                </div>
                                <div className="file-field input-field">
                                    <div className="btn">
                                        <span>Upload ID Card Picture</span>
                                        <input type="file" id="id_card_picture" accept="image/*" required />
                                    </div>
                                    <div className="file-path-wrapper">
                                        <input className="file-path validate" type="text" placeholder="Upload file" />
                                    </div>
                                </div>
                                <div className="center-align">
                                    <button className="btn waves-effect waves-light btn-large" type="submit" name="action">
                                        Sign Up   
                                        <i className="material-icons right">send</i>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
