/**
 * Home Component
 * Displays welcome message, quick stats, and navigation cards
 */

export function renderHome(root) {
  const homeHTML = `
    <div class="home-container">
      <!-- Welcome Section -->
      <section class="welcome-section">
        <div class="welcome-content">
          <h1>Welcome to EduEye IT Team</h1>
          <p>Manage tasks, track progress, and collaborate with your team</p>
        </div>
      </section>

      <!-- Quick Stats -->
      <section class="stats-section">
        <div class="stat-card">
          <div class="stat-icon">📋</div>
          <h3>Total Tasks</h3>
          <p class="stat-number" id="total-tasks">0</p>
        </div>
        <div class="stat-card">
          <div class="stat-icon">✅</div>
          <h3>Completed</h3>
          <p class="stat-number" id="completed-tasks">0</p>
        </div>
        <div class="stat-card">
          <div class="stat-icon">⏳</div>
          <h3>Pending</h3>
          <p class="stat-number" id="pending-tasks">0</p>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🏆</div>
          <h3>Team Members</h3>
          <p class="stat-number" id="team-members">5</p>
        </div>
      </section>

      <!-- Quick Actions -->
      <section class="actions-section">
        <h2>Quick Actions</h2>
        <div class="action-buttons">
          <button class="action-btn action-btn-primary" data-action="add-task">
            <span class="action-icon">➕</span>
            <span>Add New Task</span>
          </button>
          <button class="action-btn action-btn-secondary" data-action="view-tasks">
            <span class="action-icon">📝</span>
            <span>View Tasks</span>
          </button>
          <button class="action-btn action-btn-tertiary" data-action="leaderboard">
            <span class="action-icon">🎯</span>
            <span>Leaderboard</span>
          </button>
        </div>
      </section>

      <!-- Recent Activity -->
      <section class="activity-section">
        <h2>Recent Activity</h2>
        <div class="activity-list" id="activity-list">
          <div class="activity-item">
            <div class="activity-avatar">👤</div>
            <div class="activity-content">
              <p class="activity-text">No recent activity yet</p>
              <span class="activity-time">Get started by adding a task</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;

  root.innerHTML = homeHTML;

  // Attach event listeners
  attachHomeEventListeners();
}

/**
 * Attach event listeners for home page interactions
 */
function attachHomeEventListeners() {
  const actionButtons = document.querySelectorAll(".action-btn");

  actionButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const action = e.currentTarget.dataset.action;
      handleActionClick(action);
    });
  });
}

/**
 * Handle action button clicks
 */
function handleActionClick(action) {
  // Import navigateTo from app.js
  const { navigateTo } = window;

  switch (action) {
    case "add-task":
      // Navigate to add-task page
      if (window.navigateTo) {
        window.navigateTo("add-task");
      }
      break;
    case "view-tasks":
      // Navigate to task-list page
      if (window.navigateTo) {
        window.navigateTo("task-list");
      }
      break;
    case "leaderboard":
      // Navigate to leaderboard page
      if (window.navigateTo) {
        window.navigateTo("leaderboard");
      }
      break;
    default:
      console.log("Unknown action:", action);
  }
}

/**
 * Update home page stats (can be called with data from Firebase)
 */
export function updateHomeStats(stats) {
  const totalTasksEl = document.getElementById("total-tasks");
  const completedTasksEl = document.getElementById("completed-tasks");
  const pendingTasksEl = document.getElementById("pending-tasks");
  const teamMembersEl = document.getElementById("team-members");

  if (totalTasksEl) totalTasksEl.textContent = stats.total || 0;
  if (completedTasksEl) completedTasksEl.textContent = stats.completed || 0;
  if (pendingTasksEl) pendingTasksEl.textContent = stats.pending || 0;
  if (teamMembersEl) teamMembersEl.textContent = stats.teamMembers || 5;
}
