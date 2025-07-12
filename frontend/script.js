const authForm = document.getElementById("authForm");
const toggleLink = document.getElementById("toggleLink");
const formTitle = document.getElementById("formTitle");
const toggleText = document.getElementById("toggleText");
const nameField = document.getElementById("nameField");
const submitButton = authForm.querySelector("button[type='submit']");

let isLogin = true;

// Toggle between login and register
toggleLink.addEventListener("click", () => {
  isLogin = !isLogin;
  formTitle.innerText = isLogin ? "Welcome Back!" : "Create Your Account";
  toggleText.innerText = isLogin ? "Don't have an account?" : "Already have an account?";
  toggleLink.innerText = isLogin ? "Register" : "Login";
  submitButton.innerText = isLogin ? "Login" : "Register";
  nameField.classList.toggle("d-none");
  genderField.classList.toggle("d-none");
  ageField.classList.toggle("d-none");
});

// Handle form submission
authForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name")?.value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const gender = document.getElementById("gender")?.value;
  const age = document.getElementById("age")?.value;
  
  const endpoint = isLogin
    ? "http://localhost:5000/api/auth/login"
    : "http://localhost:5000/api/auth/register";

  const body = isLogin
    ? { email, password }
    : { name, email, password, gender, age};

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data || "Something went wrong");
      return;
    }

    if (isLogin) {
      alert("✅ Login successful!");
      localStorage.setItem("token", data.token); // Store JWT
      localStorage.setItem("userId", data.user.id);
    } else {
      alert("✅ Registration successful! You can now log in.");
      toggleLink.click(); // Switch to login form
    }
  } catch (err) {
    alert("❌ Network or server error");
    console.error(err);
  }
});