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
import { renderAuth } from "./components/auth.js";
//import { renderTaskL ist } from "./components/taskList.js";
import { renderLeaderboard } from "./components/leaderboard.js";

// main app container
const root = document.getElementById("app");

// rename components for easier routing
const routes = {
  home: renderHome,
  auth: renderAuth,
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

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  // Load default page
  navigateTo("home");

  // ========================================
  // PROFILE BUTTON HANDLER (AUTH PAGE)
  // ========================================
  const profileBtn = document.querySelector(".profile-btn");
  if (profileBtn) {
    profileBtn.addEventListener("click", (e) => {
      e.preventDefault();
      navigateTo("auth");
      // Close mobile menu if open
      closeMobileMenu();
    });
  }
  // ========================================
  // NAVIGATION LINK CLICK HANDLERS
  // ========================================
  const allNavLinks = document.querySelectorAll(".nav-links a");
  allNavLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const page = e.target.dataset.page;
      navigateTo(page);

      // Close mobile menu if open
      closeMobileMenu();
    });
  });

  // ========================================
  // MOBILE MENU TOGGLE
  // ========================================
  const navToggle = document.getElementById("navToggle");
  const mobileOverlay = document.getElementById("mobileOverlay");

  // Toggle button click
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      const navbar = document.querySelector(".navbar");
      if (navbar && navbar.classList.contains("nav-open")) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  // Overlay click to close menu
  if (mobileOverlay) {
    mobileOverlay.addEventListener("click", closeMobileMenu);
  }

  // Close menu on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMobileMenu();
    }
  });
});

// ==========================================
// MOBILE MENU FUNCTIONS
// ==========================================
function openMobileMenu() {
  const navbar = document.querySelector(".navbar");
  const overlay = document.getElementById("mobileOverlay");
  const body = document.body;

  if (navbar) navbar.classList.add("nav-open");
  if (overlay) overlay.classList.add("visible");
  body.classList.add("menu-open");
  body.style.overflow = "hidden";
}

function closeMobileMenu() {
  const navbar = document.querySelector(".navbar");
  const overlay = document.getElementById("mobileOverlay");
  const body = document.body;

  if (navbar) navbar.classList.remove("nav-open");
  if (overlay) overlay.classList.remove("visible");
  body.classList.remove("menu-open");
  body.style.overflow = "";
}
