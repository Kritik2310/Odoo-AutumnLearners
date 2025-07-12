const requests = [
  {
    name: 'Anya Josephine',
    city: 'Berlin, Germany',
    rating: 4.8,
    offered: ['React', 'Tailwind CSS'],
    wanted: ['Node.js'],
    status: 'pending',
    avatar: 'https://randomuser.me/api/portraits/women/21.jpg'
  },
  {
    name: 'Leo Martins',
    city: 'Lisbon, Portugal',
    rating: 4.6,
    offered: ['Vue.js', 'Firebase'],
    wanted: ['UX Research'],
    status: 'pending',
    avatar: 'https://randomuser.me/api/portraits/men/31.jpg'
  },
  {
    name: 'Priya Sharma',
    city: 'Mumbai, India',
    rating: 4.9,
    offered: ['Figma', 'Canva'],
    wanted: ['HTML', 'CSS'],
    status: 'pending',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg'
  },
  {
    name: 'Carlos Reyes',
    city: 'Barcelona, Spain',
    rating: 4.4,
    offered: ['WordPress'],
    wanted: ['JavaScript', 'SEO'],
    status: 'pending',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg'
  },
  {
    name: 'Mia Tanaka',
    city: 'Tokyo, Japan',
    rating: 5.0,
    offered: ['Illustrator', 'Branding'],
    wanted: ['React Native'],
    status: 'pending',
    avatar: 'https://randomuser.me/api/portraits/women/52.jpg'
  },
];

let currentIndex = 0;
let accepted = [], rejected = [];

// Renders cards in 3D layout
function renderCard(index) {
  const center = requests[index];
  const left = requests[index - 1];
  const right = requests[index + 1];

  document.getElementById('centerCard').innerHTML = getCardHTML(center, true);
  document.getElementById('leftCard').innerHTML = left ? getCardHTML(left, false) : '';
  document.getElementById('rightCard').innerHTML = right ? getCardHTML(right, false) : '';
}

// Accept a request
function acceptRequest() {
  accepted.push(requests[currentIndex]);
  requests.splice(currentIndex, 1);

  if (currentIndex > 0) currentIndex--;
  renderAccepted();
  handlePostAction();
}

// Reject a request
function rejectRequest() {
  rejected.push(requests[currentIndex]);
  requests.splice(currentIndex, 1);

  if (currentIndex > 0) currentIndex--;
  handlePostAction();
}

// What happens after accept/reject
function handlePostAction() {
  if (requests.length === 0) {
    document.getElementById('centerCard').innerHTML = `<h4 class="text-success">🎉 No More Requests!</h4>`;
    document.getElementById('leftCard').innerHTML = '';
    document.getElementById('rightCard').innerHTML = '';
  } else {
    renderCard(currentIndex);
  }
}

// Navigate
function nextCard() {
  if (currentIndex < requests.length - 1) {
    currentIndex++;
    renderCard(currentIndex);
  }
}

function prevCard() {
  if (currentIndex > 0) {
    currentIndex--;
    renderCard(currentIndex);
  }
}

// Generate a single card's HTML
function getCardHTML(r, isCenter = false) {
  if (!r) return '';

  return `
    <div class="${isCenter ? 'text-center' : 'text-muted small'}">
      <img src="${r.avatar}" class="rounded-circle mb-2 shadow" width="60" height="60" style="object-fit: cover;" />
      <h5 class="mt-2">${r.name}</h5>
      <p class="small">${r.city}</p>
      <p class="text-warning mb-2">⭐ ${r.rating}</p>
      <div><strong>Skills Offered:</strong> ${r.offered.map(skill => `<span class="badge-tag">${skill}</span>`).join(' ')}</div>
      <div class="mt-2"><strong>Skills Wanted:</strong> ${r.wanted.map(skill => `<span class="badge-tag">${skill}</span>`).join(' ')}</div>
      ${isCenter ? `
        <div class="mt-3 d-flex justify-content-center gap-2">
          <button class="btn btn-accept" onclick="acceptRequest()">Accept</button>
          <button class="btn btn-reject" onclick="rejectRequest()">Reject</button>
        </div>
      ` : ''}
    </div>
  `;
}

// Render accepted requests
function renderAccepted() {
  const section = document.getElementById("acceptedSection");
  section.innerHTML = accepted.map(r =>
    `<div class="status-card text-center">
      <img src="${r.avatar}" class="rounded-circle mb-2" width="50"/>
      <h6>${r.name}</h6>
      <p class="small text-muted">${r.city}</p>
    </div>`).join('');
}

// Start carousel
renderCard(currentIndex);