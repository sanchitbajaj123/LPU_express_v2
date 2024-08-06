import React, { useState, useEffect } from "react";
import { cuslist,parcels } from "./api";
import { ToastContainer } from 'react-toastify';

function DeliveryService() {
  const [customers, setCustomers] = useState([]);

  const parcel=async (val)=>{
    const retrievedObject = localStorage.getItem('userData');
    const user = JSON.parse(retrievedObject);
    const userregistrationumber=user.registrationnumber;
    const customerregistrationnumber=val;
    const data={
        userregistrationumber,customerregistrationnumber
    }
    const res=await parcels(data);
    console.log(res);
  }
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const cus = await cuslist();
        console.log(cus);
        setCustomers(cus);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    fetchCustomers();
    const intervalId = setInterval(() => {
        fetchCustomers();
      }, 1000);
    return () => clearInterval(intervalId);
  }, []); 

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
        <b>Customer List <br /> <a href="/selectedparcels">view selected parcels</a></b>
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
              <button onClick={() => parcel(customer.registrationnumber)}>accept</button>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer/>
    </div>
  );
}

export default DeliveryService;
