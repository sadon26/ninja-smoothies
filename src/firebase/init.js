import firebase from 'firebase';
import 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCnUNPUl9akEWqg8V0srKcuiUUSCTJ-bwU',
  authDomain: 'ninja-smoothies-app-4628f.firebaseapp.com',
  databaseURL: 'https://ninja-smoothies-app-4628f.firebaseio.com',
  projectId: 'ninja-smoothies-app-4628f',
  storageBucket: 'ninja-smoothies-app-4628f.appspot.com',
  messagingSenderId: '869283611454',
  appId: '1:869283611454:web:64b625960ee4eb57fce26f',
  measurementId: 'G-43PW4KYVDM',
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Export firestore database
export default firebaseApp.firestore();
