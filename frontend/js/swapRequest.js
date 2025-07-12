const requests = [
  {
    name: "Marc Demo",
    location: "London, UK",
    rating: 3.9,
    offered: ["JavaScript", "HTML", "CSS"],
    wanted: ["Node.js", "MongoDB"],
    status: "pending",
    photo: "https://i.pravatar.cc/60?img=15"
  },
  {
    name: "Jade Smith",
    location: "Toronto, Canada",
    rating: 4.5,
    offered: ["Python"],
    wanted: ["UI/UX"],
    status: "accepted",
    photo: "https://i.pravatar.cc/60?img=12"
  },
  {
    name: "Alex Ray",
    location: "New York, USA",
    rating: 4.0,
    offered: ["Java"],
    wanted: ["React"],
    status: "rejected",
    photo: "https://i.pravatar.cc/60?img=14"
  }
];

function renderRequests() {
  const container = document.getElementById("requestContainer");
  container.innerHTML = "";

  requests.forEach(req => {
    const card = document.createElement("div");
    card.className = "col-md-6 col-lg-4";

    card.innerHTML = `
      <div class="card-custom">
        <div class="d-flex align-items-center gap-3 mb-3">
          <img src="${req.photo}" class="profile-img" alt="${req.name}">
          <div>
            <h5 class="mb-0">${req.name}</h5>
            <small class="text-muted">${req.location}</small><br/>
            <small>⭐ ${req.rating}</small>
          </div>
        </div>

        <div>
          <strong>Skills Offered:</strong><br/>
          ${req.offered.map(skill => `<span class="skill-badge">${skill}</span>`).join('')}
        </div>
        <div class="mt-2">
          <strong>Skills Wanted:</strong><br/>
          ${req.wanted.map(skill => `<span class="skill-badge">${skill}</span>`).join('')}
        </div>

        <div class="mt-3 d-flex justify-content-between align-items-center">
          <span class="status ${req.status} text-capitalize">${req.status}</span>
          ${req.status === 'pending' ? `
            <div>
              <button class="btn btn-sm btn-success me-2">Accept</button>
              <button class="btn btn-sm btn-danger">Reject</button>
            </div>` : ''}
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

renderRequests();