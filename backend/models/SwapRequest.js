async function sendSwapRequest(toUserId, skillOffered, skillRequested) {
  const token = localStorage.getItem("token"); // Assuming you're storing auth token here

  const response = await fetch("http://localhost:5000/api/swap/request", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      toUser: toUserId,
      skillOffered,
      skillRequested
    })
  });

  const result = await response.json();

  if (response.ok) {
    alert("Swap request sent!");
  } else {
    alert("Error: " + result.message);
  }
}
async function fetchMySwaps() {
  const token = localStorage.getItem("token");

  const response = await fetch("http://localhost:5000/api/swap/my-swaps", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const swaps = await response.json();

  const container = document.getElementById("swap-list");
  container.innerHTML = "";

  swaps.forEach((swap) => {
    const div = document.createElement("div");
    div.className = "swap-card";
    div.innerHTML = `
      <p><strong>Skill You Offered:</strong> ${swap.skillOffered}</p>
      <p><strong>Skill You Requested:</strong> ${swap.skillRequested}</p>
      <p><strong>Status:</strong> ${swap.status}</p>
      ${swap.status === "pending" ? `
        <button onclick="respondToSwap('${swap._id}', 'accepted')">Accept</button>
        <button onclick="respondToSwap('${swap._id}', 'rejected')">Reject</button>
      ` : ""}
    `;
    container.appendChild(div);
  });
}
async function respondToSwap(swapId, status) {
  const token = localStorage.getItem("token");

  const response = await fetch(`http://localhost:5000/api/swap/respond/${swapId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ status })
  });

  if (response.ok) {
    alert(`Swap ${status}`);
    fetchMySwaps(); // Refresh the list
  } else {
    alert("Failed to respond");
  }
}
