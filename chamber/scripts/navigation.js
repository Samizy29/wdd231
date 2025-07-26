// Mobile Menu Functionality (standalone version)
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('show');
            
            // Optional: Prevent body scroll when menu is open
            document.body.style.overflow = isExpanded ? 'auto' : 'hidden';
        });
        
        // Close menu when clicking on links (mobile)
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    hamburger.setAttribute('aria-expanded', 'false');
                    navMenu.classList.remove('show');
                    document.body.style.overflow = 'auto';
                }
            });
        });
        
        // Close menu when resizing to desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                hamburger.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('show');
                document.body.style.overflow = 'auto';
            }
        });
    }
});