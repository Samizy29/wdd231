document.addEventListener('DOMContentLoaded', function() {
    // Load member spotlights
    loadSpotlights();

    // Modal functionality
    const modal = document.getElementById('benefitsModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    
    const benefits = {
        np: {
            name: "NP Membership",
            benefits: [
                "Free for registered non-profits",
                "Business listing in directory",
                "Access to networking events",
                "Monthly newsletter"
            ]
        },
        bronze: {
            name: "Bronze Membership",
            benefits: [
                "All NP benefits plus:",
                "Business training workshops",
                "Social media features",
                "Event discounts (10-20%)"
            ]
        },
        silver: {
            name: "Silver Membership",
            benefits: [
                "All Bronze benefits plus:",
                "Priority event registration",
                "Featured directory listing",
                "Annual spotlight opportunity"
            ]
        },
        gold: {
            name: "Gold Membership",
            benefits: [
                "All Silver benefits plus:",
                "Homepage featured spotlights",
                "VIP event access",
                "Dedicated business consultant"
            ]
        }
    };

    document.querySelectorAll('.btn-benefit').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const level = this.getAttribute('data-level');
            showModal(level);
        });
    });

    function showModal(level) {
        modalTitle.textContent = `${benefits[level].name} Benefits`;
        modalContent.innerHTML = `
            <ul class="benefits-list">
                ${benefits[level].benefits.map(b => `<li>${b}</li>`).join('')}
            </ul>
        `;
        modal.showModal();
    }

    document.querySelector('.close-modal').addEventListener('click', () => {
        modal.close();
    });

    // Form validation
    document.getElementById('membershipForm').addEventListener('submit', function(e) {
        const form = e.target;
        let isValid = true;
        
        // Check required fields
        form.querySelectorAll('[required]').forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.nextElementSibling.style.display = 'block';
            } else {
                field.nextElementSibling.style.display = 'none';
            }
        });
        
        // Check title pattern if provided
        const titleField = form.querySelector('[name="title"]');
        if (titleField.value && !titleField.checkValidity()) {
            isValid = false;
            titleField.nextElementSibling.style.display = 'block';
        }
        
        if (!isValid) {
            e.preventDefault();
            // Scroll to first error
            const firstError = form.querySelector('.error-message[style="display: block;"]');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
});

function loadSpotlights() {
    fetch('data/members.json')
        .then(response => response.json())
        .then(members => {
            const eligible = members.filter(m => m.membership >= 2); // Gold/Silver only
            const shuffled = eligible.sort(() => 0.5 - Math.random());
            const featured = shuffled.slice(0, 2); // Show 2 random spotlights
            
            const container = document.getElementById('spotlightContainer');
            container.innerHTML = '';
            
            featured.forEach(member => {
                const card = document.createElement('div');
                card.className = 'spotlight-card';
                card.innerHTML = `
                    <h3>${member.name}</h3>
                    <p>${member.address}</p>
                    <p>${member.phone}</p>
                    <a href="${member.url}" target="_blank">Visit Website</a>
                `;
                container.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error loading member data:', error);
            document.getElementById('spotlightContainer').innerHTML = 
                '<p>Featured members not available at this time.</p>';
        });
}