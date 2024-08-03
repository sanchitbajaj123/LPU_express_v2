
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyCULLiCPGGoMZfskfIwg7_7E4qNumhzto4",
    authDomain: "lpu-express.firebaseapp.com",
    projectId: "lpu-express",
    storageBucket: "lpu-express.appspot.com",
    messagingSenderId: "165324988161",
    appId: "1:165324988161:web:7f7e851a7146a8b6ed4500",
    measurementId: "G-BLS4JPN5XB"
  };


const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
console.log(storage)

export { storage, app };
