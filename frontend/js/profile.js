let skillColors = ['green', 'cyan', 'maroon', 'purple', 'yellow'];

function addSkill(event, type) {
  if (event.key === 'Enter') {
    event.preventDefault();
    const inputId = type === 'offered' ? 'new-skill-offered' : 'new-skill-wanted';
    const wrapperId = type === 'offered' ? 'skills-offered' : 'skills-wanted';
    const skill = document.getElementById(inputId).value.trim();
    if (!skill) return;
    const span = document.createElement('span');
    span.className = `tag ${skillColors[Math.floor(Math.random() * skillColors.length)]}`;
    span.innerHTML = `${skill} <span class='remove' onclick='this.parentElement.remove()'>&times;</span>`;
    document.getElementById(wrapperId).appendChild(span);
    document.getElementById(inputId).value = '';
  }
}

function loadPhoto(event) {
  const reader = new FileReader();
  reader.onload = function (e) {
    updateProfilePhoto(e.target.result);
  };
  reader.readAsDataURL(event.target.files[0]);
}

function removePhoto() {
  updateProfilePhoto('assets/avatars/avatar1.png');
}

function selectAvatar(img) {
  document.querySelectorAll('.avatar-grid img').forEach(el => el.classList.remove('selected'));
  img.classList.add('selected');
  updateProfilePhoto(img.src);
}

function updateProfilePhoto(url) {
  document.getElementById('profilePhoto').src = url;
  document.getElementById('navProfile').src = url;
}

async function saveProfile() {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    alert("User not logged in. Please log in again.");
    return;
  }

  const profile = {
    name: document.getElementById("name").value,
    location: document.getElementById("location").value,
    offeredSkills: Array.from(document.querySelectorAll('#skills-offered .tag')).map(tag => tag.textContent.trim().slice(0, -1)),
    wantedSkills: Array.from(document.querySelectorAll('#skills-wanted .tag')).map(tag => tag.textContent.trim().slice(0, -1)),
    availability: document.getElementById("availability").value,
    visibility: document.getElementById("visibility").value,
    profilePhoto: document.getElementById("profilePhoto").src
  };

  try {
    const res = await fetch(`http://localhost:5000/api/users/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile)
    });

    const data = await res.json();

    if (res.ok) {
      alert("✅ Profile updated successfully!");
      window.location.href = "home.html";
    } else {
      alert("❌ Failed to update profile: " + (data.message || "Unknown error"));
      console.error(data);
    }
  } catch (err) {
    console.error("Error saving profile:", err);
    alert("❌ Something went wrong. Try again.");
  }
}

function discardProfile() {
  if (confirm("Discard all changes and reset the form?")) {
    location.reload();
  }
}
//pre-filling of details
document.addEventListener("DOMContentLoaded", async () => {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    alert("User not logged in.");
    return;
  }

  try {
    const res = await fetch(`http://localhost:5000/api/users/${userId}`);
    if (!res.ok) throw new Error("Failed to fetch user data");
    const user = await res.json();

    // Pre-fill profile fields
    document.getElementById("name").value = user.name || "";
    document.getElementById("location").value = user.location || "";
    document.getElementById("availability").value = user.availability || "";
    document.getElementById("visibility").value = user.visibility || "";
    document.getElementById("profilePhoto").src = user.profilePhoto || "assets/avatars/avatar1.png";
    document.getElementById("navProfile").src = user.profilePhoto || "assets/avatars/avatar1.png";

    // Populate skills offered
    const offeredWrapper = document.getElementById("skills-offered");
    if (Array.isArray(user.offeredSkills)) {
      user.offeredSkills.forEach(skill => {
        const span = document.createElement("span");
        span.className = `tag ${skillColors[Math.floor(Math.random() * skillColors.length)]}`;
        span.innerHTML = `${skill} <span class='remove' onclick='this.parentElement.remove()'>&times;</span>`;
        offeredWrapper.appendChild(span);
      });
    }

    // Populate skills wanted
    const wantedWrapper = document.getElementById("skills-wanted");
    if (Array.isArray(user.wantedSkills)) {
      user.wantedSkills.forEach(skill => {
        const span = document.createElement("span");
        span.className = `tag ${skillColors[Math.floor(Math.random() * skillColors.length)]}`;
        span.innerHTML = `${skill} <span class='remove' onclick='this.parentElement.remove()'>&times;</span>`;
        wantedWrapper.appendChild(span);
      });
    }

  } catch (err) {
    console.error("Error loading profile:", err);
    alert("❌ Couldn't load profile. Try re-logging in.");
  }
});