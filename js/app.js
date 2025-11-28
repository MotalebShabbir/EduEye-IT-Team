// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Configaration
const firebaseConfig = {
  apiKey: "AIzaSyCRMv86DqW9x6xwSC51c-GnzUVYt-Rvvnk",
  authDomain: "edueye-it-team.firebaseapp.com",
  projectId: "edueye-it-team",
  storageBucket: "edueye-it-team.firebasestorage.app",
  messagingSenderId: "170559915414",
  appId: "1:170559915414:web:47195fee655e1f69d809b7",
};
// Open app and Database
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// connection test
//.log("Firebase App Initialized:", app);
//console.log("Firestore Database Connected:", db);

/*try {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    
    // If connected, this alert will appear
    alert("Firebase Connected Successfully!"); 
} catch (error) {
    // If there is an issue, this alert will appear
    alert("Connection Failed: " + error.message);
}*/
