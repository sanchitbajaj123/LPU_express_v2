import axios from "axios"

// Function to get data from API
const url="http://localhost:3000"

async function signup(data){
    try{
        const response=await axios.post(url+"/signup",{data});
        console.log('API data:', response.data);
        return response.data;
    }catch(error){
        alert(error)
    }
}
export default signup;