/**
 * Leaderboard Component
 * - Time filters: Day, Week, Month, All Time
 * - task filter: All + task categories
 * - Aggregates task points per member and displays ranked list
 */

import { loadSheetData } from "./sheetData.js";
// Data Loading
let sampleTasks = [];
async function getAllData() {
  const data = await loadSheetData();
  //return data;
  console.log(data);
  sampleTasks = data.pointHistory || [];
}
getAllData();
// Main render function
export function renderLeaderboard(root) {
  root.innerHTML = leaderboardHTML();
  initLeaderboard();
}
/* --------------------------
   MARKUP
   -------------------------- */
function leaderboardHTML() {
  return `
    <section class="leaderboard-container container">
      <header class="leaderboard-header">
        <h2>Leaderboard</h2>
        <div class="filters">
          <div class="time-filters" role="tablist">
            <button class="time-btn" data-range="day">Day</button>
            <button class="time-btn" data-range="week">Week</button>
            <button class="time-btn active" data-range="month">Month</button>
            <button class="time-btn" data-range="all">All Time</button>
          </div>
          <select disabled id="category-select" class="category-select mr-5">
            <option value="all">All Categories</option>
            <option value="Job">Job</option>
            <option value="Learning">Learning</option>
            <option value="Contribution">Contribution</option>
          </select>
          <select id="task-select" class="task-select mr-5">
            <option value="all">All Task</option>
            <option value="script">Script</option>
            <option value="Editing">Editing</option>
            <option value="Footage">Footage</option>
            <option value="Voice">Voice</option>
            <option value="Response">Response</option>
          </select>
        </div>
      </header>

      <div id="leaderboard-list" class="leaderboard-list">
        <!-- entries injected here -->
      </div>
    </section>
  `;
}

/* --------------------------
   Initialization & Events
   -------------------------- */
function initLeaderboard() {
  const timeBtns = document.querySelectorAll(".time-btn");
  const taskSelect = document.getElementById("task-select");

  timeBtns.forEach((btn) =>
    btn.addEventListener("click", (e) => {
      timeBtns.forEach((b) => b.classList.remove("active"));
      e.currentTarget.classList.add("active");
      renderList();
    })
  );

  taskSelect.addEventListener("change", () => renderList());

  // initial render
  renderList();
}

/* --------------------------
   Rendering logic
   -------------------------- */
function renderList() {
  const activeRange =
    document.querySelector(".time-btn.active")?.dataset.range || "week";
  const task = document.getElementById("task-select")?.value || "all";

  const filtered = filterTasks(sampleTasks, activeRange, task);
  const aggregated = aggregateByMember(filtered);
  const sorted = aggregated.sort((a, b) => b.point - a.point);

  const container = document.getElementById("leaderboard-list");
  container.innerHTML = sorted.length
    ? sorted.map(renderMemberRow).join("")
    : emptyStateHTML();
}

function emptyStateHTML() {
  return `<div class="empty-state">No results for selected range / task</div>`;
}

function renderMemberRow(member, index) {
  const rank = index + 1;
  const point = member.point;
  const pct = Math.min(
    100,
    Math.round((point / sortedMaxpointPlaceholder()) * 100)
  ); // visual bar
  return `
    <div class="leader-row">
      <div class="rank">#${rank}</div>
      <div class="avatar">${initials(member.name)}</div>
      <div class="member-info">
        <div class="member-name">${escapeHtml(member.name)}</div>
        <div class="member-meta">${member.count} tasks • ${
    member.topTask || "—"
  }</div>
      </div>
      <div class="point">${point}</div>
      <div class="progress-bar"><div class="progress" style="width:${pct}%"></div></div>
    </div>
  `;
}

/* --------------------------
   Data helpers
   -------------------------- */
function filterTasks(tasks, range, task) {
  const now = new Date();
  let start = new Date(0); // epoch for 'all'
  if (range === "day") start = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  if (range === "week")
    start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  if (range === "month")
    start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  return tasks.filter((t) => {
    const td = new Date(t.date);
    const inRange = td >= start && td <= now;
    const intask = task === "all" ? true : t.task.includes(task);
    console.log(task);
    return inRange && intask;
  });
}

function aggregateByMember(tasks) {
  const map = new Map();
  for (const t of tasks) {
    const name = t.assignedTo;
    const entry = map.get(name) || { name, point: 0, count: 0, categories: {} };
    entry.point += Number(t.point) || 0;
    entry.count += 1;
    entry.categories[t.task] = (entry.categories[t.task] || 0) + 1;
    map.set(name, entry);
  }
  const arr = Array.from(map.values()).map((e) => {
    // determine top task for display
    const topTask = Object.keys(e.categories).sort(
      (a, b) => e.categories[b] - e.categories[a]
    )[0];
    return { name: e.name, point: e.point, count: e.count, topTask };
  });
  return arr;
}

/* --------------------------
   Utilities
   -------------------------- */
function initials(name) {
  return name
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function escapeHtml(str) {
  return String(str).replace(
    /[&<>"']/g,
    (m) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[
        m
      ])
  );
}

// placeholder: compute max point for progress calculations
function sortedMaxpointPlaceholder() {
  // compute max from current rendered data to scale bars better
  const list = document.querySelectorAll(
    "#leaderboard-list .leader-row .point"
  );
  let max = 0;
  list.forEach((el) => {
    const v = Number(el.textContent) || 0;
    if (v > max) max = v;
  });
  return max || 1;
}
