document.addEventListener("DOMContentLoaded", async () => {
  const container = document.querySelector(".row.g-4");

  const res = await fetch("http://localhost:5000/api/users");
  const users = await res.json();

  container.innerHTML = ""; 

  users.forEach(user => {
    const card = document.createElement("div");
    card.className = "col-md-6 col-lg-4";
    card.innerHTML = `
      <div class="card p-4">
        <div class="d-flex align-items-center mb-3">
          <img src="${user.profilePhoto || 'default.png'}" class="profile-img me-3" alt="${user.name}">
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
    container.appendChild(card);
  });
});
