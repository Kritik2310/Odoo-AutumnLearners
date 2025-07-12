document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("authForm");
  const registerForm = document.getElementById("registerForm");

  // LOGIN FLOW
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
        //profile checking for redirection
        const profileRes = await fetch(`http://localhost:5000/api/profile/${data.user._id}/check`);
        if (profileRes.ok) {
          const profileData = await profileRes.json();
          if (profileData.profileExists) {
            window.location.href = "Home.html";
          } else {
            window.location.href = "profile.html";
          }
        } else {
          window.location.href = "profile.html";
        }
      } catch (err) {
        console.error("Login error:", err);
        alert("An error occurred during login.");
      }
    });
  }

  // REGISTER FLOW
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

        localStorage.setItem("userId", data.user._id); 
        alert("✅ Registration successful!");
        window.location.href = "profile.html";
      } catch (err) {
        console.error("Registration error:", err);
        alert("An error occurred during registration.");
      }
    });
  }
});