import axios from "axios"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const url="http://localhost:3000"

async function signup(data){
    try{
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
export default signup;