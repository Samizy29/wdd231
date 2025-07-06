// Set current year in footer
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.current-year').textContent = new Date().getFullYear();
    
    // Set last modified date
    document.querySelector('.last-modified').textContent = 'Last Updated: ' + document.lastModified;
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});