// Toggle mobile menu
document.getElementById('hamburger').addEventListener('click', function() {
    document.getElementById('nav-menu').classList.toggle('show');
});

// View toggle functionality
document.getElementById('grid-view').addEventListener('click', function() {
    document.getElementById('directory').classList.remove('list');
    document.getElementById('directory').classList.add('grid');
    document.getElementById('grid-view').classList.add('active');
    document.getElementById('list-view').classList.remove('active');
});

document.getElementById('list-view').addEventListener('click', function() {
    document.getElementById('directory').classList.remove('grid');
    document.getElementById('directory').classList.add('list');
    document.getElementById('list-view').classList.add('active');
    document.getElementById('grid-view').classList.remove('active');
});

// Display current year and last modified date
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = document.lastModified;

// Fetch and display members
async function getMembers() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        console.error('Error fetching members:', error);
        document.getElementById('directory').innerHTML = '<p>Error loading member data. Please try again later.</p>';
    }
}

function displayMembers(members) {
    const directory = document.getElementById('directory');
    directory.innerHTML = '';

    members.forEach(member => {
        const card = document.createElement('div');
        card.className = 'member-card';
        
        // Determine membership level
        let membershipClass = 'bronze';
        let membershipText = 'Bronze Member';
        if (member.membership === 2) {
            membershipClass = 'silver';
            membershipText = 'Silver Member';
        } else if (member.membership === 3) {
            membershipClass = 'gold';
            membershipText = 'Gold Member';
        }

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.url}" target="_blank">Visit Website</a>
            <span class="membership-level ${membershipClass}">${membershipText}</span>
        `;
        
        directory.appendChild(card);
    });
}

// Load members when page loads
window.addEventListener('DOMContentLoaded', getMembers);