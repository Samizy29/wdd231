// DOM Elements
const memberContainer = document.getElementById('member-container');
const gridViewBtn = document.getElementById('grid-view');
const listViewBtn = document.getElementById('list-view');
const filterDropdown = document.getElementById('membership-filter');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

// Store member data
let allMembers = [];

// Load members from JSON file
async function loadMembers() {
  try {
    const response = await fetch('data/members.json');
    const data = await response.json();
    allMembers = data.members;
    showMembers(allMembers);
  } catch (error) {
    memberContainer.innerHTML = '<p class="error">Error loading members. Please try again later.</p>';
    console.error('Error:', error);
  }
}

// Display members on page
function showMembers(members) {
  // Clear previous results
  memberContainer.innerHTML = '';
  
  // Show message if no members
  if (members.length === 0) {
    memberContainer.innerHTML = '<p>No businesses found matching your criteria.</p>';
    return;
  }

  // Create card for each member
  members.forEach(member => {
    const card = document.createElement('div');
    card.className = 'member-card';
    
    // Get membership level text
    const membershipLevel = getLevelText(member.membership);
    
    // Create card HTML
    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name}" 
           onerror="this.src='images/placeholder.jpg'">
      <div class="card-content">
        <h3>${member.name}</h3>
        <p><i class="fas fa-map-marker-alt"></i> ${member.address}</p>
        <p><i class="fas fa-phone"></i> ${member.phone}</p>
        <p><i class="fas fa-globe"></i> <a href="${member.website}" target="_blank">Website</a></p>
        <p class="membership ${membershipLevel.toLowerCase()}">${membershipLevel} Member</p>
        ${member.otherInfo ? `<p>${member.otherInfo}</p>` : ''}
      </div>
    `;
    
    memberContainer.appendChild(card);
  });
}

// Convert membership level number to text
function getLevelText(level) {
  const levels = {
    1: 'Basic',
    2: 'Silver',
    3: 'Gold'
  };
  return levels[level] || 'Basic';
}

// Filter members by level
function filterMembers() {
  const selectedLevel = filterDropdown.value;
  
  if (selectedLevel === 'all') {
    showMembers(allMembers);
  } else {
    const filtered = allMembers.filter(member => member.membership == selectedLevel);
    showMembers(filtered);
  }
}

// Switch between grid and list views
function setView(viewType) {
  // Update button states
  gridViewBtn.classList.toggle('active', viewType === 'grid');
  listViewBtn.classList.toggle('active', viewType === 'list');
  
  // Update container class
  memberContainer.className = viewType + '-view';
}

// Toggle mobile menu
function toggleMenu() {
  const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
  hamburger.setAttribute('aria-expanded', !isOpen);
  navMenu.classList.toggle('show');
}

// Set up event listeners
function setupEventListeners() {
  // View toggle buttons
  gridViewBtn.addEventListener('click', () => setView('grid'));
  listViewBtn.addEventListener('click', () => setView('list'));
  
  // Filter dropdown
  filterDropdown.addEventListener('change', filterMembers);
  
  // Mobile menu
  hamburger.addEventListener('click', toggleMenu);
}

// Initialize page
function init() {
  // Set copyright year
  document.getElementById('year').textContent = new Date().getFullYear();
  
  // Set last modified date
  document.getElementById('last-modified').textContent = document.lastModified;
  
  // Load member data
  loadMembers();
  
  // Set up event listeners
  setupEventListeners();
}

// Start the application
init();