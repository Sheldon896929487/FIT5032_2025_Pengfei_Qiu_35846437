
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";  

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCefuH-LZv7XSjwiZUDBNAl0eX7PQLqvBM",
    authDomain: "fit5032-lab7-f25eb.firebaseapp.com",
    projectId: "fit5032-lab7-f25eb",
    storageBucket: "fit5032-lab7-f25eb.firebasestorage.app",
    messagingSenderId: "95748904370",
    appId: "1:95748904370:web:ac8b6c5774342cdfa780ab"
  };

initializeApp(firebaseConfig);
const db = getFirestore();  // 红色高亮
export default db;