document.addEventListener('DOMContentLoaded', function() {
    // Load business data instead of attractions
    fetch('data/members.json')  // Using mine existing file
        .then(response => response.json())
        .then(businesses => {
            const gallery = document.getElementById('business-gallery');
            
            businesses.forEach(business => {
                const card = document.createElement('div');
                card.className = 'business-card';
                
                // Membership level badge
                const membershipLevel = ['Bronze', 'Silver', 'Gold'][business.membership - 1];
                const badgeColor = ['#cd7f32', '#c0c0c0', '#ffd700'][business.membership - 1];
                
                card.innerHTML = `
                    <img src="${business.image.replace('../', '')}" 
                        alt="${business.name}" 
                        loading="lazy" 
                        width="300" 
                        height="200">
                    <div class="card-content">
                        <div class="membership-badge" style="background-color: ${badgeColor}">
                            ${membershipLevel}
                        </div>
                        <h3>${business.name}</h3>
                        <address>${business.address}</address>
                        <p>${business.phone}</p>
                        <a href="${business.url}" target="_blank" class="learn-more">Visit Website</a>
                    </div>
                `;
                
                gallery.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error loading businesses:', error);
            document.getElementById('business-gallery').innerHTML = 
                '<p>Business listings are currently unavailable.</p>';
        });

    // Keep existing visit tracking code
    const visitNotification = document.getElementById('visit-notification');
    // ... (same as previous)
});