document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("authForm");
  const registerForm = document.getElementById("registerForm");

  //  REGISTER 
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const age = document.getElementById("age").value;
      const gender = document.getElementById("gender").value;

      try {
        const res = await fetch("http://localhost:5000/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password, age, gender }),
        });

        const data = await res.json();

        if (!res.ok) {
          alert(data.message || "Registration failed");
          return;
        }

        localStorage.setItem("justRegistered", "true");
        alert("✅ Registration successful! Please log in.");
        window.location.href = "login.html";

      } catch (err) {
        console.error("Registration error:", err);
        alert("An error occurred during registration.");
      }
    });
  }

  // LOGIN 
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        const res = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          alert(data.message || "Login failed");
          return;
        }

        localStorage.setItem("userId", data.user._id);
        alert("✅ Login successful!");

        if (localStorage.getItem("justRegistered") === "true") {
          localStorage.removeItem("justRegistered");
          window.location.href = "profile.html"; 
        } else {
          window.location.href = "home.html"; 
        }

      } catch (err) {
        console.error("Login error:", err);
        alert("An error occurred during login.");
      }
    });
  }
});
