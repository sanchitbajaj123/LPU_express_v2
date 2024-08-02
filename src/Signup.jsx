import React, { useState } from "react";
import logo from './assets/logo.png';
import signup from "./api"; // Import the signup function from api.js
import { json } from "react-router-dom";

function Signup() {
    const [name, setName] = useState('');
    const [registrationnumber, setRegistrationnumber] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [password, setPassword] = useState('');
    const [idcardimg, setIdCardPicture] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const data = {
            name,
            registrationnumber,
            phonenumber,
            password,
            idcardimg
        };
        
        try {
            const response = await signup(data);
            console.log('Signup success:', response);
            alert(JSON.stringify(response));
        } catch (error) {
            alert("error came"+error)
        }
    };

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
                                    <input id="name" type="text" className="validate" required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <label htmlFor="name">Name</label>
                                </div>
                                <div className="input-field">
                                    <input id="rn" type="text" className="validate" required
                                        value={registrationnumber}
                                        onChange={(e) => setRegistrationnumber(e.target.value)}
                                    />
                                    <label htmlFor="rn">Registration Number</label>
                                </div>
                                <div className="input-field">
                                    <input id="phone" type="tel" className="validate" required
                                        value={phonenumber}
                                        onChange={(e) => setPhonenumber(e.target.value)}
                                    />
                                    <label htmlFor="phone">Phone Number</label>
                                </div>
                                <div className="input-field">
                                    <input id="password" type="password" className="validate" required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <label htmlFor="password">Password</label>
                                </div>
                                <div className="file-field input-field">
                                    <div className="btn">
                                        <span>Upload ID Card Picture</span>
                                        <input type="file" id="id_card_picture" accept="image/*" required
                                            onChange={(e)=> setIdCardPicture(e.target.value)}
                                        />
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
