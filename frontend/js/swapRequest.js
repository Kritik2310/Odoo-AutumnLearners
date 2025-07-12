// Sample data
const requests = [
  {
    name: "Marc Demo",
    location: "London, UK",
    rating: 3.9,
    status: "pending",
    offered: ["JavaScript", "HTML", "CSS"],
    wanted: ["Node.js", "MongoDB"],
    photo: "https://i.pravatar.cc/80?img=11"
  },
  {
    name: "Jade Smith",
    location: "Toronto, Canada",
    rating: 4.5,
    status: "accepted",
    offered: ["Python"],
    wanted: ["UI/UX"],
    photo: "https://i.pravatar.cc/80?img=12"
  },
  {
    name: "Alex Ray",
    location: "New York, USA",
    rating: 4.0,
    status: "rejected",
    offered: ["Java"],
    wanted: ["React"],
    photo: "https://i.pravatar.cc/80?img=13"
  }
];

// Function to create card HTML
function createCard(req) {
  return `
    <div class="col-md-6 col-lg-4">
      <div class="card-custom h-100">
        <div class="d-flex align-items-center gap-3 mb-3">
          <img src="${req.photo}" class="rounded-circle border" width="60" height="60" />
          <div>
            <h5 class="mb-0 fw-semibold">${req.name}</h5>
            <small class="text-muted">${req.location}</small><br/>
            <span class="text-warning"><i class="bi bi-star-fill"></i> ${req.rating}</span>
          </div>
        </div>

        <div class="mb-2">
          <strong>Skills Offered:</strong><br/>
          ${req.offered.map(skill => `<span class="badge rounded-pill bg-light text-dark fw-normal">${skill}</span>`).join(' ')}
        </div>

        <div class="mb-3">
          <strong>Skills Wanted:</strong><br/>
          ${req.wanted.map(skill => `<span class="badge rounded-pill bg-light text-dark fw-normal">${skill}</span>`).join(' ')}
        </div>

        <div class="d-flex justify-content-between align-items-center mt-auto">
          <span class="badge badge-soft-status ${getStatusClass(req.status)} text-capitalize">${req.status}</span>
          ${req.status === "pending" ? `
            <div class="d-flex gap-2">
              <button class="btn btn-sm btn-success rounded-pill shadow-sm px-3">Accept</button>
              <button class="btn btn-sm btn-danger rounded-pill shadow-sm px-3">Reject</button>
            </div>
          ` : ""}
        </div>
      </div>
    </div>
  `;
}

// Return appropriate class based on status
function getStatusClass(status) {
  if (status === "pending") return "badge-pending";
  if (status === "accepted") return "badge-accepted";
  if (status === "rejected") return "badge-rejected";
  return "";
}

// Render filtered cards
function renderFilteredCards() {
  const container = document.getElementById("requestContainer");
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  const selectedStatus = document.getElementById("statusFilter").value;

  const filtered = requests.filter(req => {
    const nameMatch = req.name.toLowerCase().includes(searchTerm);
    const statusMatch = selectedStatus === "all" || req.status === selectedStatus;
    return nameMatch && statusMatch;
  });

  container.innerHTML = filtered.length
    ? filtered.map(createCard).join("")
    : `<div class="text-center text-muted">No results found</div>`;
}

// Attach listeners on page load
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("searchInput").addEventListener("input", renderFilteredCards);
  document.getElementById("statusFilter").addEventListener("change", renderFilteredCards);
  renderFilteredCards(); // Initial load
});