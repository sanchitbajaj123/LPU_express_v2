import axios from "axios"

// Function to get data from API
const url="http://localhost:3000"

async function signup(data){
    try{
        const response=await axios.post(url+"/signup",data);
        console.log('API data:', response.data);
        return response.data;
    }catch(error){
        if(error.response.status==400){
            alert("User alraedy exists " + error)
        }
        else{
            alert("Error in signup " + error)
        }
    }
}
export default signup;