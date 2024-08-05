import axios from "axios"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const url="https://lpu-express-backend.onrender.com"

async function signup(data){
    try{
        console.log(data);
        const response=await axios.post(url+"/signup",data);
        console.log('API data:', response.data);
        toast.success('Signup successful! You can now login.')
        return response.data;
    }catch(error){
        if(error.response.status===400){
            toast.error('User already exists')
        }
        else{
            alert(error);
        }
    }
}

async function login(data){
    try{
        const response=await axios.post(url+"/login",data);
        console.log('API data:', response.data);
        localStorage.setItem('userData', JSON.stringify(response.data));
        return response.data;
    }catch(error){
        console.log(error.response);
        if(error.response.status===401){
            toast.error('Incorrect password')
        } 
        else{
            toast.error('Invalid registration number')
        }
    }
}
async function customerRegister(data){
    try{
        console.log(data);
        const response=await axios.post(url+"/customeradd",data);
        console.log('API data:', response.data);
        toast.success('Parcel added successfully')
        return response.data;
    }
    catch(error){
        toast.error(error.response.data.message);
    }
}
async function cuslist(){
    try{
        const response=await axios.get(url+"/customerlist");
        console.log('API data:', response.data);
        return response.data;
    }
    catch(error){
        console.log(error.response);
        alert(error);
    }
}
async function parcels(data){
try{
const response = await axios.post(url+"/parcelservice",data);
    console.log('API data:', response.data);
    toast.success('Parcel added to delivery list!')
    return response.data;
}
catch(error){
    console.log(error.response);
    alert(error);
}
}
async function deliverylist(){
    try{
        const retrievedObject = localStorage.getItem('userData');
        const user = JSON.parse(retrievedObject);
        const userregistrationumber=user.registrationnumber;
        const data={registrationnumber:userregistrationumber}
        console.log(data);
        const response=await axios.post(url+"/deliverylist",data);
        console.log('API data:', response.data);
        return response.data;
    }
    catch(error){
        console.log(error.response);
        alert(error);
    }
}
 async function cusdel(regno){
    const data={
        registrationnumber:regno
    }
    const response = await axios.post(url+'/cusdel',data);
    console.log('API data:', response.data);
    toast.success('Thanks for using our platform')
 }
 async function checkdelivery(){
    try{
        console.log('Checking delivery')
        const retrievedObject = localStorage.getItem('userData');
        console.log(1)
        const user = JSON.parse(retrievedObject);
        console.log(2)
        const userregistrationumber=user.registrationnumber;
        console.log(3)
        const data={registrationnumber:userregistrationumber}
        console.log(4)
        const response=await axios.post(url+"/checkdelivery",data);
        console.log(5)
        if(response.data){
            console.log(response)
            return response.data
        }
    }
    catch(error){
        console.log(error.response);
        alert("pls first request a parcel delivery "+error);
        

    }
 }

export { 
signup, login,customerRegister,cuslist,parcels,deliverylist,cusdel,checkdelivery
};
