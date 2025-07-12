let skillColors = ['green', 'cyan', 'maroon', 'purple', 'yellow'];

    function addSkill(event, type) {
      if (event.key === 'Enter') {
        event.preventDefault();
        const inputId = type === 'offered' ? 'new-skill-offered' : 'new-skill-wanted';
        const wrapperId = type === 'offered' ? 'skills-offered' : 'skills-wanted';
        const skill = document.getElementById(inputId).value.trim();
        if (!skill) return;
        const span = document.createElement('span');
        span.className = `tag ${skillColors[Math.floor(Math.random()*skillColors.length)]}`;
        span.innerHTML = `${skill} <span class='remove' onclick='this.parentElement.remove()'>&times;</span>`;
        document.getElementById(wrapperId).appendChild(span);
        document.getElementById(inputId).value = '';
      }
    }

    function loadPhoto(event) {
      const reader = new FileReader();
      reader.onload = function(e) {
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

    function saveProfile() {
      const profile = {
        name: document.getElementById('name').value,
        location: document.getElementById('location').value,
        offeredSkills: Array.from(document.querySelectorAll('#skills-offered .tag')).map(tag => tag.textContent.trim().slice(0, -1)),
        wantedSkills: Array.from(document.querySelectorAll('#skills-wanted .tag')).map(tag => tag.textContent.trim().slice(0, -1)),
        availability: document.getElementById('availability').value,
        visibility: document.getElementById('visibility').value,
        profilePhoto: document.getElementById('profilePhoto').src
      };
      alert("🎉 Profile Saved Successfully!\n\n" + JSON.stringify(profile, null, 2));
    }

    function discardProfile() {
      if (confirm("Discard all changes and reset the form?")) {
        location.reload();
      }
    }