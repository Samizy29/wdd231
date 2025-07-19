import { cleanUrl, getRandomSubset } from '../scripts/utils.js';

// Main spotlight functionality
document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('spotlightContainer');
    
    try {
        // 1. Fetch member data
        const response = await fetch('../data/members.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const members = await response.json();
        
        // 2. Filter for Gold/Silver members
        const eligibleMembers = members.filter(member => 
            member.membership === 2 || member.membership === 3
        );
        
        // 3. Clear loading state
        container.innerHTML = '';
        
        // 4. Select 2-3 random members
        const count = Math.min(eligibleMembers.length, Math.random() > 0.5 ? 3 : 2);
        const spotlights = getRandomSubset(eligibleMembers, count);
        
        // 5. Display spotlights
        spotlights.forEach(member => {
            const card = document.createElement('div');
            card.className = 'spotlight-card';
            
            const membershipLevel = member.membership === 3 ? 'Gold' : 'Silver';
            const membershipClass = member.membership === 3 ? 'gold' : 'silver';
            
            card.innerHTML = `
                <img src="../images/${member.image.split('/').pop()}" alt="${member.name}" loading="lazy">
                <h2>${member.name}</h2>
                <p><strong>Address:</strong> ${member.address}</p>
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><strong>Website:</strong> 
                    <a href="${member.url}" target="_blank" rel="noopener noreferrer">
                        ${cleanUrl(member.url)}
                    </a>
                </p>
                <span class="membership-badge ${membershipClass}">
                    ${membershipLevel} Member
                </span>
            `;
            
            container.appendChild(card);
        });
        
        // 6. Handle case when no eligible members
        if (spotlights.length === 0) {
            container.innerHTML = `
                <div class="error-message">
                    No spotlight members available at this time.
                </div>
            `;
        }
        
    } catch (error) {
        console.error('Error loading spotlights:', error);
        container.innerHTML = `
            <div class="error-message">
                Failed to load member spotlights. Please try again later.
            </div>
        `;
    }
});