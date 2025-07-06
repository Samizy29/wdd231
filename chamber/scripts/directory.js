document.addEventListener('DOMContentLoaded', async function() {
    // Navigation
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('nav ul');
    
    hamburger.addEventListener('click', () => {
        navList.classList.toggle('show');
    });

    // Load members
    async function getMembers() {
        try {
            const response = await fetch('data/members.json');
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            console.error('Error loading members:', error);
            return [];
        }
    }

    // Display members
    function displayMembers(members, viewType) {
        const container = document.getElementById('member-container');
        container.className = viewType + '-view';
        container.innerHTML = '';

        members.forEach(member => {
            const card = document.createElement('div');
            card.className = 'member-card';
            
            let membershipLevel;
            switch(member.membershipLevel) {
                case 3: membershipLevel = 'Gold Member'; break;
                case 2: membershipLevel = 'Silver Member'; break;
                default: membershipLevel = 'Member';
            }

            card.innerHTML = `
                ${viewType === 'grid' ? `<img src="images/members/${member.image}" alt="${member.name}" loading="lazy">` : ''}
                <h2>${member.name}</h2>
                <span class="membership-level">${membershipLevel}</span>
                <p>${member.address}</p>
                <p>📞 ${member.phone}</p>
                <a href="${member.website}" target="_blank">Website</a>
                ${member.description ? `<p>${member.description}</p>` : ''}
            `;
            
            container.appendChild(card);
        });
    }

    // View toggle
    const gridBtn = document.getElementById('grid-view');
    const listBtn = document.getElementById('list-view');
    
    gridBtn.addEventListener('click', () => {
        gridBtn.setAttribute('aria-pressed', 'true');
        listBtn.setAttribute('aria-pressed', 'false');
        displayMembers(members, 'grid');
        localStorage.setItem('directoryView', 'grid');
    });
    
    listBtn.addEventListener('click', () => {
        listBtn.setAttribute('aria-pressed', 'true');
        gridBtn.setAttribute('aria-pressed', 'false');
        displayMembers(members, 'list');
        localStorage.setItem('directoryView', 'list');
    });

    // Initialize
    const members = await getMembers();
    const savedView = localStorage.getItem('directoryView') || 'grid';
    document.getElementById(savedView + '-view').click();

    // Footer
    document.getElementById('year').textContent = new Date().getFullYear();
    document.getElementById('last-modified').textContent += document.lastModified;
});