import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';

const firebaseConfig = {
    apiKey: "AIzaSyBDLAIeYvDsIiX4DsYlRKoRMVJTkfwbJC8",
    authDomain: "foodapp-ad57c.firebaseapp.com",
    projectId: "foodapp-ad57c",
    storageBucket: "foodapp-ad57c.appspot.com",
    messagingSenderId: "998754078859",
    appId: "1:998754078859:web:e3e24e1f5aca9724f3048e"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore;  
  export default db;

// if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig);
// }

 export {firebase};

