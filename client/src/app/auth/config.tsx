import firebase from 'firebase/compat/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDAf98ET4naiHNKMgn1o059JB5YVk0RDQI",
    authDomain: "studionest-bc9f5.firebaseapp.com",
    projectId: "studionest-bc9f5",
    storageBucket: "studionest-bc9f5.appspot.com",
    messagingSenderId: "897754948672",
    appId: "1:897754948672:web:363c9c4e2746b0f5e2aba5",
    measurementId: "G-6BTJVFDEYK"
    };


export default function initFirebase() {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }
