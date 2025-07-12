fetch('/api/admin/users')
  .then(res => res.json())
  .then(users => {
    const tbody = document.getElementById('userTable');
    tbody.innerHTML = '';
    users.forEach(user => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${user.name}</td>
        <td>${user.location}</td>
        <td>${user.skills.map(s => `<span class='badge bg-success'>${s}</span>`).join(' ')}</td>
        <td>
          <button class='btn btn-outline-danger btn-sm' onclick='banUser("${user._id}")'>Ban</button>
          <button class='btn btn-outline-warning btn-sm' onclick='removeSkills("${user._id}")'>Remove Skills</button>
        </td>`;
      tbody.appendChild(row);
    });
  })
  .catch(err => console.error('Failed to fetch users:', err));

function banUser(userId) {
  if (!confirm('Are you sure you want to ban this user?')) return;
  fetch(`/api/admin/ban/${userId}`, { method: 'POST' })
    .then(() => location.reload());
}

function unbanUser(userId) {
  fetch(`/api/admin/unban/${userId}`, { method: 'POST' })
    .then(() => location.reload());
}

function removeSkills(userId) {
  if (!confirm('Remove all skills from this user?')) return;
  fetch(`/api/admin/remove-skills/${userId}`, { method: 'POST' })
    .then(() => location.reload());
}
