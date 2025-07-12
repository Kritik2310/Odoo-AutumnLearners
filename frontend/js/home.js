document.addEventListener("DOMContentLoaded", async () => {
  const container = document.querySelector(".row.g-4");
  const userId = localStorage.getItem("userId");

  const res = await fetch("http://localhost:5000/api/users");
  const users = await res.json();

  container.innerHTML = ""; 

  //logged-in user first
  users.sort((a,b) => {
    if (a._id === userId) return -1;
    if (b._id === userId) return 1;
    return 0;
  });

  users.forEach(user => {
    const isCurrentUser = user._id === userId;

    const card = document.createElement("div");
    card.className = "col-md-6 col-lg-4";
    card.innerHTML = `
      <div class="card p-4 position-relative">
        ${isCurrentUser ? `
          <div class="position-absolute top-0 end-0 m-2 d-flex gap-2">
            <button class="btn btn-sm btn-outline-primary edit-btn"><i class="bi bi-pencil-square"></i></button>
            <button class="btn btn-sm btn-outline-danger delete-btn"><i class="bi bi-trash3"></i></button>
          </div>` : ""}
        <div class="d-flex align-items-center mb-3">
          <img src="${user.profilePhoto || 'assets/avatars/avatar1.png'}" class="profile-img me-3" alt="${user.name}">
          <div>
            <h5 class="mb-0">${user.name}</h5>
            <small class="text-muted"><i class="bi bi-geo-alt me-1"></i>${user.location || ""}</small>
          </div>
        </div>
        <div class="mb-2">
          <strong>Skills Offered:</strong><br>
          ${user.offeredSkills?.map(skill => `<span class="skill-tag">${skill}</span>`).join(" ") || ""}
        </div>
        <div class="mb-2">
          <strong>Skills Wanted:</strong><br>
          ${user.wantedSkills?.map(skill => `<span class="skill-tag">${skill}</span>`).join(" ") || ""}
        </div>
        <p><i class="bi bi-clock text-danger me-1"></i> 
          <span class="availability-badge">${user.availability || "Anytime"}</span>
        </p>
        <button class="btn btn-request w-100">Request</button>
      </div>
    `;

    // Add event listeners for edit & delete
    if (isCurrentUser) {
      const editBtn = card.querySelector(".edit-btn");
      editBtn.addEventListener("click", () => {
        window.location.href = "profile.html"; // Data is fetched in profile.js using userId
      });

      const deleteBtn = card.querySelector(".delete-btn");
      deleteBtn.addEventListener("click", async () => {
        if (confirm("Are you sure you want to delete your profile?")) {
          await fetch(`http://localhost:5000/api/users/${userId}`, {
            method: "DELETE"
          });
          localStorage.removeItem("userId");
          window.location.href = "login.html";
        }
      });
    }

    container.appendChild(card);
  });
});
