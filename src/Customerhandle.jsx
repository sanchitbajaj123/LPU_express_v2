import React, { useState, useEffect } from "react";
import { checkdelivery } from "./api";


function Checkstatus() {
  const [deliveryDetails, setDeliveryDetails] = useState(null);
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    const fetchDeliveryDetails = async () => {
      try {
        const response = await checkdelivery();
        if (response) {
          setDeliveryDetails({
            name: response.name,
            registrationNumber: response.registrationnumber,
            phoneNumber: response.phonenumber,
            image: response.idcardimg
          });
        }
      } catch (error) {
        console.error("Error fetching delivery details:", error);
      } finally {
        setLoading(false);
      }
    };

    // Fetch details initially
    fetchDeliveryDetails();

    // Set up an interval to fetch details every second
    const intervalId = setInterval(fetchDeliveryDetails, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundImage: 'url("https://image.slidesdocs.com/responsive-images/background/courier-speed-delivery-orange-simple-life-service-poster-powerpoint-background_dbdf628fff__960_540.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: '#fff',
    textAlign: 'center',
    padding: '20px'
  };

  const cardStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    padding: '20px',
    height:'80%',
    margin: '20px',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative'
  };

  const headingStyle = {
    fontSize: '2.5rem',
    margin: '20px 0',
    color: '#ff5722'
  };

  const paragraphStyle = {
    fontSize: '1.2rem',
    margin: '10px 0',
    color: '#333'
  };

  const imageStyle = {
    borderRadius: '8px',
    marginBottom: '20px',
    width: '100%',
    height: '150px',
    objectFit: 'cover'
  };

  const loadingContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const spinnerStyle = {
    width: '48px',
    height: '48px',
    border: '4px solid rgba(0, 0, 0, 0.1)',
    borderTop: '4px solid #ff5722',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '20px 0',
  };

  const disclaimerStyle = {
    position: 'absolute',
    bottom: '0.2px',
    left: '0',
    right: '0',
    padding: '10px',
    backgroundColor: 'rgba(255, 0, 0, 0.2)', 
    color: 'black', 
    fontSize: '0.9rem',
    borderRadius: '8px',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    
  };

  const disclaimerIconStyle = {
    fontSize: '1.2rem',
    color: '#d32f2f',
  };

  return (
    <div style={containerStyle}>
      {loading ? (
        <div style={loadingContainerStyle}>
          <h1 style={headingStyle}>Loading...</h1>
          <p style={paragraphStyle}>Waiting for your parcel to be accepted</p>
          <div style={spinnerStyle}></div>
          <style>
            {`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}
          </style>
        </div>
      ) : (
        <>
        <div style={cardStyle}>
          <img src={deliveryDetails.image} alt="Delivery Person" style={imageStyle} />
          <h1 style={headingStyle}>Delivery Person Details</h1>
          <p style={paragraphStyle}><strong>Name:</strong> {deliveryDetails.name}</p>
          <p style={paragraphStyle}><strong>Registration Number:</strong> {deliveryDetails.registrationNumber}</p>
          <p style={paragraphStyle}><strong>Phone Number:</strong> {deliveryDetails.phoneNumber}</p>
          <div style={disclaimerStyle}>
            <i className="material-icons" style={disclaimerIconStyle}>warning</i>
            <span>Rest you should have to contact delivery person and we don't take any responsibility</span>
          </div>       
       
        </div>

        </>
        
      )}
    </div>
  );
}

export default Checkstatus;
