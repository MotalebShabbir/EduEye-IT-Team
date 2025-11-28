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

// ==========================================
// SPA ROUTER & VIEWS
// ==========================================

const root = document.getElementById("app");
const navLinks = document.querySelectorAll(".nav-links a");

// --- View 1: Home Page ---
function renderHome() {
  root.innerHTML = `
        <div class="form-card" style="text-align: center;">
            <h1 class="page-title">Welcome to EduEye IT Team</h1>
            <p>This is a Serverless Single Page Application (SPA).</p>
            <br>
            <i class="fas fa-code fa-3x" style="color: #3498db;"></i>
            <br><br>
            <p>Select <b>"Add Task"</b> to submit your contribution.</p>
            <p>Select <b>"Task List"</b> to see team progress.</p>
        </div>
    `;
}

// --- View 2: Add Task Form ---
function renderAddTask() {
  root.innerHTML = `
        <div class="form-card">
            <h2 class="page-title">Submit Your Contribution</h2>
            <form id="taskForm">
                <div class="form-group">
                    <label>Contributor Name</label>
                    <input type="text" id="name" placeholder="Enter your name" required>
                </div>
                <div class="form-group">
                    <label>Task Title</label>
                    <input type="text" id="task" placeholder="What did you do?" required>
                </div>
                <div class="form-group">
                    <label>GitHub/Resource Link</label>
                    <input type="url" id="link" placeholder="https://github.com/..." required>
                </div>
                <button type="submit" class="btn-primary">Submit Task</button>
            </form>
        </div>
    `;

  // Attach Event Listener for Form Submission
  document
    .getElementById("taskForm")
    .addEventListener("submit", handleFormSubmit);
}

// Handle Form Submission Logic
async function handleFormSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector("button");
  const originalText = btn.innerText;
  btn.innerText = "Saving...";
  btn.disabled = true;

  const name = document.getElementById("name").value;
  const task = document.getElementById("task").value;
  const link = document.getElementById("link").value;

  try {
    await addDoc(collection(db, "contributions"), {
      name: name,
      task: task,
      link: link,
      status: "Pending", // Default status
      timestamp: new Date(),
    });
    alert("Task submitted successfully!");
    navigateTo("task-list"); // Auto redirect to list page
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to save data.");
    btn.innerText = originalText;
    btn.disabled = false;
  }
}

// --- View 3: Task List (Fetch from Firebase) ---
async function renderTaskList() {
  root.innerHTML = `
        <h2 class="page-title">Team Contributions</h2>
        <div style="overflow-x:auto;">
            <table class="task-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Task</th>
                        <th>Link</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody id="tableBody">
                    <tr><td colspan="4" style="text-align:center;">Loading data...</td></tr>
                </tbody>
            </table>
        </div>
    `;

  // Fetch Data
  const q = query(
    collection(db, "contributions"),
    orderBy("timestamp", "desc")
  );
  const querySnapshot = await getDocs(q);
  const tbody = document.getElementById("tableBody");

  tbody.innerHTML = ""; // Clear loading message

  if (querySnapshot.empty) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;">No tasks found.</td></tr>`;
    return;
  }

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const row = `
            <tr>
                <td>${data.name}</td>
                <td>${data.task}</td>
                <td><a href="${
                  data.link
                }" target="_blank" style="color:#3498db;">View</a></td>
                <td><span class="${
                  data.status === "Done" ? "status-done" : "status-pending"
                }">${data.status}</span></td>
            </tr>
        `;
    tbody.innerHTML += row;
  });
}

// ==========================================
// ROUTER LOGIC
// ==========================================

function navigateTo(page) {
  // 1. Update Active Link UI
  navLinks.forEach((link) => {
    if (link.dataset.page === page) link.classList.add("active");
    else link.classList.remove("active");
  });

  // 2. Render Content based on page name
  if (page === "home") renderHome();
  else if (page === "add-task") renderAddTask();
  else if (page === "task-list") renderTaskList();
}

// Handle Navigation Clicks
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const page = e.target.dataset.page;
    navigateTo(page);
  });
});

// Initialize App (Load Home Page by default)
navigateTo("home");
