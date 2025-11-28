/**
 * Leaderboard Component
 * - Time filters: Day, Week, Month, All Time
 * - Category filter: All + task categories
 * - Aggregates task scores per member and displays ranked list
 */

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
            <button class="time-btn active" data-range="day">Day</button>
            <button class="time-btn" data-range="week">Week</button>
            <button class="time-btn" data-range="month">Month</button>
            <button class="time-btn" data-range="all">All Time</button>
          </div>
          <select id="category-select" class="category-select mr-5">
            <option value="all">All Categories</option>
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
   SAMPLE DATA (replace with real data)
   -------------------------- */
const sampleTasks = [
  // date in ISO format

  {
    id: 4,
    title: "Research new auth flow",
    category: ["Editing", "Footage"],
    assignedTo: "Ahsan",
    score: 25,
    date: daysAgoISO(5),
  },
  {
    id: 5,
    title: "Refactor dashboard",
    category: ["Footage"],
    assignedTo: "Mizan",
    score: 15,
    date: daysAgoISO(1),
  },
  {
    id: 6,
    title: "Critical Footage fix",
    category: ["Footage", "Editing"],
    assignedTo: "Imran",
    score: 40,
    date: daysAgoISO(0),
  },
  {
    id: 7,
    title: "Update README",
    category: ["Footage", "Response", "Editing"],
    assignedTo: "Sabbir",
    score: 5,
    date: daysAgoISO(20),
  },
  {
    id: 8,
    title: "Optimize queries",
    category: ["Editing", "Voice"],
    assignedTo: "Mazed",
    score: 30,
    date: daysAgoISO(7),
  },
  {
    id: 8,
    title: "Optimize queries",
    category: ["Footage"],
    assignedTo: "Habib",
    score: 30,
    date: daysAgoISO(7),
  },

  {
    id: 8,
    title: "Optimize queries",
    category: ["Footage"],
    assignedTo: "Huzaifa",
    score: 30,
    date: daysAgoISO(7),
  },
];

function daysAgoISO(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

/* --------------------------
   Initialization & Events
   -------------------------- */
function initLeaderboard() {
  const timeBtns = document.querySelectorAll(".time-btn");
  const categorySelect = document.getElementById("category-select");

  timeBtns.forEach((btn) =>
    btn.addEventListener("click", (e) => {
      timeBtns.forEach((b) => b.classList.remove("active"));
      e.currentTarget.classList.add("active");
      renderList();
    })
  );

  categorySelect.addEventListener("change", () => renderList());

  // initial render
  renderList();
}

/* --------------------------
   Rendering logic
   -------------------------- */
function renderList() {
  const activeRange =
    document.querySelector(".time-btn.active")?.dataset.range || "day";
  const category = document.getElementById("category-select")?.value || "all";

  const filtered = filterTasks(sampleTasks, activeRange, category);
  const aggregated = aggregateByMember(filtered);
  const sorted = aggregated.sort((a, b) => b.score - a.score);

  const container = document.getElementById("leaderboard-list");
  container.innerHTML = sorted.length
    ? sorted.map(renderMemberRow).join("")
    : emptyStateHTML();
}

function emptyStateHTML() {
  return `<div class="empty-state">No results for selected range / category</div>`;
}

function renderMemberRow(member, index) {
  const rank = index + 1;
  const score = member.score;
  const pct = Math.min(
    100,
    Math.round((score / sortedMaxScorePlaceholder()) * 100)
  ); // visual bar
  return `
    <div class="leader-row">
      <div class="rank">#${rank}</div>
      <div class="avatar">${initials(member.name)}</div>
      <div class="member-info">
        <div class="member-name">${escapeHtml(member.name)}</div>
        <div class="member-meta">${member.count} tasks • ${
    member.topCategory || "—"
  }</div>
      </div>
      <div class="score">${score}</div>
      <div class="progress-bar"><div class="progress" style="width:${pct}%"></div></div>
    </div>
  `;
}

/* --------------------------
   Data helpers
   -------------------------- */
function filterTasks(tasks, range, category) {
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
    const inCategory =
      category === "all" ? true : t.category.includes(category);
    console.log(category);
    return inRange && inCategory;
  });
}

function aggregateByMember(tasks) {
  const map = new Map();
  for (const t of tasks) {
    const name = t.assignedTo;
    const entry = map.get(name) || { name, score: 0, count: 0, categories: {} };
    entry.score += Number(t.score) || 0;
    entry.count += 1;
    entry.categories[t.category] = (entry.categories[t.category] || 0) + 1;
    map.set(name, entry);
  }
  const arr = Array.from(map.values()).map((e) => {
    // determine top category for display
    const topCategory = Object.keys(e.categories).sort(
      (a, b) => e.categories[b] - e.categories[a]
    )[0];
    return { name: e.name, score: e.score, count: e.count, topCategory };
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

// placeholder: compute max score for progress calculations
function sortedMaxScorePlaceholder() {
  // compute max from current rendered data to scale bars better
  const list = document.querySelectorAll(
    "#leaderboard-list .leader-row .score"
  );
  let max = 0;
  list.forEach((el) => {
    const v = Number(el.textContent) || 0;
    if (v > max) max = v;
  });
  return max || 1;
}
