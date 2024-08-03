import React, { useState } from "react";
import logo from './assets/logo.png';
import { ToastContainer, toast } from 'react-toastify';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase'; 
import signup from "./api";
import { useNavigate } from "react-router-dom";

function Signup() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [registrationnumber, setRegistrationnumber] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [password, setPassword] = useState('');
    const [idcardimg, setIdCardPicture] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setIdCardPicture(reader.result); // This will be a data URL
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!idcardimg) {
            toast.error('Please upload an ID card image.');
            return;
        }
        toast.info(' processing your request...');
        try {
            const storageRef = ref(storage, `idcard_images/${Date.now()}.png`);
            const uploadResult = await uploadString(storageRef, idcardimg, 'data_url');
            const downloadURL = await getDownloadURL(uploadResult.ref);

            const data = {
                name,
                registrationnumber,
                phonenumber,
                password,
                idcardimg: downloadURL,
            };

           
            const response = await signup(data);
            
            console.log('Signup success:', response);
            toast.dismiss()
            toast.success('Signup successful!');
            if (response) {
                alert('Acount created successfully!');
                navigate('/');
            }
        } catch (error) {
            toast.dismiss()
            if(error.response.code===400){
                toast.error(error.response)

            }
            console.error('Error uploading file:', error);
            toast.error(error)
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
                            <form id="form" onSubmit={handleSubmit} onKeyDown={
                                (e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        handleSubmit(e);
                                    }
                                }
                            }>
                                <div className="input-field">
                                    <input id="name" type="text" className="validate" required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <label htmlFor="name">Name</label>
                                </div>
                                <div className="input-field">
                                    <input id="rn" type="number" className="validate" required
                                        value={registrationnumber}
                                        onChange={(e) => setRegistrationnumber(e.target.value)}
                                    />
                                    <label htmlFor="rn">Registration Number</label>
                                </div>
                                <div className="input-field">
                                    <input id="phone" type="number" className="validate" required
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
                                            onChange={handleFileChange}
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
            <ToastContainer />
        </div>
    );
}

export default Signup;
