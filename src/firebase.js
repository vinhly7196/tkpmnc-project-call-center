// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyABEv32RcmTqnMhvlt9nIG0i5Vdtv0TRVI",
//   authDomain: "test-ms-495bc.firebaseapp.com",
//   projectId: "test-ms-495bc",
//   storageBucket: "test-ms-495bc.appspot.com",
//   messagingSenderId: "662644704750",
//   appId: "1:662644704750:web:a5ecdf4f84a1a823bf7aff"
// };

const firebaseConfig = {
  apiKey: "AIzaSyAq47Iwt9103ki3RGuOqH6Oy__AWoTRKUw",
  authDomain: "uber-ola-and-indrive-clo-2b5a0.firebaseapp.com",
  databaseURL: "https://uber-ola-and-indrive-clo-2b5a0-default-rtdb.firebaseio.com",
  projectId: "uber-ola-and-indrive-clo-2b5a0",
  storageBucket: "uber-ola-and-indrive-clo-2b5a0.appspot.com",
  messagingSenderId: "1028505396962",
  appId: "1:1028505396962:web:18067bfbb5634b3fd720bb",
  measurementId: "G-43EWBHJP25"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const generateToken = async () => {
    // const token = await getToken(messaging, {vapidKey: "BKxCGjBcQwvXVYv4N2qailiaSrBE7yBJV6r405_RcTgBtIExhyNKnOioPQxFnNUXJsE-Gd8dAGjAjQE21m9CHQ4"});
    const token = await getToken(messaging, {vapidKey: "BHt0CiVsiWqkzEJkWZD91LHL5FSSpVuNTG6n2N2oTbFWCfZI8newmyJNKWvF5hqcgEKi5zoU2kfO4LlkdvhoZao"});
    
    console.log(token)
}