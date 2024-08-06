import React, { useState, useEffect } from "react";
import { deliverylist,cusdel } from "./api";
import { ToastContainer } from 'react-toastify';

function DeliveryServicelist() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

const handleSubmit=async(regno)=>{
        const response=await cusdel(regno)
        console.log(response);
}

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await deliverylist();
        
        
        const customerArray = Object.values(data);
        
        console.log(customerArray);
        setCustomers(customerArray);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching customer data:", error);
        setError('Error fetching customer data.');
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []); 

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (customers.length === 0) return <div>No customers available.</div>;

  return (
    <div className='valign-wrapper home'>
      <h1
        style={{
          background: 'linear-gradient(135deg, #ff8a00, #ffcc00)',
          color: '#fff',
          padding: '20px',
          borderRadius: '10px',
          textAlign: 'center',
          fontFamily: 'Arial, sans-serif',
          fontSize: '2.5rem',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        }}
      >
        <b>Selected parcel list </b>
      </h1>
      <div className="container-list">
        {customers.map((customer) => (
          <div key={customer._id} className="card dc">
            <img className="card-image dcm" src={customer.idcardimg} alt={`ID card of ${customer.name}`} />
            <div className="card-content dcc">
              <p><strong>Name: </strong>{customer.name}</p>
              <p><strong>Registration Number:</strong> {customer.registrationnumber}</p>
              <p><strong>Phone Number:</strong> {customer.phonenumber}</p>
              <p><strong>Parcel Name:</strong> {customer.parcelname}</p>
              <p><strong>Delivery Company:</strong> {customer.deliverycompany}</p>
              <p><strong>Fare:</strong> {customer.fare}</p>
              <p><strong>Location:</strong> {customer.location}</p>
              <button onClick={() => handleSubmit(customer.registrationnumber)}>DELIVERED</button>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer/>
    </div>
  );
}

export default DeliveryServicelist;
