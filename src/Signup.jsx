import React, { useState } from "react";
import logo from './assets/logo.png';
import { ToastContainer, toast } from 'react-toastify';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase'; 
import { signup } from "./api";
import { useNavigate } from "react-router-dom";

function Signup() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [registrationnumber, setRegistrationnumber] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [password, setPassword] = useState('');
    const [idcardimg, setIdCardPicture] = useState(null);
    const [loading, setLoading] = useState(false); // Loading state

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const img = new Image();
                img.onload = () => {
                    const targetWidth = 277 * 300 / 25.4; // Convert mm to pixels for 300 dpi
                    const targetHeight = 207 * 300 / 25.4; // Convert mm to pixels for 300 dpi
    
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.width = targetWidth;
                    canvas.height = targetHeight;
    
                    ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
                    const resizedImage = canvas.toDataURL('image/png');
                    setIdCardPicture(resizedImage); // This will be a data URL
                };
                img.src = reader.result;
            };
            reader.readAsDataURL(file);
            console.log(reader)
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!name.trim()){
            toast.error('Please enter name.')
            return;
        }
        if(phonenumber.length!==10){
            toast.error('Please enter correct phone numebr.')
            return;
        }
        if (!idcardimg) {
            toast.error('Please upload an ID card image.');
            return;
        }

        setLoading(true); // Disable button

        toast.info('Processing your request...');
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
            if (response) {
                alert('Account created successfully!');
                navigate('/');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            toast.error('Error during signup. Please try again.');
        } finally {
            setLoading(false); // Re-enable button
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
                                    <button 
                                        className="btn waves-effect waves-light btn-large" 
                                        type="submit" 
                                        name="action"
                                        disabled={loading} // Disable button when loading
                                    >
                                        {loading ? 'Processing...' : 'Sign Up'}   
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
