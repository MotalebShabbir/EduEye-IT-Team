/*// Import Firebase
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

// ==========================================
// SPA ROUTER & VIEWS
// ==========================================

// Componaents import
import { renderHome } from "./components/home.js";
import { renderAddTask } from "./components/Task.js";
//import { renderTaskList } from "./components/taskList.js";
import { renderLeaderboard } from "./components/leaderboard.js";

// main app container
const root = document.getElementById("app");

// rename components for easier routing
const routes = {
  home: renderHome,
  task: renderAddTask,
  //"task-list": renderTaskList,
  leaderboard: renderLeaderboard,
};

//  navigation function
export function navigateTo(pageName) {
  // opening certain page or default to home page
  const renderFunction = routes[pageName] || routes["home"];

  // main section load
  root.innerHTML = ""; // Clean slate
  renderFunction(root); // Load new page

  // update menu color
  updateActiveMenu(pageName);
}

// Menue highlight function
function updateActiveMenu(pageName) {
  document.querySelectorAll(".nav-links a").forEach((link) => {
    if (link.dataset.page === pageName) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// globally listen for navigation events
document.addEventListener("DOMContentLoaded", () => {
  // Load default page
  navigateTo("leaderboard");

  // Handle menu link clicks
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const page = e.target.dataset.page;
      navigateTo(page);
    });
  });
});
