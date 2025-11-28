/**
 * Auth Component (Sign In / Sign Up)
 * - LocalStorage-backed demo users
 * - Sign in with email/username + password
 * - Sign up with name, username, email, password
 * - "Sign in with Google" button as a placeholder
 * - Styled with Tailwind CSS
 */

export function renderAuth(root) {
  root.innerHTML = authHTML();
  attachAuthListeners();
}

function authHTML() {
  return `
    <section class="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center px-4 py-8">
      <div class="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        
        <!-- Tabs -->
        <div class="flex border-b border-gray-200">
          <button class="tab-btn flex-1 px-4 py-3 text-center font-semibold text-gray-700 border-b-2 border-blue-500 active" data-tab="signin">
            Sign In
          </button>
          <button class="tab-btn flex-1 px-4 py-3 text-center font-semibold text-gray-400 border-b-2 border-transparent hover:text-gray-600" data-tab="signup">
            Sign Up
          </button>
        </div>

        <!-- Forms Container -->
        <div class="p-6">
          
          <!-- Sign In Form -->
          <form id="signin-form" class="auth-form space-y-4">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Email or Username</label>
              <input 
                type="text" 
                id="signin-identifier" 
                required 
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter email or username"
              />
            </div>
            
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input 
                type="password" 
                id="signin-password" 
                required 
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter password"
              />
            </div>

            <div class="space-y-2 pt-2">
              <button 
                type="submit" 
                class="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                Sign In
              </button>
              <button 
                type="button" 
                id="google-signin" 
                class="w-full px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-2"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.85 4.05-1.26 1.24-3.16 2.06-5.99 2.06-4.45 0-8.16-3.67-8.16-8.12s3.71-8.12 8.16-8.12c2.45 0 4.5.78 5.99 2.06l2.45-2.45C19.27 2.75 16.1 1 12.48 1 6.62 1 1.6 6.08 1.6 12s5.02 11 10.88 11c3.02 0 5.52-.998 7.38-3.06 1.84-2.062 2.89-5.102 2.89-8.72 0-.78-.068-1.502-.298-2.3h-10.6z"/></svg>
                Sign in with Google
              </button>
            </div>

            <p class="text-center text-sm text-gray-600 pt-2">
              Don't have an account? 
              <a href="#" id="toSignup" class="text-blue-600 font-semibold hover:underline">Create one</a>
            </p>
          </form>

          <!-- Sign Up Form -->
          <form id="signup-form" class="auth-form space-y-4 hidden">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <input 
                type="text" 
                id="signup-name" 
                required 
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter full name"
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Username</label>
              <input 
                type="text" 
                id="signup-username" 
                required 
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Choose username"
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input 
                type="email" 
                id="signup-email" 
                required 
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter email"
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input 
                type="password" 
                id="signup-password" 
                required 
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Create password"
              />
            </div>

            <div class="space-y-2 pt-2">
              <button 
                type="submit" 
                class="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                Sign Up
              </button>
              <button 
                type="button" 
                id="google-signup" 
                class="w-full px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-2"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.85 4.05-1.26 1.24-3.16 2.06-5.99 2.06-4.45 0-8.16-3.67-8.16-8.12s3.71-8.12 8.16-8.12c2.45 0 4.5.78 5.99 2.06l2.45-2.45C19.27 2.75 16.1 1 12.48 1 6.62 1 1.6 6.08 1.6 12s5.02 11 10.88 11c3.02 0 5.52-.998 7.38-3.06 1.84-2.062 2.89-5.102 2.89-8.72 0-.78-.068-1.502-.298-2.3h-10.6z"/></svg>
                Sign up with Google
              </button>
            </div>

            <p class="text-center text-sm text-gray-600 pt-2">
              Already have an account? 
              <a href="#" id="toSignin" class="text-blue-600 font-semibold hover:underline">Sign in</a>
            </p>
          </form>

        </div>
      </div>
    </section>
  `;
}

/* ---------------------------
   Event handlers
   --------------------------- */
function attachAuthListeners() {
  // Tab switching
  document
    .querySelectorAll(".tab-btn")
    .forEach((btn) =>
      btn.addEventListener("click", (e) =>
        switchTab(e.currentTarget.dataset.tab)
      )
    );

  // Link switching
  document.getElementById("toSignup")?.addEventListener("click", (e) => {
    e.preventDefault();
    switchTab("signup");
  });
  document.getElementById("toSignin")?.addEventListener("click", (e) => {
    e.preventDefault();
    switchTab("signin");
  });

  // Form submissions
  document.getElementById("signup-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    handleSignup();
  });

  document.getElementById("signin-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    handleSignin();
  });

  // Google buttons (placeholders)
  document.getElementById("google-signin")?.addEventListener("click", () => {
    alert("Google Sign-In integration coming soon!");
  });
  document.getElementById("google-signup")?.addEventListener("click", () => {
    alert("Google Sign-Up integration coming soon!");
  });
}

function switchTab(tab) {
  // Update tab buttons
  document.querySelectorAll(".tab-btn").forEach((b) => {
    if (b.dataset.tab === tab) {
      b.classList.add("border-blue-500", "text-gray-700");
      b.classList.remove("border-transparent", "text-gray-400");
    } else {
      b.classList.remove("border-blue-500", "text-gray-700");
      b.classList.add("border-transparent", "text-gray-400");
    }
  });

  // Toggle forms
  document
    .getElementById("signin-form")
    .classList.toggle("hidden", tab !== "signin");
  document
    .getElementById("signup-form")
    .classList.toggle("hidden", tab !== "signup");
}

function handleSignup() {
  const name = document.getElementById("signup-name").value.trim();
  const username = document.getElementById("signup-username").value.trim();
  const email = document
    .getElementById("signup-email")
    .value.trim()
    .toLowerCase();
  const password = document.getElementById("signup-password").value;

  if (!name || !username || !email || !password) {
    alert("Please fill all fields.");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters.");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users") || "[]");
  if (users.some((u) => u.email === email || u.username === username)) {
    alert("User with same email or username already exists.");
    return;
  }

  const user = { id: Date.now(), name, username, email, password };
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem(
    "currentUser",
    JSON.stringify({ id: user.id, name: user.name, username: user.username })
  );

  alert("Account created successfully!");
  if (window.navigateTo) window.navigateTo("home");
}

function handleSignin() {
  const identifier = document
    .getElementById("signin-identifier")
    .value.trim()
    .toLowerCase();
  const password = document.getElementById("signin-password").value;

  if (!identifier || !password) {
    alert("Please fill all fields.");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find(
    (u) =>
      (u.email && u.email.toLowerCase() === identifier) ||
      (u.username && u.username.toLowerCase() === identifier)
  );

  if (!user || user.password !== password) {
    alert("Invalid email/username or password.");
    return;
  }

  localStorage.setItem(
    "currentUser",
    JSON.stringify({ id: user.id, name: user.name, username: user.username })
  );
  alert("Signed in successfully!");
  if (window.navigateTo) window.navigateTo("home");
}
