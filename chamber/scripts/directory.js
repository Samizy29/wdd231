// Cache DOM elements
const domElements = {
    hamburger: document.getElementById('hamburger'),
    navMenu: document.getElementById('nav-menu'),
    directory: document.getElementById('directory'),
    gridView: document.getElementById('grid-view'),
    listView: document.getElementById('list-view'),
    year: document.getElementById('year'),
    lastModified: document.getElementById('last-modified')
};

// Constants
const MEMBERS_DATA_URL = 'data/members.json';
const FALLBACK_MESSAGE = '<p class="error">Error loading member data. Please try again later.</p>';

// Initialize application
function init() {
    setupEventListeners();
    updateFooterDates();
    loadMemberData();
}

// Event Listeners
function setupEventListeners() {
    domElements.hamburger.addEventListener('click', toggleMobileMenu);
    domElements.gridView.addEventListener('click', () => switchView('grid'));
    domElements.listView.addEventListener('click', () => switchView('list'));
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    domElements.navMenu.classList.toggle('show');
    this.setAttribute('aria-expanded', 
        domElements.navMenu.classList.contains('show'));
}

// View Switching
function switchView(viewType) {
    const isGridView = viewType === 'grid';
    
    domElements.directory.classList.toggle('grid', isGridView);
    domElements.directory.classList.toggle('list', !isGridView);
    
    domElements.gridView.classList.toggle('active', isGridView);
    domElements.listView.classList.toggle('active', !isGridView);
    
    // Store user preference
    localStorage.setItem('preferredView', viewType);
}

// Footer Dates
function updateFooterDates() {
    domElements.year.textContent = new Date().getFullYear();
    domElements.lastModified.textContent = document.lastModified;
}

// Member Data Handling
async function loadMemberData() {
    try {
        const response = await fetch(MEMBERS_DATA_URL);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const members = await response.json();
        renderMembers(members);
        
        // Apply saved view preference
        const savedView = localStorage.getItem('preferredView') || 'grid';
        switchView(savedView);
        
    } catch (error) {
        handleDataError(error);
    }
}

function renderMembers(members) {
    if (!members?.length) {
        domElements.directory.innerHTML = FALLBACK_MESSAGE;
        return;
    }

    domElements.directory.innerHTML = members.map(member => `
        <div class="member-card">
            <img src="images/${member.image}" 
                 alt="${member.name}" 
                 loading="lazy"
                 width="250" 
                 height="150">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.url}" 
               target="_blank" 
               rel="noopener noreferrer">
               Visit Website
            </a>
            <span class="membership-level ${getMembershipClass(member.membership)}">
                ${getMembershipText(member.membership)}
            </span>
        </div>
    `).join('');
}

function getMembershipClass(level) {
    const levels = {
        1: 'bronze',
        2: 'silver',
        3: 'gold'
    };
    return levels[level] || 'bronze';
}

function getMembershipText(level) {
    const levels = {
        1: 'Bronze Member',
        2: 'Silver Member',
        3: 'Gold Member'
    };
    return levels[level] || 'Member';
}

function handleDataError(error) {
    console.error('Data loading error:', error);
    domElements.directory.innerHTML = FALLBACK_MESSAGE;
    
    // Optional: Display error to user
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = 'Failed to load member data. Please refresh the page.';
    document.body.prepend(errorElement);
    
    setTimeout(() => {
        errorElement.remove();
    }, 5000);
}

// Start the application
document.addEventListener('DOMContentLoaded', init);