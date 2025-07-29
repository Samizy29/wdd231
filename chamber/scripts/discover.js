document.addEventListener('DOMContentLoaded', function() {
    // Set last modified date and year
    document.getElementById('last-modified').textContent = document.lastModified;
    document.getElementById('year').textContent = new Date().getFullYear();

    // Load business data
    fetch('data/members.json')
        .then(response => response.json())
        .then(businesses => {
            const gallery = document.getElementById('business-gallery');
            let goldCount = 0, silverCount = 0, bronzeCount = 0;

            businesses.forEach(business => {
                // Count membership levels
                switch(business.membership) {
                    case 3: goldCount++; break;
                    case 2: silverCount++; break;
                    case 1: bronzeCount++; break;
                }

                // Create card
                const card = document.createElement('div');
                card.className = 'member-card';
                
                // Membership level class
                const membershipClass = ['bronze', 'silver', 'gold'][business.membership - 1];
                
                card.innerHTML = `
                    <img src="${business.image.replace('../', '')}" 
                        alt="${business.name}" 
                        loading="lazy" 
                        width="300" 
                        height="200">
                    <div class="card-content">
                        <div class="membership-level ${membershipClass}">
                            ${membershipClass.toUpperCase()}
                        </div>
                        <h3>${business.name}</h3>
                        <address>${business.address}</address>
                        <p>${business.phone}</p>
                        <p>${business.description || 'Local business serving the community'}</p>
                        <a href="${business.url}" target="_blank" class="learn-more">Visit Website</a>
                    </div>
                `;
                
                gallery.appendChild(card);
            });

            // Update counts
            document.getElementById('gold-count').textContent = goldCount;
            document.getElementById('silver-count').textContent = silverCount;
            document.getElementById('bronze-count').textContent = bronzeCount;
        })
        .catch(error => {
            console.error('Error loading businesses:', error);
            document.getElementById('business-gallery').innerHTML = 
                '<p class="error">Business listings are currently unavailable. Please try again later.</p>';
        });

    // Visit tracking
    const visitNotification = document.getElementById('visit-notification');
    const lastVisit = localStorage.getItem('lastVisit');
    const currentVisit = new Date().getTime();

    if (!lastVisit) {
        visitNotification.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const daysSince = Math.floor((currentVisit - lastVisit) / (1000 * 60 * 60 * 24));
        
        if (daysSince < 1) {
            visitNotification.textContent = "Back so soon! Awesome!";
        } else {
            visitNotification.textContent = `You last visited ${daysSince} day${daysSince === 1 ? '' : 's'} ago.`;
        }
    }

    localStorage.setItem('lastVisit', currentVisit);
});