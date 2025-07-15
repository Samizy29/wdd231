// Fetch member data and display spotlights
async function getMembers() {
    try {
        const response = await fetch('data/members.json');
        const data = await response.json();
        displaySpotlights(data.members);
    } catch (error) {
        console.error('Error loading member data:', error);
        document.getElementById('spotlights').innerHTML = 
            '<p class="error">Unable to load member spotlights.</p>';
    }
}

// Display 2-3 random Gold/Silver members
function displaySpotlights(members) {
    const spotlightsContainer = document.getElementById('spotlights');
    const qualifiedMembers = members.filter(member => 
        member.membershipLevel === 'Gold' || member.membershipLevel === 'Silver'
    );
    
    // Shuffle array and get 2-3 members
    const shuffled = qualifiedMembers.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.random() > 0.5 ? 2 : 3);
    
    selected.forEach(member => {
        const card = document.createElement('div');
        card.className = 'spotlight-card';
        
        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
            <p class="membership-level ${member.membershipLevel.toLowerCase()}">
                ${member.membershipLevel} Member
            </p>
        `;
        
        spotlightsContainer.appendChild(card);
    });
}

// Initialize
getMembers();