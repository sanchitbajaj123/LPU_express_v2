import React from 'react';
import { useState,useEffect } from 'react';

function Home(){
  const [name, setName] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [img, setImg] = useState('');
  const [ph,setPh] = useState('');

  useEffect(() => {
    const retrievedObject = localStorage.getItem('userData');
    if (retrievedObject) {
      const userData = JSON.parse(retrievedObject);
      setName(userData.name);
      setRegistrationNumber(userData.registrationnumber);
      setImg(userData.idcardimg);
      setPh(userData.phonenumber);
    }
  }, []);
  const imageStyle = {
    width: '100%',        
    height: 'auto',       
    maxHeight: '300px',   
    objectFit: 'cover'   
  };
    return(
        <div className='valign-wrapper home'>
  <div className="card">
    <div className="card-image waves-effect waves-block waves-light">
      <img src={img} alt="Placeholder" style={imageStyle}/>
    </div>
    <div className="card-content">
      <span className="card-title activator grey-text text-darken-4">WHO ARE YOU?<i className="material-icons right">more_vert</i></span>
    </div>
    <div className="card-reveal">
      <span className="card-title grey-text text-darken-4">User details<i className="material-icons right">close</i></span>
      <p><strong>NAME: </strong>{name}</p>
      <p><strong>REGISTRATION NUMBER: </strong>{registrationNumber}</p>
      <p><strong>PHONE NUMBER: </strong>{ph}</p>
    </div>
  </div>            
  <div className="card-action">
      <a className='onel' href="/c">DELIVERY-PERSON</a>
      <a  className='twol' href="/d">CUSTOMER</a>
    </div>
        </div>
    
    )

}

export default Home;