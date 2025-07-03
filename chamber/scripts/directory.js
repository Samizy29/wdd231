// Select DOM elements
const directorySection = document.getElementById('directory');
const gridBtn = document.getElementById('gridView');
const listBtn = document.getElementById('listView');

// Fetch and render members
async function fetchMembers() {
  try {
    const response = await fetch('../data/members.json');
    if (!response.ok) throw new Error('Failed to load member data');
    const members = await response.json();
    renderMembers(members);
  } catch (error) {
    directorySection.textContent = 'Error loading member data.';
    console.error(error);
  }
}

// Render members on the page
function renderMembers(members) {
  directorySection.innerHTML = ''; // Clear existing content

  members.forEach(member => {
    const card = document.createElement('article');
    card.classList.add('member-card');

    card.innerHTML = `
      <img src="../images/${member.image}" alt="${member.name} logo" loading="lazy" />
      <h3>${member.name}</h3>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><strong>Website:</strong> <a href="${member.website}" target="_blank" rel="noopener">${member.website}</a></p>
      <p>${member.description}</p>
      <p><strong>Membership Level:</strong> ${member.membership.charAt(0).toUpperCase() + member.membership.slice(1)}</p>
    `;

    directorySection.appendChild(card);
  });
}

// Event listeners for toggle buttons
gridBtn.addEventListener('click', () => {
  directorySection.classList.remove('list-view');
  directorySection.classList.add('grid-view');
});

listBtn.addEventListener('click', () => {
  directorySection.classList.remove('grid-view');
  directorySection.classList.add('list-view');
});

// Initial fetch on page load
window.addEventListener('load', fetchMembers);
